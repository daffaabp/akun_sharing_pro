"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";

// ─── 2.1 Fetch all Open pools ─────────────────────────────────────────────────
export async function getOpenPools() {
    return db.pool.findMany({
        where: { status: "OPEN" },
        include: {
            service: true,
            seats: { include: { member: true } },
        },
        orderBy: { createdAt: "desc" },
    });
}

// ─── Fetch all Pools (admin view) ─────────────────────────────────────────────
export async function getAllPools(searchParams?: {
    overdue?: string;
    notes?: string;
    sort?: string;
}) {
    const where: Prisma.PoolWhereInput = {};
    const orderBy: Prisma.PoolOrderByWithRelationInput = {};

    // 1.2 Overdue logic
    if (searchParams?.overdue === "soon") {
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        where.endDate = { lte: nextWeek, gte: now };
    } else if (searchParams?.overdue === "expired") {
        where.endDate = { lt: new Date() };
    }

    // 1.3 Notes logic
    if (searchParams?.notes === "true") {
        where.notes = { not: null };
    }

    // 1.4 Sorting logic
    if (searchParams?.sort === "closest") {
        orderBy.endDate = "asc";
    } else if (searchParams?.sort === "oldest") {
        orderBy.createdAt = "asc";
    } else {
        orderBy.createdAt = "desc";
    }

    return db.pool.findMany({
        where,
        include: {
            service: true,
            seats: { include: { member: true } },
        },
        orderBy,
    });
}

// ─── Fetch a single pool by ID ────────────────────────────────────────────────
export async function getPoolById(id: string) {
    return db.pool.findUnique({
        where: { id },
        include: {
            service: true,
            seats: { include: { member: true } },
        },
    });
}

// ─── 2.2 Admin: Create a new Pool ────────────────────────────────────────────
export async function createPool(data: {
    name: string;
    serviceId: string;
    targetSeats: number;
}) {
    const pool = await db.pool.create({
        data: {
            name: data.name,
            serviceId: data.serviceId,
            targetSeats: data.targetSeats,
            status: "OPEN",
        },
    });

    revalidatePath("/pools");
    return pool;
}

// ─── 2.3 Member: Join a pool ──────────────────────────────────────────────────
export async function joinPool(poolId: string, memberId: string) {
    const pool = await db.pool.findUnique({
        where: { id: poolId },
        include: { seats: true },
    });

    if (!pool) throw new Error("Pool not found.");
    if (pool.status !== "OPEN") throw new Error("This pool is no longer accepting members.");

    const alreadyJoined = pool.seats.some((s: { memberId: string }) => s.memberId === memberId);
    if (alreadyJoined) throw new Error("You have already joined this pool.");

    // Create the seat
    const seat = await db.poolSeat.create({
        data: { poolId, memberId },
    });

    // Check if pool is now full → mark READY
    const newSeatCount = pool.seats.length + 1;
    if (newSeatCount >= pool.targetSeats) {
        await db.pool.update({
            where: { id: poolId },
            data: { status: "READY" },
        });
    }

    revalidatePath("/pools");
    return seat;
}

// ─── 2.4 Admin: Activate a READY pool  ───────────────────────────────────────
export async function activatePool(
    poolId: string,
    subscriptionData: {
        masterEmail: string;
        password?: string;
        startDate: Date;
        endDate: Date;
        planType?: string;
    }
) {
    const pool = await db.pool.findUnique({ where: { id: poolId } });
    if (!pool) throw new Error("Pool not found.");
    if (pool.status !== "READY") throw new Error("Pool must be READY before activation.");

    // Link it directly to the pool and set ACTIVE
    const updatedPool = await db.pool.update({
        where: { id: poolId },
        data: {
            masterEmail: subscriptionData.masterEmail,
            password: subscriptionData.password,
            startDate: subscriptionData.startDate,
            endDate: subscriptionData.endDate,
            planType: subscriptionData.planType,
            status: "ACTIVE",
        },
    });

    revalidatePath("/pools");
    return { pool: updatedPool };
}

// ─── 2.1 Admin: Add a member to a pool (upsert by phone) ─────────────────────
export async function addMemberToPool(
    poolId: string,
    data: { name: string; phone?: string | null; email?: string | null }
) {
    const pool = await db.pool.findUnique({
        where: { id: poolId },
        include: { seats: true },
    });
    if (!pool) throw new Error("Pool not found.");
    if (pool.seats.length >= pool.targetSeats) throw new Error("This pool is already full.");

    // Match member by name (case-insensitive)
    let member = await db.member.findFirst({
        where: {
            name: {
                equals: data.name,
                mode: "insensitive"
            }
        }
    });

    if (!member) {
        member = await db.member.create({
            data: {
                name: data.name,
                phone: data.phone ?? null,
                email: data.email ?? null
            }
        });
    }

    // Check not already in this pool
    const alreadySeated = pool.seats.some((s: { memberId: string }) => s.memberId === member.id);
    if (alreadySeated) throw new Error("This person is already in the pool.");

    const seat = await db.poolSeat.create({
        data: { poolId, memberId: member.id },
    });

    // Auto-flip to READY when full
    const newCount = pool.seats.length + 1;
    if (newCount >= pool.targetSeats) {
        await db.pool.update({ where: { id: poolId }, data: { status: "READY" } });
    }

    revalidatePath(`/pools/${poolId}`);
    revalidatePath("/pools");
    return seat;
}

// ─── 2.2 Admin: Remove a seat ─────────────────────────────────────────────────
export async function removeSeat(seatId: string) {
    const seat = await db.poolSeat.delete({ where: { id: seatId } });
    revalidatePath("/pools");
    return seat;
}

// ─── 2.3 Admin: Update payment status on a seat ───────────────────────────────
export async function updateSeatPayment(
    seatId: string,
    paymentStatus: string
) {
    const seat = await db.poolSeat.update({
        where: { id: seatId },
        data: { paymentStatus },
    });
    revalidatePath("/pools");
    return seat;
}

// ─── 2.4 Admin: Get all ACTIVE pools with subscription ────────────────────────
export async function getActivePools() {
    return db.pool.findMany({
        where: { status: "ACTIVE" },
        include: {
            service: true,
            seats: { where: { status: "ACTIVE" } },
        },
        orderBy: { updatedAt: "desc" },
    });
}

// ─── Admin: Edit a Pool ───────────────────────────────────────────────────────
export async function editPool(
    id: string,
    data: { targetSeats: number; status?: string; notes?: string | null }
) {
    const pool = await db.pool.findUnique({
        where: { id },
        include: { seats: true },
    });
    if (!pool) throw new Error("Pool not found.");

    if (data.targetSeats < pool.seats.length) {
        throw new Error(`Cannot set target seats to ${data.targetSeats}. The pool already has ${pool.seats.length} members.`);
    }

    const updatedPool = await db.pool.update({
        where: { id },
        data: {
            targetSeats: data.targetSeats,
            status: data.status,
            notes: data.notes,
        },
    });

    revalidatePath("/pools");
    revalidatePath(`/pools/${id}`);
    return updatedPool;
}

// ─── Admin: Delete a Pool ─────────────────────────────────────────────────────
export async function deletePool(id: string) {
    const pool = await db.pool.findUnique({
        where: { id },
        include: { seats: true },
    });
    if (!pool) throw new Error("Pool not found.");

    // Delete associated seats first to avoid foreign key constraint errors
    if (pool.seats.length > 0) {
        await db.poolSeat.deleteMany({
            where: { poolId: id },
        });
    }

    const deletedPool = await db.pool.delete({
        where: { id },
    });

    revalidatePath("/pools");
    revalidatePath("/users");

    return deletedPool;
}
