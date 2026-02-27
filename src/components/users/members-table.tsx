"use client";

import { useState, useTransition } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { deleteMember, getAllMembers, getOpenPools } from "@/app/actions/members";
import { EditMemberDialog } from "./edit-member-dialog";
import { AssignPoolDialog } from "./assign-pool-dialog";

type Member = Awaited<ReturnType<typeof getAllMembers>>[number];
type Pool = Awaited<ReturnType<typeof getOpenPools>>[number];

const STATUS_STYLE: Record<string, string> = {
    OPEN: "bg-blue-50 text-blue-600",
    READY: "bg-amber-50 text-amber-600",
    ACTIVE: "bg-green-50 text-green-600",
};

export function MembersTable({
    members,
    pools,
}: {
    members: Member[];
    pools: Pool[];
}) {
    const [pending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [editing, setEditing] = useState<Member | null>(null);
    const [assigning, setAssigning] = useState<Member | null>(null);

    function handleDelete(member: Member) {
        if (!confirm(`Delete member "${member.name}"? This will also remove them from any pools.`)) return;
        setLoadingId(member.id);
        startTransition(async () => {
            await deleteMember(member.id);
            setLoadingId(null);
        });
    }

    if (members.length === 0) {
        return (
            <p className="text-center text-sm text-slate-400 py-12">
                No members yet. Add one to get started.
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
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pools</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {members.map((row) => (
                                <tr key={row.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-slate-900">{row.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.phone
                                            ? <p className="text-sm font-mono text-slate-600">{row.phone}</p>
                                            : <span className="text-xs italic text-slate-300">not set</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.email
                                            ? <p className="text-sm text-slate-600">{row.email}</p>
                                            : <span className="text-xs italic text-slate-300">not set</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {row._count.seats === 0 ? (
                                                <span className="text-xs italic text-slate-300">none</span>
                                            ) : (
                                                row.seats.map((seat) => (
                                                    <span
                                                        key={seat.pool.id}
                                                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${STATUS_STYLE[seat.pool.status] ?? "bg-slate-100 text-slate-500"}`}
                                                    >
                                                        {seat.pool.name}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500">
                                            {new Date(row.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setAssigning(row)}
                                                className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors hover:bg-slate-100 rounded-md"
                                                title="Assign to Pool"
                                            >
                                                <PlusCircle className="size-[18px]" />
                                            </button>
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
                <EditMemberDialog
                    member={editing}
                    open={!!editing}
                    onClose={() => setEditing(null)}
                />
            )}

            {assigning && (
                <AssignPoolDialog
                    member={assigning}
                    pools={pools}
                    open={!!assigning}
                    onClose={() => setAssigning(null)}
                />
            )}
        </>
    );
}
