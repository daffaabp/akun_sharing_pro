## 1. Database Schema Updates

- [x] 1.1 In `prisma/schema.prisma`, update the `Member` model by making the `phone` field optional `String?` and removing the `@unique` constraint.
- [x] 1.2 Run Prisma migration to apply the schema change (`bun prisma migrate dev --name make_phone_optional`).
- [x] 1.3 Verify the generated migration did not unexpectedly drop data and apply it.

## 2. Server Action Updates

- [x] 2.1 Identify server actions responsible for creating and editing members (e.g. in `src/actions/users.ts` or similar). Update the input validation schema (Zod) to make `phone` optional.
- [x] 2.2 Identify server actions responsible for assigning members to pool seats (e.g. in `src/actions/pools.ts`). Update its validation schema to make `phone` optional.
- [x] 2.3 Update the pool seat assignment action: Change the member lookup logic to search by `name` using case-insensitive mode (`mode: 'insensitive'`) rather than searching strictly by `phone`.
- [x] 2.4 If a member exists with the same name, reuse that `memberId` for the `PoolSeat`. If not, create a new `Member`. Ensure the action gracefully handles phone number arguments when creating new users.

## 3. UI and Component Updates

- [x] 3.1 Update the form component for creating/editing users (e.g. `src/app/(dashboard)/users/components/user-form.tsx` or similar). Ensure the `phone` field is no longer marked as required or enforcing `.min()` in its Zod schema.
- [x] 3.2 Update the form component for adding a member to a pool seat (e.g. `src/app/(dashboard)/pools/[id]/components/add-member-form.tsx` or similar). Ensure the `phone` input is visually marked as optional and its client-side validation logic permits empty/null values.

## 4. Testing & Verification

- [x] 4.1 Verify that an Admin can successfully add a new member from the Pool Details page by only providing a name.
- [x] 4.2 Verify that assigning another member with the exact same name (case-insensitive) assigns the existing member instead of creating a duplicate.
- [x] 4.3 Verify that creating and editing a member from the main `/users` page works perfectly with and without a phone number.
