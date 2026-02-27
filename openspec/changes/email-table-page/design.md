## Context

The dashboard's Emails (Master Accounts) page currently returns `null`. A detailed reference design is available in `reference/email_table/code.html` showcasing the intended UI: a card-wrapped data table with search, status badges, service icons, pagination, and row action buttons.

## Goals / Non-Goals

**Goals:**
- Render a polished email table on the `/` (Emails) route matching the reference design
- Static/mock data for now (no API integration)
- Reuse existing project patterns (Lucide icons, Tailwind CSS v4, Next.js App Router)

**Non-Goals:**
- Real database integration (future task)
- Server-side search/pagination

## Decisions

1. **Inline implementation in `emails/page.tsx`** — Table is page-specific, no shared component needed yet
2. **Lucide icons** — Project already uses Lucide; avoid adding Material Symbols dependency
3. **Static mock data array** — Enables rapid UI validation without backend changes

## Risks / Trade-offs

- Static data needs to be replaced with real API calls later
