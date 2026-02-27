## 1. Setup and Mobile Layout Foundation

- [x] 1.1 Update `app/(dashboard)/pools/[id]/page.tsx` structural layout to use a flex container (mobile: `flex-col`, desktop: `lg:flex-row`).
- [x] 1.2 Adapt the main layout logic to reserve space for the new Sidebar and the Main Area content.

## 2. Pool Metadata Sidebar

- [x] 2.1 Extract or move pool metadata details (target limits, filled seats, expiration dates) into a new sticky sidebar block matching the HTML mockup.
- [x] 2.2 Update the "Seat Capacity" progress bar logic into the sidebar.
- [x] 2.3 Refactor the Header contents (Title, Status Badge) to live at the top of the sidebar.
- [x] 2.4 Incorporate `lucide-react` icons (e.g., `Users`, `Calendar`, `UserCircle`) instead of the Material Icons referenced in the mockup.

## 3. Main Area & Members Table

- [x] 3.1 Move the main member list layout into the right-hand `flex-1` main area section.
- [x] 3.2 Add the prominent "Add Member" block at the top of the main section using the `AddMemberDialog` component customized with the black button styling.
- [x] 3.3 Update `SeatsTable` (or replace with direct inline mapping depending on code structure) to reflect the exact column headers and styles from the mockup (`Name`, `Phone / WhatsApp`, `Payment`, `Added`, `Actions`).
- [x] 3.4 Ensure the "Actions" column contains the updated trash bin delete button matching the styling from the reference mockup (e.g., `<Trash />` icon, red hover states) mapped to the existing `removeMember` logic.
- [x] 3.5 Use `Badge` components (or Tailwind primitives mapped to theme colors) to show the payment status (hardcoded or mapped from logic) as seen in the mockup.

## 4. Final Polish and Integration Check

- [x] 4.1 Test the page on mobile breakpoints to ensure the sidebar correctly stacks vertically and looks good.
- [x] 4.2 Validate that the `AddMemberDialog` triggers correctly without visual breakage.
- [x] 4.3 Validate that member deletion functions correctly using the updated UI element.
