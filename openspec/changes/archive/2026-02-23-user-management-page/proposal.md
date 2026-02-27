## Why

The `/users` page is currently blank. Users (Members) need to be managed through a dedicated admin interface — they represent real people who subscribe to shared services via Pools. Since members must exist in the database before being added to a pool, a proper user management page is essential.

## What Changes

- Implement the `/users` page with a Members table (similar UI to `/emails`, `/services`, `/pools`)
- Add server actions for Member CRUD operations
- Add ability to assign an existing member to a pool (from the Users page)
- Add Add/Edit/Delete member dialogs
- Members can belong to multiple pools via PoolSeat records

## Capabilities

### New Capabilities
- `user-management`: View, create, edit, and delete Members. Table with columns: Name, Phone, Email (optional), # of Pools, Created At, Actions.
- `user-pool-assignment`: Assign an existing member to a pool from the Users page. A member must already exist before being added to a pool.

### Modified Capabilities
- *(none — new capabilities only)*

## Impact

- New file: `src/app/actions/members.ts` (CRUD + pool assignment server actions)
- New directory: `src/components/users/` with `members-table.tsx`, `add-member-dialog.tsx`, `edit-member-dialog.tsx`, `assign-pool-dialog.tsx`
- Modified: `src/app/(dashboard)/users/page.tsx`
- Prisma models used: `Member`, `PoolSeat`, `Pool`
