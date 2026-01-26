# Coding Conventions & Standards

**Generated:** 2026-01-26
**Codebase:** Compiel Compliance Platform

## Language & TypeScript

### TypeScript Configuration
- **Strict Mode:** Enabled across all packages
- **Target:** ES2022
- **Module:** ESNext
- **JSX:** React JSX

### Type Safety
- Explicit return types preferred
- No implicit `any`
- Strict null checks enabled
- Exhaustive pattern matching encouraged

### Example Patterns
```typescript
// Good: Explicit types
interface UserProps {
  id: string;
  name: string;
  email: string;
}

// Good: Type-safe functions
export function getUser(id: string): Promise<User | null> {
  // ...
}

// Avoid: Implicit any
// function getData() { ... }
```

## React & Next.js Conventions

### Component Organization

#### File Structure
```typescript
// Component files
'use client'; // Only when needed

import { useState } from 'react';
import { ExternalDeps } from 'external';
import { LocalComponent } from './local';
import { utils } from '@/lib/utils';

export function Component() {
  // Hooks first
  const [state, setState] = useState();

  // Event handlers
  const handleClick = () => {};

  // Render
  return <div />;
}
```

#### Client vs Server Components
- **Default:** Server Components (no 'use client')
- **Use 'use client' for:**
  - State management (useState, useReducer)
  - Effects (useEffect, useLayoutEffect)
  - Event handlers
  - Browser APIs
  - Third-party libraries requiring browser (Framer Motion, etc.)

```typescript
// Server Component (default)
export function ServerComponent() {
  const data = await fetchData(); // Can use async/await
  return <div>{data}</div>;
}

// Client Component
'use client';
export function ClientComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState(!state)} />;
}
```

### Component Naming
- **PascalCase** for components: `UserMenu`, `ThemeSwitch`
- **kebab-case** for files: `user-menu.tsx`, `theme-switch.tsx`
- **Descriptive names:** `MinimalUserMenu` vs `Menu2`

### Props Patterns
```typescript
// Explicit interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// Destructure in function signature
export function Button({
  variant = 'default',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  // ...
}
```

## Styling Conventions

### Tailwind CSS v4

#### Class Organization
```typescript
// Group classes logically
<div className={cn(
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 gap-2',
  // Typography
  'text-base font-semibold',
  // Colors
  'bg-white text-navy',
  // Borders & Effects
  'border border-border rounded-sm shadow-lg',
  // Responsive
  'sm:p-6 lg:p-8',
  // Conditional
  isActive && 'bg-primary text-white'
)}>
```

#### Custom Utilities (globals.css)
```css
/* Editorial Design System */
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.editorial-number {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 800;
  font-style: italic;
}

.text-navy { color: hsl(var(--navy)); }
.bg-gold { background-color: hsl(var(--gold)); }
```

### CSS Variables
```css
:root {
  /* Color system */
  --primary: 217 91% 60%;
  --navy: 220 40% 15%;
  --gold: 38 95% 58%;

  /* Usage */
  /* color: hsl(var(--primary)); */
  /* background: hsl(var(--navy) / 0.1); */
}
```

## State Management

### React Hooks
- `useState` for local component state
- `useReducer` for complex state logic
- Context API sparingly (performance concerns)

### Forms
- **React Hook Form** for form management
- **Zod** for validation schemas
- **Type-safe** form data

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((data) => {
    // Type-safe data
  });

  return <form onSubmit={onSubmit}>...</form>;
}
```

### Server Actions
```typescript
'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';

const schema = z.object({
  title: z.string().min(1),
});

export const createTask = action(schema, async (data) => {
  // Type-safe server action
  const task = await db.task.create({ data });
  return { success: true, task };
});
```

## Animation Conventions

### Framer Motion
```typescript
import { motion } from 'framer-motion';

// Declarative animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Scroll-triggered
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

// Hover effects
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### Animation Guidelines
- **Performance:** Use transform and opacity
- **Duration:** 0.3-0.6s for UI, 0.8-1.2s for page loads
- **Easing:** Use named easings ('easeOut', 'easeInOut')
- **Stagger:** Use delays for sequential animations

## Database Conventions

### Prisma Schema
```prisma
// Model naming: PascalCase singular
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations: camelCase
  accounts  Account[]
  sessions  Session[]

  @@map("user") // Table name: lowercase
}
```

### Query Patterns
```typescript
// Use Prisma Client
import { db } from '@compiel/db';

// Explicit select for performance
const user = await db.user.findUnique({
  where: { id },
  select: {
    id: true,
    name: true,
    email: true,
  },
});

// Include relations when needed
const userWithAccounts = await db.user.findUnique({
  where: { id },
  include: {
    accounts: true,
  },
});
```

## API Conventions

### Route Handlers
```typescript
// apps/app/src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate with Zod
  // ...
}
```

### Response Format
```typescript
// Success
{ data: {...}, success: true }

// Error
{ error: 'Error message', code: 'ERROR_CODE' }

// Paginated
{
  data: [...],
  pagination: {
    page: 1,
    perPage: 20,
    total: 100
  }
}
```

## Environment Variables

### Naming
- `NEXT_PUBLIC_*` for client-accessible
- `SCREAMING_SNAKE_CASE` for all vars
- Group by service

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
BETTER_AUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."

# AWS
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."

# Public
NEXT_PUBLIC_APP_URL="https://app.compiel.com"
```

### Validation
```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
```

## Import Organization

### Order
1. React & Next.js
2. Third-party libraries
3. Local components
4. Utils & helpers
5. Types
6. Styles (if any)

```typescript
// 1. React/Next
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party
import { motion } from 'framer-motion';
import { Button } from '@compiel/ui/button';

// 3. Local components
import { UserMenu } from '@/components/user-menu';
import { Logo } from '@/components/ui/logo';

// 4. Utils
import { cn } from '@compiel/ui/cn';
import { formatDate } from '@/lib/utils';

// 5. Types
import type { User } from '@compiel/db';
```

## Error Handling

### Try-Catch Patterns
```typescript
// Client-side
try {
  const result = await apiCall();
  toast.success('Success!');
} catch (error) {
  console.error('Error:', error);
  toast.error('Something went wrong');
}

// Server-side
try {
  const data = await db.query();
  return { success: true, data };
} catch (error) {
  console.error('[API_ERROR]', error);
  return { success: false, error: 'Internal error' };
}
```

### Error Boundaries
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Code Comments

### When to Comment
- **Complex logic:** Explain the "why"
- **Workarounds:** Document temporary fixes
- **TODOs:** Mark future improvements
- **Public APIs:** Document usage

### JSDoc for Functions
```typescript
/**
 * Calculates compliance score based on controls
 * @param controls - Array of control objects
 * @returns Score between 0-100
 */
export function calculateScore(controls: Control[]): number {
  // Implementation
}
```

## Accessibility

### ARIA Patterns
```typescript
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
```

### Keyboard Navigation
- Tab order logical
- Focus visible
- Escape to close dialogs
- Enter/Space for buttons

### Semantic HTML
- Use `<button>` not `<div onClick>`
- Use `<nav>` for navigation
- Use headings (`<h1>`, `<h2>`) hierarchically

## Performance

### Code Splitting
```typescript
// Dynamic imports
const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <Spinner />,
});
```

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Company logo"
  width={200}
  height={50}
  priority // Above fold
/>
```

### Memoization
```typescript
// Expensive computations
const memoized = useMemo(() => expensiveCalc(data), [data]);

// Callback stability
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## Git Conventions

### Commit Messages
```
feat: add user authentication
fix: resolve navigation bug on mobile
docs: update API documentation
style: format code with prettier
refactor: simplify data fetching logic
test: add unit tests for helpers
chore: update dependencies
```

### Branch Naming
- `feat/feature-name`
- `fix/bug-description`
- `refactor/what-changed`
- `docs/what-documented`

## Monorepo Patterns

### Workspace References
```json
{
  "dependencies": {
    "@compiel/ui": "workspace:*",
    "@compiel/db": "workspace:*"
  }
}
```

### Turborepo Caching
- Build outputs cached
- Test results cached
- Parallel execution when possible

## Linting & Formatting

### ESLint
- Next.js recommended rules
- TypeScript strict rules
- React hooks rules
- Accessibility rules

### Auto-fixing
```bash
bun run lint --fix
```

## Security Best Practices

### Never Commit
- API keys
- Database credentials
- Secret tokens
- Private keys

### Sanitize Input
```typescript
import { z } from 'zod';

// Validate all user input
const userInput = z.string().max(1000).parse(input);
```

### Authentication Checks
```typescript
// Protect routes
const user = await auth.getUser();
if (!user) {
  redirect('/login');
}
```
