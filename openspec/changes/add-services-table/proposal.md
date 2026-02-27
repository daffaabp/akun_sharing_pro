## Why
We need a dedicated page to manage and track external AI services and tools (e.g., ChatGPT, Cursor, SciSpace, NotebookLM). Currently, there is no centralized view to list these services within the application. This change will add visibility and management capabilities for these external tools.

## What Changes
We will introduce a new page at `/services` that contains a data table. This table will display the list of external AI services, allowing users to view their details in a structured format. The main navigation will also be updated to include a link to this new `/services` page.

## Capabilities

### New Capabilities
- `services-table`: A data table and page structure to list and manage external AI services on the `/services` route.

### Modified Capabilities

## Impact
- **New Route**: `/services` accessible via the main dashboard.
- **New Components**: A services data table component (using existing UI patterns) and a new page wrapper.
- **Navigation**: The sidebar or main navigation will be updated to include the new route.
