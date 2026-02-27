"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivatePoolDialog } from "./activate-pool-dialog";
import { EditPoolDialog } from "./edit-pool-dialog";
import { deletePool } from "@/app/actions/pools";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Service = { id: string; name: string; category?: string };
type Seat = { id: string; member: { name: string; email: string | null } };
type EmailOption = { id: string; email: string };

type Pool = {
    id: string;
    name: string;
    targetSeats: number;
    status: string;
    notes?: string | null;
    service: Service;
    seats: Seat[];
    masterEmail?: string | null;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    planType?: string | null;
};

const STATUS_BADGE: Record<string, React.ReactNode> = {
    OPEN: <Badge className="bg-blue-500 hover:bg-blue-600">Open</Badge>,
    READY: <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Ready</Badge>,
    ACTIVE: <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>,
};

interface PoolsTableProps {
    pools: Pool[];
    emails?: EmailOption[];
}

export function PoolsTable({ pools, emails = [] }: PoolsTableProps) {
    const [activatingPool, setActivatingPool] = useState<Pool | null>(null);
    const [editingPool, setEditingPool] = useState<Pool | null>(null);
    const router = useRouter();

    async function handleDelete(pool: Pool) {
        let confirmMessage = `Delete pool ${pool.name}?`;
        if (pool.seats.length > 0) {
            confirmMessage = `WARNING: This pool has ${pool.seats.length} active member(s).\n\nDeleting it will also remove these members from the pool. Are you sure you want to proceed?`;
        }

        if (!confirm(confirmMessage)) return;

        try {
            await deletePool(pool.id);
            toast.success("Pool deleted successfully");
            router.refresh();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Failed to delete pool");
        }
    }

    return (
        <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pool Name</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Seats</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="hidden md:table-cell px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Expires</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {pools.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-sm text-slate-400 py-12">
                                        No pools created yet.
                                    </td>
                                </tr>
                            )}
                            {pools.map((pool) => (
                                <tr key={pool.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-slate-900">{pool.name}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700">
                                        {pool.service.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-sm text-slate-600">
                                            {pool.seats.length}/{pool.targetSeats}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {STATUS_BADGE[pool.status] ?? (
                                            <Badge variant="outline">{pool.status}</Badge>
                                        )}
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4 text-sm text-slate-500">
                                        {pool.endDate
                                            ? new Date(pool.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                                            : "—"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {pool.status === "READY" && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => setActivatingPool(pool)}
                                                    className="h-7 text-xs mr-2"
                                                >
                                                    Activate
                                                </Button>
                                            )}
                                            <Link
                                                href={`/pools/${pool.id}`}
                                                className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors hover:bg-slate-100 rounded-md"
                                                title="View"
                                            >
                                                <Eye className="size-[18px]" />
                                            </Link>
                                            <button
                                                className="p-1.5 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 rounded-md"
                                                title="Edit"
                                                onClick={() => setEditingPool(pool)}
                                            >
                                                <Pencil className="size-[18px]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pool)}
                                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 rounded-md"
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

            {activatingPool && (
                <ActivatePoolDialog
                    pool={activatingPool}
                    open={!!activatingPool}
                    onClose={() => setActivatingPool(null)}
                    emails={emails}
                />
            )}

            {editingPool && (
                <EditPoolDialog
                    pool={editingPool}
                    open={!!editingPool}
                    onClose={() => setEditingPool(null)}
                />
            )}
        </div>
    );
}
