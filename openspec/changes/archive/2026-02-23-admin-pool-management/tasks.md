## 1. Schema Updates

- [x] 1.1 Add `phone` (String, unique) to `Member` model; make `email` optional.
- [x] 1.2 Add `paymentStatus` field to `PoolSeat` (`PENDING` | `PAID` | `REFUNDED`, default `PENDING`).
- [x] 1.3 Run `bunx prisma db push` to apply schema changes.

## 2. Server Actions

- [x] 2.1 Add `addMemberToPool(poolId, { name, phone, email? })` action — upsert Member by phone then create PoolSeat.
- [x] 2.2 Add `removeSeat(seatId)` action — delete a PoolSeat record.
- [x] 2.3 Add `updateSeatPayment(seatId, paymentStatus)` action — update payment status on a seat.
- [x] 2.4 Add `getActivePools()` action — fetch all ACTIVE pools with subscription and seat count.

## 3. Pool Detail Page (`/pools/[id]`)

- [x] 3.1 Create `src/app/(dashboard)/pools/[id]/page.tsx` — server component loading pool + seats.
- [x] 3.2 Create `PoolDetailHeader` component — shows name, service, status badge, seat count, expiry date.
- [x] 3.3 Create `SeatsTable` component — table of seats with name, phone, payment badge, joined date, actions.
- [x] 3.4 Create `AddMemberDialog` — form with name + phone fields; calls `addMemberToPool`.
- [x] 3.5 Create `PaymentToggleButton` client component — inline button to toggle PENDING/PAID.

## 4. Pools Table — Add Row Link

- [x] 4.1 Make each pool row in `pools-table.tsx` clickable / add a "View" button linking to `/pools/[id]`.

## 5. Subscriptions Page — Repurpose as Overview

- [x] 5.1 Rewrite `/subscriptions/page.tsx` to show all ACTIVE pools with service, master email, expiry date.
- [x] 5.2 Delete or archive `open-pools-list.tsx` and `active-subscriptions.tsx` (no longer needed).
