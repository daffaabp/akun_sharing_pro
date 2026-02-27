## ADDED Requirements

### Requirement: Global Layout Redesign
The system SHALL display a layout consisting of a fixed left sidebar and a top sticky header matching the new structural reference.

#### Scenario: Viewing the application frame
- **WHEN** the user views the dashboard
- **THEN** a dark-themed sidebar with a width of 260px is visible on the left side
- **AND THEN** a dark-themed header spans the remaining width at the top

### Requirement: Refactored Header Structure
The header SHALL contain the application title "Account Pro" on the left and utility buttons (Help, Notifications, Profile) on the right. 

#### Scenario: Viewing the header elements
- **WHEN** the user looks at the top header
- **THEN** they see the text "Account" and "Pro" highlighted in the primary color
- **AND THEN** they see the Help, Notifications, and Profile avatar buttons on the right

### Requirement: Refactored Sidebar Structure
The sidebar SHALL contain a header section with "Account Sharing Pro", a primary "New Master Account" button, navigation links grouped by "Main Menu" and "System", and a user profile footer.

#### Scenario: Viewing the sidebar elements
- **WHEN** the user looks at the sidebar
- **THEN** they see the "Account Sharing Pro" title, the "New Master Account" button, navigation links, and their user profile at the bottom

### Requirement: Dark Theme Default 
The layout components (header and sidebar) SHALL use dark background colors (`bg-[#151b23]`, `bg-black`, or `bg-[#152330]`) natively.

#### Scenario: Assessing visual theme
- **WHEN** the user views the layout
- **THEN** the sidebar and header appear with a dark background and high-contrast white/light-gray text

### Requirement: Icon Migration
The layout components SHALL utilize `lucide-react` icons in place of the previously used Material Symbols font for all interactive graphical elements.

#### Scenario: Verifying icon rendering
- **WHEN** the user views the header or sidebar
- **THEN** the icons for menus, navigation items, and utilities are rendered using inline SVG elements from the lucide-react library
