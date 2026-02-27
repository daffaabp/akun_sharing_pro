## ADDED Requirements

### Requirement: Prisma schema file exists with valid datasource and generator blocks
The project SHALL contain `prisma/schema.prisma` with a `datasource db` block (provider = `postgresql`) and a `generator client` block (provider = `prisma-client-js`).

#### Scenario: prisma generate runs without error
- **WHEN** `prisma generate` is run with a valid `DATABASE_URL` environment variable set
- **THEN** the command exits with code 0 and Prisma Client is generated in `node_modules/.prisma/client`

### Requirement: No data models are defined in the initial schema
The project's initial `prisma/schema.prisma` SHALL NOT contain any `model` blocks — only the `datasource` and `generator` blocks.

#### Scenario: Schema file contains no models at scaffold time
- **WHEN** the scaffold is first applied
- **THEN** `prisma/schema.prisma` contains exactly one `datasource` block and one `generator` block and zero `model` blocks
