"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { formatWhatsAppNumber } from "@/lib/utils";

// ─── Fetch all members (admin view, with pool seat count) ──────────────────────
export async function getAllMembers() {
    return db.member.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { seats: true } },
            seats: {
                include: {
                    pool: {
                        select: { id: true, name: true, status: true },
                    },
                },
            },
        },
    });
}

// ─── Fetch member by id ────────────────────────────────────────────────────────
export async function getMemberById(id: string) {
    return db.member.findUnique({
        where: { id },
        include: {
            seats: {
                include: {
                    pool: {
                        select: {
                            id: true,
                            name: true,
                            status: true,
                            service: { select: { name: true } },
                        },
                    },
                },
            },
        },
    });
}

// ─── Create member ─────────────────────────────────────────────────────────────
export async function createMember(data: {
    name: string;
    phone?: string | null;
    email?: string | null;
}) {
    const record = await db.member.create({
        data: {
            name: data.name,
            phone: formatWhatsAppNumber(data.phone) ?? null,
            email: data.email ?? null,
        }
    });
    revalidatePath("/users");
    return record;
}

// ─── Update member ─────────────────────────────────────────────────────────────
export async function updateMember(
    id: string,
    data: { name?: string; phone?: string; email?: string | null }
) {
    if (data.phone !== undefined) {
        data.phone = formatWhatsAppNumber(data.phone) || "";
    }
    const record = await db.member.update({ where: { id }, data });
    revalidatePath("/users");
    return record;
}

// ─── Delete member ─────────────────────────────────────────────────────────────
export async function deleteMember(id: string) {
    const record = await db.member.delete({ where: { id } });
    revalidatePath("/users");
    return record;
}

// ─── Assign member to pool ────────────────────────────────────────────────────
export async function assignMemberToPool(memberId: string, poolId: string) {
    const record = await db.poolSeat.create({
        data: { memberId, poolId },
    });
    revalidatePath("/users");
    revalidatePath("/pools");
    return record;
}

// ─── Fetch open/ready pools (for assign dialog) ───────────────────────────────
export async function getOpenPools() {
    return db.pool.findMany({
        where: { status: { in: ["OPEN", "READY"] } },
        select: {
            id: true,
            name: true,
            status: true,
            service: { select: { name: true } },
        },
        orderBy: { name: "asc" },
    });
}

// ─── Update member phone inline ───────────────────────────────────────────────
export async function updateMemberPhoneInline(memberId: string, phone: string | null, poolId: string) {
    const record = await db.member.update({
        where: { id: memberId },
        data: { phone },
    });
    revalidatePath(`/pools/${poolId}`);
    return record;
}

// ─── Fetch follow-up seats (H-1 or overdue in ACTIVE pools) ───────────────────
export async function getFollowUpSeats() {
    // Stabilkan konsep "Hari Ini" memaksa ke Zona Waktu Jakarta (WIB/UTC+7)
    // Mencegah isu Vercel (yang server-nya berlokasi di UTC+0 Eropa/US)
    const todayStrInWIB = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    const endOfToday = new Date(todayStrInWIB);
    endOfToday.setHours(23, 59, 59, 999);

    // Konversi balikan ke UTC agar query Prisma Date akurat dan seimbang
    // Mengingat server Vercel memperlakukan fungsi setHours() terhadap local UTC mereka.
    const utcTimings = endOfToday.getTime() - (endOfToday.getTimezoneOffset() * 60000);
    const finalDateLimit = new Date(utcTimings);

    return db.poolSeat.findMany({
        where: {
            status: "ACTIVE", // Hanya tampilkan yang belum diproses (ACTIVE)
            pool: {
                status: "ACTIVE",
                endDate: {
                    lte: finalDateLimit
                }
            }
        },
        include: {
            member: true,
            pool: {
                include: {
                    service: true
                }
            }
        },
        orderBy: {
            pool: {
                endDate: "asc"
            }
        }
    });
}

// ─── Process Follow Up Actions ────────────────────────────────────────────────
export async function processFollowUpCancel(seatId: string) {
    const record = await db.poolSeat.update({
        where: { id: seatId },
        data: { status: "CANCELED" }
    });
    revalidatePath("/users");
    return record;
}

export async function processFollowUpRenew(
    oldSeatId: string,
    memberId: string,
    newPoolId: string,
    paymentStatus: string,
    notes: string | null
) {
    // 1. Mark old seat as renewed
    await db.poolSeat.update({
        where: { id: oldSeatId },
        data: { status: "RENEWED" }
    });

    // 2. Create new seat in the chosen OPEN/READY pool
    const newRecord = await db.poolSeat.create({
        data: {
            memberId,
            poolId: newPoolId,
            paymentStatus,
            notes
        }
    });

    // 3. Trigger cascade ui refresh
    revalidatePath("/users");
    revalidatePath("/pools");
    revalidatePath(`/pools/${newPoolId}`);

    return newRecord;
}
