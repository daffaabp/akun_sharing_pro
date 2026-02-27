## 1. Database Schema

- [x] 1.1 Add `Member` model (or update existing User model if applicable) to Prisma schema.
- [x] 1.2 Add `Pool` model with `targetSeats`, `status`, and relation to `Service`.
- [x] 1.3 Add `PoolSeat` model to bridge `Member` and `Pool`.
- [x] 1.4 Add `Subscription` model with `startDate`, `endDate`, `emailId` and a back-relation to `Pool`.
- [x] 1.5 Run `npx prisma db push` (or `migrate dev`) to update the database.

## 2. Shared Utilities & Actions (Backend)

- [x] 2.1 Create server actions to fetch all Open pools.
- [x] 2.2 Create server actions for an admin to create a new Pool.
- [x] 2.3 Create server actions for joining a Pool (creating a `PoolSeat` and checking if target is reached).
- [x] 2.4 Create server actions for an admin to Activate a pool (creating the `Subscription` and linking it).

## 3. UI Implementation: Admin Pool Management

- [x] 3.1 Create an interface for Admins to view all Pools and their statuses.
- [x] 3.2 Add a form/dialog for Admins to create a new Pool linked to a Service.
- [x] 3.3 Add a form/dialog for Admins to convert a `READY` pool to `ACTIVE` by providing the master subscription details.

## 4. UI Implementation: Member Experience

- [x] 4.1 Update the dashboard to show available `OPEN` pools that the user can join.
- [x] 4.2 Implement the "Join Pool" button and handle success/error states.
- [x] 4.3 Update the user's dashboard to display their current active subscriptions, pulling the `endDate` from the master `Subscription` linked to their pool.
