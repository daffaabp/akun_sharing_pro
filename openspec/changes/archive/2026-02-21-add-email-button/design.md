## Context
The Emails (Master Accounts) page is currently read-only, showing a data table of accounts. We need to provide a straightforward way for administrators to add new master emails to the system directly from this view. 

## Goals / Non-Goals

**Goals:**
- Provide an "Add Email" button above the `DataTable` on the `/emails` page.
- The button should trigger a modal/dialog (or navigate to a dedicated form) for capturing the new email details.
- Ensure the button matches the existing design system (shadcn/ui + Tailwind).

**Non-Goals:**
- Implementing the actual backend logic for creating the email (this change focuses on the UI entry point).
- Redesigning the entire Emails page.

## Decisions

- **Entry Point Location**: The button will be placed in the header section of the Emails page, specifically alongside or above the search/filter controls of the DataTable.
- **Interaction Pattern**: We will use a Dialog (modal) from our UI library to keep the user contextually on the Emails page while they add an account, rather than routing them to a completely new page.

## Risks / Trade-offs

- **Risk**: Cluttering the table header if too many actions are added.
  - **Mitigation**: Keep the design minimal. Use a primary button styling (e.g., `Button` with a `Plus` icon) to make it distinct but unobtrusive.
