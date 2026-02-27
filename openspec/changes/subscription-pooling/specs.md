# Specs: Subscription Pooling

## ADDED Requirements

### Requirement: Admin can create a Subscription Pool
The system SHALL allow an admin to create a new Pool for a specific Service, defining a target number of seats.

#### Scenario: Successful Pool Creation
- **WHEN** Admin submits the pool creation form with Service ID and Target Seats (e.g., 5).
- **THEN** The system creates a new Pool record with status `OPEN` and `targetSeats` set to 5.

### Requirement: Members can join an Open Pool
The system SHALL allow a user to join a Pool that is currently `OPEN` and has available seats.

#### Scenario: Successful join
- **WHEN** A member clicks "Join Pool" on an `OPEN` pool with 4/5 seats filled.
- **THEN** A `PoolSeat` record is created linking the member to the pool, and the UI reflects 5/5 seats filled.

#### Scenario: Pool becomes full
- **WHEN** The `PoolSeat` created causes the number of filled seats to equal `targetSeats`.
- **THEN** The system automatically updates the Pool's status to `READY`.

#### Scenario: Cannot join a full/active pool
- **WHEN** A member attempts to join a pool that is `READY` or `ACTIVE`.
- **THEN** The system rejects the request and displays an error message.

### Requirement: Admin can activate a full Pool
The system SHALL allow an admin to convert a `READY` Pool into an `ACTIVE` Pool by providing the actual subscription details.

#### Scenario: Successful Activation
- **WHEN** Admin provides a master Email, Start Date, and End Date for a `READY` pool.
- **THEN** The system creates a `Subscription` record tying the Email and Service together, links the `Subscription` to the `Pool`, and updates the Pool status to `ACTIVE`.

### Requirement: Members inherit active subscription dates
The system SHALL display the exact same `startDate` and `endDate` for all members within the same `ACTIVE` pool.

#### Scenario: Viewing Subscription Status
- **WHEN** A member views their dashboard.
- **THEN** The system retrieves their active `PoolSeat`, follows the relation to its `Pool`, then to the `Subscription`, and displays the `Subscription.endDate`.
