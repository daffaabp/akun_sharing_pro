## Why

The project currently lacks a structured directory layout for the Next.js application. Establishing the canonical folder structure now ensures all future features are built in consistent, predictable locations and that the codebase is immediately understandable to any contributor.

## What Changes

- Create `src/app/` with root layout, global CSS, and route groups for auth and dashboard
- Create `src/app/(auth)/` route group with `login`, `register`, and `forgot-password` pages
- Create `src/app/(dashboard)/` route group with protected pages: home, emails, services, users, subscriptions, settings
- Create `src/app/api/` with route handlers for auth, emails, services, and subscriptions
- Create `src/components/` with `layout/`, `ui/`, and `features/` subdirectories and placeholder files
- Create `src/lib/` with `auth.ts`, `db.ts`, and `utils.ts`
- Create `src/middleware.ts` for route protection
- Create `prisma/schema.prisma`
- Ensure `package.json` and `next.config.ts` exist at root

## Capabilities

### New Capabilities

- `app-routing`: Next.js App Router route groups — `(auth)` for public routes and `(dashboard)` for protected routes, including all page files and layouts
- `api-routes`: API route handlers under `src/app/api/` for auth, emails, services, and subscriptions
- `component-library`: Base UI, layout, and feature components scaffolded under `src/components/`
- `lib-utilities`: Shared utilities for auth, database, and general helpers under `src/lib/`
- `prisma-setup`: Prisma schema file at `prisma/schema.prisma` for database modeling

### Modified Capabilities

*(none — this is initial scaffold)*

## Impact

- Creates the entire `src/` directory tree from scratch
- All future pages, components, and server actions should be placed within these directories
- Adds `prisma/` directory which will drive database migrations and Prisma Client generation
- No existing code is removed or modified
