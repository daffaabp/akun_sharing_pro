## mock-emails-update

This capability ensures the `EmailsPage` displays the specific list of master account emails provided by the user.

### Requirements

1. The `mockEmails` array in `src/app/(dashboard)/emails/page.tsx` must contain exactly 18 entries matching the emails listed in `reference/emails.txt`.
2. The `email` property of each entry must map one-to-one to a line in `reference/emails.txt`.
3. The `TOTAL_RESULTS` constant must be updated to 18.
4. The remaining properties (status, services, last sync, avatar color) should have varied, realistic sample data.
5. The `avatarText` property is unused and can be omitted or kept based on previous implementation coherence.
