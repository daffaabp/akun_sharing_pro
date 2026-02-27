## 1. Setup

- [x] 1.1 Extract styles and classes from `reference/sidebar/code.html` to map them to the project's Tailwind config or existing globals, if needed.
- [x] 1.2 Verify `lucide-react` is installed or identify a substitute for required icons (Mail, Categorize, Users, Settings, HelpCenter, etc.).

## 2. Core Implementation

- [x] 2.1 Update `src/components/layout/sidebar.tsx` to return the sidebar outer layout structure (`<aside>` tag) matching the fixed width and sticky styles.
- [x] 2.2 Implement the Sidebar Header section with logo and title.
- [x] 2.3 Add the "New Master Account" primary button section.
- [x] 2.4 Implement the "Main Menu" navigation block (Emails, Services, Users, Subscriptions, Rotation Logic) using `next/link` and identifying active states.
- [x] 2.5 Implement the "System" navigation block (Settings, Help Center).
- [x] 2.6 Implement the User Profile footer section with a hardcoded avatar, name, and role.

## 3. Integration & Polish

- [x] 3.1 Verify and adjust `src/components/layout/dashboard-shell.tsx` layout to ensure the newly styled sidebar and main content area display correctly side-by-side.
- [x] 3.2 Add conditional CSS class logic in navigation items to dynamically apply the active state styling based on current route.
- [x] 3.3 Test responsiveness (ensure desktop layout holds, and standard overflow behavior works).
