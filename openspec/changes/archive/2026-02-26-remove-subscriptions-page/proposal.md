## Why

The `/subscriptions` page has become redundant because the `/pools` page already contains and displays all the necessary pool details (including subscription-related expiry data). Having a separate `/subscriptions` page that merely repeats a subset of the pool information causes confusion and unnecessary duplication in the UI. 

Furthermore, the separate `Subscription` database model is unnecessary because there is a strict 1:1 relationship between a `Pool` and its `Subscription`. Merging the subscription data directly into the `Pool` table will simplify the database schema, queries, state management, and cleanup logic. Removing the separate `/subscriptions` page and table will simplify the navigation and streamline the user/developer experience, while also reducing the maintenance surface for caching and routing.

## What Changes

- **Database Schema**: Remove the `Subscription` model entirely. Move `masterEmail`, `password`, `startDate`, `endDate`, and `planType` fields directly into the `Pool` model as optional fields.
- **Remove the `/subscriptions` page**: Delete the route (`src/app/(dashboard)/subscriptions/page.tsx`) and its associated page component.
- **Update Sidebar Navigation**: Remove the "Subscriptions" link from the global sidebar menu.
- **Remove Cache Revalidation**: Remove functionality that clears the `/subscriptions` cache path when pools or subscriptions are modified/deleted.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `pool-schema`: Modifying the schema to merge `Subscription` fields into `Pool`.
- `admin-pool-management`: Removing the requirement that specifically dictates the `/subscriptions` page shows an overview of active pools, and updating logic to deal with merged Subscription fields.
- `subscription-cleanup`: Removing the requirement to revalidate the `/subscriptions` cache path when a pool is deleted, and removing logic that deletes a separate `Subscription` record (since it's now deleted as part of the Pool).
- `pool-deletion`: Removing the requirement to revalidate the `/subscriptions` cache path during pool deletion actions, and removing the deletion of a separate Subscription record.
- `refactored-layout`: Updating the sidebar navigation and header examples to no longer include or reference "Subscriptions".

## Impact

- **Database**: The Prisma schema will change significantly, requiring a migration. Any code accessing `pool.subscription.*` will need to be refactored to `pool.*`.
- **Server Actions**: Server actions related to pools and subscriptions will need a major refactor to reflect the schema changes. Any server action that calls `revalidatePath('/subscriptions')` will be updated to remove that call.
- **UI Navigation**: The sidebar will have one fewer link under the Main Menu.
- **Routing**: Users attempting to visit `/subscriptions` directly will hit a 404 (or can be optionally redirected to `/pools`).
- **Dependencies**: No external dependencies are affected.
