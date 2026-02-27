"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { updateServiceStatus, deleteService } from "@/app/actions/services";
import { EditServiceDialog } from "./edit-service-dialog";

// Accept the Prisma-generated shape for Service 
type ServiceData = {
    id: string;
    name: string;
    category: string;
    status: string;
    description: string | null;
    url: string | null;
    createdAt?: Date;
};

const STATUS_STYLE: Record<string, string> = {
    active: "bg-green-50 text-green-600",
    maintenance: "bg-amber-50 text-amber-600",
    inactive: "bg-rose-50 text-rose-600",
};

export function ServicesTable({ services }: { services: ServiceData[] }) {
    const [pending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [editing, setEditing] = useState<ServiceData | null>(null);

    function cycleStatus(service: ServiceData) {
        const next = service.status === "active" ? "maintenance"
            : service.status === "maintenance" ? "inactive"
                : "active";
        setLoadingId(service.id);
        startTransition(async () => {
            await updateServiceStatus(service.id, next as "active" | "maintenance" | "inactive");
            setLoadingId(null);
        });
    }

    function handleDelete(service: ServiceData) {
        if (!confirm(`Delete ${service.name}?`)) return;
        setLoadingId(service.id);
        startTransition(async () => {
            await deleteService(service.id);
            setLoadingId(null);
        });
    }

    return (
        <>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Description</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
                                        No services found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="transition-colors hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-500">{service.category}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => cycleStatus(service)}
                                                disabled={pending && loadingId === service.id}
                                                title="Click to change status"
                                                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight cursor-pointer transition-opacity ${STATUS_STYLE[service.status] ?? "bg-slate-100 text-slate-500"} ${pending && loadingId === service.id ? "opacity-50" : ""}`}
                                            >
                                                {service.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <p className="text-sm text-slate-500">{service.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {service.url && (
                                                    <a
                                                        href={service.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors hover:bg-slate-100 rounded-md"
                                                        title="Visit URL"
                                                    >
                                                        <Eye className="size-[18px]" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => setEditing(service)}
                                                    className="p-1.5 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 rounded-md"
                                                    title="Edit"
                                                >
                                                    <Pencil className="size-[18px]" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service)}
                                                    disabled={pending && loadingId === service.id}
                                                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors hover:bg-slate-100 rounded-md disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="size-[18px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {editing && (
                <EditServiceDialog
                    service={editing}
                    open={!!editing}
                    onClose={() => setEditing(null)}
                />
            )}
        </>
    );
}
