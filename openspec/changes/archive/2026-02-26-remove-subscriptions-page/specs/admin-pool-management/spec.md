## MODIFIED Requirements

### Requirement: Admin can view a Pool detail page
The system SHALL provide a page at `/pools/[id]` showing:
- Pool name, service, status, seat count, and expiry date (from the Pool's internal subscription fields)
- A table of all seats with: member name, phone, payment status, joined date
- Actions available on the pool (Edit, Delete) from the list view navigating or affecting this data.

#### Scenario: Pool detail page loads
- **WHEN** Admin clicks a pool row in the pools table or clicks "View" from the actions menu.
- **THEN** The `/pools/[id]` page loads with all seat data populated.

## REMOVED Requirements

### Requirement: Subscriptions page shows Active Pools overview
**Reason**: The `/subscriptions` page was redundant. The `/pools` page already shows this information, and maintaining two separate pages with two different representations of the same underlying data caused confusion and code maintenance load.
**Migration**: Admins should navigate to `/pools` to view all active pools and their expiry dates.
