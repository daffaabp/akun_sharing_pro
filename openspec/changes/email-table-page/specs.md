## email-table

The email table capability displays a paginated list of master account emails in the Emails (Master Accounts) page.

### Requirements

1. The page renders a data table with columns: Email Address, Status, Services, Last Sync, Actions
2. Each row shows:
   - Email address with a colored icon avatar and a "Master Account #XXXX" subtitle
   - Status badge with color coding: Active (green), Paused (amber), Disabled (rose)
   - Service icons (stacked avatars) or "No services" text
   - Last Sync timestamp text
   - Action buttons: Edit, Delete, More
3. A search input appears in the header above the table (already in the global Header component)
4. Pagination controls appear below the table showing current page range and total
5. The table is wrapped in a card with border, rounded corners, and drop shadow
