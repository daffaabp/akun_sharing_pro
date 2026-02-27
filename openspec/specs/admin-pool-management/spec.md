## ADDED Requirements

### Requirement: Member model includes contact info
The system SHALL store `phone` (optional) and optional `email` on the `Member` model. `name` is required.

#### Scenario: Create member with name and no phone
- **WHEN** Admin adds a new member with a name only.
- **THEN** A `Member` record is created and no phone is stored.

#### Scenario: Create member with name and phone
- **WHEN** Admin adds a new member with a name and phone number.
- **THEN** A `Member` record is created and the phone is stored.

### Requirement: PoolSeat tracks payment status
The system SHALL store a `paymentStatus` field (`PENDING`, `PAID`, `REFUNDED`) on each `PoolSeat`.

#### Scenario: Default payment status
- **WHEN** Admin assigns a member to a seat.
- **THEN** The seat is created with `paymentStatus: PENDING` by default.

### Requirement: Admin can view a Pool detail page
The system SHALL provide a page at `/pools/[id]` showing:
- Pool name, service, status, seat count, and expiry date (from the Pool's internal subscription fields)
- A table of all seats with: member name, phone, payment status, joined date
- Actions available on the pool (Edit, Delete) from the list view navigating or affecting this data.
- Optional pool notes displayed in the sidebar metadata section (when present).

#### Scenario: Pool detail page loads
- **WHEN** Admin clicks a pool row in the pools table or clicks "View" from the actions menu.
- **THEN** The `/pools/[id]` page loads with all seat data populated.

#### Scenario: Pool notes displayed in sidebar
- **WHEN** The pool has a non-empty `notes` value.
- **THEN** The notes text is visible in the sidebar below the other metadata fields.

#### Scenario: Pool notes hidden when empty
- **WHEN** The pool has no notes.
- **THEN** No notes section is rendered in the sidebar.

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

### Requirement: Admin can toggle payment status on a seat
The system SHALL allow an admin to mark a seat as PAID or PENDING directly from the pool detail page.

#### Scenario: Mark seat as paid
- **WHEN** Admin clicks "Mark Paid" on a seat row.
- **THEN** The seat's `paymentStatus` is updated to `PAID` and the UI reflects the change.


