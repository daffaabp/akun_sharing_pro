## 1. Preparation

- [x] 1.1 Verify presence of `lucide-react` icons (Share2, Plus, Mail, LayoutGrid, Users, Armchair, RefreshCw, Settings, HelpCircle, ChevronsUpDown, Menu, Hub, Help, Bell) required for replacing the Material layout.

## 2. Header Implementation

- [x] 2.1 Replace `src/components/layout/header.tsx` markup with the new `<header>` structure from `reference/new_layout/code.html`.
- [x] 2.2 Replace all `material-symbols-outlined` icons in the header with their `lucide-react` equivalents (e.g., `<Menu />`, `<HelpCircle />`, `<Bell />`).
- [x] 2.3 Ensure the logo section is structured as "Account Pro" without the previous cube icon (as defined in the reference).
- [x] 2.4 Verify header styling uses the new dark themes classes (e.g., `bg-[#151b23]`).

## 3. Sidebar Implementation

- [x] 3.1 Replace `src/components/layout/sidebar.tsx` markup with the new `<aside>` structure from the reference HTML.
- [x] 3.2 Implement `next/link` and `usePathname()` logic to dynamically apply the active state classes (`bg-white/10 text-white`) versus the default state (`text-slate-400`).
- [x] 3.3 Replace all `material-symbols-outlined` icons in the sidebar with their `lucide-react` counterparts.
- [x] 3.4 Wire in the provided static data for the "Alex Henderson" user profile at the bottom of the sidebar.
- [x] 3.5 Ensure the main sidebar container uses the dark theme (`bg-black` or `bg-[#152330]`).

## 4. Final Review

- [x] 4.1 Verify that `src/components/layout/dashboard-shell.tsx` renders both new components correctly side-by-side without overflow issues.
- [x] 4.2 Test the active state transitions by navigating between routes.
