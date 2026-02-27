## Context

The header title should dynamically display the name of the current active page, corresponding to the navigation items defined in the sidebar (e.g. "Services", "Subscriptions"). Currently, the `Header` component has a hardcoded title.

## Goals / Non-Goals

**Goals:**
- Update `Header` component to dynamically render its title based on the current URL path.
- The title should correspond to the active menu item in the Sidebar.

**Non-Goals:**
- Changing global state management just for this feature (avoid Redux/Context if not strictly necessary).

## Decisions

- **Pathname Matching:** Instead of lifting state up or using context, the `Header` component will use the `usePathname` hook from `next/navigation`. It will contain a local mapping function (or share the menu definition) to match the current `pathname` to the expected title string.
- This approach makes `Header` a Client Component (by adding `"use client";`) and keeps it completely decoupled from `Sidebar`.
- If a route isn't recognized (e.g., a detail page), a fallback title like "Account Sharing Pro" or a generic page title will be displayed.

## Risks / Trade-offs

- **[Risk] Code Duplication:** The routing/title map is duplicated between Sidebar and Header.
- **[Mitigation]:** Since the menu is very small and relatively static, slight duplication is acceptable. If it grows, we can extract the navigation map to a shared constant file.
- **[Risk] Client Component Conversion:** `Header` will now need `"use client"`.
- **[Mitigation]:** This is perfectly fine in Next.js App Router for layout components that need access to `usePathname()`.
