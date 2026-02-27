## 1. Implementation

- [x] 1.1 Convert `src/components/layout/header.tsx` to a Client Component by adding `"use client";` at the top and importing `usePathname` from `next/navigation`.
- [x] 1.2 Define the navigation menu mapping inside `Header` (or extract from `Sidebar`) to look up route titles.
- [x] 1.3 Add logic in `Header` to find the active title based on `pathname`, defaulting to "Account Sharing Pro".
- [x] 1.4 Update the `<h2>` tag in `Header` to render the dynamically resolved title.

## 2. Review

- [x] 2.1 Navigate between different sidebar links (e.g., Services, Subscriptions) and verify the header title updates correctly.
