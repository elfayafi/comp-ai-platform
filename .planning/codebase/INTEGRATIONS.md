# External Integrations

**Generated:** 2026-01-26
**Codebase:** Compiel Compliance Platform

## Authentication & Identity

### Google OAuth
**Provider:** Google Cloud Platform
**Package:** Better Auth with Google provider
**Purpose:** User authentication
**Configuration:**
- Client ID: `GOOGLE_CLIENT_ID`
- Client Secret: `GOOGLE_CLIENT_SECRET`
- Redirect URIs:
  - `https://app.compiel.com/api/auth/callback/google`
  - `https://www.compiel.com/api/auth/callback/google`
  - `http://localhost:3000/api/auth/callback/google`

**Setup Required:**
- Google Cloud Console project
- OAuth 2.0 credentials
- Authorized redirect URIs configuration

**Current Status:** ✅ Configured
**Known Issues:** Previous redirect_uri_mismatch errors (resolved)

### Better Auth
**Type:** Self-hosted authentication library
**Purpose:** Session management, OAuth flows
**Configuration:**
- Secret: `BETTER_AUTH_SECRET` (required in production)
- Database: PostgreSQL via Prisma
- Session storage: Database-backed

**Tables:**
- `user`
- `account`
- `session`
- `verification`

## Database

### PostgreSQL
**Provider:** (Not specified - likely Vercel Postgres or external)
**Package:** Prisma Client
**Purpose:** Primary data store
**Configuration:**
- Connection: `DATABASE_URL`
- Direct connection: `DIRECT_URL` (for migrations)
- Connection pooling supported

**Schema Management:**
- 27 schema files
- Combined into single schema.prisma
- Migrations managed via Prisma Migrate

**Key Models:**
- Authentication (user, account, session)
- Compliance (framework, control, policy, requirement)
- Automation (automation, automation-version, automation-run)
- Organizations (organization, onboarding)
- Tasks & Risk management
- Documents (attachments, knowledge-base)
- Security questionnaires
- Vendors & Trust center

## Cloud Storage

### AWS S3
**Provider:** Amazon Web Services
**Package:** @aws-sdk/client-s3
**Purpose:** File upload and attachment storage
**Configuration:**
- Region: `AWS_REGION`
- Access Key: `AWS_ACCESS_KEY_ID`
- Secret: `AWS_SECRET_ACCESS_KEY`
- Bucket: `AWS_S3_BUCKET_NAME`

**Features:**
- Attachment uploads
- Document storage
- Evidence storage

**Current Status:** ⚠️ Credentials required for production
**Fallback:** Dummy client created when credentials missing (dev mode)

## Email Service

### Resend
**Provider:** Resend.com
**Package:** resend 4.8.0
**Purpose:** Transactional email delivery
**Configuration:**
- API Key: `RESEND_API_KEY`

**Use Cases:**
- Contact form submissions
- User notifications
- Compliance alerts
- Report delivery

**Email Templates:**
- React Email components
- TypeScript templates
- HTML/Plain text generation

**Current Status:** ✅ Package installed
**Required for:** Contact forms, notifications

## Rate Limiting

### Upstash Redis
**Provider:** Upstash
**Package:** @upstash/ratelimit 2.0.7
**Purpose:** API rate limiting, caching
**Configuration:**
- URL: `UPSTASH_REDIS_REST_URL`
- Token: `UPSTASH_REDIS_REST_TOKEN`

**Use Cases:**
- API endpoint rate limiting
- DDoS protection
- Request throttling

**Current Status:** ⚠️ Credentials required
**Warning:** Missing credentials logged during builds

## Browser Automation

### BrowserBase
**Type:** Cloud browser automation platform
**Purpose:** Web scraping, automated evidence collection
**Configuration:**
- API integration
- Context management

**Models:**
- `browserbase-context` (Prisma schema)
- Session persistence
- Context switching

**Use Cases:**
- Automated compliance evidence gathering
- Integration testing
- Web automation for compliance checks

**Current Status:** ✅ Integrated

## Integration Platform

### Custom Integration Framework
**Package:** @compiel/integration-platform
**Purpose:** Third-party service connections
**Architecture:**
- TypeScript-based
- Plugin system
- Webhook support

**Supported Integrations:**
- (Integration platform structure exists)
- Framework for adding compliance tool integrations

## Analytics & Monitoring

### Custom Analytics
**Package:** @compiel/analytics
**Purpose:** User behavior tracking, product analytics
**Implementation:** Custom package

**Potential Integrations:**
- (To be determined based on package implementation)

## Deployment & Infrastructure

### Vercel
**Provider:** Vercel Platform
**Purpose:** Application hosting, deployment
**Configuration:**
- Framework: Next.js auto-detected
- Build Command: Custom Turborepo commands
- Install Command: `bun install`
- Root Directory: App-specific (`apps/app`, `apps/marketing`, `apps/portal`)

**Projects:**
1. **app.compiel.com**
   - Filter: `@compiel/app`
   - Environment: Production

2. **compiel.com**
   - Filter: `@compiel/marketing`
   - Environment: Production

3. **portal.compiel.com**
   - Filter: `@compiel/portal`
   - Environment: Production

**Features Used:**
- Automatic deployments
- Preview deployments
- Environment variables per project
- Edge Functions
- Image Optimization
- Analytics

**Build Configuration:**
- Turbopack enabled
- Output: `.next` directory
- Framework preset: Next.js

## Font Services

### Google Fonts
**Provider:** Google
**Purpose:** Web typography
**Implementation:** Direct CSS import
**Fonts:**
- **Playfair Display** (display serif)
  - Weights: 400, 500, 600, 700, 800, 900
- **Manrope** (body sans-serif)
  - Weights: 300, 400, 500, 600, 700, 800

**Optimization:** `display=swap` for performance

### Vercel Geist Font
**Provider:** Vercel
**Package:** geist 1.5.1
**Purpose:** System font alternative
**Implementation:** Local font files

## Content Delivery

### Vercel CDN
**Automatic:** Yes
**Purpose:**
- Static asset delivery
- Next.js static generation
- Image optimization
- Global edge network

## Secret Management

### Environment Variables
**Platform:** Vercel Environment Variables
**Validation:** @t3-oss/env-nextjs
**Separation:**
- Server-only variables
- Client-safe variables (NEXT_PUBLIC_*)

**Required Variables:**
```env
# Database
DATABASE_URL
DIRECT_URL

# Authentication
BETTER_AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# AWS S3
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET_NAME

# Upstash Redis
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

# Email
RESEND_API_KEY

# App URLs
NEXT_PUBLIC_APP_URL
```

## API Integrations (Planned/In Development)

Based on compliance platform nature, likely future integrations:

### Identity Providers
- Okta
- Azure AD
- Auth0

### Security & Compliance Tools
- GitHub (code scanning)
- AWS (infrastructure audit)
- Google Workspace (access reviews)
- Microsoft 365

### Documentation
- Confluence
- Notion
- Google Docs

### Communication
- Slack (notifications)
- Microsoft Teams
- Email integrations

## Integration Health

### Fully Configured ✅
- Google OAuth
- Prisma/PostgreSQL
- Vercel Deployment
- Google Fonts
- React Email

### Needs Configuration ⚠️
- AWS S3 (credentials required)
- Upstash Redis (credentials required)
- Resend (API key required)
- Better Auth secret (production)

### Framework Ready 🔧
- BrowserBase (integrated, needs usage)
- Integration Platform (framework exists)
- Analytics (package exists)

## Security Considerations

### Secrets Management
- Never commit secrets to Git
- Use Vercel environment variables
- Validate at build time with @t3-oss/env-nextjs

### OAuth Security
- Redirect URI validation
- State parameter for CSRF protection
- Secure cookie handling

### API Security
- Rate limiting via Upstash
- Server-side validation with Zod
- Type-safe server actions

### Data Security
- PostgreSQL with connection pooling
- S3 with signed URLs
- Encrypted connections (TLS)
