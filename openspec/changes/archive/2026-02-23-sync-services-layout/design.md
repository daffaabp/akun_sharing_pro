## Context

The application has multiple "management" pages in the dashboard (`/emails`, `/services`, `/pools`, etc.). Recently, the `/emails` page had its layout and table component (`emails-table.tsx`) significantly updated to feature a custom, refined UI utilizing specific Tailwind CSS utility classes, rather than relying strictly on the default `shadcn/ui` components. The current `/services` page and `services-table.tsx` still use an older layout and the default `shadcn/ui` table components, resulting in visual inconsistency across the dashboard.

## Goals / Non-Goals

**Goals:**
- Unify the visual presentation of the `/services` page with the `/emails` page.
- Rewrite `ServicesTable` to use raw HTML table elements with custom Tailwind CSS classes identical to those in `EmailsTable`.
- Update the page header structure, typography, and spacing on `/services` to match `/emails`.

**Non-Goals:**
- Adding new features or functionality to the Services page.
- Changing the underlying data structure or data fetching mechanisms for services.
- Refactoring other pages (like `/pools` or `/users`) in this specific change (though they may be updated in separate changes).

## Decisions

- **Drop shadcn/ui Table components for ServicesTable:** To achieve the exact visual match, we will replace the `Table`, `TableHeader`, `TableBody`, etc., components from `shadcn/ui` with standard `<table>`, `<thead>`, `<tbody>` elements styled with Tailwind, matching the implementation in `EmailsTable`.
  - *Rationale:* While `shadcn/ui` provides a good baseline, customizing it to match the highly specific styling of `EmailsTable` (like `text-[11px] font-bold text-slate-400 uppercase tracking-wider` for headers) is more complex than just using the raw utility classes directly.
- **Adopt Status Badge Styling:** We will update the status rendering in `ServicesTable` to use inline elements matching the `STATUS_STYLE` pattern from `EmailsTable` (e.g., `bg-green-50 text-green-600` for active), rather than the `shadcn/ui` `Badge` component with default variants.

## Risks / Trade-offs

- **Risk:** Duplication of table structural CSS classes across multiple components.
  - *Mitigation:* In the future, if this layout pattern is adopted globally, we should extract the table structure into a new, fully shared generic component. For now, duplication is acceptable to achieve immediate visual parity.
- **Risk:** Breaking responsiveness.
  - *Mitigation:* We will ensure the wrapping `div` uses `overflow-x-auto` just like in `EmailsTable` to handle horizontal scrolling on smaller screens.
