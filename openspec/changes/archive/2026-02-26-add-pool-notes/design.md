## Context

The `Pool` model in `prisma/schema.prisma` already has several inline subscription fields (`masterEmail`, `password`, `startDate`, `endDate`, `planType`) appended directly — notes will follow this same pattern as an optional `String?` field. The pool detail page (`/pools/[id]`) uses a `PoolDetailSidebar` component (`pool-detail-header.tsx`) to display metadata. The edit dialog (`edit-pool-dialog.tsx`) currently manages `targetSeats` and `status`. Server actions live in `src/app/actions/pools.ts`.

## Goals / Non-Goals

**Goals:**
- Add `notes String?` to the `Pool` model and generate a migration.
- Pass `notes` through `getPoolById`, display it in the sidebar, and allow editing it via the `EditPoolDialog`.
- Update `editPool` server action to accept and persist `notes`.

**Non-Goals:**
- Per-seat notes (separate concern, `PoolSeat.notes` already exists but is not wired up).
- Rich text / markdown rendering for notes.
- Notes history / audit trail.
- Notes on `createPool` (can be left empty; notes are added post-creation via edit).

## Decisions

### Decision 1: Store notes as `String?` on the `Pool` model directly (no separate table)
Notes are a simple, single admin-facing memo. A separate join table would add complexity for no benefit at this scale.
- **Alternative considered**: Separate `PoolNote` model with timestamps → overkill for a single text field with no versioning requirement.

### Decision 2: Edit notes via the existing `EditPoolDialog` (extend, don't create a new dialog)
The edit dialog is already the canonical place to mutate pool properties. Adding a `Textarea` for notes keeps the editing surface consolidated.
- **Alternative considered**: Inline edit on the sidebar with a click-to-edit pattern → more complex, would require additional client-side state in a Server Component context.

### Decision 3: Display notes in the `PoolDetailSidebar` below the metadata block
The sidebar is already the metadata area. Notes naturally live there as a "memo" section with a `StickyNote` or `FileText` icon and read-only text. Empty notes show nothing (no empty placeholder).
- **Alternative considered**: Main content area above the seats table → sidebar is the right home for contextual pool info.

### Decision 4: `editPool` action accepts `notes?: string | null`
The action already accepts a partial data object. Extending it with `notes` keeps the pattern consistent with other optional fields. Pass `null` to explicitly clear notes.

## Risks / Trade-offs

- **Migration required** → Prisma `migrate dev` must be run; zero data loss risk since the field is optional with `null` default.
- **`EditPoolDialog` receives `notes` prop** → The pools table and pool detail page that render this dialog need to pass `pool.notes` as part of the pool object. This widens the `Pool` type in the dialog's prop interface.

## Migration Plan

1. Add `notes String?` to `Pool` in `schema.prisma`.
2. Run `bunx prisma migrate dev --name add_pool_notes` to generate and apply the migration.
3. Update `editPool` action signature and Prisma call.
4. Update `getPoolById` (already returns all pool fields via `findUnique` — no query change needed).
5. Update `PoolDetailSidebarProps` interface and render notes when present.
6. Update `EditPoolDialog` `Pool` type + form state + `Textarea` input.
7. Update all call sites of `EditPoolDialog` that construct the `pool` prop to include `notes`.

## Open Questions

- None. Scope is well-defined.
