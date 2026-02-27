## Why

The current `/services` page layout does not visually align with the recently updated `/emails` page layout. Syncing the layout ensures a consistent and cohesive user experience across different data management pages in the dashboard.

## What Changes

- Update the wrapper and header structure in `src/app/(dashboard)/services/page.tsx` to closely match the spacing, layout, and typography classes used in `src/app/(dashboard)/emails/page.tsx`.
- Adjust the page header title (`<h2>`) from `text-3xl` to `text-2xl` and description (`<p>`) styling from `mb-6` to `text-sm` for uniform hierarchy mapping.
- Re-position the page description to sit directly under the page title within the same flex container wrapper, just like in the emails page.
- Refactor the table in `src/components/services/services-table.tsx` to use the same custom Tailwind CSS classes and structure as `src/components/emails/emails-table.tsx`, moving away from default `shadcn/ui` table components for this specific view to guarantee visual consistency.
- Apply consistent styling for table headers (`text-[11px] font-bold text-slate-400 uppercase tracking-wider`), rows, and badges.

## Capabilities

### New Capabilities

### Modified Capabilities

## Impact

- **UI Implementation**: `src/app/(dashboard)/services/page.tsx` will have its JSX layout updated to match the existing master pages.
