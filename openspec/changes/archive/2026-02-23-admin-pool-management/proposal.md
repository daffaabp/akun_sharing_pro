# Admin Pool Management

## Problem
The current pool implementation has a self-serve "join pool" mechanism designed for public members. However, the app is purely an **internal admin tool** — the admin both creates pools AND manually assigns customers to seats. There are no public-facing member actions.

Additionally, the current `Member` model lacks contact information (phone/WhatsApp), and `PoolSeat` lacks a payment status field, both of which are essential for the admin to track real customers.

The current `/subscriptions` page (member self-serve view) is unnecessary and should be replaced.

## Proposed Solution
Rework the pools feature to be fully admin-managed:

1. **Schema updates**: Add `phone` and `notes` to `Member`; add `paymentStatus` to `PoolSeat`.
2. **Pool Detail Page** at `/pools/[id]`: Admin view showing all seats in a pool — member name, contact, payment status, and the shared expiry date from the linked Subscription.
3. **Add Member to Pool**: Admin can manually add a customer (new or existing `Member`) to a seat directly from the pool detail page.
4. **Remove self-serve UI**: Delete/repurpose `open-pools-list.tsx` and the `/subscriptions` page.
5. **Subscriptions page**: Repurpose to show a flat list of all ACTIVE pools with their expiry dates as a quick overview dashboard.

## Capabilities

### New Capabilities
- `admin-pool-management`: Pool detail page with seat management, member assignment, payment tracking, and expiry overview.

## Impact
- **Database Schema (Prisma):** Add `phone` to `Member`, `paymentStatus` to `PoolSeat`.
- **Server Actions:** New actions for adding a member to a pool seat and removing a seat.
- **Pages:** New `/pools/[id]` detail page; rework `/subscriptions` as an overview.
- **Components:** New `PoolDetail`, `AddMemberDialog`; remove `OpenPoolsList`, `ActiveSubscriptions`.
