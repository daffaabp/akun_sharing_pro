## Context

The system currently has a `/subscriptions` page that displays a list of active subscriptions. This information is mostly redundant since the same data (including expiry dates, status, and related services) is available and better managed within the `/pools` page and the individual pool details view. Having two separate views for essentially the same core entities introduces user confusion and adds maintenance overhead (e.g., keeping caches synchronized across both routes).

In addition, the database currently stores `Subscription` data (master email, start/end dates, passwords) in a separate table that has a strict 1:1 relation with `Pool`. This unnecessary indirection makes querying pools more complex and adds unnecessary complexity to entity creation and deletion.

## Goals / Non-Goals

**Goals:**
- Completely remove the `/subscriptions` page and its associated route from the application.
- Remove the "Subscriptions" navigation link from the global sidebar.
- Remove backend cache invalidation logic related to the `/subscriptions` route (e.g., `revalidatePath('/subscriptions')` calls).
- Refactor the Database: Delete the `Subscription` model completely and move its fields directly to the `Pool` model as optional fields.
- Update all UI components and server actions to point directly to `pool.endDate`, `pool.masterEmail`, etc. instead of `pool.subscription.endDate`.

**Non-Goals:**
- We are NOT removing the core subscription data completely (e.g., we still need `masterEmail`, `startDate`, `endDate`). We are just migrating them to a different table.
- We are NOT creating complex redirection for the `/subscriptions` route. 

## Decisions

1.  **Deletion instead of Redirection:** We will remove the `/subscriptions` page entirely rather than setting up a systemic redirect. If users bookmark it, they will see a 404 page, which is acceptable since the application provides clear navigation to the "Pools" page where they can find their information.

2.  **Merging Database Tables:** A separate `Subscription` table for a strict 1:1 relationship with `Pool` adds overhead without structural value for our current workflow. The subscription details only populate when a `Pool` transitions to `ACTIVE`. Moving `masterEmail`, `password`, `startDate`, `endDate`, and `planType` as optional fields under the `Pool` table simplifies prisma selections, record creation, and deletions (e.g., no cascading needed for 1:1 relation). 

3.  **Updating Server Actions:** Server actions that previously revalidated both `/pools` and `/subscriptions` caches when mutating pool/subscription states will be updated to only revalidate `/pools` (and potentially `/users`).

## Risks / Trade-offs

- **[Risk] User Confusion:** Users who frequently used the `/subscriptions` page might initially be confused by its absence.
  - **Mitigation:** The active "Pools" page provides all the necessary information, and the navigation is straightforward. The impact is low.

- **[Risk] Broken Bookmarks:** Users with bookmarks to `/subscriptions` will hit a 404.
  - **Mitigation:** We can rely on the standard Next.js 404 page, which includes layout navigation, allowing users to easily navigate back to the supported sections (like `/pools`).

- **[Risk] Complex Client/Server Refactoring:** Moving fields out of relations means finding and updating every file that previously assumed the existence of a nested `subscription` object under 'pool' (`pool.subscription.endDate`).
  - **Mitigation:** We will lean heavily on TypeScript errors and a rigorous search of the codebase for `.subscription` or `include: { subscription: true }` blocks to ensure thorough updates.

## Migration Plan

1. Modify `schema.prisma`. Delete `Subscription` model. Add `masterEmail`, `password`, `startDate`, `endDate`, and `planType` to `Pool`.
2. Run Prisma migration.
3. Update all backend server actions (`src/actions`) to use the new Pool architecture (removing old Subscription insertions/deletions).
4. Update UI component data access, especially in `pools/page.tsx` and `pools/[id]/page.tsx` features like formatting dates or validating properties.
5. Create UI modifications (Sidebar).
6. Delete the file `src/app/(dashboard)/subscriptions/page.tsx`.
