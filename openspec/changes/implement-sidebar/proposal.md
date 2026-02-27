## Why
The application requires an updated sidebar navigation to improve user experience and align with the new design mockup (Variant 2). This change implements the provided reference design, offering clear categorized access to core features (Emails, Services, Users, Subscriptions) and integrating a user profile widget.

## What Changes
- Update the existing sidebar component (`src/components/layout/sidebar.tsx`) to match the styling and layout from `reference/sidebar/code.html`.
- Add a primary "New Master Account" button to the sidebar.
- Implement categorized navigation sections: "Main Menu" and "System".
- Add a collapsible or fixed user profile summary footer in the sidebar showing the current admin account.
- Ensure the new sidebar integrates seamlessly within the existing `dashboard-shell.tsx` layout and maintains responsiveness.

## Capabilities

### New Capabilities
- `sidebar-navigation`: The new sidebar navigation component, its active state management, and routing structure.

### Modified Capabilities

## Impact
- **React Components**: Modifies `src/components/layout/sidebar.tsx` and potentially `src/components/layout/dashboard-shell.tsx` to handle the absolute/sticky positioning and width (`w-[260px]`).
- **Styling**: Addition of custom Tailwind CSS classes configured for the sidebar (e.g., `sidebar-bg`, `sidebar-border`, `sidebar-hover`) in `tailwind.config.ts` or `globals.css` if not already present.
