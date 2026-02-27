## ADDED Requirements

### Requirement: Pool table includes Subscription Fields
The system SHALL store subscription tracking fields (`masterEmail`, `password`, `startDate`, `endDate`, `planType`) directly on the `Pool` database model as optional fields.

#### Scenario: Merging Subscription into Pool
- **WHEN** the system tracks subscription information for a pool
- **THEN** it stores the data directly on the `Pool` record instead of an external `Subscription` record
