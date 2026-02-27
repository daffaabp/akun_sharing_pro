import { getAllMembers, getOpenPools } from "@/app/actions/members";
import { MembersTable } from "@/components/users/members-table";
import { AddMemberButton } from "@/components/users/add-member-button";

export default async function UsersPage() {
    let members = [] as Awaited<ReturnType<typeof getAllMembers>>;
    let pools = [] as Awaited<ReturnType<typeof getOpenPools>>;

    try {
        [members, pools] = await Promise.all([
            getAllMembers(),
            getOpenPools(),
        ]);
    } catch {
        // DB not yet connected
    }


    return (
        <div className="p-8 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage members who subscribe to shared services through pools.
                    </p>
                </div>
                <AddMemberButton />
            </div>
            <MembersTable members={members} pools={pools} />
        </div>
    );
}
