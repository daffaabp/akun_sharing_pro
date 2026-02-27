## MODIFIED Requirements

### Requirement: Refactored Header Structure
The header SHALL contain the active application section title on the left and utility buttons (Help, Notifications, Profile) on the right. The title MUST dynamically match the active "Main Menu" navigation link, or default to "Account Sharing Pro" if no match is found.

#### Scenario: Viewing a specific section
- **WHEN** the user navigates to a specific section (e.g., "Pools")
- **THEN** they see the section name (e.g., "Pools") as the header title
- **AND THEN** they see the Help, Notifications, and Profile avatar buttons on the right

#### Scenario: Viewing a page without a direct menu match
- **WHEN** the user navigates to a route not in the main menu
- **THEN** they see "Account Sharing Pro" as the header title
