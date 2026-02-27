## Why
The `/pools` page currently uses an older or different layout compared to the recently updated `/emails` and `/services` pages. To ensure a consistent user experience across the dashboard and to reduce maintenance overhead, the `/pools` page must be refactored to use the same standardized layout and table structure pattern.

## What Changes
- Refactor the `/pools` page to use the unified dashboard layout structure.
- Update the pools data table to visually and functionally match the tables in the emails and services pages.
- Implement standard table action buttons (View, Edit, Delete) following the established pattern.
- Ensure consistent states (loading, empty, error) and pagination structure.

## Capabilities

### New Capabilities
- `pools-layout`: Standardized layout, table structure, and interactions for the pools management page, matching the `/emails` and `/services` pages.

### Modified Capabilities

## Impact
- `src/app/(dashboard)/pools/page.tsx`
- Pool-related table and dialog components.
- Improves overall UI consistency and code maintainability within the dashboard.
