## MODIFIED Requirements

### Requirement: Member model includes contact info
The system SHALL store `phone` (optional) and optional `email` on the `Member` model. `name` is required.

#### Scenario: Create member with name and no phone
- **WHEN** Admin adds a new member with a name only.
- **THEN** A `Member` record is created and no phone is stored.

#### Scenario: Create member with name and phone
- **WHEN** Admin adds a new member with a name and phone number.
- **THEN** A `Member` record is created and the phone is stored.

### Requirement: Admin can assign a Member to a Pool seat
The system SHALL allow an admin to add a customer to a pool seat from the pool detail page. Existing member matching MUST be done by case-insensitive name match. phone is optional.

#### Scenario: Assign new member to seat with new name
- **WHEN** Admin clicks "Add Member", enters a unique name (and optional phone), and submits.
- **THEN** A new `Member` is created and a `PoolSeat` is created linking them to the pool.

#### Scenario: Assign existing member to seat matching by name
- **WHEN** Admin clicks "Add Member", enters a name that matches an existing member (case-insensitive), and submits.
- **THEN** The existing `Member` is assigned to a `PoolSeat` linking them to the pool. No new member is created.

#### Scenario: Pool full — cannot add more seats
- **WHEN** The pool's filled seat count equals `targetSeats`.
- **THEN** The "Add Member" button is disabled and a message indicates the pool is full.
