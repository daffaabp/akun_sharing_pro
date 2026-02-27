## 1. Database Schema

- [x] 1.1 Remove the `Subscription` model from `prisma/schema.prisma`.
- [x] 1.2 Add `masterEmail`, `password`, `startDate`, `endDate`, and `planType` as optional fields to the `Pool` model in `prisma/schema.prisma`.
- [x] 1.3 Run Prisma migration to apply schema changes (`bunx prisma migrate dev --name merge_subscription_into_pool`).

## 2. Server Actions Refactoring

- [x] 2.1 Refactor pool activation/update server actions to manipulate the inline subscription fields on the `Pool` model rather than dealing with relation updates.
- [x] 2.2 Update pool deletion server action to remove cache revalidation for `/subscriptions`.
- [x] 2.3 Search across all files in `src/actions/` and remove any remaining `revalidatePath('/subscriptions')` calls.

## 3. UI and Data Access Updates

- [x] 3.1 Refactor the Pool detail page (`src/app/(dashboard)/pools/[id]/page.tsx`) to reference the new inline fields (e.g., changing `pool.subscription?.endDate` to `pool.endDate`).
- [x] 3.2 Refactor the pools table view (`src/app/(dashboard)/pools/page.tsx` and underlying components like `pools-table.tsx`) to pull subscription data directly from the pool object.
- [x] 3.3 Ensure any UI forms or dialogs (e.g. "Activate Pool", "Edit Pool") pass the correct flat structure to the updated server actions.

## 4. UI Cleanup

- [x] 4.1 Remove the Subscriptions navigation link from the global sidebar component (usually located in `src/components/layout/app-sidebar.tsx` or similar).
- [x] 4.2 Delete the `/subscriptions` route entirely (delete `src/app/(dashboard)/subscriptions/page.tsx`).
