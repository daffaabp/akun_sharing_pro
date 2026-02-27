## 1. Page Layout Standardization

- [x] 1.1 Update `src/app/(dashboard)/pools/page.tsx` wrapper div to use `className="p-8 space-y-4"` and remove `$flex-1`, `$p-4`, `$pt-6`, `$md:p-8` classes.
- [x] 1.2 Refactor the header section in `/pools/page.tsx` to match the two-column flex layout (title/description on the left) seen in `/emails` and `/services`.
- [x] 1.3 Ensure the "Pools" title uses standard typography classes (`text-2xl font-bold tracking-tight`).
- [x] 1.4 Ensure the description paragraph uses standard typography classes (`text-muted-foreground text-sm`).

## 2. Table Action Menu Implementation

- [x] 2.1 Refactor the `PoolsTable` component (or add if missing) to include an "Actions" column.
- [x] 2.2 Replicate the Radix UI / shadcn `DropdownMenu` implementation for the row actions from `EmailsTable` or `ServicesTable` into `PoolsTable`.
- [x] 2.3 Add "View" action to the dropdown (can just be a placeholder or simple alert/logging if no dedicated view page exists, or link to a standard route).
- [x] 2.4 Add "Edit" action to the dropdown.
- [x] 2.5 Add "Delete" action to the dropdown.

## 3. Review and Cleanup

- [x] 3.1 Verify consistent loading, error, and empty states for the pools table.
- [x] 3.2 Ensure any existing Add/Create or other action buttons on the pools page are placed correctly in the new header layout.
