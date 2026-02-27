## Context

The `<Header>` component is part of the core dashboard layout (`src/components/layout/header.tsx`). Currently, it's just an empty stub. We have a reference HTML design ("Header Variant 2") that provides the exact markup and Tailwind CSS classes needed to build the polished top navigation bar. This header includes responsive elements, breadcrumbs, user action buttons (help, notifications), and a profile dropdown trigger.

## Goals / Non-Goals

**Goals:**
- Implement the `<Header>` component matching the reference HTML markup.
- Ensure all Tailwind CSS classes (including dark mode `dark:` variants and responsive `lg:` variants) are preserved.
- Use `next/image` for the profile avatar.
- Replace hardcoded Google Material Symbols `<span class="material-symbols-outlined">` with standard Next.js-friendly icons, ideally Lucide React (standard in ecosystems like shadcn/ui) or just keeping the HTML if the project imports the font globally. For this scaffold, we will keep the exact HTML structure (`material-symbols-outlined`) assuming the font is available or will be added.

**Non-Goals:**
- Implementing functional state (the dropdown menu will not open yet, notifications will not be clickable).
- Wiring up actual user data to the avatar/name.
- Implementing the mobile sidebar toggle logic (the button will be present but inert).

## Decisions

### 1. Icon Strategy
**Decision**: Stick to the Google Material Symbols HTML syntax `<span class="material-symbols-outlined">icon_name</span>` as provided in the reference HTML.
**Rationale**: The reference HTML explicitly uses this web font. Adopting it verbatim ensures 100% visual fidelity without requiring us to figure out which React icon library the project uses.

### 2. Avatar Image Handling
**Decision**: Use an `img` tag pointing to the external URL for now, or the standard `next/image` if the host is configured. Since `next/image` requires host configuration in `next.config.mjs` for external URLs (like `lh3.googleusercontent.com`), we will use a standard `<img>` tag initially to prevent build errors related to unconfigured image domains.
**Rationale**: Avoids Next.js build configuration friction for a purely cosmetic scaffold.

### 3. Styling & Layout
**Decision**: Extract the `<header>` element from `reference/sidebar/code.html` exactly.
**Rationale**: The HTML uses `sticky top-0 z-50 backdrop-blur-md` along with specific bg colors (`bg-[#151b23]`). Copying the JSX verbatim ensures the header behaves perfectly within the layout grid. 
Note that `class="..."` will be converted to `className="..."`.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Google Material Symbols font is not imported in `layout.tsx`, causing icons to fallback to text | We will just document that the font needs to be available in the global layout if it isn't already. |
| External avatar image URL expires | It's just a placeholder; it will eventually be replaced by dynamic user data. |
