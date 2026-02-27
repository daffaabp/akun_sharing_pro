## ADDED Requirements

### Requirement: Pool has an optional notes field
The system SHALL store an optional freeform text `notes` field on each `Pool` record in the database. The field SHALL accept any plain text content and MAY be null/empty.

#### Scenario: Pool created without notes
- **WHEN** Admin creates a new pool without providing notes.
- **THEN** The pool is saved with `notes` as `null`.

#### Scenario: Notes persisted on edit
- **WHEN** Admin saves pool notes via the edit dialog.
- **THEN** The pool record is updated with the provided notes text.

#### Scenario: Notes cleared
- **WHEN** Admin clears the notes field and saves.
- **THEN** The pool record is updated with `notes` as `null` (or empty string treated as null).

### Requirement: Pool detail page displays notes
The system SHALL display the pool's `notes` value in the pool detail sidebar (`/pools/[id]`) when notes are present. When `notes` is null or empty, the notes section SHALL NOT be rendered.

#### Scenario: Notes visible on detail page
- **WHEN** A pool has a non-empty `notes` value and admin views `/pools/[id]`.
- **THEN** The notes text is displayed in the sidebar metadata area below other metadata fields.

#### Scenario: No notes — section hidden
- **WHEN** A pool has no notes (null or empty string) and admin views `/pools/[id]`.
- **THEN** No notes section is rendered in the sidebar.

### Requirement: Admin can edit pool notes via the edit dialog
The system SHALL provide a textarea input for `notes` in the pool edit dialog. The field SHALL be optional (not required to submit the form).

#### Scenario: Notes pre-populated on edit open
- **WHEN** Admin opens the edit dialog for a pool that already has notes.
- **THEN** The textarea is pre-filled with the existing notes text.

#### Scenario: Admin updates notes
- **WHEN** Admin changes the text in the notes textarea and clicks "Save Changes".
- **THEN** The updated notes are persisted and reflected on the pool detail page.
