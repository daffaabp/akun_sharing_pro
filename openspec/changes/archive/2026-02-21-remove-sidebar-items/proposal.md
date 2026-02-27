## Why

The user requested the removal of specific items from the newly refactored sidebar: the "New Master Account" button, and the "Settings" and "Help Center" navigation links. This streamlines the interface to focus strictly on core functional navigational elements.

## What Changes

- Remove the "New Master Account" button configuration from the Sidebar component.
- Remove the "System" menu group from the Sidebar component, which includes the "Settings" and "Help Center" links.

## Capabilities

### New Capabilities

### Modified Capabilities
- `refactored-layout`: The layout requirements are changing to exclude the primary action button and the system navigation group from the sidebar.

## Impact

- **React Components**: Modifies `src/components/layout/sidebar.tsx` to remove the relevant UI elements.
