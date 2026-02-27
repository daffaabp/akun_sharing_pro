## ADDED Requirements

### Requirement: Admin can create a Subscription Pool
The system SHALL allow an admin to create a new Pool for a specific Service, defining a target number of seats.

#### Scenario: Successful Pool Creation
- **WHEN** Admin submits the pool creation form with a Service ID and Target Seats count (e.g., 5).
- **THEN** The system creates a new Pool record with status `OPEN` and `targetSeats` set to the provided value.

### Requirement: Members can join an Open Pool
The system SHALL allow a member to join a Pool that has status `OPEN` and available seats remaining.

#### Scenario: Successful join with seats available
- **WHEN** A member clicks "Join Pool" on a Pool with status `OPEN` and fewer filled seats than `targetSeats`.
- **THEN** A `PoolSeat` record is created linking the member to the pool, and the seat count increments by 1.

#### Scenario: Pool automatically becomes READY when full
- **WHEN** A new `PoolSeat` causes the total filled seats to equal `targetSeats`.
- **THEN** The system SHALL automatically set the Pool's status to `READY`.

#### Scenario: Cannot join a READY or ACTIVE pool
- **WHEN** A member attempts to join a Pool with status `READY` or `ACTIVE`.
- **THEN** The system SHALL reject the request with an appropriate error message.

### Requirement: Admin can activate a READY Pool
The system SHALL allow an admin to convert a READY Pool to ACTIVE by supplying the actual purchased subscription details.

#### Scenario: Successful Pool activation
- **WHEN** Admin provides a master Email, Start Date, and End Date for a Pool with status `READY`.
- **THEN** The system SHALL create a `Subscription` record linking the Email and dates, associate it with the Pool, and set the Pool status to `ACTIVE`.

### Requirement: All members in a Pool share the same subscription dates
The system SHALL display an identical `startDate` and `endDate` for every member belonging to the same `ACTIVE` Pool.

#### Scenario: Member views their subscription expiry
- **WHEN** A member with an active `PoolSeat` views their dashboard.
- **THEN** The system SHALL retrieve the `endDate` from the `Subscription` linked to the member's Pool and display it as their subscription expiry date.

#### Scenario: Admin renews a Subscription
- **WHEN** An admin updates the `endDate` on a `Subscription` record.
- **THEN** All members in the associated Pool SHALL immediately see the updated expiry date on their dashboard.
