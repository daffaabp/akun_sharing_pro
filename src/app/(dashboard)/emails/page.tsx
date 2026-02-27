import { getAllEmails } from "@/app/actions/emails";
import { AddEmailButton } from "@/components/emails/add-email-button";
import { EmailsTable } from "@/components/emails/emails-table";

// Prevent static pre-rendering at build time (requires DB access)
export const dynamic = "force-dynamic";

export default async function EmailsPage() {
    let emails: Awaited<ReturnType<typeof getAllEmails>> = [];
    try {
        emails = await getAllEmails();
    } catch {
        // DB not yet connected
    }

    return (
        <div className="p-8 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Emails</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage your master email accounts used for shared subscriptions.
                    </p>
                </div>
                <AddEmailButton />
            </div>
            <EmailsTable emails={emails} />
        </div>
    );
}
