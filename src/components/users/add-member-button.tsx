"use client";

import { useState, useTransition } from "react";
import { UserPlus } from "lucide-react";
import { createMember } from "@/app/actions/members";

export function AddMemberButton() {
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = (data.get("name") as string).trim();
        const phone = (data.get("phone") as string).trim() || undefined;
        const email = (data.get("email") as string).trim() || undefined;

        startTransition(async () => {
            try {
                await createMember({ name, phone, email });
                setOpen(false);
                form.reset();
            } catch (err: unknown) {
                if (err instanceof Error && err.message.includes("Unique constraint")) {
                    setError("A member with that phone number already exists.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            }
        });
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
                <UserPlus className="size-4" />
                Add Member
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100">
                            <h3 className="text-base font-semibold text-slate-900">Add New Member</h3>
                            <p className="text-sm text-slate-500 mt-0.5">Members can be assigned to pools after creation.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    name="name"
                                    required
                                    placeholder="e.g. Budi Santoso"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">
                                    Phone / WhatsApp <span className="text-slate-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    name="phone"
                                    placeholder="e.g. 08123456789"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">
                                    Email <span className="text-slate-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="e.g. budi@email.com"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setOpen(false); setError(null); }}
                                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={pending}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                >
                                    {pending ? "Adding…" : "Add Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
