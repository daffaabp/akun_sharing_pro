# Spec: user-management

## Requirements

### Requirement: View Members
The `/users` page MUST display all Members in a table.
Columns: Name, Phone, Email (nullable), Pools (badges), Joined date, Actions.
Empty state MUST show "No members yet. Add one to get started."

### Requirement: Add Member
MUST support Add member (name required; phone and email optional).

#### Scenario: Add member with name only
- **WHEN** Admin submits new member form with only a name.
- **THEN** Member is created with null phone and email.

### Requirement: Edit Member
MUST support Edit member (pre-fill current values) where phone is no longer required.

#### Scenario: Remove phone from existing member
- **WHEN** Admin edits a member and clears the phone field.
- **THEN** Member is saved without a phone number.

### Requirement: Delete Member
MUST support Delete member (with confirmation prompt, cascades PoolSeat).
