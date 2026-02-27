"use client";

import { useState, useTransition } from "react";
import { updateMember } from "@/app/actions/members";

type Member = {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
};

type Props = {
    member: Member;
    open: boolean;
    onClose: () => void;
};

export function EditMemberDialog({ member, open, onClose }: Props) {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    if (!open) return null;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const data = new FormData(e.currentTarget);
        const name = (data.get("name") as string).trim();
        const phone = (data.get("phone") as string).trim() || undefined;
        const email = (data.get("email") as string).trim() || null;

        startTransition(async () => {
            try {
                await updateMember(member.id, { name, phone, email });
                onClose();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100">
                    <h3 className="text-base font-semibold text-slate-900">Edit Member</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Update member information.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                        <input
                            name="name"
                            required
                            defaultValue={member.name}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">
                            Phone / WhatsApp <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input
                            name="phone"
                            defaultValue={member.phone ?? ""}
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
                            defaultValue={member.email ?? ""}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

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
                        <button
                            type="submit"
                            disabled={pending}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                            {pending ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
