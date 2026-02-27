## MODIFIED Requirements

### Requirement: Admin can view a Pool detail page
The system SHALL provide a page at `/pools/[id]` showing:
- Pool name, service, status, seat count, and expiry date (from the Pool's internal subscription fields)
- A table of all seats with: member name, phone, payment status, joined date
- Actions available on the pool (Edit, Delete) from the list view navigating or affecting this data.
- Optional pool notes displayed in the sidebar metadata section (when present).

#### Scenario: Pool detail page loads
- **WHEN** Admin clicks a pool row in the pools table or clicks "View" from the actions menu.
- **THEN** The `/pools/[id]` page loads with all seat data populated.

#### Scenario: Pool notes displayed in sidebar
- **WHEN** The pool has a non-empty `notes` value.
- **THEN** The notes text is visible in the sidebar below the other metadata fields.

#### Scenario: Pool notes hidden when empty
- **WHEN** The pool has no notes.
- **THEN** No notes section is rendered in the sidebar.
