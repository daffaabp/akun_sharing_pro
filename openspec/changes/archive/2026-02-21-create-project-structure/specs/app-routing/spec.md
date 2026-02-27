## ADDED Requirements

### Requirement: Public auth route group exists
The project SHALL contain a `src/app/(auth)/` route group with its own `layout.tsx` and sub-routes for `login`, `register`, and `forgot-password`.

#### Scenario: Auth pages are accessible at their expected paths
- **WHEN** the Next.js dev server resolves `/login`, `/register`, or `/forgot-password`
- **THEN** the corresponding `page.tsx` under `src/app/(auth)/` is rendered without the dashboard layout

### Requirement: Dashboard route group exists
The project SHALL contain a `src/app/(dashboard)/` route group with a shared `layout.tsx` (header + sidebar wrapper) and sub-routes for the root `/`, `emails`, `services`, `users`, `subscriptions`, and `settings`.

#### Scenario: Dashboard pages share the protected layout
- **WHEN** the Next.js dev server resolves `/`, `/emails`, `/services`, `/users`, `/subscriptions`, or `/settings`
- **THEN** the corresponding `page.tsx` under `src/app/(dashboard)/` is rendered inside the dashboard layout

### Requirement: Dynamic segment pages exist
The project SHALL include `[id]/page.tsx` dynamic segments under `emails/`, `services/`, `users/`, and `subscriptions/` routes inside the dashboard group.

#### Scenario: Detail page resolves with a dynamic id
- **WHEN** the Next.js router resolves a path like `/emails/123`
- **THEN** the `src/app/(dashboard)/emails/[id]/page.tsx` file is rendered with the `id` param available

### Requirement: Root layout wraps all routes
The project SHALL have `src/app/layout.tsx` as the root layout and `src/app/globals.css` imported within it.

#### Scenario: Root layout is present and valid
- **WHEN** Next.js builds the application
- **THEN** `src/app/layout.tsx` exports a default `RootLayout` component and imports `globals.css`
