## Context

The header component currently displays "Account Pro", while the sidebar displays "Account Sharing Pro". To ensure branding consistency across the application, the header needs to be updated to match the sidebar.

## Goals / Non-Goals

**Goals:**
- Update the title text in the header component to "Account Sharing Pro".
- Maintain the existing color highlighting logic where "Pro" is highlighted in the primary color.

**Non-Goals:**
- Modifying the styling or overall structure of the header beyond the title text.

## Decisions

- The text inside the `<h1>` tag in `src/components/layout/header.tsx` will be changed from `Account<span ...>Pro</span>` to `Account Sharing <span ...>Pro</span>`. This ensures the branding matches while preserving the specific styling applied to "Pro".

## Risks / Trade-offs

- **[Risk] Text overflow**: Adding "Sharing " increases the width of the header title, which might occupy more space on smaller screens.
- **[Mitigation]**: The Flexbox layout within the header should naturally accommodate the extra text without breaking the layout. We will verify responsiveness during review.
