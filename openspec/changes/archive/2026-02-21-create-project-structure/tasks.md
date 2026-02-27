## 1. Project Root Files

- [x] 1.1 Verify `package.json` exists at root; create it with Next.js + TypeScript dependencies if missing
- [x] 1.2 Verify `next.config.ts` exists at root; create a minimal config if missing

## 2. Root App Layout & Global Styles

- [x] 2.1 Create `src/app/globals.css` with minimal reset/base styles
- [x] 2.2 Create `src/app/layout.tsx` exporting a `RootLayout` component that imports `globals.css`

## 3. Auth Route Group — `(auth)`

- [x] 3.1 Create `src/app/(auth)/layout.tsx` exporting a minimal layout (no dashboard chrome)
- [x] 3.2 Create `src/app/(auth)/login/page.tsx` with a stub `LoginPage` default export
- [x] 3.3 Create `src/app/(auth)/register/page.tsx` with a stub `RegisterPage` default export
- [x] 3.4 Create `src/app/(auth)/forgot-password/page.tsx` with a stub `ForgotPasswordPage` default export

## 4. Dashboard Route Group — `(dashboard)`

- [x] 4.1 Create `src/app/(dashboard)/layout.tsx` exporting a layout wrapping `<DashboardShell>`
- [x] 4.2 Create `src/app/(dashboard)/page.tsx` (root `/`) with a stub `DashboardHomePage` default export
- [x] 4.3 Create `src/app/(dashboard)/emails/page.tsx` with a stub `EmailsPage` default export
- [x] 4.4 Create `src/app/(dashboard)/emails/[id]/page.tsx` with a stub `EmailDetailPage` default export
- [x] 4.5 Create `src/app/(dashboard)/services/page.tsx` with a stub `ServicesPage` default export
- [x] 4.6 Create `src/app/(dashboard)/services/[id]/page.tsx` with a stub `ServiceDetailPage` default export
- [x] 4.7 Create `src/app/(dashboard)/users/page.tsx` with a stub `UsersPage` default export
- [x] 4.8 Create `src/app/(dashboard)/users/[id]/page.tsx` with a stub `UserDetailPage` default export
- [x] 4.9 Create `src/app/(dashboard)/subscriptions/page.tsx` with a stub `SubscriptionsPage` default export
- [x] 4.10 Create `src/app/(dashboard)/subscriptions/[id]/page.tsx` with a stub `SubscriptionDetailPage` default export
- [x] 4.11 Create `src/app/(dashboard)/settings/page.tsx` with a stub `SettingsPage` default export

## 5. API Routes

- [x] 5.1 Create `src/app/api/auth/route.ts` exporting a `GET` handler returning `Response.json({})`
- [x] 5.2 Create `src/app/api/emails/route.ts` exporting a `GET` handler returning `Response.json({})`
- [x] 5.3 Create `src/app/api/services/route.ts` exporting a `GET` handler returning `Response.json({})`
- [x] 5.4 Create `src/app/api/subscriptions/route.ts` exporting a `GET` handler returning `Response.json({})`

## 6. Layout Components

- [x] 6.1 Create `src/components/layout/header.tsx` exporting a stub `Header` default component
- [x] 6.2 Create `src/components/layout/sidebar.tsx` exporting a stub `Sidebar` default component
- [x] 6.3 Create `src/components/layout/dashboard-shell.tsx` exporting a `DashboardShell` component that renders `<Header>`, `<Sidebar>`, and `{children}`

## 7. UI Primitive Components

- [x] 7.1 Create `src/components/ui/button.tsx` exporting a stub `Button` component
- [x] 7.2 Create `src/components/ui/input.tsx` exporting a stub `Input` component
- [x] 7.3 Create `src/components/ui/modal.tsx` exporting a stub `Modal` component

## 8. Feature Component Directories

- [x] 8.1 Create `src/components/features/emails/.gitkeep`
- [x] 8.2 Create `src/components/features/services/.gitkeep`
- [x] 8.3 Create `src/components/features/subscriptions/.gitkeep`

## 9. Lib Utilities

- [x] 9.1 Create `src/lib/auth.ts` with `export {};` placeholder
- [x] 9.2 Create `src/lib/db.ts` with `export {};` placeholder (Prisma client will be wired here later)
- [x] 9.3 Create `src/lib/utils.ts` with `export {};` placeholder

## 10. Middleware

- [x] 10.1 Create `src/middleware.ts` exporting a pass-through `middleware` function and a `config` matcher covering `/((?!_next|api/auth).*)` paths under the dashboard group

## 11. Prisma Setup

- [x] 11.1 Create `prisma/schema.prisma` with `datasource db { provider = "postgresql", url = env("DATABASE_URL") }` and `generator client { provider = "prisma-client-js" }` blocks — no models

## 12. Verify

- [x] 12.1 Run `bun run dev` (or `next build`) and confirm zero TypeScript errors and a clean dev server start
- [x] 12.2 Spot-check routes `/login`, `/register`, `/`, `/emails`, `/settings` resolve to their respective page stubs without 404
