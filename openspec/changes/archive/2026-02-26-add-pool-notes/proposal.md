## Why

Admins need a way to attach freeform reminder notes to a pool — things like "Get charged $20", "Forget to cancel", or "Payment auto-renews on the 15th". Currently there's no place to store per-pool context, forcing admins to track these reminders externally.

## What Changes

- Add a `notes` field (optional, text) to the `Pool` model in the Prisma schema.
- Display the notes field on the pool detail page (`/pools/[id]`) in the pool header/metadata area.
- Allow admins to add/edit/clear pool notes inline or via the existing edit pool dialog.
- Notes are stored as plain text; no length enforcement on the UI (DB uses `TEXT`).

## Capabilities

### New Capabilities

- `pool-notes`: Ability to store, display, and edit a freeform text note on each pool.

### Modified Capabilities

- `admin-pool-management`: The pool detail view and pool edit flow now include a `notes` field, changing the requirements for what data is shown and editable on a pool.

## Impact

- **Prisma schema** (`prisma/schema.prisma`): `Pool` model gains a `notes String?` field → requires a new migration.
- **Server actions** (`src/actions/pools.ts`): `createPool` and `updatePool` actions must accept and persist `notes`.
- **Pool detail page** (`src/app/(dashboard)/pools/[id]/page.tsx`): Fetch and pass `notes` to the header component.
- **Pool detail header** (`src/components/pools/pool-detail-header.tsx`): Render `notes` in the metadata section.
- **Edit pool dialog** (`src/components/pools/`): Extend the edit form to include a `notes` textarea.
