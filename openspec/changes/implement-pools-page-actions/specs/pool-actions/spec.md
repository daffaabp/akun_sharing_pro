## ADDED Requirements

### Requirement: Pools table has an actions menu
The system SHALL display an "Actions" menu (e.g., via a dropdown or ellipsis icon) on each row of the Pools table.

#### Scenario: User opens actions menu
- **WHEN** Admin clicks the actions button on a specific pool row.
- **THEN** A dropdown menu appears with options: "View", "Edit", and "Delete".

### Requirement: View action routes to pool details
The actions menu SHALL include a "View" option that navigates the user to the detailed view of the selected pool.

#### Scenario: User clicks View
- **WHEN** Admin clicks "View" in the actions menu for a pool with ID `123`.
- **THEN** The system navigates to `/pools/123`.
