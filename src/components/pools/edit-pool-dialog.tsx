"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { editPool } from "@/app/actions/pools";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Pool = {
    id: string;
    targetSeats: number;
    status: string;
    notes?: string | null;
    seats: { id: string }[];
};

interface EditPoolDialogProps {
    pool: Pool | null;
    open: boolean;
    onClose: () => void;
}

export function EditPoolDialog({ pool, open, onClose }: EditPoolDialogProps) {
    const [isPending, setIsPending] = useState(false);
    const [targetSeats, setTargetSeats] = useState<number>(5);
    const [status, setStatus] = useState<string>("OPEN");
    const [notes, setNotes] = useState<string>("");
    const router = useRouter();

    // Initialize state when pool changes
    useEffect(() => {
        if (pool) {
            setTargetSeats(pool.targetSeats);
            setStatus(pool.status);
            setNotes(pool.notes ?? "");
        }
    }, [pool]);

    if (!pool) return null;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsPending(true);

        try {
            await editPool(pool!.id, {
                targetSeats,
                status,
                notes: notes.trim() || null,
            });
            toast.success("Pool updated successfully");
            onClose();
            router.refresh();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Failed to update pool");
        } finally {
            setIsPending(false);
        }
    }

    const minSeats = pool.seats?.length || 0;

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Pool</DialogTitle>
                    <DialogDescription>
                        Update the target seats and status for this pool.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="targetSeats" className="text-sm font-medium">Target Seats</Label>
                        <Input
                            id="targetSeats"
                            name="targetSeats"
                            type="number"
                            min={Math.max(1, minSeats)}
                            value={targetSeats}
                            onChange={(e) => setTargetSeats(parseInt(e.target.value))}
                            required
                        />
                        {minSeats > 0 && (
                            <p className="text-xs text-muted-foreground">
                                Minimum {minSeats} seats because of current active members.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="OPEN">Open</SelectItem>
                                <SelectItem value="READY">Ready</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="e.g. Get charged $20, Forget to cancel..."
                            value={notes}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                            rows={3}
                            className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                            Optional reminder or memo for this pool.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
