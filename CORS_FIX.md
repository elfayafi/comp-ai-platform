# CORS Error Fix Guide

## 🔴 Current Error

You're seeing this error in the browser console:

```
Access to fetch at 'https://compiel-platform-api.vercel.app/api/auth/get-session'
from origin 'https://compiel-platform-is2seuvcy-iliass-projects.vercel.app'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

## 🎯 Root Cause

Your application is deployed on **multiple Vercel URLs**:
- **API**: `https://compiel-platform-api.vercel.app` (production)
- **Frontend Preview**: `https://compiel-platform-is2seuvcy-iliass-projects.vercel.app` (preview deployment)

The auth system is configured to only trust specific origins (see [src/utils/auth.ts:59-61](apps/app/src/utils/auth.ts#L59-L61)):

```typescript
trustedOrigins: process.env.AUTH_TRUSTED_ORIGINS
  ? process.env.AUTH_TRUSTED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'https://*.trycompiel.com', 'http://localhost:3002'],
```

By default, it only trusts `*.trycompiel.com` domains, but your deployment is on `*.vercel.app`.

## ✅ Solution: Add AUTH_TRUSTED_ORIGINS Environment Variable

### Step 1: Go to Vercel Environment Variables

1. Open: https://vercel.com/[your-team]/compiel-platform-api/settings/environment-variables
2. Click **"Add New"** button

### Step 2: Add the Variable

- **Name**: `AUTH_TRUSTED_ORIGINS`
- **Value**: `https://*.vercel.app,https://compiel-platform-api.vercel.app,http://localhost:3000`
- **Environment**: Check all three (Production, Preview, Development)

Click **Save**.

### Step 3: Redeploy

The environment variable change requires a new deployment to take effect.

**Option A - Via Dashboard:**
1. Go to: https://vercel.com/[your-team]/compiel-platform-api/deployments
2. Click the three dots (...) on the latest deployment
3. Click **"Redeploy"**

**Option B - Via Git Push:**
```bash
git commit --allow-empty -m "Trigger redeploy for AUTH_TRUSTED_ORIGINS"
git push
```

### Step 4: Verify the Fix

1. Wait for the deployment to complete (1-2 minutes)
2. Open: https://compiel-platform-api.vercel.app
3. Open browser console (F12)
4. Try to sign in
5. ✅ CORS error should be gone!

---

## 📋 Understanding the Value

The value `https://*.vercel.app,https://compiel-platform-api.vercel.app,http://localhost:3000` allows:

1. **`https://*.vercel.app`** - All Vercel deployments (production + all preview branches)
2. **`https://compiel-platform-api.vercel.app`** - Your main production URL
3. **`http://localhost:3000`** - Local development

The wildcard `*` matches any subdomain, so it works for all these URLs:
- `compiel-platform-api.vercel.app`
- `compiel-platform-is2seuvcy-iliass-projects.vercel.app`
- `compiel-platform-git-master-iliass-projects.vercel.app`
- Any future preview deployments

---

## 🔍 Why This Happens

Vercel creates unique URLs for:
1. **Production**: Your main domain (`compiel-platform-api.vercel.app`)
2. **Git Branches**: Each branch gets a URL (`compiel-platform-git-master-*.vercel.app`)
3. **Preview Deployments**: Each deployment gets a unique URL (`compiel-platform-*.vercel.app`)

Without `AUTH_TRUSTED_ORIGINS`, the auth API rejects requests from these preview URLs because they're different origins.

---

## ⚠️ Security Note

The wildcard `*.vercel.app` is safe because:
- Vercel controls the `.vercel.app` domain
- Only you can deploy to your project's subdomains
- It's a common pattern for Vercel apps

For production, you might want to restrict to just your production domain, but during development and testing, the wildcard is helpful.

---

## 🐛 Alternative: If CORS Error Persists

If the error continues after adding `AUTH_TRUSTED_ORIGINS`:

### Check 1: Verify Environment Variable is Set
```bash
# In Vercel dashboard, check that AUTH_TRUSTED_ORIGINS shows up
```

### Check 2: Check next.config.ts
Your Next.js config already has the `allowedOrigins` set for Server Actions ([next.config.ts:58-63](apps/app/next.config.ts#L58-L63)):

```typescript
serverActions: {
  bodySizeLimit: '15mb',
  allowedOrigins: process.env.NODE_ENV === 'production'
    ? ([process.env.NEXT_PUBLIC_PORTAL_URL, 'https://app.trycompiel.com'].filter(Boolean) as string[])
    : undefined,
},
```

You may need to add your Vercel URLs here too if Server Actions are failing:

```typescript
allowedOrigins: process.env.NODE_ENV === 'production'
  ? [
      process.env.NEXT_PUBLIC_PORTAL_URL,
      'https://app.trycompiel.com',
      'https://*.vercel.app'  // Add this
    ].filter(Boolean) as string[]
  : undefined,
```

However, try just `AUTH_TRUSTED_ORIGINS` first - it should be sufficient.

---

## ✅ Expected Outcome

After adding `AUTH_TRUSTED_ORIGINS` and redeploying:
1. ✅ CORS errors will disappear
2. ✅ Auth requests will succeed
3. ✅ Sign-in flow will work across all Vercel deployments
4. ✅ Preview deployments will function correctly

---

**Current Status**: CORS error blocking auth requests
**Fix Time**: 2 minutes (add env var + redeploy)
**After Fix**: Move on to database initialization
