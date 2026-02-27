
```markdown
accountsharingpro/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css
│   │
│   │   ├── (auth)/                    # Public routes
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/               # Protected routes
│   │   │   ├── layout.tsx             # Header + Sidebar wrapper
│   │   │   ├── page.tsx               # "/"
│   │   │   │
│   │   │   ├── emails/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   │
│   │   │   ├── subscriptions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── auth/route.ts
│   │       ├── emails/route.ts
│   │       ├── services/route.ts
│   │       └── subscriptions/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── dashboard-shell.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── modal.tsx
│   │   │
│   │   └── features/
│   │       ├── emails/
│   │       ├── services/
│   │       └── subscriptions/
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   └── utils.ts
│   │
│   └── middleware.ts
│
├── prisma/
│   └── schema.prisma
├── package.json
└── next.config.ts
```