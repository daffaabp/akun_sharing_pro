import { getAllPools } from "@/app/actions/pools";
import { getEmails } from "@/app/actions/emails";
import { db } from "@/lib/db";
import { PoolsTable } from "@/components/pools/pools-table";
import { CreatePoolDialog } from "@/components/pools/create-pool-dialog";
import { PoolFilters } from "@/components/pools/pool-filters";
import { Suspense } from "react";

export default async function PoolsPage({
    searchParams,
}: {
    searchParams: { overdue?: string; notes?: string; sort?: string };
}) {
    let pools: Awaited<ReturnType<typeof getAllPools>> = [];
    let services: { id: string; name: string }[] = [];
    let emails: Awaited<ReturnType<typeof getEmails>> = [];

    try {
        [pools, services, emails] = await Promise.all([
            getAllPools(searchParams),
            db.service.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
            getEmails(),
        ]);
    } catch {
        // DB not yet connected
    }

    return (
        <div className="p-8 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Pools</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage subscription pools. Gather members before purchasing a shared account.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-md" />}>
                        <PoolFilters />
                    </Suspense>
                    <CreatePoolDialog services={services} />
                </div>
            </div>
            <PoolsTable pools={pools} emails={emails} />
        </div>
    );
}
