## ADDED Requirements

### Requirement: Services Table Display
The system SHALL display a data table on the `/services` route containing a list of external AI services.

#### Scenario: User navigates to services page
- **WHEN** a user navigates to `/services`
- **THEN** the system displays the services data table
- **AND** the table shows placeholders or mock data for services like ChatGPT, Cursor, SciSpace, and NotebookLM

### Requirement: Service Attributes
The system SHALL display relevant attributes for each service in the table columns.

#### Scenario: Viewing service details
- **WHEN** the services table is rendered
- **THEN** it displays columns such as "Name", "Category", "Status", and "Description" (or similar relevant fields) for each listed service.

### Requirement: Navigation Integration
The system SHALL include a navigation link to the `/services` page in the main layout.

#### Scenario: Sub-menu or sidebar navigation
- **WHEN** a user views the main dashboard navigation (e.g., sidebar)
- **THEN** a link to "Services" is visible
- **AND** clicking the link routes the user to `/services`
