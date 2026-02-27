"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { updateEmailStatus, deleteEmail } from "@/app/actions/emails";
import { EditEmailDialog } from "./edit-email-dialog";
import Link from "next/link";

type Email = {
    id: string;
    email: string;
    password: string | null;
    status: string;
    createdAt: Date;
};

const STATUS_STYLE: Record<string, string> = {
    active: "bg-green-50 text-green-600",
    paused: "bg-amber-50 text-amber-600",
    disabled: "bg-rose-50 text-rose-600",
};

export function EmailsTable({ emails }: { emails: Email[] }) {
    const [pending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [editing, setEditing] = useState<Email | null>(null);

    function cycleStatus(email: Email) {
        const next = email.status === "active" ? "paused"
            : email.status === "paused" ? "disabled"
                : "active";
        setLoadingId(email.id);
        startTransition(async () => {
            await updateEmailStatus(email.id, next as "active" | "paused" | "disabled");
            setLoadingId(null);
        });
    }

    function handleDelete(email: Email) {
        if (!confirm(`Delete ${email.email}?`)) return;
        setLoadingId(email.id);
        startTransition(async () => {
            await deleteEmail(email.id);
            setLoadingId(null);
        });
    }

    if (emails.length === 0) {
        return (
            <p className="text-center text-sm text-slate-400 py-12">
                No emails yet. Add one to get started.
            </p>
        );
    }

    return (
        <>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Added</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {emails.map((row) => (
                                <tr key={row.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-slate-900 font-mono">{row.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.password
                                            ? <span className="text-sm font-mono text-slate-500 tracking-widest">••••••••</span>
                                            : <span className="text-xs italic text-slate-300">not set</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => cycleStatus(row)}
                                            disabled={pending && loadingId === row.id}
                                            title="Click to change status"
                                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight cursor-pointer transition-opacity ${STATUS_STYLE[row.status] ?? "bg-slate-100 text-slate-500"} ${pending && loadingId === row.id ? "opacity-50" : ""}`}
                                        >
                                            {row.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500">
                                            {new Date(row.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/emails/${row.id}`}
                                                className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors hover:bg-slate-100 rounded-md"
                                                title="View"
                                            >
                                                <Eye className="size-[18px]" />
                                            </Link>
                                            <button
                                                onClick={() => setEditing(row)}
                                                className="p-1.5 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 rounded-md"
                                                title="Edit"
                                            >
                                                <Pencil className="size-[18px]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row)}
                                                disabled={pending && loadingId === row.id}
                                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 rounded-md disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 className="size-[18px]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editing && (
                <EditEmailDialog
                    email={editing}
                    open={!!editing}
                    onClose={() => setEditing(null)}
                />
            )}
        </>
    );
}
