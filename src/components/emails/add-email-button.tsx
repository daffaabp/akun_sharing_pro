"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEmail } from "@/app/actions/emails";

export function AddEmailButton() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(e.currentTarget);
        try {
            await createEmail({
                email: data.get("email") as string,
                password: (data.get("password") as string) || undefined,
                status: (data.get("status") as string) || "active",
            });
            setOpen(false);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); setError(null); }}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1.5">
                    <Plus className="size-3.5" />
                    Add Email
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Master Account</DialogTitle>
                        <DialogDescription>
                            Add a Gmail account used for purchasing shared subscriptions.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="add-email">Email address</Label>
                            <Input
                                id="add-email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="add-password">Gmail Password</Label>
                            <Input
                                id="add-password"
                                name="password"
                                type="password"
                                placeholder="Account password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="add-status">Status</Label>
                            <select
                                id="add-status"
                                name="status"
                                defaultValue="active"
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
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving…" : "Save Account"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
