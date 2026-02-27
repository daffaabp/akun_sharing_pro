## ADDED Requirements

### Requirement: Admin can filter and sort pools list
The system SHALL provide a "Quick Filter" dropdown on the pools list page that allows filtering the list by urgency (Ending soon, Expired), content (Has Admin Notes), and sorting (Newest, Oldest, Closest End Date). These filters SHALL map directly to URL search parameters to make the filtered view shareable and persistent across page reloads.

#### Scenario: Filter by overdue soon
- **WHEN** Admin selects "Overdue soon (< 7 days)" in the filter dropdown
- **THEN** The URL updates to include `?overdue=true` and the table shows only pools with `endDate` within the next 7 days

#### Scenario: Filter by pools with notes
- **WHEN** Admin selects "Has Admin Notes" in the filter dropdown
- **THEN** The URL updates to include `?notes=true` and the table shows only pools where `notes` is not null or empty

#### Scenario: Sort by closest end date
- **WHEN** Admin selects "End Date (Closest)" in the filter dropdown
- **THEN** The URL updates to include `?sort=closest` and the table orders pools by `endDate` ascending

#### Scenario: Clear all filters
- **WHEN** Admin clicks the "Clear" button in the filter dropdown
- **THEN** All filter-related search parameters are removed from the URL and the table displays all pools
