import { getAllMembers, getOpenPools, getFollowUpSeats } from "@/app/actions/members";
import { AddMemberButton } from "@/components/users/add-member-button";
import { UsersClientView } from "@/components/users/users-client-view";

// Prevent static pre-rendering at build time (requires DB access)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function UsersPage() {
    let members = [] as Awaited<ReturnType<typeof getAllMembers>>;
    let pools = [] as Awaited<ReturnType<typeof getOpenPools>>;
    let followUps = [] as Awaited<ReturnType<typeof getFollowUpSeats>>;

    try {
        [members, pools, followUps] = await Promise.all([
            getAllMembers(),
            getOpenPools(),
            getFollowUpSeats(),
        ]);
    } catch {
        // DB not yet connected
    }


    return (
        <div className="p-8 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users & Follow-Up</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Pantau anggota patungan dan sisa hari masa aktif akun.
                    </p>
                </div>
                <AddMemberButton />
            </div>
            <UsersClientView members={members} pools={pools} followUps={followUps} />
        </div>
    );
}
