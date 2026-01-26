# Technology Stack

**Generated:** 2026-01-26
**Codebase:** Compiel Compliance Platform

## Languages

### Primary Languages
- **TypeScript** (99%)
  - Strict mode enabled
  - Next.js 16.1.1 with App Router
  - React 19.2.3
  - Version: TypeScript 5.9.3

### Configuration Languages
- JSON (package.json, tsconfig.json, vercel.json)
- JavaScript (config files)

## Runtime & Package Management

### Runtime
- **Bun** v1.3.5+
  - Package management
  - Script execution
  - Development server

### Node Environment
- Node.js compatibility (via Bun)
- ECMAScript 2022 target

## Frontend Frameworks & Libraries

### Core Framework
- **Next.js 16.1.1** (Turbopack enabled)
  - App Router (latest)
  - Server Components
  - Client Components with 'use client'
  - Route Handlers
  - Middleware (deprecated, transitioning to proxy)

### React Ecosystem
- **React 19.2.3**
- **React DOM 19.2.3**
- React Hook Form 7.70.0
- React Email 4.3.2

### UI & Styling
- **Tailwind CSS v4.1.18**
  - @tailwindcss/postcss 4.1.18
  - Custom configuration
  - Design system with CSS variables
- **Radix UI** (headless component primitives)
  - Dialog, Dropdown, Popover, etc.
- **Framer Motion 12.25.0** (animations)
- **Geist Font** 1.5.1 (Vercel design system)
- **Lucide React 0.544.0** (icons)

### Typography (New - Editorial Design)
- **Google Fonts**
  - Playfair Display (display serif)
  - Manrope (body sans-serif)

## Backend & Database

### Database
- **PostgreSQL** (via Prisma)
- **Prisma ORM 6.19.1**
  - Schema-first approach
  - Multi-file schema system
  - Prisma Client generation
  - 27 schema files combined
- **@prisma/client** (generated)

### Authentication
- **Better Auth**
  - Google OAuth provider
  - Session management
  - User/account/session models

### Storage
- **AWS S3** (file uploads)
  - @aws-sdk/client-s3 integration
  - Attachment management

## API & Networking

### HTTP Client
- Built-in Fetch API
- WebSocket support (planned)

### Rate Limiting
- **Upstash Redis**
  - @upstash/ratelimit 2.0.7
  - Rate limiting middleware

### Email
- **Resend** 4.8.0 (email delivery)
- React Email for templates

## State Management & Validation

### Forms & Validation
- **Zod 4.3.5** (schema validation)
- **React Hook Form 7.70.0**
- **@hookform/resolvers 5.2.2**

### Server Actions
- **next-safe-action 8.0.11**
  - Type-safe server actions
  - Validation integration

## UI Components Library

### Shared Package: @compiel/ui
Custom component library built on:
- Radix UI primitives
- Tailwind CSS v4
- CVA (class-variance-authority)
- TypeScript types
- Tree-shakeable exports

**Key Components:**
- Forms, Inputs, Buttons
- Dialogs, Sheets, Drawers
- Tables, Cards, Badges
- Charts (Recharts integration)
- AI conversation components
- Rich text editor (Tiptap)

## Text Editing
- **Tiptap 2.27.2** (rich text editor)
  - Extensions ecosystem
  - Collaborative editing ready
  - Markdown support

## Charts & Visualization
- **Recharts** (via @compiel/ui/chart)
- Custom chart components with Tailwind theming

## Testing

### Test Framework
- Evidence of test files (*.test.ts, *.test.tsx)
- Jest/Vitest configuration implied

### Code Quality
- **ESLint 9.39.2**
- **eslint-config-next 15.5.2**
- Prettier (implied from formatting)

## Build Tools

### Build System
- **Turbopack** (Next.js 16 default)
- **Turborepo** (monorepo orchestration)
  - Workspace caching
  - Parallel builds
  - Remote caching

### TypeScript Compilation
- **tsup** (for packages)
- **tsc** (declaration files)

### PostCSS
- **PostCSS 8.5.6**
- Tailwind CSS v4 integration

## Deployment

### Platform
- **Vercel**
  - Framework presets (Next.js)
  - Custom build commands
  - Environment variables
  - Three projects:
    - app.compiel.com (@compiel/app)
    - compiel.com (@compiel/marketing)
    - portal.compiel.com (@compiel/portal)

### CI/CD
- Git-based deployment
- Automatic deployments on push
- Preview deployments for PRs

## Environment Management

### Configuration
- **@t3-oss/env-nextjs 0.13.10**
  - Type-safe environment variables
  - Validation at build time
  - Client/server separation

### Environment Files
- .env.local (development)
- .env.production (production)
- Environment-specific configs

## Monorepo Structure

### Workspace Manager
- **Bun workspaces**
- Package references: `workspace:*`

### Apps
- `@compiel/app` (main application)
- `@compiel/marketing` (marketing site)
- `@compiel/portal` (employee portal)

### Shared Packages
- `@compiel/ui` (component library)
- `@compiel/db` (database & Prisma)
- `@compiel/email` (email templates)
- `@compiel/analytics` (tracking)
- `@compiel/integration-platform` (integrations)

## Analytics & Monitoring

### Analytics
- Custom analytics package
- Event tracking system

### Error Tracking
- (To be determined - not visible in current codebase)

## Security

### Authentication Security
- Better Auth (session-based)
- OAuth 2.0 flows
- Secure cookie handling

### Rate Limiting
- Upstash Redis-backed
- Per-route configuration

### Data Validation
- Zod schemas
- Input sanitization
- Server-side validation

## Development Tools

### Theme Management
- **next-themes 0.4.6**
  - Light/dark mode (forced light in current setup)
  - System preference detection (disabled)

### Notifications
- **Sonner 2.0.7** (toast notifications)
  - Accessible
  - Customizable styling

### Browser Automation (Integration)
- BrowserBase integration
  - Context management
  - Session persistence

## Key Version Highlights

### Latest/Cutting-Edge
- Next.js 16.1.1 (latest with Turbopack)
- React 19.2.3 (latest)
- Tailwind CSS v4.1.18 (latest major version)
- TypeScript 5.9.3 (latest stable)

### Notable Versions
- Prisma 6.19.1 (v7.2.0 available)
- Framer Motion 12.25.0
- Bun 1.3.5

## Technical Debt

### Outdated Dependencies
- Prisma: 6.19.1 → 7.2.0 available (major version)
- Resend: 4.8.0 → 6.7.0 available (major versions behind)
- Lucide React: 0.544.0 → 0.562.0 available
- ESLint Config Next: 15.5.2 → 16.1.1 available

### Deprecation Warnings
- Next.js middleware.ts → proxy.ts migration needed
- Peer dependency warnings in Tiptap ecosystem
