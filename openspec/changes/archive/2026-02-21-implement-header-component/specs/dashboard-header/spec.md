## ADDED Requirements

### Requirement: Dashboard Header visually matches reference design
The project SHALL implement `src/components/layout/header.tsx` to structurally and visually match the "Header Variant 2" reference HTML, including the flex layout, styling, and dark mode support using Tailwind CSS.

#### Scenario: Header renders correctly with all visual elements
- **WHEN** the dashboard layout is rendered
- **THEN** the header displays the mobile menu button
- **AND** the breadcrumb navigation ("Dashboard / Overview")
- **AND** the action buttons (help, notifications with dot)
- **AND** the user profile dropdown trigger with avatar and status dot

### Requirement: Header remains sticky at top
The header SHALL use sticky positioning to remain at the top of the viewport when the main content scrolls.

#### Scenario: User scrolls long dashboard content
- **WHEN** the dashboard main content overflows vertically and the user scrolls down
- **THEN** the header remains visible and fixed at the top of the screen with a backdrop blur effect

### Requirement: Header uses semantic HTML
The header SHALL use the HTML5 `<header>` tag as its outer container and `<nav>` for the breadcrumb section.

#### Scenario: Inspecting the DOM structure
- **WHEN** the component is analyzed or inspected
- **THEN** it is rooted in a `<header>` element and contains `<nav>` elements for semantic navigation regions
