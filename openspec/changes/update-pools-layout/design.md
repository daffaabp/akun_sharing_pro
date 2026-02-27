## Context

The `/pools` page currently uses a custom layout (`<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">`) and does not align with the standard dashboard page structure recently implemented for `/emails` and `/services`.
To ensure UI consistency, reduce cognitive load for users, and simplify future maintenance, the pools page and its associated components need to be refactored to use the standard layout pattern.

## Goals / Non-Goals

**Goals:**
- Update `src/app/(dashboard)/pools/page.tsx` to use the standardized page layout (`<div className="p-8 space-y-4">`).
- Ensure the header section contains the title, description, and an "Add Pool" button (if applicable/exists) aligned correctly.
- Update the `PoolsTable` component to visually match `EmailsTable` and `ServicesTable`, including the "Actions" column with View, Edit, and Delete dropdown items.
- Ensure consistent data fetching and loading states.

**Non-Goals:**
- Adding new features to the pools entity (e.g., new fields in the database).
- Changing the underlying database schema for pools.
- Modifying other pages besides `/pools`.

## Decisions

1.  **Layout Standardization**
    *   **Decision:** Adopt the `<div className="p-8 space-y-4">` wrapper used in `/emails` and `/services` for the main `/pools` page.
    *   **Rationale:** Provides a consistent internal padding and vertical spacing across all main dashboard views.
    *   **Alternatives:** Keep the existing responsive padding (`p-4 md:p-8`), but this deviates from the new standard and creates visual inconsistencies when navigating between sidebar items.

2.  **Header Structure**
    *   **Decision:** Use the two-column flex layout for the page header: title/description on the left, primary action button on the right.
    *   **Rationale:** Standard SaaS pattern already established in the application.

3.  **Table Action Menu**
    *   **Decision:** Integrate the standard Radix UI / shadcn DropdownMenu for row actions in the `PoolsTable` (View, Edit, Delete).
    *   **Rationale:** Matches the interaction design of `EmailsTable` and `ServicesTable`, providing a clean, space-efficient way to manage individual pool entries.

## Risks / Trade-offs

-   [Risk] **Refactoring components might break existing specific pool functionalities** → *Mitigation:* Carefully review the existing `PoolsTable` implementation to ensure no custom logic is lost during the standardization process. Test all standard actions (create, read, update, delete) if they exist.
-   [Risk] **Inconsistent empty states** → *Mitigation:* Ensure the `PoolsTable` implements the same empty state design as the other tables if no pools exist.
