## Why
Currently, the "Create Subscription Pool" dialog enforces a minimum of 2 target seats (`min={2}`). However, some users buy private accounts through the platform instead of sharing them, requiring a pool with a target size of 1 seat. Allowing 1-seat pools ensures the system works for both shared and private subscription scenarios.

## What Changes
- Lower the minimum allowed `targetSeats` value from `2` to `1` in the new pool creation form.

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `admin-pool-management`: Changing the target seats validation rule to allow minimum 1 seat.

## Impact
- `src/components/pools/create-pool-dialog.tsx` (changing `<Input min={2} />` to `min={1}`)
- No backend impact since server actions do not strictly validate `targetSeats >= 2`.
