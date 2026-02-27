# Allow Single-Seat Pools - Design

## Architecture
No architectural changes required. We are relying on existing UI components and server actions.

## Data Flow
- Creating a pool passes `targetSeats` to the `createPool` server action. The database schema uses an `Int` field for `targetSeats` with no constraints blocking a value of `1`.
- The `editPool` dialog already allows updating `targetSeats` to down to `1` (via `min={Math.max(1, minSeats)}`).

## UI Patterns
- The `CreatePoolDialog` input type="number" currently limits user entry to minimum `2`. We will adjust the HTML attribute `min` to `1` so the UI form allows entering `1`.

## Constraints & Considerations
- A target of 1 means a pool is effectively "full" as soon as it is created (or when 1 member joins), which correctly limits assignment capacity for that pool and marks it ready.
