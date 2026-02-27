"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addMemberToPool } from "@/app/actions/pools";
import { UserPlus } from "lucide-react";

interface AddMemberDialogProps {
    poolId: string;
    disabled?: boolean;
    triggerClassName?: string;
}

export function AddMemberDialog({ poolId, disabled, triggerClassName }: AddMemberDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            await addMemberToPool(poolId, {
                name: data.get("name") as string,
                phone: (data.get("phone") as string) || undefined,
                email: (data.get("email") as string) || undefined,
            });
            setOpen(false);
            form.reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className={triggerClassName || "gap-2"} disabled={disabled}>
                    <UserPlus className={triggerClassName ? "h-5 w-5 mr-2" : "h-4 w-4"} />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Add Member to Pool</DialogTitle>
                    <DialogDescription>
                        Manually assign an existing user to this pool.
                        They won&apos;t be charged since this is a manual addition on your end.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="add-name">Full Name</Label>
                        <Input id="add-name" name="name" placeholder="e.g. Budi Santoso" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="add-phone">Phone / WhatsApp <span className="text-muted-foreground">(optional)</span></Label>
                        <Input id="add-phone" name="phone" placeholder="+628xxxxxxxx" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="add-email">Email <span className="text-muted-foreground">(optional)</span></Label>
                        <Input id="add-email" name="email" type="email" placeholder="budi@email.com" />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding…" : "Add Member"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
