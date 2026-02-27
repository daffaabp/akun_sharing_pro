## Why
The user provided a new HTML reference layout (`reference/new_layout/code.html`) representing an updated design for the application's header and sidebar components. Applying these changes ensures the application continuously reflects the latest design requirements and maintains visual consistency.

## What Changes
- Replace the current global sidebar component (`src/components/layout/sidebar.tsx`) HTML/CSS structure with the one provided in the new reference. 
- Replace the current global header component (`src/components/layout/header.tsx`) HTML/CSS structure with the one provided in the new reference.
- Adapt the class names, colors, and styling rules to match the Tailwind configuration and existing globals of the project.
- Integrate active state selection logic and dynamic routing for both components.

## Capabilities

### New Capabilities
- `refactored-layout`: Core layout structural update encompassing both the sidebar and header components.

### Modified Capabilities

## Impact
- **React Components**: Modifies `src/components/layout/sidebar.tsx`, `src/components/layout/header.tsx` and potentially tweaks `src/components/layout/dashboard-shell.tsx`.
- **Global Styles**: Might require minor updates to `src/app/globals.css` if new CSS variables are introduced in the reference.
