import { notFound } from "next/navigation";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { getEmailById } from "@/app/actions/emails";
import { ChevronLeft, Mail, Lock, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

// Prevent static pre-rendering at build time (requires DB access)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Return empty array so Next.js skips pre-rendering during build (avoids DB access at build time)
export async function generateStaticParams() {
    return [];
}

// Infer the return type of the getEmailById function's pool include
type EmailPool = Prisma.PoolGetPayload<{
    include: {
        service: { select: { name: true } };
        seats: { select: { id: true; paymentStatus: true; status: true } };
    };
}>;

const STATUS_STYLE: Record<string, { cls: string; icon: React.ReactNode }> = {
    active: { cls: "bg-green-50 text-green-700 border-green-200", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    paused: { cls: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock className="h-3.5 w-3.5" /> },
    disabled: { cls: "bg-rose-50 text-rose-700 border-rose-200", icon: <XCircle className="h-3.5 w-3.5" /> },
};

const POOL_STATUS_STYLE: Record<string, string> = {
    OPEN: "bg-sky-50 text-sky-700",
    READY: "bg-violet-50 text-violet-700",
    ACTIVE: "bg-green-50 text-green-700",
};

function fmt(date: Date | string) {
    return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default async function EmailDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const result = await getEmailById(resolvedParams.id);
    if (!result) notFound();

    const { email, pools } = result;
    const statusMeta = STATUS_STYLE[email.status] ?? STATUS_STYLE.disabled;

    return (
        <div className="p-8 space-y-6 max-w-4xl">
            {/* Back nav */}
            <Link href="/emails" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Back to Emails
            </Link>

            {/* Header card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Mail className="h-4 w-4" />
                            <span>Master Account</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight font-mono">{email.email}</h1>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusMeta.cls}`}>
                        {statusMeta.icon}
                        {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                    {/* Password */}
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Lock className="h-3.5 w-3.5" /> Password
                        </p>
                        <p className="text-sm font-mono">
                            {email.password
                                ? <span className="tracking-widest text-slate-600">••••••••</span>
                                : <span className="text-slate-300 italic">not set</span>
                            }
                        </p>
                    </div>

                    {/* Added */}
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> Added
                        </p>
                        <p className="text-sm text-slate-700">{fmt(email.createdAt)}</p>
                    </div>

                    {/* Last updated */}
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> Last Updated
                        </p>
                        <p className="text-sm text-slate-700">{fmt(email.updatedAt)}</p>
                    </div>
                </div>
            </div>

            {/* Linked pools */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Linked Pools
                        <span className="ml-2 text-sm font-normal text-muted-foreground">({pools.length})</span>
                    </h2>
                </div>

                {pools.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-1">
                        <p className="text-sm font-medium text-slate-500">No active subscriptions</p>
                        <p className="text-xs text-slate-400">This email has not been used to activate a pool yet.</p>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service</th>
                                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Period</th>
                                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Seats</th>
                                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pool Status</th>
                                    <th className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pools.map((poolItem) => {
                                    const pool = poolItem as EmailPool;
                                    const paid = pool.seats.filter(s => s.paymentStatus === "PAID").length;
                                    return (
                                        <tr key={pool.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-5 py-3 text-sm font-semibold text-slate-900">{pool.service.name}</td>
                                            <td className="px-5 py-3 text-sm text-slate-500">{pool.planType ?? "—"}</td>
                                            <td className="px-5 py-3 text-sm text-slate-500">
                                                {pool.startDate && pool.endDate
                                                    ? `${fmt(pool.startDate)} → ${fmt(pool.endDate)}`
                                                    : "—"
                                                }
                                            </td>
                                            <td className="px-5 py-3 text-sm text-slate-700">
                                                {pool.seats.length} seat{pool.seats.length !== 1 ? "s" : ""}
                                                {paid > 0 && (
                                                    <span className="ml-1.5 text-xs text-green-600 font-medium">({paid} paid)</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${POOL_STATUS_STYLE[pool.status] ?? "bg-slate-100 text-slate-500"}`}>
                                                    {pool.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <Link
                                                    href={`/pools/${pool.id}`}
                                                    className="text-xs font-medium text-primary hover:underline"
                                                >
                                                    View Pool →
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
