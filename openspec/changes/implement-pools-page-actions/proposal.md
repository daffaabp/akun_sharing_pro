## Why

The `/pools` page currently displays a list of pools, but lacks actions for users to interact with individual pools beyond the read-only view. Implementing actions (View details, Edit pool, Delete pool) will allow administrators to actually manage pools directly from the master list, matching the functionality already provided in other sections like Emails and Services.

## What Changes

- **Add Actions Column**: The pools table will get a new "Actions" column containing a dropdown menu.
- **Implement View Action**: Quick link to navigate to the pool details page (`/pools/[id]`).
- **Implement Edit Action**: Opens a dialog to edit pool details (like target seats, status, or related subscription).
- **Implement Delete Action**: Allows removing a pool entirely (with confirmation dialogue).

## Capabilities

### New Capabilities
- `pool-actions`: Defines the UI and functional requirements for the action menu on the pools table (View, Edit, Delete).
- `pool-editing`: Defines the requirements for updating an existing pool's data via a dialog.
- `pool-deletion`: Defines the safe deletion process for a pool.

### Modified Capabilities     
- `admin-pool-management`: Will be updated to reflect that pools can be edited and deleted, extending the current creation and viewing capabilities.

## Impact

- **UI Components**: Modifications to the `PoolsTable` component to include the actions menu. Creation of new components like `EditPoolDialog` and potentially a `DeletePoolDialog` or confirmation alert.
- **Page Routing**: Ensure the `View` action routes correctly to the existing `/pools/[id]` page.
- **Server Actions**: New or updated server actions will be needed to handle `editPool` and `deletePool` operations safely.
- **Prisma Schema**: No changes expected, relies on existing `Pool` model.
