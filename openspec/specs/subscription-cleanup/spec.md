### Requirement: Automatic subscription cleanup on pool deletion
The system SHALL delete all associated data when a pool is deleted, and revalidate relevant cache paths.

#### Scenario: Deleting a pool that has an active subscription
- **WHEN** Admin deletes a pool that is in the "ACTIVE" state.
- **THEN** The system deletes the pool, all associated seats, and inherently deletes the pool's subscription fields from the database.
- **AND** The system revalidates the `/users` and `/pools` cache paths to ensure stale data is cleared from the UI.
