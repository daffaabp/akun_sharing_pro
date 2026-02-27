# Architecture Design: Subscription Pooling

## Context
The goal is to implement a "Group Buy" or "Pool" system for shared software subscriptions (e.g., Cursor, ChatGPT). Currently, the system manages services but lacks the ability to group interested users and track their shared access.

This design introduces the data structures required to hold users in a "waiting room" (Pool) until enough people join, and then linking them to a real, purchased Subscription.

## Goals / Non-Goals

**Goals:**
- Allow admins to create Pools with a target number of seats for a chosen Service.
- Allow users (Members) to join an open Pool.
- Allow admins to convert a full Pool into an Active Subscription with a unified start and end date for all members in the pool.
- Establish a single source of truth for subscription validity (the `Subscription` record).

**Non-Goals:**
- Payment processing or invoice generation (this will be handled externally or in a future iteration; currently trusting manual verification).
- Automated purchasing of the underlying service (the admin still manually buys the Cursor sub with the pooled funds).

## Decisions
1. **Separation of Pool and Subscription:** 
   - A `Pool` represents the intent to buy. A `Subscription` represents the actual active purchase.
   - This provides a clean mental model and isolates billing data (passwords, dates) from the "waiting room" phase.
2. **Centralized Billing Dates:**
   - Members (`PoolSeat`) do not have individual start/end dates. They inherit the start/end date from the `Subscription` linked to their `Pool`. 
   - *Rationale:* Ensures everyone is on the same billing cycle automatically. If the admin renews the master Subscription, everyone's dashboard immediately reflects the new expiry date.
3. **Admin Actions vs. User Actions:**
   - Users can only join/leave `Open` pools.
   - Only admins can change a pool's status to `Active` and bind it to a `Subscription`.

## Data Model Changes (Prisma)
- **`Member`**: Represents a user. We may re-use an existing user model if one exists, or create a new one. For this specific scope, we assume a basic `Member` model with an email.
- **`Pool`**: Links to a `Service`. Has `targetSeats` and `status` (`OPEN`, `READY`, `ACTIVE`).
- **`PoolSeat`**: The bridging table between a `Member` and a `Pool`.
- **`Subscription`**: The master account details. Has an `emailId` (the master account email), `startDate`, `endDate`, and a back-relation to the `Pool`.

## Risks / Trade-offs
- **Complexity of State:** Pools transition through multiple states (`OPEN` -> `READY` -> `ACTIVE`). The UI will need to handle edge cases, such as a user trying to leave an `ACTIVE` pool.
- **Data Integrity:** Ensuring a `Subscription` is only mapped to an `ACTIVE` pool. Database constraints and application logic must enforce this. We will use a unique relation between Pool and Subscription to ensure 1:1 mapping.
