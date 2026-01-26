# Codebase Structure

**Generated:** 2026-01-26
**Codebase:** Compiel Compliance Platform

## Repository Type
**Monorepo** managed with Bun workspaces and Turborepo

## Root Structure

```
incompliance/
├── .claude/                   # Claude Code configuration
│   └── settings.local.json   # Local settings
├── .planning/                # GSD planning documents
│   ├── codebase/            # Codebase documentation (this file)
│   ├── DEPLOYMENT_GUIDE.md  # Deployment instructions
│   └── QUICK_DEPLOY.md      # Quick deployment guide
├── apps/                     # Application packages
│   ├── app/                 # Main SaaS application
│   ├── marketing/           # Marketing website
│   └── portal/              # Employee portal
├── packages/                 # Shared packages
│   ├── ui/                  # Component library
│   ├── db/                  # Database & Prisma
│   ├── email/               # Email templates
│   ├── analytics/           # Analytics tracking
│   └── integration-platform/ # Integration framework
├── .gitignore
├── bun.lockb                # Bun lock file
├── package.json             # Root workspace config
├── turbo.json               # Turborepo configuration
└── README.md
```

## Applications

### 1. apps/app/ - Main Application
**Purpose:** Core SaaS platform for compliance management
**Domain:** app.compiel.com
**Port:** 3000 (dev)
**Framework:** Next.js 16 (App Router)

```
apps/app/
├── prisma/
│   └── schema.prisma        # Combined from packages/db
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Auth routes group
│   │   ├── api/            # API routes
│   │   │   └── auth/       # Better Auth endpoints
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   │   ├── MinimalUserMenu.tsx
│   │   │   └── ...
│   │   ├── theme-switch.tsx
│   │   └── user-menu.tsx
│   ├── env.mjs             # Environment validation
│   ├── lib/                # Utilities
│   │   ├── auth.ts         # Better Auth config
│   │   ├── db.ts           # Prisma client
│   │   └── s3.ts           # AWS S3 client
│   └── ...
├── .env.local              # Local environment
├── .env.production.example # Production env template
├── GOOGLE_OAUTH_SETUP.md   # OAuth setup guide
├── next.config.ts          # Next.js configuration
├── package.json
├── tsconfig.json
└── vercel.json             # Vercel build config
```

**Key Features:**
- Full compliance management platform
- User authentication & authorization
- Dashboard & analytics
- Policy management
- Framework editors
- Risk & control management
- Task assignment
- Security questionnaires
- Vendor management
- Trust center

### 2. apps/marketing/ - Marketing Website
**Purpose:** Public-facing marketing and lead generation
**Domain:** compiel.com (www.compiel.com)
**Port:** 3003/3004 (dev)
**Framework:** Next.js 16 (App Router)

```
apps/marketing/
├── public/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── features/       # Features page
│   │   ├── logo-demo/      # Logo variants demo
│   │   ├── pricing/        # Pricing page
│   │   ├── layout.tsx      # Root layout (editorial font)
│   │   ├── page.tsx        # Homepage
│   │   └── providers.tsx   # Theme provider (forced light)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx  # Site header with logo
│   │   │   └── footer.tsx  # Site footer
│   │   ├── sections/       # Homepage sections
│   │   │   ├── hero.tsx    # Editorial hero section
│   │   │   ├── stats.tsx   # Stats section (navy bg)
│   │   │   └── features-grid.tsx # Asymmetric features
│   │   └── ui/
│   │       └── logo.tsx    # Logo component (5 variants)
│   ├── env.mjs
│   └── ...
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```

**Design System:**
- Editorial aesthetic (Vogue meets Bloomberg)
- Playfair Display (serif headlines)
- Manrope (body text)
- Navy + Gold + Electric Blue palette
- Asymmetric magazine layouts
- Sharp corners (no border-radius)

**Pages:**
- `/` - Homepage with hero, stats, features
- `/features` - Feature showcase
- `/pricing` - Pricing plans
- `/about` - Company information
- `/contact` - Contact form
- `/logo-demo` - Logo variants showcase

### 3. apps/portal/ - Employee Portal
**Purpose:** Internal employee access portal
**Domain:** portal.compiel.com
**Port:** 3002 (dev)
**Framework:** Next.js 16 (App Router)

```
apps/portal/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── env.mjs
│   └── ...
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```

**Purpose:**
- Employee onboarding
- Internal compliance training
- Policy acknowledgment
- Task management for employees

## Shared Packages

### packages/ui/ - Component Library
**Purpose:** Shared React components across all apps
**Export:** @compiel/ui

```
packages/ui/
├── src/
│   ├── components/          # Component library
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── ai-elements/    # AI conversation components
│   │   ├── diff/           # Diff viewer
│   │   ├── editor/         # Tiptap rich text editor
│   │   └── ... (60+ components)
│   ├── hooks/              # React hooks
│   │   ├── use-media-query.ts
│   │   ├── use-toast.ts
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   ├── cn.ts           # Class name utility
│   │   ├── clamp.ts
│   │   └── truncate.ts
│   ├── globals.css         # Global styles + design system
│   └── index.ts
├── dist/                   # Build output
│   ├── *.js                # ESM modules
│   ├── *.d.ts              # TypeScript declarations
│   └── ...
├── scripts/
│   └── generate-exports.cjs # Auto-generate package.json exports
├── package.json            # ESM-only exports
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json
└── tsup.config.ts          # Build configuration
```

**Design System (globals.css):**
- CSS variables for theming
- Light/dark mode support (currently forced light)
- Editorial color palette:
  - Navy: `hsl(220 40% 15%)`
  - Electric Blue: `hsl(217 91% 60%)`
  - Gold: `hsl(38 95% 58%)`
- Typography utilities
- Custom scrollbar styles
- Animation keyframes

**Build System:**
- tsup for fast ESM bundling
- TypeScript declarations
- Tree-shakeable exports
- Individual component imports

### packages/db/ - Database Layer
**Purpose:** Prisma schema and database client
**Export:** @compiel/db

```
packages/db/
├── prisma/                 # Multi-file schema source
│   ├── attachments.prisma
│   ├── auth.prisma
│   ├── automation.prisma
│   ├── control.prisma
│   ├── framework.prisma
│   ├── organization.prisma
│   ├── policy.prisma
│   ├── risk.prisma
│   ├── task.prisma
│   ├── vendor.prisma
│   └── ... (27 schema files)
├── dist/
│   └── schema.prisma       # Combined schema for distribution
├── scripts/
│   └── combine-schemas.js  # Schema combiner
├── src/
│   └── index.ts            # Prisma client export
├── package.json
├── prisma.config.ts        # Prisma configuration
└── tsconfig.json
```

**Schema Organization:**
- Modular schema files by domain
- Automatic combination before generation
- Shared across all apps
- Single source of truth

### packages/email/ - Email Templates
**Purpose:** React Email templates
**Export:** @compiel/email

```
packages/email/
├── src/
│   └── ... (email components)
├── dist/
│   ├── index.js
│   ├── index.mjs
│   └── index.d.ts
├── index.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

**Features:**
- React components for emails
- HTML/Plain text generation
- Responsive email layouts
- Type-safe templates

### packages/analytics/
**Purpose:** Analytics tracking
**Export:** @compiel/analytics

```
packages/analytics/
├── src/
│   └── index.ts
├── dist/
├── package.json
└── tsconfig.json
```

### packages/integration-platform/
**Purpose:** Third-party integration framework
**Export:** @compiel/integration-platform

```
packages/integration-platform/
├── src/
│   └── index.ts
├── dist/
├── package.json
└── tsconfig.json
```

## Configuration Files

### Root Level

#### package.json (workspace)
```json
{
  "name": "incompliance",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

#### turbo.json
**Purpose:** Turborepo pipeline configuration
**Features:**
- Build caching
- Parallel task execution
- Remote caching support
- Task dependencies

**Pipelines:**
- `build` - Build all packages and apps
- `dev` - Development servers
- `lint` - ESLint
- `type-check` - TypeScript checking

### Per-App Configuration

#### next.config.ts
- TypeScript configuration
- Experimental features
- Transpile packages
- Turbopack enabled

#### vercel.json
- Custom build commands
- Install commands
- Framework detection
- Output directory

#### tsconfig.json
- Strict mode
- Path aliases
- ES2022 target
- Incremental builds

## Key Directories by Purpose

### Authentication
- `apps/app/src/lib/auth.ts` - Better Auth config
- `apps/app/src/app/api/auth/` - Auth endpoints
- `packages/db/prisma/auth.prisma` - Auth models

### UI Components
- `packages/ui/src/components/` - Shared components
- `apps/*/src/components/` - App-specific components

### API Routes
- `apps/app/src/app/api/` - API endpoints
- Route handlers for:
  - Authentication
  - Data mutations
  - Webhooks
  - File uploads

### Database
- `packages/db/prisma/` - Schema definitions
- `packages/db/dist/schema.prisma` - Combined schema
- `apps/app/prisma/schema.prisma` - App copy for migrations

### Styling
- `packages/ui/src/globals.css` - Global styles
- `packages/ui/tailwind.config.ts` - Tailwind config
- App-specific style overrides

### Assets
- `apps/*/public/` - Static assets
- Images, fonts, icons
- Favicon, OG images

### Type Definitions
- `*.d.ts` files - TypeScript declarations
- `@types/` folders - Third-party types
- Generated types from Prisma

## Import Patterns

### Workspace Imports
```typescript
// Shared packages
import { Button } from '@compiel/ui/button';
import { db } from '@compiel/db';
import { sendEmail } from '@compiel/email';

// Within app
import { auth } from '@/lib/auth';
import { Component } from '@/components/component';
```

### Path Aliases
- `@/` - App src directory
- `@compiel/*` - Workspace packages

## Build Output

### Development
- `.next/` - Next.js build cache
- `node_modules/` - Dependencies
- `.turbo/` - Turborepo cache

### Production
- `.next/` - Optimized build
- `dist/` - Package builds
- Static assets bundled

## Entry Points

### Main App
- `apps/app/src/app/layout.tsx` - Root layout
- `apps/app/src/app/page.tsx` - Dashboard home

### Marketing
- `apps/marketing/src/app/layout.tsx` - Site layout
- `apps/marketing/src/app/page.tsx` - Homepage

### Portal
- `apps/portal/src/app/layout.tsx` - Portal layout
- `apps/portal/src/app/page.tsx` - Portal home

### Packages
- `packages/*/src/index.ts` - Package entry points

## File Naming Conventions

### Components
- PascalCase: `Button.tsx`, `UserMenu.tsx`
- kebab-case for files: `user-menu.tsx`, `theme-switch.tsx`

### Routes (Next.js App Router)
- `page.tsx` - Route page
- `layout.tsx` - Layout wrapper
- `loading.tsx` - Loading UI
- `error.tsx` - Error boundary
- `route.ts` - API route handler

### Configuration
- `*.config.ts` - TypeScript configs
- `*.config.js` - JavaScript configs
- `.env*` - Environment files

### Documentation
- `*.md` - Markdown docs
- `README.md` - Package/app README
- `CHANGELOG.md` - Change logs
