import { notFound } from "next/navigation";
import { getPoolById } from "@/app/actions/pools";
import { getEmails } from "@/app/actions/emails";
import { PoolDetailSidebar } from "@/components/pools/pool-detail-header";
import { SeatsTable } from "@/components/pools/seats-table";
import { AddMemberDialog } from "@/components/pools/add-member-dialog";
import { ActivateButton } from "@/components/pools/activate-button";

// Prevent static pre-rendering at build time (requires DB access)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Return empty array so Next.js skips pre-rendering during build (avoids DB access at build time)
export async function generateStaticParams() {
    return [];
}

interface Props {
    params: Promise<{ id: string }>;
}

export default async function PoolDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const [pool, emails] = await Promise.all([
        getPoolById(resolvedParams.id),
        getEmails(),
    ]);
    if (!pool) notFound();

    const filledSeats = pool.seats.length;
    const isFull = filledSeats >= pool.targetSeats;

    return (
        <div className="-mx-6 -my-8 lg:-mx-8 flex flex-col lg:flex-row flex-1 min-h-[calc(100vh-4rem)]">
            <PoolDetailSidebar
                name={pool.name}
                status={pool.status}
                service={pool.service}
                filledSeats={filledSeats}
                targetSeats={pool.targetSeats}
                masterEmail={pool.masterEmail}
                endDate={pool.endDate}
                planType={pool.planType}
                notes={pool.notes}
            />

            <main className="flex-1 overflow-y-auto">
                <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">Member List</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                            <AddMemberDialog
                                poolId={pool.id}
                                disabled={isFull}
                                triggerClassName="inline-flex items-center px-5 py-2.5 shadow-sm text-sm font-semibold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-all transform active:scale-95 border-none"
                            />
                            {pool.status === "READY" && (
                                <ActivateButton pool={{ id: pool.id, name: pool.name }} emails={emails} />
                            )}
                        </div>
                    </div>

                    <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden">
                        <SeatsTable seats={pool.seats} poolId={pool.id} />
                    </div>
                </div>
            </main>
        </div>
    );
}
