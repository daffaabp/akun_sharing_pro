## Context

The `EmailsPage` at `/emails` displays a table of master account emails. The current mock data limits the display to 4 generic emails. The updated design requires using the actual list provided by the user in `reference/emails.txt` (18 emails) to provide a more realistic preview of the production state.

## Goals / Non-Goals

**Goals:**
- Replace the 4 placeholder emails with the 18 specific email addresses from the `reference/emails.txt` file.
- Generate valid, randomly selected static states (Account Number, Avatar Color, Status, Services, Last Sync) for the new emails.

**Non-Goals:**
- Real database integration (still relying on static client-side data).
- Pagination refactoring (it already handles >4 items because of `ITEMS_PER_PAGE=4` and `TOTAL_RESULTS=12`, which should be updated to 18).

## Decisions

1. **Keep Mock Data Architecture** — Continue using the static `mockEmails` array but populate it with the 18 provided rows.
2. **Update TOTAL_RESULTS** — Set `TOTAL_RESULTS = 18` for correct pagination.
3. **Randomized Attributes** — Use a mix of colors, statuses, icons, and sync times for the generated array elements to maintain the realistic appearance built in the initial `email-table-page` change.

## Risks / Trade-offs

- Manual formatting of the 18 items takes up lines in the `page.tsx` file, but it's acceptable for a temporary mock state before transitioning to a database fetch.
