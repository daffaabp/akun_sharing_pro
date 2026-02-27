### Requirement: Admin can delete a pool
The system SHALL provide a "Delete" option in the actions menu of the pools table that removes the pool from the system and its associated cache data.

#### Scenario: Delete pool with no members
- **WHEN** Admin clicks "Delete" on a pool that has 0 members assigned.
- **THEN** The system prompts for confirmation, deletes the pool record upon confirmation, triggers cache revalidation for `/users` and `/pools`, and removes the row from the table.

#### Scenario: Delete pool with active members
- **WHEN** Admin clicks "Delete" on a pool that has 1 or more members assigned.
- **THEN** The system displays a warning confirmation that deleting the pool will also remove its members. Upon confirmation, the system removes associated seats and the pool, followed by cache revalidation for `/users` and `/pools`.
