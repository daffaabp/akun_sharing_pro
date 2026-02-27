## ADDED Requirements

### Requirement: Auth API route exists
The project SHALL contain `src/app/api/auth/route.ts` exporting at minimum a `GET` handler.

#### Scenario: Auth route file is present and valid TypeScript
- **WHEN** TypeScript compiles the project
- **THEN** `src/app/api/auth/route.ts` exports a named `GET` function with no type errors

### Requirement: Emails API route exists
The project SHALL contain `src/app/api/emails/route.ts` exporting at minimum a `GET` handler.

#### Scenario: Emails route file is present and valid TypeScript
- **WHEN** TypeScript compiles the project
- **THEN** `src/app/api/emails/route.ts` exports a named `GET` function with no type errors

### Requirement: Services API route exists
The project SHALL contain `src/app/api/services/route.ts` exporting at minimum a `GET` handler.

#### Scenario: Services route file is present and valid TypeScript
- **WHEN** TypeScript compiles the project
- **THEN** `src/app/api/services/route.ts` exports a named `GET` function with no type errors

### Requirement: Subscriptions API route exists
The project SHALL contain `src/app/api/subscriptions/route.ts` exporting at minimum a `GET` handler.

#### Scenario: Subscriptions route file is present and valid TypeScript
- **WHEN** TypeScript compiles the project
- **THEN** `src/app/api/subscriptions/route.ts` exports a named `GET` function with no type errors
