## Why

We need to implement the application header based on the provided HTML design ("Header Variant 2"). This will give the dashboard a polished, responsive top navigation bar containing breadcrumbs, action icons (help, notifications), and a user profile dropdown trigger, replacing our current empty stub.

## What Changes

- Extract the `<header>` element from `reference/sidebar/code.html`.
- Convert the HTML markup into a React functional component (`header.tsx`) using Tailwind CSS.
- Ensure dark mode classes and responsive behaviors (e.g., mobile menu button) are properly preserved.
- Keep the component as static UI for now (no actual interactive state/dropdowns yet, just matching the visual design).

## Capabilities

### New Capabilities
- `dashboard-header`: The top navigation bar component for the dashboard layout, including breadcrumbs and user actions.

### Modified Capabilities
- (None)

## Impact

- `src/components/layout/header.tsx` will be fully implemented.
- `src/components/layout/dashboard-shell.tsx` (or `(dashboard)/layout.tsx`) may be slightly adjusted to ensure the header spans the correct width and remains sticky at the top, though the HTML suggests it's placed inside a flex column adjacent to the sidebar.
