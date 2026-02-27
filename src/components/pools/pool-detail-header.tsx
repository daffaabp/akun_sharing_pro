import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, UserCircle, ChevronLeft, StickyNote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Service = { name: string; category: string };

const STATUS_BADGE: Record<string, React.ReactNode> = {
    OPEN: <Badge className="bg-blue-500 hover:bg-blue-600 border-none text-white px-2.5 shadow-sm">Open</Badge>,
    READY: <Badge className="bg-yellow-500 hover:bg-yellow-600 border-none text-white px-2.5 shadow-sm">Ready</Badge>,
    ACTIVE: <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 shadow-sm font-medium">Active</Badge>,
};

interface PoolDetailSidebarProps {
    name: string;
    status: string;
    service: Service;
    filledSeats: number;
    targetSeats: number;
    masterEmail?: string | null;
    endDate?: Date | string | null;
    planType?: string | null;
    notes?: string | null;
}

export function PoolDetailSidebar({
    name, status, service, filledSeats, targetSeats, masterEmail, endDate, planType, notes,
}: PoolDetailSidebarProps) {
    const parsedEndDate = endDate ? new Date(endDate) : null;
    const isExpired = parsedEndDate ? parsedEndDate < new Date() : false;
    const progressPercent = Math.round((filledSeats / targetSeats) * 100);

    return (
        <aside className="lg:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border overflow-y-auto bg-card">
            <div className="p-6 lg:p-8 space-y-8">
                <div>
                    <Button variant="ghost" size="sm" className="gap-1 -ml-3 mb-6 text-muted-foreground hover:text-primary transition-colors" asChild>
                        <Link href="/pools">
                            <ChevronLeft className="h-4 w-4" />
                            Back to Pools
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{name}</h1>
                        {STATUS_BADGE[status] ?? <Badge variant="outline" className="px-2.5">{status}</Badge>}
                        {planType && <Badge variant="secondary" className="px-2.5">{planType}</Badge>}
                    </div>
                    <h2 className="text-lg text-muted-foreground font-medium">{service.name} · {service.category}</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-0.5">Seats</p>
                            <p className="font-semibold text-foreground text-base">{filledSeats}/{targetSeats} seats</p>
                        </div>
                    </div>

                    {parsedEndDate && (
                        <div className="flex items-center gap-3 text-sm">
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-0.5">Expires</p>
                                <p className={`font-semibold text-base flex items-center gap-1.5 ${isExpired ? "text-destructive" : "text-foreground"}`}>
                                    {parsedEndDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                    {isExpired && <span className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">Expired</span>}
                                </p>
                            </div>
                        </div>
                    )}

                    {masterEmail && (
                        <div className="flex items-center gap-3 text-sm">
                            <UserCircle className="h-5 w-5 text-muted-foreground" />
                            <div className="min-w-0">
                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-0.5">Account</p>
                                <p className="font-mono text-foreground truncate text-sm">{masterEmail}</p>
                            </div>
                        </div>
                    )}

                    {notes && (
                        <div className="flex items-start gap-3 text-sm">
                            <StickyNote className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-0.5">Notes</p>
                                <p className="text-foreground text-sm whitespace-pre-wrap break-words">{notes}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
                        <span>Seat Occupancy</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-foreground dark:bg-foreground h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{filledSeats} of {targetSeats} seats filled</p>
                </div>
            </div>
        </aside>
    );
}
