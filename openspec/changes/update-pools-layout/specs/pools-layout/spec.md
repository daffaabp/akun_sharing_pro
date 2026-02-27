## ADDED Requirements

### Requirement: Standardized Pools Page Layout
The system SHALL display the `/pools` page using the standardized dashboard layout with appropriate padding and spacing (`p-8 space-y-4`).

#### Scenario: User navigates to Pools page
- **WHEN** a user navigates to `/pools`
- **THEN** the main container has consistent padding with `/emails` and `/services` pages

### Requirement: Pools Page Header Structure
The system SHALL display a header on the `/pools` page containing the title "Pools", a descriptive subtitle, and any relevant primary actions aligned horizontally.

#### Scenario: Viewing the Pools page header
- **WHEN** a user views the `/pools` page
- **THEN** they see the title "Pools" and a description on the left
- **THEN** they see primary actions (if any) on the right

### Requirement: Standardized Pools Table Actions
The system SHALL provide a standard dropdown menu for each row in the Pools table containing View, Edit, and Delete actions.

#### Scenario: User opens row actions
- **WHEN** a user clicks the actions trigger button in a pool row
- **THEN** a dropdown menu opens with View, Edit, and Delete options
- **THEN** they match the interaction pattern of the services and emails tables
