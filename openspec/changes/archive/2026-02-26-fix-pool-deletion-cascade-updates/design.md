## Context

Currently, the `deletePool` Server Action in `src/app/actions/pools.ts` only deletes the `Pool` record and its associated `PoolSeat` records. 
It does not delete the `Subscription` record associated via `pool.subscriptionId` if one exists. This implies that if a pool that was already activated (and thus had a subscription created for it) is deleted, the corresponding `Subscription` is left orphaned in the database.
Furthermore, while `/pools` is revalidated upon deletion, other pages that display relationships relying on the existence of these records (such as `/users`, which lists pools a user is part of, or a theoretical `/subscriptions` view) might maintain stale cached data.

## Goals / Non-Goals

**Goals:**
- Ensure that deleting a pool completely removes its associated `Subscription` from the database.
- Ensure that UI pages like `/users` and `/subscriptions` show up-to-date data after a pool is deleted, eliminating orphaned associations.

**Non-Goals:**
- Applying soft deletion (e.g. `isDeleted` flags). Complete deletion will continue to be leveraged.
- Refactoring how `PoolSeat` or `Member` relationships operate.

## Decisions

**1. Subscription Deletion Logistics**
- **Decision**: Read `subscriptionId` from the pool before deleting the pool. After the `Pool` record is deleted successfully, delete the `Subscription` matching `subscriptionId`.
- **Rationale**: Since `Pool` holds the foreign key (`subscriptionId`) to the `Subscription` model, we must first delete the `Pool` (or sever the link) before attempting to drop the `Subscription` to avoid breaking foreign key constraints in Prisma.
- **Alternative considered**: Implementing standard `onDelete: Cascade` on the Prisma schema itself. However, because `Pool` holds the `subscriptionId`, cascading from `Pool` -> `Subscription` requires specific schema configuration that might force a larger migration. Handling this explicitly in the `deletePool` server action is safer and achieves the correct result without altering schema relations deeply just for this flow.

**2. Expanded Cache Invalidation**
- **Decision**: Add `revalidatePath("/users")` and `revalidatePath("/subscriptions")` (if applicable) to the `deletePool` action.
- **Rationale**: User pages render data depending on the `PoolSeat` and `Pool` data. Deleting a pool leaves stale pool data rendered in those contexts until a hard refresh. Emitting specific router cache clears immediately syncs the UI.

## Risks / Trade-offs

- **Risk**: Deleting a pool permanently destroys subscription credentials (`password`, etc) stored loosely on the subscription.
  - **Mitigation**: Warn the admin about the destructive nature of pool deletion in the UI (already covered by existing capabilities).
- **Risk**: The action might partially fail if `pool.delete` succeeds but `subscription.delete` encounters a database error.
  - **Mitigation**: While a Prisma transaction (`db.$transaction`) could solve this, sequentially operating is generally acceptable here. The pool data is safely eliminated; an orphaned subscription in an edge-case failure mode isn't a show-stopper. We'll stick to sequential operations to mirror the existing structure unless transaction wrapping is strictly required.
