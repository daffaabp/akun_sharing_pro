## ADDED Requirements

### Requirement: Layout components exist
The project SHALL contain `src/components/layout/header.tsx`, `src/components/layout/sidebar.tsx`, and `src/components/layout/dashboard-shell.tsx`, each exporting a default React component.

#### Scenario: Layout components compile without errors
- **WHEN** TypeScript compiles the project
- **THEN** all three layout component files export a valid default function component with no type errors

### Requirement: UI primitive components exist
The project SHALL contain `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, and `src/components/ui/modal.tsx`, each exporting a default or named React component.

#### Scenario: UI components compile without errors
- **WHEN** TypeScript compiles the project
- **THEN** all three UI component files export at least one valid React component with no type errors

### Requirement: Feature component directories exist
The project SHALL contain subdirectories `src/components/features/emails/`, `src/components/features/services/`, and `src/components/features/subscriptions/`, tracked in version control.

#### Scenario: Feature directories are present in the repository
- **WHEN** the repository is cloned
- **THEN** the three feature subdirectories exist under `src/components/features/`
