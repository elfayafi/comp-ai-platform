# Architecture

**Analysis Date:** 2026-01-26

## Pattern Overview

**Overall:** Turborepo Monorepo with Microservices + Micro-Frontends

**Key Characteristics:**
- Monorepo architecture using Turborepo for unified builds and caching
- Backend: NestJS REST API with modular architecture
- Frontend: Three separate Next.js applications (app, marketing, portal)
- Shared packages for common functionality (db, ui, analytics, email)
- Event-driven async processing via Trigger.dev

## Layers

**Presentation Layer:**
- Purpose: User interfaces and client-side interactions
- Location: `apps/app`, `apps/marketing`, `apps/portal`
- Contains: Next.js applications with App Router, React Server Components, Client Components
- Depends on: API layer, shared packages (@compiel/ui, @compiel/db)
- Used by: End users, employees via web browsers

**API Layer:**
- Purpose: Business logic and data access coordination
- Location: `apps/api/src`
- Contains: NestJS controllers, services, DTOs, guards, decorators
- Depends on: Database layer (@compiel/db), external services (AWS, AI providers)
- Used by: Presentation layer via REST endpoints

**Data Access Layer:**
- Purpose: Database schema and Prisma client
- Location: `packages/db`
- Contains: Prisma schemas, migrations, database client
- Depends on: PostgreSQL database
- Used by: API layer, Next.js applications via direct Prisma imports

**Shared Libraries Layer:**
- Purpose: Reusable functionality across applications
- Location: `packages/*`
- Contains: UI components (@compiel/ui), utilities, analytics, email templates
- Depends on: External npm packages
- Used by: All apps and other packages

**Background Jobs Layer:**
- Purpose: Async task processing and automation
- Location: `apps/api/src/trigger`, `apps/app/src/trigger`
- Contains: Trigger.dev workflows for browser automation, integrations, vector operations
- Depends on: API services, external APIs (Browserbase, AI SDKs)
- Used by: API layer to offload long-running tasks

## Data Flow

**API Request Flow:**

1. Client sends request to NestJS API (`apps/api/src/main.ts`)
2. Request passes through middleware (CORS, helmet, body parser)
3. Global throttling guard checks rate limits
4. Route matched to controller (`*/*.controller.ts`)
5. HybridAuthGuard validates authentication (API key or JWT session)
6. Controller invokes service (`*/*.service.ts`)
7. Service interacts with Prisma client (`@compiel/db`)
8. Response mapped to DTO and returned to client

**Next.js App Request Flow:**

1. User navigates to route (e.g., `/[orgId]/tasks`)
2. Next.js App Router matches route to `page.tsx`
3. Server Component fetches data via server actions (`actions/*.ts`)
4. Action uses `authActionClient` middleware chain (auth → rate limit → audit log)
5. Action queries database via Prisma (`@compiel/db`)
6. Data returned to Server Component
7. Page rendered with Client Components where needed
8. Client interactions trigger mutations via server actions

**State Management:**
- Server state: React Server Components + Next.js caching
- Client state: Zustand stores (`apps/app/src/store`)
- Form state: React Hook Form with Zod validation
- URL state: nuqs for query parameters

## Key Abstractions

**Module (NestJS):**
- Purpose: Encapsulates related domain functionality in API
- Examples: `apps/api/src/tasks/tasks.module.ts`, `apps/api/src/auth/auth.module.ts`
- Pattern: Each module exports controllers, services, and imports dependencies

**Server Actions:**
- Purpose: Type-safe server functions callable from client
- Examples: `apps/app/src/actions/tasks/*.ts`
- Pattern: Uses `next-safe-action` with middleware pipeline (auth, rate limit, audit)

**Service (NestJS):**
- Purpose: Business logic and data operations
- Examples: `apps/api/src/tasks/tasks.service.ts`, `apps/api/src/attachments/attachments.service.ts`
- Pattern: Injectable classes with constructor dependency injection

**Guards:**
- Purpose: Authentication and authorization checks
- Examples: `apps/api/src/auth/hybrid-auth.guard.ts`, `apps/api/src/auth/api-key.guard.ts`
- Pattern: NestJS guards implementing CanActivate interface

**DTO (Data Transfer Objects):**
- Purpose: Type-safe request/response schemas
- Examples: `apps/api/src/tasks/dto/*.dto.ts`
- Pattern: Classes with class-validator decorators

## Entry Points

**API Server:**
- Location: `apps/api/src/main.ts`
- Triggers: HTTP requests on port 3333
- Responsibilities: Bootstrap NestJS app, configure middleware, setup Swagger docs

**Main App (Customer Portal):**
- Location: `apps/app/src/app/layout.tsx`
- Triggers: User navigation to app.trycompiel.com
- Responsibilities: Authentication wrapper, session management, analytics

**Marketing Site:**
- Location: `apps/marketing/src/app/layout.tsx`
- Triggers: User navigation to trycompiel.com
- Responsibilities: Public pages, lead capture forms

**Employee Portal:**
- Location: `apps/portal/src/app/layout.tsx`
- Triggers: Employee access to portal.trycompiel.com
- Responsibilities: Employee self-service, compliance questionnaires

**Background Jobs:**
- Location: `apps/api/src/trigger/*`
- Triggers: Trigger.dev webhook events
- Responsibilities: Browser automation, AI processing, integration syncs

## Error Handling

**Strategy:** Layered error handling with specific exceptions at each layer

**Patterns:**
- **API Layer:** NestJS built-in exceptions (`BadRequestException`, `InternalServerErrorException`)
- **Server Actions:** next-safe-action error boundaries with custom error messages
- **Client Components:** Error boundaries (`error.tsx`, `global-error.tsx`) with fallback UI
- **Database:** Prisma client errors caught and transformed to domain exceptions
- **Logging:** Console logging in development, structured logging for errors

## Cross-Cutting Concerns

**Logging:**
- Custom logger utility (`apps/app/src/utils/logger.ts`)
- Console.log in API services with error context
- Structured audit logs to database

**Validation:**
- API: class-validator decorators on DTOs + ValidationPipe
- Server Actions: Zod schemas with automatic validation
- Forms: React Hook Form + Zod resolvers

**Authentication:**
- Better Auth library for session and OAuth
- Hybrid approach: JWT sessions for web, API keys for integrations
- Guards enforce authentication at controller/action level
- Session stored in database with active organization tracking

---

*Architecture analysis: 2026-01-26*
