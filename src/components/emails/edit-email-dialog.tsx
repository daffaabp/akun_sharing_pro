"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEmail } from "@/app/actions/emails";

type Email = {
    id: string;
    email: string;
    password: string | null;
    status: string;
};

interface EditEmailDialogProps {
    email: Email;
    open: boolean;
    onClose: () => void;
}

export function EditEmailDialog({ email, open, onClose }: EditEmailDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(e.currentTarget);
        const password = data.get("password") as string;

        try {
            await updateEmail(email.id, {
                email: data.get("email") as string,
                status: data.get("status") as string,
                // empty string → clear password; unchanged → keep existing
                password: password === "" ? null : password || undefined,
            });
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-[400px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Account</DialogTitle>
                        <DialogDescription>
                            Update the email address or stored Gmail password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email address</Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                defaultValue={email.email}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="edit-password">Gmail Password</Label>
                                <button
                                    type="button"
                                    className="text-xs text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowPassword((v) => !v)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <Input
                                id="edit-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                defaultValue={email.password ?? ""}
                                placeholder="Leave blank to keep current"
                            />
                            <p className="text-xs text-muted-foreground">
                                Clear the field and save to remove the stored password.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <select
                                id="edit-status"
                                name="status"
                                defaultValue={email.status}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="disabled">Disabled</option>
                            </select>
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive mb-3">{error}</p>}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving…" : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
