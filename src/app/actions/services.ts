"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ─── Fetch all services (for dropdowns) ───────────────────────────────────────
export async function getServices() {
    return db.service.findMany({
        where: { status: "active" },
        select: { id: true, name: true, category: true },
        orderBy: { name: "asc" },
    });
}

// ─── Fetch all services (admin view, all statuses) ────────────────────────────
export async function getAllServices() {
    return db.service.findMany({
        orderBy: { createdAt: "desc" },
    });
}

// ─── Fetch single service + linked pools ──────────────────────────────────────
export async function getServiceById(id: string) {
    const service = await db.service.findUnique({ where: { id } });
    if (!service) return null;

    // Find pools for this service
    const pools = await db.pool.findMany({
        where: { serviceId: id },
        include: {
            seats: { select: { id: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    return { service, pools };
}

// ─── Create service ───────────────────────────────────────────────────────────
export async function createService(data: {
    name: string;
    category: string;
    description?: string;
    url?: string;
    status?: string;
}) {
    const record = await db.service.create({ data });
    revalidatePath("/services");
    return record;
}

// ─── Update service ───────────────────────────────────────────────────────────
export async function updateService(
    id: string,
    data: {
        name?: string;
        category?: string;
        description?: string | null;
        url?: string | null;
        status?: string;
    }
) {
    const record = await db.service.update({ where: { id }, data });
    revalidatePath("/services");
    return record;
}

// ─── Update service status ────────────────────────────────────────────────────
export async function updateServiceStatus(
    id: string,
    status: "active" | "maintenance" | "inactive"
) {
    const record = await db.service.update({ where: { id }, data: { status } });
    revalidatePath("/services");
    return record;
}

// ─── Delete service ───────────────────────────────────────────────────────────
export async function deleteService(id: string) {
    const record = await db.service.delete({ where: { id } });
    revalidatePath("/services");
    return record;
}
