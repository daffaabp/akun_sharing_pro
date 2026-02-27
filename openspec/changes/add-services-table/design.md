## Context
The application currently lacks a centralized location to view and manage external AI services. As the number of supported services grows, a dedicated `/services` page is needed to provide visibility into these tools.

## Goals / Non-Goals

**Goals:**
- Implement a `/services` route.
- Create a data table component to display a list of services.
- Ensure the table is responsive and aligns with the existing UI design system (e.g., Shadcn UI).

**Non-Goals:**
- Implementing CRUD operations (Create, Update, Delete) for services in this initial iteration.
- Complex filtering or advanced search capabilities beyond basic pagination.

## Decisions
- **UI Framework**: We will use the existing Shadcn UI components (Table, Card, etc.) to maintain visual consistency across the application.
- **Data Source**: Initially, the table will be populated with mock data or a static array to establish the layout and structure before integrating a live backend API connection if needed later.
- **Routing**: The `/services` route will be added under the `(dashboard)` layout to inherit the existing navigation structure (sidebar/header).

## Risks / Trade-offs
- **Risk**: The mock data structure might need significant changes when a real API is integrated.
  - **Mitigation**: Define a clear TypeScript interface for the `Service` entity early on to ensure easy swapping from mock to real data.
