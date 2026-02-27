## Why

The current `EmailsPage` uses 4 hardcoded placeholder emails which do not represent the actual data the user wants to test with. The user has provided a specific list of 18 emails in `reference/emails.txt` that should be used as the mock data to better reflect the expected application state.

## What Changes

- Update `mockEmails` array in `src/app/(dashboard)/emails/page.tsx` to include the 18 specific email addresses from `reference/emails.txt`.
- Generate varied mock data (status, services, last sync) for the newly added emails to ensure the table looks populated and realistic.

## Capabilities

### New Capabilities
- `mock-emails-update`: Update the mock email dataset to use the provided list of 18 emails.

### Modified Capabilities
<!-- None -->

## Impact

- `src/app/(dashboard)/emails/page.tsx`
