## Requirements

### Requirement: Pool Details Two-Column Layout
The system SHALL display the pool details using a two-column layout on desktop screens, with a metadata sidebar and a main content area.

#### Scenario: Viewing pool details on desktop
- **WHEN** user navigates to the pool details page on a large screen
- **THEN** they see the pool metadata (account, seats, expiry) in a sticky/fixed sidebar and the member list in the main content area

#### Scenario: Viewing pool details on mobile
- **WHEN** user navigates to the pool details page on a small screen
- **THEN** the sidebar content stacks above the main member list content

### Requirement: Modern Member Data Table
The main area SHALL display the member list in a modernized data table with specific status badges and standardized row actions.

#### Scenario: Viewing member details
- **WHEN** user views the member list
- **THEN** the table displays each member's details, format, contact info, and clear status badges (e.g., "Paid")

#### Scenario: Adding a new member
- **WHEN** the user clicks "Add Member" in the new layout
- **THEN** the existing dialog opens and allows adding a member exactly as before
