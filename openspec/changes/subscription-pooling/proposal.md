# Subscription Pooling

## Problem
Currently, the application allows managing master emails and their associated services, but it lacks a structured way to handle the scenario where multiple users want to share a single subscription, pool their resources, and get a shared start/end date for accountability. Furthermore, we want to allow users to "pool" together first (e.g., waiting room for 5 people) before actually purchasing the subscription. 

## Proposed Solution
We will implement a "Subscription Pooling" feature. This involves introducing the concepts of a `Pool` (a waiting room for a specific service with a target seat limit), `PoolSeat` (representing a user claiming a spot in the pool), and `Subscription` (the actual master account purchase). 

The flow will be:
1.  **Open Phase:** A Pool is created for a service with a target number of seats.
2.  **Gathering Phase:** Users join the Pool, reserving seats.
3.  **Active Phase:** Once the pool is full, an admin purchases the actual subscription. A `Subscription` record is created with start/end dates, which is then linked to the `Pool`. All users in the pool inherit these dates.

This requires:
-   Database schema updates to introduce `Pool`, `PoolSeat`, and `Subscription` models, while relating them to existing `Service` and adding a `Member` model (or adapting existing user structures).
-   UI to create and manage Pools.
-   UI for members to join Pools.
-   UI to convert a full Pool into an Active Subscription.

## Capabilities

### New Capabilities
- `subscription-pooling`: The core logic for creating pools, joining pools, and converting them to active subscriptions, along with the underlying database schema.

### Modified Capabilities
<!-- None -->

## Impact
- **Database Schema (Prisma):** Significant additions (`Pool`, `PoolSeat`, `Subscription`, `Member`).
- **Backend (Next.js Server Actions/API):** New endpoints/actions for managing pools and joining them.
- **Frontend (UI Components & Pages):** New pages for viewing available pools, pool details, and administration of pools.
