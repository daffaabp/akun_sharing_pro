## MODIFIED Requirements

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
