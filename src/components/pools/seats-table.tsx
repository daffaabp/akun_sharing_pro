"use client";

import { useState, useTransition } from "react";
import { updateSeatPayment, removeSeat } from "@/app/actions/pools";
import { updateMemberPhoneInline } from "@/app/actions/members";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn, formatWhatsAppNumber } from "@/lib/utils";

type Seat = {
    id: string;
    paymentStatus: string;
    joinedAt: Date | string;
    notes: string | null;
    member: { id: string; name: string; phone: string | null; email: string | null };
};

const PAYMENT_BADGE: Record<string, React.ReactNode> = {
    PAID: (
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border-none px-2.5 font-medium">
            Paid
        </Badge>
    ),
    PENDING: (
        <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black border-none px-2.5 font-medium shadow-sm">
            Pending
        </Badge>
    ),
    REFUNDED: (
        <Badge variant="outline" className="px-2.5 font-medium">
            Refunded
        </Badge>
    ),
};

function PhoneCell({ member, poolId }: { member: Seat["member"], poolId: string }) {
    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState(member?.phone || "");
    const [pending, startTransition] = useTransition();

    if (!member) return <span className="text-muted-foreground italic font-sans">No phone</span>;

    async function handleSave() {
        const parsedData = formatWhatsAppNumber(phone);
        // revert kalau tidak ada perubahan sama sekali secara core string
        if (parsedData === (member.phone || "")) {
            setIsEditing(false);
            setPhone(member.phone || "");
            return;
        }

        // kalau sedang loading api
        startTransition(async () => {
            try {
                await updateMemberPhoneInline(member.id, parsedData, poolId);
                toast.success("Phone number formatted & saved");
            } catch (error) {
                toast.error("Failed to update phone number");
                setPhone(member.phone || "");
            } finally {
                setIsEditing(false);
            }
        });
    }

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <Input 
                    autoFocus
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={e => {
                        if (e.key === "Enter") handleSave();
                        if (e.key === "Escape") { setPhone(member.phone || ""); setIsEditing(false); }
                    }}
                    disabled={pending}
                    className="h-8 max-w-[150px] text-xs font-mono"
                    placeholder="e.g. 0812 / +62..."
                />
            </div>
        )
    }

    return (
        <div 
            onClick={() => setIsEditing(true)} 
            className="cursor-text max-w-fit px-2 py-1 -ml-2 rounded hover:bg-muted/80 transition-colors group relative"
            title="Click to edit phone"
        >
            {member.phone ? (
                <span className="font-mono text-foreground">{member.phone}</span>
            ) : (
                <span className="text-muted-foreground italic font-sans">No phone</span>
            )}
            <span className="absolute -right-6 top-1.5 opacity-0 group-hover:opacity-100 text-primary text-[10px] font-medium tracking-wide">EDIT</span>
        </div>
    );
}

export function SeatsTable({ seats, poolId }: { seats: Seat[]; poolId: string }) {
    const [pending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    function togglePayment(seat: Seat) {
        const next = seat.paymentStatus === "PAID" ? "PENDING" : "PAID";
        setLoadingId(seat.id);
        startTransition(async () => {
            await updateSeatPayment(seat.id, next);
            setLoadingId(null);
        });
    }

    function handleRemove(seatId: string) {
        if (!confirm("Remove this person from the pool?")) return;
        setLoadingId(seatId);
        startTransition(async () => {
            await removeSeat(seatId);
            setLoadingId(null);
        });
    }

    if (seats.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">
                    No members assigned yet. Use &quot;Add Member&quot; to add someone.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/60">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16"
                        >
                            #
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                            Phone / WhatsApp
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                            Payment
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                        >
                            Added
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                    {seats.map((seat, idx) => (
                        <tr
                            key={seat.id}
                            className={cn(
                                "hover:bg-muted/40 transition-colors",
                                pending && loadingId === seat.id && "opacity-60"
                            )}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                {idx + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-foreground">
                                        {seat.member ? seat.member.name : <span className="italic text-muted-foreground">No one assigned</span>}
                                    </span>
                                    {seat.member?.email && (
                                        <span className="text-xs text-muted-foreground mt-0.5 truncate max-w-[220px]">
                                            {seat.member.email}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                                <PhoneCell member={seat.member} poolId={poolId} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => togglePayment(seat)}
                                    disabled={(pending && loadingId === seat.id) || !seat.member}
                                    className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 transition-opacity"
                                    title={seat.member ? "Click to toggle payment status" : "No member assigned"}
                                >
                                    {PAYMENT_BADGE[seat.paymentStatus] ?? (
                                        <Badge variant="outline" className="px-2.5">{seat.paymentStatus}</Badge>
                                    )}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden md:table-cell">
                                {new Date(seat.joinedAt).toLocaleDateString("en-GB")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-9 w-9 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                                    disabled={pending && loadingId === seat.id}
                                    onClick={() => handleRemove(seat.id)}
                                    title="Remove member"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
