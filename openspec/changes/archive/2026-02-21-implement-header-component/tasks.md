## 1. Scaffold Component

- [x] 1.1 Extract the `<header>` block from `reference/sidebar/code.html` (lines 68-108).
- [x] 1.2 Paste the HTML into `src/components/layout/header.tsx`.
- [x] 1.3 Convert all `class="..."` attributes to React's `className="..."`.

## 2. Fix Tags and Props

- [x] 2.1 Convert the `<img>` tag to be self-closing (`<img ... />`).
- [x] 2.2 Verify that the `style="font-size: 20px;"` attributes, if any were copied into the header block, are converted to React style objects (e.g., `style={{ fontSize: '20px' }}`).
- [x] 2.3 Ensure the default export is a valid React functional component named `Header`.

## 3. Verify Integration

- [x] 3.1 Verify that `src/components/layout/dashboard-shell.tsx` (or `(dashboard)/layout.tsx`) imports and renders the `<Header />` component.
- [x] 3.2 Run the Next.js dev server (`bun run dev`).
- [x] 3.3 Visit the dashboard (`http://localhost:3000/`) and verify the header renders at the top with the sticky behavior and matching visual styles from the reference.
