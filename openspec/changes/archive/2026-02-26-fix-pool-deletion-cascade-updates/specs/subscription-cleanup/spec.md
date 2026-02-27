## ADDED Requirements

### Requirement: Automatic subscription cleanup on pool deletion
The system SHALL automatically delete any associated Subscription record when its parent Pool is deleted.

#### Scenario: Deleting a pool that has an active subscription
- **WHEN** Admin deletes a pool that is in the "ACTIVE" state and has a linked subscription.
- **THEN** The system deletes the pool, all associated seats, and permanently deletes the linked subscription from the database.
- **AND** The system revalidates the `/users` and `/subscriptions` cache paths to ensure stale subscription/pool data is cleared from the UI.
