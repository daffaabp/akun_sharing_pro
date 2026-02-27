## ADDED Requirements

### Requirement: Sidebar Layout Structure
The system SHALL display a sidebar navigation component with a fixed width of 260px that remains sticky on the left side of the viewport.

#### Scenario: Viewing the layout
- **WHEN** the user views the dashboard
- **THEN** a sidebar with a width of 260px is visible on the left side
- **AND THEN** the main content area occupies the remaining width

### Requirement: Sidebar Header
The sidebar SHALL contain a header section displaying the application logo and title "Account Sharing Pro".

#### Scenario: Viewing the application header
- **WHEN** the user looks at the top of the sidebar
- **THEN** they see the application logo and the text "Account Sharing Pro"

### Requirement: Primary Action Button
The sidebar SHALL contain a prominent "New Master Account" button below the header.

#### Scenario: Identifying the primary action
- **WHEN** the user looks below the sidebar header
- **THEN** they see a button labeled "New Master Account" with an add icon

### Requirement: Navigation Categories
The sidebar SHALL group navigation links into two distinct categories: "Main Menu" and "System".

#### Scenario: Viewing Main Menu links
- **WHEN** the user views the "Main Menu" section
- **THEN** they see links for Emails (Master Accounts), Services, Users, Subscriptions, and Rotation Logic

#### Scenario: Viewing System links
- **WHEN** the user views the "System" section
- **THEN** they see links for Settings and Help Center

### Requirement: Active Navigation State
The system SHALL highlight the currently active navigation link to indicate the user's current location in the application.

#### Scenario: Navigating to a different section
- **WHEN** the user navigates to a specific section (e.g., "Services")
- **THEN** the corresponding sidebar link is visually highlighted as active
- **AND THEN** other links appear in their default inactive state

### Requirement: User Profile Footer
The sidebar SHALL display a user profile widget at the bottom, showing the current user's avatar, name, and role.

#### Scenario: Viewing current user information
- **WHEN** the user looks at the bottom of the sidebar
- **THEN** they see their avatar, name (e.g., "Alex Henderson"), and role (e.g., "Admin Account")
