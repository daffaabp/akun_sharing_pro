"use client";

import { useState, useTransition } from "react";
import { assignMemberToPool } from "@/app/actions/members";

type Pool = {
    id: string;
    name: string;
    status: string;
    service: { name: string };
};

type Member = {
    id: string;
    name: string;
    seats: { pool: { id: string } }[];
};

type Props = {
    member: Member;
    pools: Pool[];
    open: boolean;
    onClose: () => void;
};

const STATUS_LABEL: Record<string, string> = {
    OPEN: "Open",
    READY: "Ready",
};

export function AssignPoolDialog({ member, pools, open, onClose }: Props) {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [selectedPoolId, setSelectedPoolId] = useState("");

    if (!open) return null;

    // Filter out pools the member is already in
    const assignedPoolIds = new Set(member.seats.map((s) => s.pool.id));
    const availablePools = pools.filter((p) => !assignedPoolIds.has(p.id));

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        if (!selectedPoolId) {
            setError("Please select a pool.");
            return;
        }

        startTransition(async () => {
            try {
                await assignMemberToPool(member.id, selectedPoolId);
                onClose();
            } catch (err: unknown) {
                if (err instanceof Error && err.message.includes("Unique constraint")) {
                    setError("This member is already in that pool.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                    <h3 className="text-base font-semibold text-slate-900">Assign to Pool</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Adding <span className="font-semibold text-slate-700">{member.name}</span> to a pool.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {availablePools.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-sm text-slate-500">
                                {pools.length === 0
                                    ? "No open or ready pools available."
                                    : "This member is already in all available pools."}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Select Pool <span className="text-red-500">*</span></label>
                            <select
                                value={selectedPoolId}
                                onChange={(e) => setSelectedPoolId(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                            >
                                <option value="">— choose a pool —</option>
                                {availablePools.map((pool) => (
                                    <option key={pool.id} value={pool.id}>
                                        {pool.name} · {pool.service.name} [{STATUS_LABEL[pool.status] ?? pool.status}]
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        {availablePools.length > 0 && (
                            <button
                                type="submit"
                                disabled={pending}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                            >
                                {pending ? "Assigning…" : "Assign to Pool"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
