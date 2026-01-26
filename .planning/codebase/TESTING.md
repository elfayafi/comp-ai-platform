# Testing Strategy & Infrastructure

**Generated:** 2026-01-26
**Codebase:** Compiel Compliance Platform

## Testing Status: ⚠️ LIMITED

**Current State:** Testing infrastructure is minimal and needs expansion.

## Evidence of Testing

### Test Files Found
```
packages/ui/src/components/editor/utils/validate-content.test.ts
```

### Test Patterns
- Unit test example exists for content validation
- Suggests Jest/Vitest setup
- TypeScript test files (`.test.ts`, `.test.tsx`)

## Testing Framework (Inferred)

### Likely Setup
Based on Next.js 16 and modern React patterns:

**Unit Testing:**
- Jest or Vitest (modern choice)
- React Testing Library
- @testing-library/jest-dom

**E2E Testing:**
- Playwright (Next.js recommended)
- OR Cypress (alternative)

### Dependencies Not Visible
Testing dependencies may be:
- In devDependencies (not shown in current analysis)
- Not yet fully configured
- Planned but not implemented

## Test Coverage

### Current Coverage: UNKNOWN

**Evidence:**
- Only 1 test file found in packages
- No test files visible in apps/
- No coverage reports in repository

**Critical Gaps:**
- ❌ No authentication tests
- ❌ No API route tests
- ❌ No database interaction tests
- ❌ No form validation tests
- ❌ No component integration tests
- ❌ No E2E user flow tests

## Component Testing Strategy (Proposed)

### Unit Tests for UI Components
```typescript
// packages/ui/src/components/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByText('Outline');
    expect(button).toHaveClass('border-navy');
  });
});
```

### Integration Tests
```typescript
// apps/app/src/components/user-menu.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { UserMenu } from './user-menu';

describe('UserMenu', () => {
  it('displays user information', async () => {
    render(<UserMenu user={mockUser} />);
    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });

  it('opens dropdown on click', () => {
    render(<UserMenu user={mockUser} />);
    const trigger = screen.getByRole('button');
    trigger.click();
    expect(screen.getByText('Profile')).toBeVisible();
  });
});
```

## API Testing Strategy (Proposed)

### Route Handler Tests
```typescript
// apps/app/src/app/api/users/route.test.ts
import { GET } from './route';
import { NextRequest } from 'next/server';

describe('GET /api/users', () => {
  it('returns user list', async () => {
    const request = new NextRequest('http://localhost/api/users');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.users).toBeInstanceOf(Array);
  });

  it('requires authentication', async () => {
    const request = new NextRequest('http://localhost/api/users');
    // Mock unauthenticated state
    const response = await GET(request);
    expect(response.status).toBe(401);
  });
});
```

### Server Action Tests
```typescript
// apps/app/src/actions/tasks.test.ts
import { createTask } from './tasks';

describe('createTask', () => {
  it('creates a task with valid data', async () => {
    const result = await createTask({
      title: 'Test task',
      description: 'Test description',
    });

    expect(result.success).toBe(true);
    expect(result.task).toHaveProperty('id');
  });

  it('rejects invalid data', async () => {
    const result = await createTask({
      title: '', // Invalid: empty title
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

## Database Testing (Proposed)

### Prisma Testing Pattern
```typescript
// packages/db/tests/user.test.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User model', () => {
  beforeEach(async () => {
    // Clean database
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });

  it('enforces unique email', async () => {
    await prisma.user.create({
      data: { email: 'test@example.com', name: 'User 1' },
    });

    await expect(
      prisma.user.create({
        data: { email: 'test@example.com', name: 'User 2' },
      })
    ).rejects.toThrow();
  });
});
```

## E2E Testing Strategy (Proposed)

### Playwright for User Flows
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign in with Google', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Sign In');

    // Mock OAuth flow or use test credentials
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('unauthenticated users are redirected', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });
});
```

### Critical User Flows to Test
1. **Authentication Flow**
   - Sign in with Google OAuth
   - Sign out
   - Session persistence

2. **Compliance Management**
   - Create new framework
   - Add controls
   - Generate policies
   - Complete audit checklist

3. **Risk Management**
   - Create risk assessment
   - Assign controls
   - Update risk status

4. **Task Management**
   - Create task
   - Assign to user
   - Mark complete
   - View task list

5. **Settings & Configuration**
   - Update organization settings
   - Add team members
   - Configure integrations

## Test Data Management

### Factories & Fixtures
```typescript
// tests/factories/user.factory.ts
export const createTestUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date(),
  ...overrides,
});

// tests/fixtures/frameworks.json
[
  {
    "id": "soc2",
    "name": "SOC 2 Type II",
    "controls": [...]
  }
]
```

### Database Seeding
```typescript
// prisma/seed.ts
async function main() {
  // Create test organization
  const org = await prisma.organization.create({
    data: {
      name: 'Test Organization',
      slug: 'test-org',
    },
  });

  // Create test user
  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      name: 'Admin User',
      organizationId: org.id,
    },
  });
}
```

## Mocking Strategy

### External Services
```typescript
// __mocks__/aws-sdk.ts
export const S3Client = jest.fn(() => ({
  send: jest.fn().mockResolvedValue({ Location: 'https://s3.example.com/file.pdf' }),
}));

// __mocks__/resend.ts
export class Resend {
  emails = {
    send: jest.fn().mockResolvedValue({ id: 'email-id' }),
  };
}
```

### Database Mocking
```typescript
// __mocks__/prisma.ts
export const prisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  // ... other models
};
```

## CI/CD Testing (Proposed)

### GitHub Actions Workflow
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run test
      - run: bun run test:e2e
      - run: bun run lint
      - run: bun run type-check
```

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "bun run lint && bun run type-check",
      "pre-push": "bun run test"
    }
  }
}
```

## Performance Testing

### Load Testing
- Test API endpoints under load
- Database query performance
- Concurrent user handling

### Lighthouse CI
- Performance metrics
- Accessibility scores
- SEO checks
- Best practices

## Security Testing

### Vulnerability Scanning
- `npm audit` / `bun audit`
- Snyk for dependency vulnerabilities
- OWASP ZAP for web app security

### Authentication Testing
- Session management
- CSRF protection
- XSS prevention
- SQL injection prevention

## Test Scripts (Proposed)

### package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:unit": "vitest run",
    "test:integration": "vitest run --config vitest.integration.config.ts"
  }
}
```

## Test Organization

### Directory Structure (Proposed)
```
apps/app/
├── src/
│   ├── components/
│   │   ├── button.tsx
│   │   └── button.test.tsx       # Co-located component tests
│   ├── lib/
│   │   ├── utils.ts
│   │   └── utils.test.ts         # Co-located utility tests
│   └── app/
│       └── api/
│           └── users/
│               ├── route.ts
│               └── route.test.ts # Co-located API tests
└── tests/
    ├── e2e/                      # End-to-end tests
    │   ├── auth.spec.ts
    │   └── dashboard.spec.ts
    ├── integration/              # Integration tests
    │   └── auth-flow.test.ts
    └── setup/
        └── test-setup.ts         # Test configuration
```

## Code Coverage Goals

### Target Coverage
- **Overall:** 80%+
- **Critical paths:** 90%+
  - Authentication
  - Payment processing
  - Data mutations
- **UI components:** 70%+
- **Utilities:** 90%+

### Coverage Reports
```bash
bun run test:coverage
# Generates coverage/ directory with HTML reports
```

## Recommendations

### Immediate Actions Needed
1. **Set up testing framework**
   - Install Vitest + React Testing Library
   - Configure test environment
   - Add test scripts to package.json

2. **Add critical path tests**
   - Authentication flows
   - API route handlers
   - Data validation

3. **Implement E2E testing**
   - Install Playwright
   - Create core user flow tests
   - Add to CI pipeline

4. **Test data strategy**
   - Create factories for models
   - Set up test database
   - Implement seeding

### Long-term Goals
- Achieve 80%+ code coverage
- Automated visual regression testing
- Performance testing suite
- Security testing automation
- Continuous testing in CI/CD

## Current Blockers

### Testing Infrastructure
- ❌ No test runner configured
- ❌ No test utilities installed
- ❌ No test database setup
- ❌ No CI/CD testing pipeline
- ❌ No coverage reporting

### Priority: HIGH
Testing is critical for a compliance platform where bugs can have serious consequences. Immediate investment in testing infrastructure is recommended.
