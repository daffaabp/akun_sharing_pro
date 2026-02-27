## ADDED Requirements

### Requirement: Auth utility module exists
The project SHALL contain `src/lib/auth.ts` as a TypeScript module stub that is importable by other modules.

#### Scenario: auth.ts is importable
- **WHEN** another module imports from `src/lib/auth`
- **THEN** TypeScript resolves the import with no errors and the module exports at least one symbol

### Requirement: Database utility module exists
The project SHALL contain `src/lib/db.ts` as a TypeScript module stub for database access (Prisma client instantiation).

#### Scenario: db.ts is importable
- **WHEN** another module imports from `src/lib/db`
- **THEN** TypeScript resolves the import with no errors and the module exports at least one symbol

### Requirement: General utilities module exists
The project SHALL contain `src/lib/utils.ts` as a TypeScript module stub for shared helper functions.

#### Scenario: utils.ts is importable
- **WHEN** another module imports from `src/lib/utils`
- **THEN** TypeScript resolves the import with no errors and the module exports at least one symbol

### Requirement: Middleware is present and applies to dashboard routes
The project SHALL contain `src/middleware.ts` that exports a `middleware` function and a `config` object with a matcher covering `/(dashboard)/(.*)` paths.

#### Scenario: Middleware intercepts dashboard requests
- **WHEN** a request is made to any dashboard route
- **THEN** the `middleware` function in `src/middleware.ts` is invoked before the route handler processes the request
