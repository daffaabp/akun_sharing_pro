## Why

The current Pool Details page needs a more modern, cleaner, and better-organized UI. A new HTML/Tailwind mockup (`reference/pool_details/code.html`) has been provided that significantly improves the presentation of pool metadata (such as seats, expiry, and account info) using a sidebar layout, and uses a more readable data table for the member list with modern styling and badges. We want to implement this new design to improve the user experience while retaining all existing underlying functionality exactly as it is today.

## What Changes

- Redesign the layout of the Pool Details page to match the provided HTML/Tailwind mockup.
- Implement a two-column layout:
  - **Sidebar**: Displays pool metadata including account email, filled/total seats count, expiration date, and a new seat occupancy progress bar.
  - **Main Area**: Houses the "Member List" with an "Add Member" button and a redesigned data table showing member details, payment status, and actions.
- Update the Members table UI to use the new styles (better typography, specific badges for payment status, clearer action buttons).
- **No functional changes**: The features for viewing pool details, adding members, and deleting members will continue to use the exact same server actions and data logic as they do currently.

## Capabilities

### New Capabilities

- `pool-details-layout`: Redesigned two-column layout for the pool details page.

### Modified Capabilities

None. The underlying data requirements and user actions remain completely unchanged; this is purely a presentation layer (UI) update.

## Impact

- The pool details page component(s) located in `app/(dashboard)/pools/[id]/` (or similar) will be updated to reflect the new UI structure.
- Some modular components (e.g., `MembersTable`, `AddMemberButton`) may be refactored or visually updated to fit the new design.
- No database schema, Prisma models, or server actions will be modified.
