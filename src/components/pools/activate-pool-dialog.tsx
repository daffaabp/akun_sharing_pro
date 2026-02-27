"use client";

import { useState, useRef, useEffect } from "react";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { activatePool } from "@/app/actions/pools";
import { Check, ChevronsUpDown } from "lucide-react";

type EmailOption = { id: string; email: string };

interface ActivatePoolDialogProps {
    pool: { id: string; name: string };
    open: boolean;
    onClose: () => void;
    emails?: EmailOption[];
}

export function ActivatePoolDialog({ pool, open, onClose, emails = [] }: ActivatePoolDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ── Searchable email picker state ──────────────────────────────────────────
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<EmailOption | null>(emails[0] ?? null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filtered = emails.filter((e) => {
        const q = query.toLowerCase();
        return e.email.toLowerCase().includes(q);
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

    // Reset when dialog opens
    useEffect(() => {
        if (open) {
            setSelected(emails[0] ?? null);
            setQuery("");
            setError(null);
        }
    }, [open, emails]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(e.currentTarget);

        try {
            await activatePool(pool.id, {
                masterEmail: data.get("masterEmail") as string,
                password: (data.get("password") as string) || undefined,
                startDate: new Date(data.get("startDate") as string),
                endDate: new Date(data.get("endDate") as string),
                planType: (data.get("planType") as string) || undefined,
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
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Activate Pool: {pool.name}</DialogTitle>
                    <DialogDescription>
                        Select a master account email and enter the subscription details.
                        All members in this pool will share these credentials and dates.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">

                    {/* ── Email picker ─────────────────────────────────────── */}
                    <div className="space-y-2">
                        <Label>Master Account Email</Label>

                        {emails.length > 0 ? (
                            <div ref={dropdownRef} className="relative">
                                {/* Hidden real input for form submission */}
                                <input
                                    type="hidden"
                                    name="masterEmail"
                                    value={selected?.email ?? ""}
                                    required
                                />

                                {/* Trigger button showing selected value */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDropdownOpen((v) => !v);
                                        setQuery("");
                                    }}
                                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <span className={selected ? "text-foreground font-mono" : "text-muted-foreground"}>
                                        {selected ? selected.email : "Select an email…"}
                                    </span>
                                    <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground ml-2" />
                                </button>

                                {/* Dropdown panel */}
                                {dropdownOpen && (
                                    <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
                                        {/* Search input */}
                                        <div className="p-2 border-b">
                                            <Input
                                                autoFocus
                                                placeholder="Search email or label…"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                className="h-8 text-sm"
                                            />
                                        </div>

                                        {/* Options list */}
                                        <ul className="max-h-52 overflow-y-auto py-1">
                                            {filtered.length === 0 && (
                                                <li className="px-3 py-2 text-sm text-muted-foreground text-center">
                                                    No emails match &quot;{query}&quot;
                                                </li>
                                            )}
                                            {filtered.map((e) => (
                                                <li
                                                    key={e.id}
                                                    onMouseDown={() => {
                                                        setSelected(e);
                                                        setDropdownOpen(false);
                                                        setQuery("");
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded"
                                                >
                                                    <Check
                                                        className={`h-4 w-4 shrink-0 ${selected?.id === e.id ? "opacity-100" : "opacity-0"}`}
                                                    />
                                                    <span className="truncate font-mono">{e.email}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="border-t px-3 py-1.5">
                                            <a href="/emails" className="text-xs text-muted-foreground hover:text-primary">
                                                Manage emails ↗
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Fallback: no emails in DB yet */
                            <Input
                                name="masterEmail"
                                type="email"
                                placeholder="cursor-shared@yourdomain.com"
                                required
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="act-password">Password <span className="text-muted-foreground">(optional)</span></Label>
                        <Input id="act-password" name="password" type="password" placeholder="Stored for team reference" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="act-plan">Plan Type <span className="text-muted-foreground">(optional)</span></Label>
                        <Input id="act-plan" name="planType" placeholder="e.g. Pro, Team" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="act-start">Start Date</Label>
                            <Input id="act-start" name="startDate" type="date" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="act-end">End Date</Label>
                            <Input id="act-end" name="endDate" type="date" required />
                        </div>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading || (emails.length > 0 && !selected)}>
                            {loading ? "Activating…" : "Activate Pool"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
