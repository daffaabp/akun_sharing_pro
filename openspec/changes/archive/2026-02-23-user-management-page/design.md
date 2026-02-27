## Design: `/users` (Member Management Page)

### Architecture
- **Page**: `src/app/(dashboard)/users/page.tsx` — server component, fetches members + open pools
- **Table**: `src/components/users/members-table.tsx` — client component
- **Dialogs**: `add-member-button.tsx`, `edit-member-dialog.tsx`, `assign-pool-dialog.tsx`
- **Actions**: `src/app/actions/members.ts`

### Data Flow
- Page server-fetches `getAllMembers()` (includes `_count.seats` and full `seats[]`) and `getOpenPools()`
- Both passed as props to `MembersTable`
- All mutations use server actions + `revalidatePath`

### UI Patterns
- Matches `/emails` table style: white rounded card, slate header, hover rows
- Row actions: `PlusCircle` (assign pool), `Pencil` (edit), `Trash2` (delete)
- Pool badges shown inline in the Pools column — color coded by status (OPEN=blue, READY=amber, ACTIVE=green)
- Assign dialog filters out pools the member already belongs to

### Constraints
- Phone is the unique identifier (mirrors Email's uniqueness)
- Member must exist before pool assignment (enforced by dialog only showing existing members)
- `PoolSeat` has `@@unique([poolId, memberId])` — double-assignment is rejected at DB level with friendly error
