## MODIFIED Requirements

### Requirement: Service Listing Layout
The system SHALL display the services listing using a layout structure that matches the emails management page, including a distinct page header and description block above the table.

#### Scenario: Viewing the services list
- **WHEN** a user navigates to the `/services` page
- **THEN** they see the page title "Services" and its description grouped together
- **AND** the table of services is displayed below the header

### Requirement: Service Table Styling
The system SHALL render the services table using raw HTML table elements and custom Tailwind CSS classes identical to those used in the emails table, rather than default component library tables.

#### Scenario: Tabular data presentation
- **WHEN** the services table is rendered
- **THEN** it uses specific utility classes for borders, backgrounds, and typography (e.g., `text-[11px] font-bold text-slate-400 uppercase tracking-wider` for headers)
- **AND** status badges are rendered using inline elements with simple utility classes (e.g., `bg-green-50 text-green-600` for active status) instead of pre-built Badge components.
