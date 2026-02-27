## 1. Action Layer Updates

- [x] 1.1 Update `deletePool` in `src/app/actions/pools.ts` to retrieve the `subscriptionId` before deleting the pool.
- [x] 1.2 After successfully deleting the `Pool`, add logic in `deletePool` to verify if a `subscriptionId` exists, and if so, delete the `Subscription` with that matching `id`.

## 2. Cache Invalidation

- [x] 2.1 Add `revalidatePath("/users")` to the `deletePool` action.
- [x] 2.2 Add `revalidatePath("/subscriptions")` to the `deletePool` action.
- [x] 2.3 Verify the action continues to return the deleted pool object successfully format.
