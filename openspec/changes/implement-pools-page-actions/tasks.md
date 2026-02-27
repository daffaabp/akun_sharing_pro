## 1. Server Actions

- [x] 1.1 Create `editPool` server action to handle updating pool `targetSeats` and `subscriptionId` with validation.
- [x] 1.2 Create `deletePool` server action to securely handle pool deletion and verify member counts are zero.

## 2. UI Components

- [x] 2.1 Create `EditPoolDialog` component with the edit form logic.
- [x] 2.2 Update `PoolsTable` component to add an "Actions" column.
- [x] 2.3 Implement the "View" menu item to navigate to the pool details page (`/pools/[id]`).
- [x] 2.4 Implement the "Edit" menu item connected to the `EditPoolDialog`.
- [x] 2.5 Implement the "Delete" menu item with an `AlertDialog` confirmation before calling `deletePool`.
