"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
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
    masterEmail?: string | null;
    password?: string | null;
    planType?: string | null;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
};

interface EditPoolDialogProps {
    pool: Pool | null;
    open: boolean;
    onClose: () => void;
    emails?: { id: string; email: string }[];
}

export function EditPoolDialog({ pool, open, onClose, emails = [] }: EditPoolDialogProps) {
    const [isPending, setIsPending] = useState(false);
    const [targetSeats, setTargetSeats] = useState<number>(5);
    const [status, setStatus] = useState<string>("OPEN");
    const [notes, setNotes] = useState<string>("");
    
    // Additional fields for active subscription edits
    const [masterEmail, setMasterEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [planType, setPlanType] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    // Searchable email picker state
    const [query, setQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredEmails = emails.filter((e) => {
        return e.email.toLowerCase().includes(query.toLowerCase());
    });

    // Close on outside click
    useEffect(() => {
        function handleClick(ev: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(ev.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const router = useRouter();

    // Initialize state when pool changes
    useEffect(() => {
        if (pool) {
            setTargetSeats(pool.targetSeats);
            setStatus(pool.status);
            setNotes(pool.notes ?? "");
            
            setMasterEmail(pool.masterEmail ?? "");
            setPassword(pool.password ?? "");
            setPlanType(pool.planType ?? "");
            
            if (pool.startDate) {
                const d = new Date(pool.startDate);
                setStartDate(d.toISOString().split('T')[0]);
            } else { setStartDate(""); }
            
            if (pool.endDate) {
                const d = new Date(pool.endDate);
                setEndDate(d.toISOString().split('T')[0]);
            } else { setEndDate(""); }
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
                masterEmail: masterEmail || null,
                password: password || null,
                planType: planType || null,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
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
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Edit Pool</DialogTitle>
                    <DialogDescription>
                        Update the target seats and status for this pool.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3 pt-4">
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    {minSeats > 0 && (
                        <p className="text-xs text-muted-foreground -mt-2">
                            Minimum {minSeats} seats based on current occupancy.
                        </p>
                    )}

                    {(status === "ACTIVE" || pool!.masterEmail) && (
                        <div className="border-t border-slate-100 pt-3 mt-1 space-y-3">
                            <h4 className="text-sm font-semibold text-slate-900 border-b pb-1">Subscription Details</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Master Email</Label>
                                    <div ref={dropdownRef} className="relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDropdownOpen((v) => !v);
                                                setQuery("");
                                            }}
                                            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        >
                                            <span className={masterEmail ? "text-foreground font-mono" : "text-muted-foreground"}>
                                                {masterEmail || "Select an email…"}
                                            </span>
                                            <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground ml-2" />
                                        </button>

                                        {dropdownOpen && (
                                            <div className="absolute z-50 mt-1 w-[300px] left-0 rounded-md border bg-popover shadow-md overflow-hidden">
                                                <div className="p-2 border-b bg-slate-50">
                                                    <Input
                                                        autoFocus
                                                        placeholder="Search email..."
                                                        value={query}
                                                        onChange={(e) => setQuery(e.target.value)}
                                                        className="h-8 text-sm bg-white"
                                                    />
                                                </div>
                                                <ul className="max-h-48 overflow-y-auto py-1 bg-white">
                                                    {filteredEmails.length === 0 && (
                                                        <li className="px-3 py-2 text-sm text-muted-foreground text-center">
                                                            No matches for &quot;{query}&quot;
                                                        </li>
                                                    )}
                                                    {filteredEmails.map((e) => (
                                                        <li
                                                            key={e.id}
                                                            onMouseDown={() => {
                                                                setMasterEmail(e.email);
                                                                setDropdownOpen(false);
                                                                setQuery("");
                                                            }}
                                                            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
                                                        >
                                                            <Check
                                                                className={`h-4 w-4 shrink-0 ${masterEmail === e.email ? "opacity-100 text-blue-600" : "opacity-0"}`}
                                                            />
                                                            <span className="truncate font-mono">{e.email}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Plan Type</Label>
                                    <Input
                                        placeholder="e.g. Pro, Premium"
                                        value={planType}
                                        onChange={(e) => setPlanType(e.target.value)}
                                        className="text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Account Password</Label>
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Stored password for this account"
                                    className="font-mono text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Purchase Date</Label>
                                    <Input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required={status === "ACTIVE"}
                                        className="text-sm bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Expires At</Label>
                                    <Input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required={status === "ACTIVE"}
                                        className="text-sm bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                        <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="e.g. Get charged $20, Forget to cancel..."
                            value={notes}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                            rows={2}
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
