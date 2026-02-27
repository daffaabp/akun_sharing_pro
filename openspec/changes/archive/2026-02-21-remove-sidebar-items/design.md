## Context

The user requested to remove specific elements from the application's sidebar component: the "New Master Account" button, the "Settings" navigation item, and the "Help Center" navigation item.

## Goals / Non-Goals

**Goals:**
- Remove the `<button>` element that says "New Master Account" and its containing `div`.
- Remove the `systemMenu` data array entirely and the corresponding mapping logic that renders the "System" group (which contains Settings and Help Center).
- Make sure to also remove the "System" group header (`<h3 ...>System</h3>`).

**Non-Goals:**
- Modifying the header layout.
- Changing the overall color scheme or styles of the remaining elements.

## Decisions

1. **Static Data Removal**:
   The `systemMenu` constant array inside `Sidebar` will be deleted, and its associated TSX map loop will be removed. This ensures no stray UI elements are left behind for these routes.

2. **Markup Deletion**:
   The CTA button block (`<div className="px-4 mb-6">...</div>`) will be deleted entirely from the JSX return statement.

## Risks / Trade-offs

- **[Risk] Unhandled side-effects**: Removing these routes might make other parts of the app unreachable if they were the only entry points.
  - **Mitigation**: This is a direct user request to streamline the UI. If the user needs access to settings or help later, they will need to be re-added or accessed via other flows.
