## 1. Database

- [x] 1.1 Add `notes String?` to `Pool` model in `prisma/schema.prisma`.
- [x] 1.2 Generate and apply database migration using `bunx prisma migrate dev --name add_pool_notes`.

## 2. Backend / Server Actions

- [x] 2.1 Update `editPool` action in `src/app/actions/pools.ts` to accept `notes?: string | null` and include it in the `db.pool.update` call.

## 3. Frontend / UI Components

- [x] 3.1 Update `PoolDetailSidebarProps` in `src/components/pools/pool-detail-header.tsx` to include `notes?: string | null`.
- [x] 3.2 Modify `PoolDetailSidebar` to render the `notes` below the existing metadata when `notes` is present (using `StickyNote` or `FileText` icon).
- [x] 3.3 Update the `Pool` type definition in `src/components/pools/edit-pool-dialog.tsx` to include `notes?: string | null`.
- [x] 3.4 Add `notes` state to `EditPoolDialog` component.
- [x] 3.5 Add a `Textarea` input for `notes` inside the `EditPoolDialog` form.
- [x] 3.6 Update the `handleSubmit` function in `EditPoolDialog` to pass the `notes` state (or `null` if empty) to the `editPool` action.

## 4. Page Updates

- [x] 4.1 Update `PoolDetailsPage` (`src/app/(dashboard)/pools/[id]/page.tsx`) to pass the fetched `pool.notes` to the `PoolDetailSidebar` component.
- [x] 4.2 Update any call sites rendering `EditPoolDialog` to ensure the `pool` object includes `notes` (e.g. inside `pools-table.tsx` or `pool-actions.tsx` if necessary).
