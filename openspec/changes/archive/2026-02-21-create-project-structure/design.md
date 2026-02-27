## Context

The project is a Next.js 16 account-sharing platform (`accountsharingpro`). The codebase is greenfield — no `src/` directory exists yet. The structure needs to be established before any feature work begins. The stack uses the Next.js App Router, TypeScript, Prisma (database ORM), and conventions from `DOCS/project-structure.md`.

## Goals / Non-Goals

**Goals:**
- Establish the full `src/` directory tree matching `DOCS/project-structure.md` exactly
- Create empty-but-valid TypeScript/TSX stub files at every leaf path so imports resolve
- Separate public (`(auth)`) and protected (`(dashboard)`) routes using Next.js route groups
- Place shared concerns (auth, db, utils) in `src/lib/`
- Add `prisma/schema.prisma` with a minimal valid Prisma datasource block
- Keep all stubs as pure scaffolding — no business logic yet

**Non-Goals:**
- Implementing any feature logic (auth, database models, UI components)
- Adding styling beyond the existing `globals.css`
- Configuring CI/CD, Docker, or deployment infrastructure
- Writing tests at this stage

## Decisions

### 1. Next.js App Router with route groups
**Decision**: Use `(auth)` and `(dashboard)` parenthesized route groups.
**Rationale**: Route groups allow separate layouts (no sidebar for auth, full dashboard layout for protected routes) without affecting the URL path. This is the idiomatic App Router pattern.
**Alternative considered**: Separate top-level `auth/` and `dashboard/` path segments — rejected because it pollutes URLs (e.g., `/dashboard/emails` instead of `/emails`).

### 2. Stub file content
**Decision**: Each `.tsx`/`.ts` stub exports a minimal valid default or named export so TypeScript doesn't error.
- `page.tsx` → `export default function Page() { return null; }`
- `layout.tsx` → `export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }`
- `route.ts` → `export function GET() { return Response.json({}); }`
- `lib/*.ts` → `export {};`
- `middleware.ts` → `export { default } from 'next/dist/server/web/exports/middleware';` or a pass-through

**Rationale**: TypeScript strict mode requires valid exports. Stubs that immediately compile let the dev server start clean on day one.

### 3. Prisma schema minimal setup
**Decision**: `prisma/schema.prisma` includes only the `datasource` and `generator` blocks, no models yet.
**Rationale**: Models belong to feature specs (e.g., `users`, `subscriptions`). Adding them here would skip the spec phase.

### 4. `src/middleware.ts` approach
**Decision**: Export a pass-through `middleware` function and a `config` matcher for `/(dashboard)/(.*)` routes.
**Rationale**: Placeholder that enforces the routing contract without coupling to any auth library yet. Auth library choice is deferred to the `lib-utilities` spec.

### 5. `src/components/features/` subdirectories
**Decision**: Create empty directories (`emails/`, `services/`, `subscriptions/`) with `.gitkeep` files.
**Rationale**: Git does not track empty directories. `.gitkeep` ensures the scaffold is version-controlled.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Stub files break linting (unused exports, empty returns) | Add `// eslint-disable-next-line` comments in stubs or defer lint config |
| `middleware.ts` matcher regex conflicts with future routes | Test matcher with `next/server` unit tests before wiring auth |
| `prisma/schema.prisma` without a `DATABASE_URL` env var causes `prisma generate` to fail | Document in `.env.example` that `DATABASE_URL` is required before running Prisma commands |
| Route group naming `(auth)` and `(dashboard)` could confuse contributors unfamiliar with App Router | Add a `README.md` in `src/app/` explaining the route group convention |
