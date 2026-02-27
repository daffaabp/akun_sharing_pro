# Spec: user-pool-assignment

## Requirements

### Requirement: Assign to Pool Button
Each row MUST have an "Assign to Pool" button (plus-circle icon).

### Requirement: Pool Filtering
The assign dialog MUST only show pools with status OPEN or READY.
The assign dialog MUST exclude pools the member is already in.

### Requirement: Pool Seat Creation
Submitting creates a PoolSeat record (memberId + poolId).
After successful assignment, pool badge appears in the member's Pools column.

### Requirement: Duplicate Prevention
If member is already in the pool (DB unique constraint), MUST show friendly error.
