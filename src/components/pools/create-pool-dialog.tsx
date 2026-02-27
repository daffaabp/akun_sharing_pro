"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPool } from "@/app/actions/pools";
import { Plus } from "lucide-react";

type Service = { id: string; name: string };

interface CreatePoolDialogProps {
    services: Service[];
}

export function CreatePoolDialog({ services }: CreatePoolDialogProps) {
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
            await createPool({
                name: data.get("name") as string,
                serviceId: data.get("serviceId") as string,
                targetSeats: Number(data.get("targetSeats")),
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
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Pool
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Subscription Pool</DialogTitle>
                    <DialogDescription>
                        Create a new pool to gather members before purchasing a subscription.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="pool-name">Pool Name</Label>
                        <Input
                            id="pool-name"
                            name="name"
                            placeholder="e.g. Cursor Group 1"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pool-service">Service</Label>
                        <select
                            id="pool-service"
                            name="serviceId"
                            required
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="">Select a service…</option>
                            {services.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pool-seats">Target Seats</Label>
                        <Input
                            id="pool-seats"
                            name="targetSeats"
                            type="number"
                            min={1}
                            max={20}
                            defaultValue={5}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating…" : "Create Pool"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
