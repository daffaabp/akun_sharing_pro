## MODIFIED Requirements

### Requirement: Admin can view a Pool detail page
The system SHALL provide a page at `/pools/[id]` showing:
- Pool name, service, status, seat count, and expiry date (from linked Subscription)
- A table of all seats with: member name, phone, payment status, joined date
- Actions available on the pool (Edit, Delete) from the list view navigating or affecting this data.

#### Scenario: Pool detail page loads
- **WHEN** Admin clicks a pool row in the pools table or clicks "View" from the actions menu.
- **THEN** The `/pools/[id]` page loads with all seat data populated.
