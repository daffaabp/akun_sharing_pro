# Spec: user-management

## Requirements

### Requirement: View Members
The `/users` page MUST display all Members in a table.
Columns: Name, Phone, Email (nullable), Pools (badges), Joined date, Actions.
Empty state MUST show "No members yet. Add one to get started."

### Requirement: Add Member
MUST support Add member (name + phone required, email optional).

### Requirement: Edit Member
MUST support Edit member (pre-fill current values).

### Requirement: Delete Member
MUST support Delete member (with confirmation prompt, cascades PoolSeat).
