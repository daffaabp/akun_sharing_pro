## 1. Backend Data Fetching

- [x] 1.1 Update `getPools` action in `actions/pools.ts` to accept `searchParams` filter arguments (e.g. `overdue: string`, `notes: string`, `sort: string`)
- [x] 1.2 Implement Prisma `where` clause logic for "Overdue soon (< 7 days)" (`endDate` lte 7 days, gte today) and "Expired" (`endDate` lt today) based on the `overdue` parameter
- [x] 1.3 Implement Prisma `where` clause logic for "Has Admin Notes" (`notes` not null) based on the `notes` parameter
- [x] 1.4 Implement Prisma `orderBy` logic based on the `sort` parameter (e.g., 'closest' maps to `endDate: asc`, 'newest' maps to `createdAt: desc`, 'oldest' maps to `createdAt: asc`)

## 2. UI Component: Pool Filters Dropdown

- [x] 2.1 Create a new client component `components/pools/pool-filters.tsx` utilizing Radix UI / shadcn `Popover` and `Button`
- [x] 2.2 Implement UI toggles/checkboxes for Urgency (Overdue soon, Already Expired) and Content (Has Admin Notes)
- [x] 2.3 Implement UI radio buttons or a select for Sorting (Newest First, Oldest First, End Date (Closest))
- [x] 2.4 Add dynamic active filter count to the trigger button (e.g., "Filters (2)")
- [x] 2.5 Implement URL updating logic: When a filter is toggled, update the browser URL `searchParams` (using `useRouter` and `usePathname` from `next/navigation`)
- [x] 2.6 Implement a "Clear" button that removes all filter parameters from the URL

## 3. Integrating the UI and Server component

- [x] 3.1 Update `app/pools/page.tsx` to explicitly consume `searchParams` from page props
- [x] 3.2 Pass the parsed `searchParams` to the updated `getPools` action when fetching data on the server
- [x] 3.3 Add the `PoolFilters` component to the top header area of the pools list (`app/pools/page.tsx` or its wrapper), above the main table Layout
- [x] 3.4 Verify that changing a filter updates the URL, causes a server re-render, and updates the table natively without a full page hard reload
