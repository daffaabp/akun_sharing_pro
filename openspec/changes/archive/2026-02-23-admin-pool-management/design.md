## Context
The pool system was built with a self-serve member flow. Based on requirements clarification, the app is an internal admin tool only — the admin assigns customers to pool seats manually. No public-facing joins exist.

## Goals / Non-Goals
**Goals:**
- Admin can view a pool's detail page showing all assigned seats.
- Admin can add a customer (Member) to a pool seat from the detail page.
- Each seat shows: member name, phone/contact, payment status, and seat status.
- The shared expiry date is prominently displayed (pulled from Subscription).
- Admin can mark a seat's payment status (PENDING → PAID).
- Remove self-serve components (open-pools-list, active-subscriptions).
- Repurpose /subscriptions as a quick overview of all active pools.

**Non-Goals:**
- Any public-facing member login or portal.
- Automated payment processing.
- Email/WhatsApp notifications (future scope).

## Decisions
1. **Pool Detail at `/pools/[id]`**: The pools table links each pool row to its detail page. This is the core admin management screen.
2. **Add Member inline**: The "Add Member" dialog on the detail page lets admin type a name + phone. If a `Member` with the same phone already exists (returning customer), reuse them; otherwise create a new one.
3. **PaymentStatus on PoolSeat**: Three states — `PENDING`, `PAID`, `REFUNDED`. Admin toggles this directly from the seat row.
4. **Remove self-serve pages**: `open-pools-list.tsx`, `active-subscriptions.tsx` are deleted. `/subscriptions` is repurposed to be an "Active Pools Overview" dashboard.
5. **Phone as unique identifier for Member**: More practical than email for this use case (admin knows customers by phone/WhatsApp number). Email becomes optional.

## Risks / Trade-offs
- **Phone-as-identifier**: If admin enters the wrong phone number, a duplicate Member gets created. Mitigated by a fuzzy search/lookup before creation.
- **No auth yet**: All actions are admin-only by convention for now — no role enforcement in the current codebase.
