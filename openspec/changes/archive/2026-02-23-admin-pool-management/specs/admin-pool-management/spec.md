## ADDED Requirements

### Requirement: Member model includes contact info
The system SHALL store `phone` (required, unique) and optional `email` on the `Member` model.

#### Scenario: Create member with phone
- **WHEN** Admin adds a new member with a name and phone number.
- **THEN** A `Member` record is created and the phone is stored.

### Requirement: PoolSeat tracks payment status
The system SHALL store a `paymentStatus` field (`PENDING`, `PAID`, `REFUNDED`) on each `PoolSeat`.

#### Scenario: Default payment status
- **WHEN** Admin assigns a member to a seat.
- **THEN** The seat is created with `paymentStatus: PENDING` by default.

### Requirement: Admin can view a Pool detail page
The system SHALL provide a page at `/pools/[id]` showing:
- Pool name, service, status, seat count, and expiry date (from linked Subscription)
- A table of all seats with: member name, phone, payment status, joined date

#### Scenario: Pool detail page loads
- **WHEN** Admin clicks a pool row in the pools table.
- **THEN** The `/pools/[id]` page loads with all seat data populated.

### Requirement: Admin can assign a Member to a Pool seat
The system SHALL allow an admin to add a customer to a pool seat from the pool detail page.

#### Scenario: Assign new member to seat
- **WHEN** Admin clicks "Add Member", enters name + phone, and submits.
- **THEN** A `Member` is created (or reused if phone already exists) and a `PoolSeat` is created linking them to the pool.

#### Scenario: Pool full — cannot add more seats
- **WHEN** The pool's filled seat count equals `targetSeats`.
- **THEN** The "Add Member" button is disabled and a message indicates the pool is full.

### Requirement: Admin can toggle payment status on a seat
The system SHALL allow an admin to mark a seat as PAID or PENDING directly from the pool detail page.

#### Scenario: Mark seat as paid
- **WHEN** Admin clicks "Mark Paid" on a seat row.
- **THEN** The seat's `paymentStatus` is updated to `PAID` and the UI reflects the change.

### Requirement: Subscriptions page shows Active Pools overview
The system SHALL repurpose `/subscriptions` to display all ACTIVE pools with service name, master email, and expiry date.

#### Scenario: View active subscriptions overview
- **WHEN** Admin navigates to `/subscriptions`.
- **THEN** A list of all ACTIVE pools is shown with expiry dates sourced from their linked `Subscription`.
