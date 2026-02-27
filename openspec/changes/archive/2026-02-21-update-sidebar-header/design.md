## Context

The application needs to adapt to a new design iteration ("Variant 2") provided in a new standalone HTML file (`reference/new_layout/code.html`). The current implementation of `Sidebar` and `Header` components in the `src/components/layout/` directory must be replaced/updated to align visually and structurally with this reference.

## Goals / Non-Goals

**Goals:**
- Replace the existing `sidebar.tsx` and `header.tsx` structures with the updated markup and Tailwind classes found in `reference/new_layout/code.html`.
- Integrate the interactive features: `Next/Link` active routing logic inside the sidebar.
- Maintain existing dynamic data flow (if any) or prepare static content gracefully (e.g., hardcoded profile details).
- Ensure global layout compatibility (`dashboard-shell.tsx`).

**Non-Goals:**
- Implementing the inner page content of the routes (focusing solely on the surrounding application shell).
- Mobile responsive off-canvas interactions beyond standard desktop-first hiding (`hidden lg:flex` or similar).

## Decisions

1. **Markup Replacement Strategy**:
   Instead of modifying existing components piece-by-piece, the most efficient and robust strategy is to perform a direct markup swap using the provided reference HTML. We will extract the `<aside>` markup for `Sidebar` and the `<header>` markup for `Header`.

2. **Icons Translation**:
   The reference HTML uses Material Symbols (`span` elements with class `material-symbols-outlined`). To align with the existing project ecosystem (which just installed `lucide-react`), we will replace all `material-symbols-outlined` text nodes with equivalent `lucide-react` components. This keeps bundle sizes small and uses a modern, standardized icon set compatible with standard React patterns.

3. **Styling Variables**:
   By using the exact Tailwind classes from the reference HTML (`bg-sidebar-bg`, `text-primary`, `hover:bg-sidebar-hover`), the components will automatically adopt the theme variables we set up earlier in `src/app/globals.css`. 

## Risks / Trade-offs

- **[Risk] Broken responsiveness**: Wholesale replacement of layout components might break the previously established responsiveness in `dashboard-shell.tsx`.
  - **Mitigation**: Verify the resulting layout carefully in the browser dev environment. The classes `flex-1`, `w-[260px]`, `sticky`, and `h-screen` must work correctly together within the parent flex container.
- **[Risk] Re-implementing active states**: The reference HTML uses static `.active` classes.
  - **Mitigation**: We must re-wire the `pathname === item.href` logic currently present in React to dynamically apply the active styles.
