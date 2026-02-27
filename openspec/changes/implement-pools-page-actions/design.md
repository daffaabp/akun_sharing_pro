## Context

The `/pools` page currently lists active and offline pools using a `PoolsTable` component, but administrators have no way to manage these pools directly from this overview. To achieve feature parity with other sections (e.g., Services, Emails), we need to introduce row-level actions. This includes viewing details, editing configuration (target seats, subscription link, status), and deleting pools. 

## Goals / Non-Goals

**Goals:**
- Provide a clear, accessible UI for managing individual pools from the list view.
- Support "View" action routing directly to the `/pools/[id]` detailed tracking page.
- Support "Edit" action via a modal dialog to modify pool properties.
- Support "Delete" action with appropriate safeguards (confirmation dialogue).
- Use server actions to handle mutations optimally.

**Non-Goals:**
- Changing the underlying `Pool` database schema.
- Implementing the detailed view page itself (`/pools/[id]`), as this is already covered under `admin-pool-management` requirements (though routing to it is a goal).
- Modifying the member-assignment logic (which is handled in the pool details view, not the table).

## Decisions

1. **Actions Menu Pattern**: We will implement the standard `DropdownMenu` pattern used across the app (e.g., in `EmailsTable` and `ServicesTable`) in a new "Actions" column in the `PoolsTable`.
   - *Rationale*: Consistency across the dashboard ensures admins have a familiar operational model.

2. **Edit Dialog Component**: Abstract editing logic into a dedicated `EditPoolDialog` component.
   - *Rationale*: Keeps the table component clean. The dialog will handle its own state and sub-fetching if needed (e.g., fetching available emails or services for dropdowns, though ideally passed via parent if already loaded).

3. **Delete Action Implementation**: Use a standard confirmation alert dialog (`AlertDialog`) before executing the delete server action.
   - *Rationale*: Pool deletion is a destructive action that impacts members and tracking.

4. **Server Actions**: Create `editPool` and `deletePool` in the respective server actions file (`src/app/actions/pools.ts` or similar).
   - *Rationale*: Leverage Next.js app router server actions for secure, server-side mutations with automatic `revalidatePath` capability to update the table immediately.

## Risks / Trade-offs

- **Risk: Deleting a pool with active members.**
  - *Mitigation*: The `deletePool` server action should either cascade delete the `PoolSeat` entries (members are detached but not deleted) or gracefully prevent deletion if seats are occupied, requiring the admin to empty the pool first. Based on Prisma schema constraints, we must ensure referential integrity is maintained.
- **Risk: Stale Data in Edit Dialog.**
  - *Mitigation*: Ensure the edit dialog mounts with the most recent row data and the server action revalidates the path completely.
