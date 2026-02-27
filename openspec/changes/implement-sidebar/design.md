## Context

The application needs a functional sidebar to navigate between core features (Master Accounts, Services, Users, Subscriptions). Currently, `src/components/layout/sidebar.tsx` is an empty placeholder (`return null`). We have a new reference design ("Variant 2") that specifies the layout, categories, and styling required.

## Goals / Non-Goals

**Goals:**
- Implement the "Variant 2" sidebar design exactly as specified in the reference HTML.
- Provide structured, categorized navigation links ("Main Menu" and "System").
- Reflect active navigation states visually.
- Integrate seamlessly within the existing `dashboard-shell.tsx` layout structure.

**Non-Goals:**
- Implementing the actual pages/content that the sidebar links point to (only the navigation component itself is in scope).
- Sophisticated role-based access control for displaying different links (assume the admin view shows all links).
- Mobile responsive off-canvas menu behavior (focusing on the desktop fixed sidebar layout first).

## Decisions

1. **Client Component for Active State**:
   To highlight the active navigation link based on the current URL, the `Sidebar` component (or a child `SidebarNav` component) will use Next.js's `usePathname` hook. This requires it to be a Client Component (`"use client"`).

2. **Icons Library (Lucide React vs Material Symbols)**:
   The reference HTML uses Google Material Symbols via a CDN link. To maintain a modern, bundle-optimized Next.js architecture, we will use `lucide-react` icons (which are likely already available or easily installable in this project) instead of an external font stylesheet, choosing icons that closely match the semantic meaning of the Material ones (e.g., `Mail` instead of `mail`, `Settings` instead of `settings`).

3. **Styling and Color Palette**:
   The reference HTML defines custom colors like `primary` (`#0d7ff2`), `sidebar-bg` (`#f9fafb`), and `sidebar-hover` (`#f3f4f6`). We will map these to standard Tailwind utility classes to avoid modifying the configuration unnecessarily, or if the project uses a standard `primary` CSS variable, we will utilize that.
   - `bg-sidebar-bg` -> `bg-slate-50` or `bg-gray-50`
   - `border-sidebar-border` -> `border-slate-200`
   - `hover:bg-sidebar-hover` -> `hover:bg-slate-100`

## Risks / Trade-offs

- **[Risk] Visual discrepancy with icons**: Swapping Material Symbols for Lucide might cause minor visual differences from the original mockup.
  - **Mitigation**: Carefully select matching Lucide icons. They provide a very similar, clean, modern aesthetic.
- **[Risk] Hardcoded user data**: The profile footer currently shows static data ("Alex Henderson").
  - **Mitigation**: Hardcode for now to match the visual design, but structure the component so it can easily accept a `user` prop later when authentication is integrated.
- **[Risk] Mobile Layout**: The fixed width (`w-[260px]`) is designed for desktop. On mobile, this will break the layout.
  - **Mitigation**: Implement responsive classes (e.g., `hidden md:flex flex-col w-[260px]`) to ensure the dashboard doesn't break on small screens, deferring the mobile hamburger menu to a separate, future change if not already handled by a top navigation shell.
