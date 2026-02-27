## Why

The Emails (Master Accounts) tab in the dashboard currently renders nothing — the page returns `null`. A reference design exists in `reference/email_table/code.html` that outlines the intended table UI with email address, status, services, last sync, and action columns.

## What Changes

- Implement the `EmailsPage` component with a full-featured data table matching the reference design
- Add a search bar scoped to the emails page content area (distinct from the header search)
- Display email records with status badges, service avatars, last sync timestamps, and row-level action buttons (edit, delete, more)
- Add pagination controls at the bottom of the table

## Capabilities

### New Capabilities
- `email-table`: Data table UI for listing master account emails with status, services, last sync, and actions

### Modified Capabilities
<!-- None — no existing spec-level requirements are changing -->

## Impact

- `src/app/(dashboard)/emails/page.tsx` — primary change
- Possibly a new `EmailTable` component under `src/components/features/`
