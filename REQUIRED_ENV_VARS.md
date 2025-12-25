# Required Environment Variables for Vercel

## 🚨 CRITICAL: These 5 Variables Are MANDATORY

Your deployment is failing with "Invalid environment variables" because these **5 variables** are required by the application's validation schema ([src/env.mjs](apps/app/src/env.mjs)):

### 1. DATABASE_URL
**Required**: Yes (z.string().min(1))
```
postgresql://postgres.wtqvjcmjkpjaokoxwutc:7Mxbvuk8fCDkSh0g@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```
⚠️ **UPDATED**: Password changed to `7Mxbvuk8fCDkSh0g` and region corrected to `eu-west-1`
🔴 **CRITICAL**: The `?pgbouncer=true` parameter is REQUIRED to disable prepared statements for PgBouncer compatibility

### 2. AUTH_SECRET
**Required**: Yes (z.string())
```
BUlQz5yXrpKz0aWVNG8k3kO5BcSd1iebPQ4D0xCnjVE=
```

### 3. RESEND_API_KEY
**Required**: Yes (z.string())
```
[Get from https://resend.com/api-keys]
```
⚠️ **You MUST create a Resend account and add an API key**

### 4. REVALIDATION_SECRET
**Required**: Yes (z.string())
```
2tDOTt37D3qWYmdRVrE6Ef1TIxv/ubMTlTzTFuUGjU8=
```

### 5. NEXT_PUBLIC_PORTAL_URL
**Required**: Yes (z.string())
```
https://compiel-platform-api.vercel.app
```

---

## ✅ Additional Important Variables (Not Required But Needed)

### For Better Auth to Work
```
BETTER_AUTH_URL=https://compiel-platform-api.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://compiel-platform-api.vercel.app
AUTH_TRUSTED_ORIGINS=https://*.vercel.app,https://compiel-platform-api.vercel.app,http://localhost:3000
```

⚠️ **CRITICAL for CORS**: `AUTH_TRUSTED_ORIGINS` must include all Vercel deployment URLs to prevent CORS errors

### For Google OAuth
```
AUTH_GOOGLE_ID=[Get from Google Cloud Console - See GOOGLE_OAUTH_SETUP.md]
AUTH_GOOGLE_SECRET=[Get from Google Cloud Console - See GOOGLE_OAUTH_SETUP.md]
```

### For Database Connection (Direct)
```
DIRECT_URL=postgresql://postgres:7Mxbvuk8fCDkSh0g@wtqvjcmjkpjaokoxwutc.supabase.co:5432/postgres
```
⚠️ **UPDATED**: Password changed and hostname corrected (no `db.` prefix)

### For Secret Key
```
SECRET_KEY=E1kiJTAt1Yy5GbnhrJAaJBUqRuZ3+7eGOsMAKPFRKQ4=
```

### For Upstash Redis (Session Storage)
```
UPSTASH_REDIS_REST_URL=[Get from https://console.upstash.com]
UPSTASH_REDIS_REST_TOKEN=[Get from https://console.upstash.com]
```

🔴 **CRITICAL for /setup**: Required for onboarding flow after authentication. Without these, users get 500 error after signing in.

**To configure:**
1. Follow the guide: [UPSTASH_REDIS_SETUP.md](UPSTASH_REDIS_SETUP.md)
2. Or use temporary mock: `MOCK_REDIS=true` (not for production)

**Free tier available** - No credit card required

### For Microsoft/Office 365 OAuth (Optional)
```
AUTH_MICROSOFT_CLIENT_ID=[Get from Azure Portal]
AUTH_MICROSOFT_CLIENT_SECRET=[Get from Azure Portal]
```

⚠️ **OPTIONAL**: Only required if you want Microsoft/O365 sign-in

**To configure:** Follow [MICROSOFT_OAUTH_SETUP.md](MICROSOFT_OAUTH_SETUP.md)

---

## 📋 Quick Copy-Paste for Vercel

Add these to Vercel Environment Variables (Settings > Environment Variables):

```bash
# REQUIRED - App Won't Start Without These
DATABASE_URL=postgresql://postgres.wtqvjcmjkpjaokoxwutc:7Mxbvuk8fCDkSh0g@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
AUTH_SECRET=BUlQz5yXrpKz0aWVNG8k3kO5BcSd1iebPQ4D0xCnjVE=
RESEND_API_KEY=re_2GQprEXQ_7SZeYXXgB3BTE5S4wbcoDqrU
REVALIDATION_SECRET=2tDOTt37D3qWYmdRVrE6Ef1TIxv/ubMTlTzTFuUGjU8=
NEXT_PUBLIC_PORTAL_URL=https://compiel-platform-api.vercel.app

# CRITICAL - For Auth System
BETTER_AUTH_URL=https://compiel-platform-api.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://compiel-platform-api.vercel.app
AUTH_TRUSTED_ORIGINS=https://*.vercel.app,https://compiel-platform-api.vercel.app,http://localhost:3000
DIRECT_URL=postgresql://postgres:7Mxbvuk8fCDkSh0g@wtqvjcmjkpjaokoxwutc.supabase.co:5432/postgres
SECRET_KEY=E1kiJTAt1Yy5GbnhrJAaJBUqRuZ3+7eGOsMAKPFRKQ4=

# UPSTASH REDIS (Required for /setup onboarding flow)
UPSTASH_REDIS_REST_URL=[Get from https://console.upstash.com - See UPSTASH_REDIS_SETUP.md]
UPSTASH_REDIS_REST_TOKEN=[Get from https://console.upstash.com - See UPSTASH_REDIS_SETUP.md]

# GOOGLE OAUTH
AUTH_GOOGLE_ID=[Get from Google Cloud Console - See GOOGLE_OAUTH_SETUP.md]
AUTH_GOOGLE_SECRET=[Get from Google Cloud Console - See GOOGLE_OAUTH_SETUP.md]

# MICROSOFT/O365 OAUTH (Optional - See MICROSOFT_OAUTH_SETUP.md)
AUTH_MICROSOFT_CLIENT_ID=[Get from Azure Portal - See MICROSOFT_OAUTH_SETUP.md]
AUTH_MICROSOFT_CLIENT_SECRET=[Get from Azure Portal - See MICROSOFT_OAUTH_SETUP.md]
```

---

## 🎯 How to Get RESEND_API_KEY

1. Go to: https://resend.com/signup
2. Create a free account
3. Go to: https://resend.com/api-keys
4. Click "Create API Key"
5. Copy the key and add it to Vercel

**Free Tier**: 100 emails/day, 3,000 emails/month

---

## ⚡ Quick Fix Steps

1. **Add RESEND_API_KEY** (the missing piece):
   - Sign up at https://resend.com
   - Create an API key
   - Add to Vercel

2. **Add all other variables** to Vercel (copy from above)

3. **Redeploy** your application

4. **Test** - the errors should disappear ✅

---

## 🔍 Why This Error Occurred

The application uses `@t3-oss/env-nextjs` to validate environment variables at runtime. These 5 variables are marked as required with `z.string()` (not optional), so the app refuses to start if any are missing.

From [src/env.mjs](apps/app/src/env.mjs:10-37):
```typescript
AUTH_SECRET: z.string(),           // Required
DATABASE_URL: z.string().min(1),   // Required
RESEND_API_KEY: z.string(),        // Required
REVALIDATION_SECRET: z.string(),   // Required
NEXT_PUBLIC_PORTAL_URL: z.string() // Required
```

---

## ✅ Optional Variables (Add Later)

These are optional but enable additional features:
- `OPENAI_API_KEY` - AI features
- `TRIGGER_SECRET_KEY` - Background jobs
- `FIRECRAWL_API_KEY` - Vendor research
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` - Rate limiting
- `APP_AWS_*` - File uploads to S3

---

**Current Blocker**: Missing `RESEND_API_KEY` and other required environment variables in Vercel
**Time to Fix**: 5 minutes (create Resend account + add env vars)
