## Context

The pool management page currently presents all pools in a single view with basic text search. As the number of active pools has grown, admins need to quickly identify specific subsets of pools that require attention—such as pools about to expire or those containing specific notes. 
Instead of adding many disparate filters to the header, this change introduces a unified "Quick Filter" dropdown built with a popover pattern to keep the UI clean while offering robust filtering capabilities.

## Goals / Non-Goals

**Goals:**
- Provide a responsive, multi-select filter dropdown for urgency (overdue, expired) and content (has notes).
- Allow sorting of pools by newest, oldest, or closest end date.
- Sync filter states to URL search parameters for persistence across refreshes and easy link sharing.
- Push filtering down to the database layer via Prisma to avoid client-side performance issues as pool counts grow.

**Non-Goals:**
- Client-side-only filtering. All filters must act as server-side queries.
- Designing a complex visual query builder.
- Filtering by highly specific metadata (e.g. member payment statuses) inside this *specific* UI update—though the pattern should be scalable for future additions.

## Decisions

1. **State Management via URL Parameters:** 
   *Rationale:* Storing filter state in the URL search parameters (e.g., `?overdue=true&notes=true&sort=closest`) allows the user state to naturally persist across navigations and page reloads. It is considered a best practice in modern Next.js server component architectures.
   *Alternative:* React Context / useState. This was rejected because it breaks browser navigation (refreshing loses state) and prevents sharing deep links.

2. **Fetching Strategy (Server Actions / Server Components):** 
   *Rationale:* The page `page.tsx` will read `searchParams` on the server and pass these parameters down to `actions/pools.ts`. Prisma will natively build the query dynamically.
   *Alternative:* Client-side `fetch`. Rejected to keep hydration simple and leverage Next.js’s latest React Server Components.

3. **UI Implementation Strategy:** 
   *Rationale:* We will utilize Radix UI/shadcn's existing `Popover` component to build the dropdown. It provides accessible, unstyled primitives for focus management and clicking outside to dismiss.

4. **Filter Logic in Prisma:**
   * **Overdue soon (<7 days)**: `endDate: { lte: Date(now + 7 days), gte: Date(now) }`
   * **Expired**: `endDate: { lt: Date(now) }`
   * **Has admin notes**: `notes: { not: null }` (or empty string check depending on base schema constraints)
   * **Sorting**: mapping parameter (e.g. 'closest') to `{ orderBy: { endDate: 'asc' } }`

## Risks / Trade-offs

- **Risk: Component Re-rendering on Input Changes.** 
  *Mitigation:* Use `useTransition` or specific debounce mechanisms if updating URL params gets too noisy, or simply execute the URL update on checkbox selection as it's typically lightweight.
- **Risk: Prisma Query Complexity.** 
  *Mitigation:* Keep the URL map simple. A unified `where` and `orderBy` clause builder inside `actions/pools.ts` should safely merge incoming parameters without creating exponential query variations.
