"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
            phone: data.phone ?? null,
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
