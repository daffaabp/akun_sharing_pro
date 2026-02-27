## Why

The application header currently shows a static title ("Account Sharing Pro"), which does not reflect the user's current context within the application. Changing the header title dynamically to match the active sidebar menu (e.g., "Subscriptions" when viewing the subscriptions page) will improve user navigation and context awareness.

## What Changes

- Modify `src/components/layout/header.tsx` to display a dynamic title based on the current route.
- The title in the header will correspond to the active item in the sidebar's "Main Menu" or "System" sections, or default to a generic title if the route is unknown.

## Capabilities

### New Capabilities

### Modified Capabilities
- `refactored-layout`: Update the header structure requirement to specify that the title text should be dynamic based on the active route.

## Impact

- `src/components/layout/header.tsx`
- We will likely need to use `usePathname()` from `next/navigation` in the header or share state between the layout components.
