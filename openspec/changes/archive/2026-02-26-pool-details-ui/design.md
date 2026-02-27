## Context

The current Pool Details page (`app/(dashboard)/pools/[id]/page.tsx`) uses a standard stacked vertical layout containing a header, progress bar, action buttons, and a data table. The user has provided a new reference HTML/Tailwind mockup (`reference/pool_details/code.html`) that introduces a more sophisticated two-column layout:
1.  **Sidebar (`aside`)**: Displays the pool's metadata (account email, seats filled, expiration date, progress bar).
2.  **Main Area (`main`)**: Contains the member list and primary actions.

The goal is to implement this high-quality, modern design while preserving the existing functionality (server actions fetching the pool, `AddMemberDialog` for adding a member, and delete actions inside the `SeatsTable`).

## Goals / Non-Goals

**Goals:**
-   Refactor `app/(dashboard)/pools/[id]/page.tsx` to adopt the two-column sidebar + main content layout provided in the mockup.
-   Update typography, colors, and styling (e.g., table styling, badges) to match the crisp aesthetic of the reference HTML.
-   Integrate existing interactive components (`AddMemberDialog`, `ActivateButton`, and Delete actions inside the table) into the new UI without breaking their behavior.
-   Map the mockup's CSS variables and hardcoded colors to the application's existing Tailwind CSS theme (e.g., reusing `bg-primary`, `text-muted-foreground` where appropriate) to ensure dark mode support and consistency.
-   Swap out the Material Symbols used in the HTML mockup for the equivalent `lucide-react` icons already standard in the project.

**Non-Goals:**
-   No changes to database models or Prisma schemas.
-   No changes to existing server actions and backend logic.
-   No new features (e.g., we are not adding payment processing, despite the hardcoded "Paid" badge in the mockup; we will map the UI status badge to existing application logic or hardcode it as requested if data is missing).

## Decisions

-   **Layout Implementation**: We will replace the root `div` in `pools/[id]/page.tsx` with a flex container. The left side will be an `<aside>` component (or inline block) restricted to medium/large screens (e.g., `hidden lg:block w-80`), and the right side will be the `<main flex-1>` content block for the tables.
-   **Mobile Responsiveness**: Since the mockup hides the sidebar on smaller screens (`hidden lg:block`), we will need to either stack the sidebar above the main content on mobile screens or provide a simplified summary on mobile to ensure users can still see the pool's metadata (like expiration and account). For simplicity and adherence, we will turn the sidebar into a stacked top-section on mobile sizes (`block lg:w-80 lg:hidden` equivalent).
-   **Component Refactoring**:
    -   `PoolDetailHeader` and the associated progress bar logic will be moved almost entirely into the new Sidebar layout.
    -   `SeatsTable`: Will be heavily updated to match the new table design (border radius, gray headers, specific row hovers). We will replace the hardcoded mockup data with actual mapping of `pool.seats`.
    -   `Add Member Button`: The trigger for `AddMemberDialog` will be updated to match the big black/dark-gray button style in the mockup (`bg-gray-900 hover:bg-black text-white`).
-   **Icons**: Replace the HTML mockup's `<span class="material-symbols-outlined">person_add</span>` with `<UserPlus />` from `lucide-react`, `search` with `<Search />`, etc., maintaining project consistency.

## Risks / Trade-offs

-   [Risk] **Mobile Usability**: The mockup hides the sidebar on mobile (`hidden lg:block`), which contains critical information.
    -   **Mitigation**: Instead of hiding it entirely, we will use responsive classes to stack the sidebar content vertically on small screens (`flex-col lg:flex-row`), ensuring the data remains accessible.
-   [Risk] **Theme Variable Mismatches**: Mockup uses hardcoded UI colors (e.g., `#10b981`).
    -   **Mitigation**: We will map these colors to existing Shadcn/Tailwind CSS variables (e.g., `theme('colors.primary.DEFAULT')`) to ensure smooth scaling and proper dark mode toggling.
