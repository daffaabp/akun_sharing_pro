"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ─── Fetch all emails (for dropdowns) ─────────────────────────────────────────
export async function getEmails() {
    return db.email.findMany({
        where: { status: "active" },
        select: { id: true, email: true },
        orderBy: { email: "asc" },
    });
}

// ─── Fetch all emails (admin view, all statuses) ──────────────────────────────
export async function getAllEmails() {
    return db.email.findMany({
        orderBy: { createdAt: "desc" },
    });
}

// ─── Fetch single email + linked pools ────────────────────────────────────────
export async function getEmailById(id: string) {
    const email = await db.email.findUnique({ where: { id } });
    if (!email) return null;

    // Find pools whose subscription uses this email address
    const pools = await db.pool.findMany({
        where: {
            masterEmail: email.email,
        },
        include: {
            service: { select: { name: true } },
            seats: { select: { id: true, paymentStatus: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    return { email, pools };
}

// ─── Create email ─────────────────────────────────────────────────────────────
export async function createEmail(data: {
    email: string;
    password?: string;
    status?: string;
}) {
    const record = await db.email.create({ data });
    revalidatePath("/", "layout");
return record;
}

// ─── Update email ─────────────────────────────────────────────────────────────
export async function updateEmail(
    id: string,
    data: { email?: string; password?: string | null; status?: string }
) {
    const record = await db.email.update({ where: { id }, data });
    revalidatePath("/", "layout");
return record;
}

// ─── Update email status ──────────────────────────────────────────────────────
export async function updateEmailStatus(
    id: string,
    status: "active" | "paused" | "disabled"
) {
    const record = await db.email.update({ where: { id }, data: { status } });
    revalidatePath("/", "layout");
return record;
}

// ─── Delete email ─────────────────────────────────────────────────────────────
export async function deleteEmail(id: string) {
    const record = await db.email.delete({ where: { id } });
    revalidatePath("/", "layout");
return record;
}
