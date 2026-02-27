## Context

Currently, the `Member` model strictly requires a `phone` number, which is marked as `@unique`. This phone number serves as the primary identifier to look up and reuse an existing member when assigning they are added to a pool. In many administrative workf
lows, the member's name is known but the phone number is either unknown, not provided, or simply unnecessary to track immediately. This strict constraint prevents fast and flexible pool assignments.

## Goals / Non-Goals

**Goals:**
- Make the `phone` field optional on the `Member` model.
- Make the `name` field the primary attribute used to match and reuse existing members when assigning them to pools.
- Ensure case-insensitive matching for member names (e.g., "john" matches "John") to prevent the accidental creation of duplicate records for the same person.

**Non-Goals:**
- Adding rigid uniqueness constraints to the `name` field at the database level.
- Building complex "merge member" functionality for deduplicating already existing duplicates.

## Decisions

1. **Update `Member` Prisma Model:**
   - Change `phone` from `String @unique` to `String?`.
   - *Rationale*: We are removing the `@unique` constraint entirely to prevent any edge cases where empty strings might trigger a unique constraint violation, and because the phone number is no longer the definitive identifier.

2. **Case-Insensitive Database Querying for Matching:**
   - Use Prisma's `mode: 'insensitive'` when querying the `Member` table by `name` during pool assignment or member creation.
   - *Rationale*: PostgreSQL combined with Prisma supports case-insensitive querying easily: `db.member.findFirst({ where: { name: { equals: reqName, mode: 'insensitive' } } })`. This avoids doing application-side filtering or adding a new "lowercase" column.

3. **Update Validation Schemas:**
   - Update any Zod validation schemas associated with member creation/editing in server actions to accept `phone` as `.optional()` or `.nullable()`.
   - Ensure the UI components don't enforce `required` on the phone input fields.

## Risks / Trade-offs

- *Risk*: Distinct users with exactly the same name will be merged into the same `Member` record automatically.
  - *Mitigation*: Accepted trade-off for administrative speed. If a truly distinct user with the same name exists, the administrator can add an initial or suffix (e.g., "Jane Doe (2)") to force a new record.
- *Risk*: Removing the unique constraint on `phone` could lead to multiple distinct members having the same phone number.
  - *Mitigation*: Since `name` is the primary anchor now, a duplicated phone number is not system-breaking.
