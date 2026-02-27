## Why

Currently, adding a member requires a phone number, and reusing an existing member is based on matching that phone number. In practice, administrators might only know the member's name initially, and phone numbers might not be available or strictly required. This change makes it easier and faster to assign members to pools by matching them based on their name (in lowercase) and making the phone number optional.

## What Changes

- Make the `phone` field on the `Member` model optional (nullable).
- Remove the strict uniqueness constraint on `phone` if it was enforcing required uniqueness.
- **BREAKING**: Change the identity matching logic when adding a member to a pool from matching by `phone` to matching by `name` (using a case-insensitive/lowercase comparison).
- If a member is being added to a pool and their name matches an existing member (case-insensitive), assign the existing member instead of creating a new one.
- If the name does not match any existing member, create a new member with the provided details.
- Update the UI forms for adding/editing members (in `/users` and `/pools/[id]`) to reflect that the phone number is now optional.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `admin-pool-management`: When assigning a member from the pool detail page, matching now occurs based on the `name` field (lowercase comparison) instead of `phone`. Phone input is optional.
- `user-management`: The `phone` field is no longer required when adding or editing a member.

## Impact

- **Database**: The Prisma schema `Member` model will need an update to make `phone` optional. Any related unique constraints on `phone` might need adjusting (e.g., allow multiple nulls or remove uniqueness if names are the new primary identifier). 
- **API/Actions**: Server actions for creating/assigning members need to be updated to implement the case-insensitive name matching logic (`toLowerCase()`).
- **UI Forms**: The validation schemas (Zod or similar) for adding members in `/pools/[id]` and `/users` will change to make `phone` optional.
