## MODIFIED Requirements

### Requirement: Refactored Header Structure
The header SHALL contain the active application section title on the left and utility buttons (Help, Notifications, Profile) on the right. The title MUST dynamically match the active "Main Menu" or "System" navigation link, or default to "Account Sharing Pro" if no match is found.

#### Scenario: Viewing a specific section
- **WHEN** the user navigates to a specific section (e.g., "Subscriptions")
- **THEN** they see the text "Subscriptions" as the header title
- **AND THEN** they see the Help, Notifications, and Profile avatar buttons on the right

#### Scenario: Viewing an unknown or root section
- **WHEN** the user navigates to a context without a direct menu match
- **THEN** they see the text "Account Sharing Pro" as the header title
