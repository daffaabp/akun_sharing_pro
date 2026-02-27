## 1. Page Layout Updates

- [x] 1.1 Update `src/app/(dashboard)/services/page.tsx` wrapper padding and classes to match `/emails`.
- [x] 1.2 Update the page title (`<h2>`) in `src/app/(dashboard)/services/page.tsx` to use `text-2xl`.
- [x] 1.3 Move the page description (`<p>`) in `src/app/(dashboard)/services/page.tsx` to be directly under the `<h2>` inside the same flex layout div.
- [x] 1.4 Update the page description typography class to `text-sm text-muted-foreground` in `src/app/(dashboard)/services/page.tsx`.

## 2. Table Component Refactoring

- [x] 2.1 Refactor `src/components/services/services-table.tsx` to remove `shadcn/ui` table components (`Table`, `TableHeader`, etc.) and replace them with raw HTML table elements.
- [x] 2.2 Apply matching Tailwind structure classes to the new `services-table.tsx` (`bg-white border`, `overflow-x-auto`, `w-full text-left border-collapse`).
- [x] 2.3 Apply matching styling classes to the `<thead>` and `<th>` elements in `services-table.tsx` (e.g., `text-[11px] font-bold text-slate-400 uppercase tracking-wider`).
- [x] 2.4 Update the `<tbody>` and `<tr>` row styling in `services-table.tsx` (`divide-y divide-slate-100`, `transition-colors hover:bg-slate-50/50`).
- [x] 2.5 Refactor the `getStatusBadge` function in `services-table.tsx` to return custom inline span elements styled like `STATUS_STYLE` from `emails-table.tsx`, replacing the `shadcn/ui` `Badge`.

## 3. Data Integration & Actions (User Request)

- [x] 3.1 Implement `actions/services.ts` to interact with Prisma DB `Service` model.
- [x] 3.2 Create `add-service-button.tsx` server action component for adding new services.
- [x] 3.3 Link data fetching and rendering in `/services/page.tsx`, updating `services-table.tsx` type definitions to accept real database records rather than mock types.
- [x] 3.4 Add action fields (View, Edit, Delete) to the `services-table.tsx` and implement the `edit-service-dialog.tsx` component.
