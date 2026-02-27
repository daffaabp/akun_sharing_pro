## Why

When a pool is deleted, the system correctly removes the pool and its associated seats, but it fails to clean up the linked subscription and does not reflect the removed pool assignments on the user pages. This causes orphaned subscriptions to remain in the database and leaves stale data on the `/users` interface, leading to inconsistencies.

## What Changes

- Update the pool deletion logic to delete the associated `Subscription` if the pool is linked to one.
- Update the cache invalidation in the pool deletion action to revalidate `/users` and `/subscriptions` routes.
- **BREAKING**: Deleting a pool currently leaves its subscription intact. This change will permanently delete the associated subscription.

## Capabilities

### New Capabilities

- `subscription-cleanup`: Defines the automatic cleanup of subscription records when their owning pool is deleted.

### Modified Capabilities

- `pool-deletion`: Updates requirement to include the deletion of the associated subscription and the refreshment of user cache state.

## Impact

- **Affected Code**: `src/app/actions/pools.ts` (`deletePool` function).
- **Affected Data**: `Subscription` records associated with `Pool` will now be deleted.
- **Affected UI**: `/users` and `/subscriptions` views will effectively refresh when a pool is deleted from anywhere in the app.
