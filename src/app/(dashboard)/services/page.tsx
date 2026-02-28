import { getAllServices } from "@/app/actions/services";
import { AddServiceButton } from "@/components/services/add-service-button";
import { ServicesTable } from "@/components/services/services-table";

// Prevent static pre-rendering at build time (requires DB access)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicesPage() {
    let services: Awaited<ReturnType<typeof getAllServices>> = [];
    try {
        services = await getAllServices();
    } catch {
        // DB not yet connected
    }

    return (
        <div className="p-8 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Services</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage and monitor external AI services and tools available in the application.
                    </p>
                </div>
                <AddServiceButton />
            </div>
            <ServicesTable services={services} />
        </div>
    );
}
