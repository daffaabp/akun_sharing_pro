## Why

As the number of pools grows, administrators need a faster way to surface pools that require immediate attention. Currently, finding pools that are almost overdue, already expired, or contain admin notes requires manually scanning the list. Adding an opinionated "Quick Filter" dropdown will allow admins to quickly isolate these critical pools (like those ending in <7 days or having special notes) without cluttering the main UI, keeping the pool interface clean, focused, and scalable.

## What Changes

- Add a "Filters" dropdown (popover) to the pools list page.
- Implement an expandable filter menu containing specific, actionable toggles:
  - **Urgency**: "Overdue soon (< 7 days)", "Already Expired"
  - **Content**: "Has Admin Notes"
  - **Sorting**: "Newest First", "Oldest First", "End Date (Closest)"
- Update the pool fetching logic to dynamically apply these filters based on URL search parameters.
- Provide a clear visual indicator on the filter button showing how many filters are currently active (e.g., `Filters (2)`).

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `admin-pool-management`: Updates the pools list view requirement to support advanced filtering (urgency, notes) and sorting via URL search parameters, utilizing a dedicated dropdown UI.

## Impact

- **UI Components**: The pools table view will be updated with a new dropdown component utilizing Radix UI / shadcn popovers.
- **Data Fetching**: The underlying Prisma queries fetching the pools list will be updated to accept and interpret the new URL filter parameter conditions.
- **Routing**: URL search parameters will manage the filter state, allowing server-side rendering to instantly apply filters and keeping URLs shareable.
