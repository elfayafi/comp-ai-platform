# Deployment Checklist for Vercel

## Current Status
- ✅ Vercel Deployment: https://compiel-platform-api.vercel.app
- ✅ GitHub Repository: Synced
- ✅ Trigger.dev: Configured (proj_cqlwtfdjrekkxjtczpfw)
- ✅ Google OAuth: Configured locally
- 🚨 **BLOCKER**: CORS Error - Missing `AUTH_TRUSTED_ORIGINS` in Vercel
- 🚨 **BLOCKER**: Missing Required Environment Variables in Vercel (RESEND_API_KEY, etc.)
- ⏳ Database Initialization: Pending (must fix env vars first)

## Step 1: Initialize Supabase Database

### 1.1 Create the Function (MUST BE FIRST)
Open Supabase SQL Editor and run:

```sql
-- Create function to generate prefixed CUID with sortable timestamp (compact)
CREATE OR REPLACE FUNCTION generate_prefixed_cuid(prefix text)
RETURNS text AS $$
DECLARE
    timestamp_hex text;
    random_hex text;
BEGIN
    -- Generate timestamp component (seconds since epoch) as hex
    timestamp_hex = LOWER(TO_HEX(EXTRACT(EPOCH FROM NOW())::BIGINT));

    -- Generate 8 random bytes and encode as hex (16 characters)
    random_hex = encode(gen_random_bytes(8), 'hex');

    -- Combine prefix, timestamp, and random hex string
    RETURN prefix || '_' || timestamp_hex || random_hex;
END;
$$ LANGUAGE plpgsql;
```

**Expected Result:** `CREATE FUNCTION` message

### 1.2 Create the Schema (MUST BE SECOND)
Run the entire contents of `supabase-init-clean.sql` file (73KB, 1921 lines)

**Expected Result:** Multiple `CREATE TABLE`, `CREATE INDEX`, etc. messages

## Step 2: Configure Google OAuth (Added ✅)

Google OAuth credentials need to be configured:
- Client ID: `[Get from Google Cloud Console]`
- Client Secret: `[Get from Google Cloud Console]`
- See GOOGLE_OAUTH_SETUP.md for setup instructions

### Important: Add Authorized Redirect URIs in Google Cloud Console

Go to: https://console.cloud.google.com/apis/credentials

Add these authorized redirect URIs:
- `https://compiel-platform-api.vercel.app/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/google` (for local dev)

## Step 3: Configure Vercel Environment Variables (CRITICAL)

**⚠️ CURRENT BLOCKER**: Missing required environment variables causing "Invalid environment variables" error

Go to Vercel Project Settings > Environment Variables and add:

### 🚨 MANDATORY (App Won't Start Without These 5)
- `DATABASE_URL` = `postgresql://postgres.wtqvjcmjkpjaokoxwutc:Descours1993.%40@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`
- `AUTH_SECRET` = `BUlQz5yXrpKz0aWVNG8k3kO5BcSd1iebPQ4D0xCnjVE=`
- `RESEND_API_KEY` = **[GET FROM https://resend.com/api-keys]** ⚠️ YOU MUST ADD THIS
- `REVALIDATION_SECRET` = `2tDOTt37D3qWYmdRVrE6Ef1TIxv/ubMTlTzTFuUGjU8=`
- `NEXT_PUBLIC_PORTAL_URL` = `https://compiel-platform-api.vercel.app`

### ✅ Critical for Auth to Work
- `BETTER_AUTH_URL` = `https://compiel-platform-api.vercel.app`
- `NEXT_PUBLIC_BETTER_AUTH_URL` = `https://compiel-platform-api.vercel.app`
- `AUTH_TRUSTED_ORIGINS` = `https://*.vercel.app,https://compiel-platform-api.vercel.app,http://localhost:3000` ⚠️ **FIXES CORS ERRORS**
- `DIRECT_URL` = `postgresql://postgres.wtqvjcmjkpjaokoxwutc:Descours1993.%40@aws-0-us-east-1.pooler.supabase.com:5432/postgres`
- `SECRET_KEY` = `E1kiJTAt1Yy5GbnhrJAaJBUqRuZ3+7eGOsMAKPFRKQ4=`

### 🔐 Google OAuth
- `AUTH_GOOGLE_ID` = `[Get from Google Cloud Console]`
- `AUTH_GOOGLE_SECRET` = `[Get from Google Cloud Console]`

### 📖 See Complete List
Full details in [REQUIRED_ENV_VARS.md](./REQUIRED_ENV_VARS.md)

### Required for Full Functionality
- `OPENAI_API_KEY` - For AI features
- `RESEND_API_KEY` - For email notifications
- `FIRECRAWL_API_KEY` - For vendor research
- `UPLOADTHING_TOKEN` - For file uploads
- `UPSTASH_REDIS_REST_URL` - For rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - For rate limiting

### Optional (Can Configure Later)
- `NEXT_PUBLIC_POSTHOG_KEY` - Analytics
- `VERCEL_ACCESS_TOKEN` - Trust portal domains
- `FLEET_URL` / `FLEET_TOKEN` - MDM integration
- `AUTH_MICROSOFT_CLIENT_ID` / `AUTH_MICROSOFT_CLIENT_SECRET` - Microsoft SSO

## Step 4: Verify Deployment

### 4.1 Check Auth Endpoint
Open browser and navigate to:
```
https://compiel-platform-api.vercel.app/auth
```

**Expected:** Should return JSON response (not 500 error)

### 4.2 Check Homepage
Open:
```
https://compiel-platform-api.vercel.app
```

**Expected:** Application loads without errors

### 4.3 Test Google Sign In
Click "Sign in with Google" button

**Expected:** Google OAuth flow completes successfully

### 4.4 Test Sign Up
Try creating a new account with email

**Expected:** User account is created successfully

## Step 5: Deploy Trigger.dev to Production

After verifying the app works, deploy Trigger.dev jobs:

```bash
cd apps/app
npx trigger.dev@4.0.6 deploy
```

This will:
- Build and upload your background jobs
- Connect to production Trigger.dev project
- Enable async task processing in production

## Troubleshooting

### Issue: CORS Error - "No 'Access-Control-Allow-Origin' header" (CURRENT)
**Cause:** Missing `AUTH_TRUSTED_ORIGINS` environment variable in Vercel
**Fix:**
1. Add `AUTH_TRUSTED_ORIGINS=https://*.vercel.app,https://compiel-platform-api.vercel.app,http://localhost:3000` to Vercel
2. Redeploy application
3. CORS errors should disappear ✅

### Issue: "Invalid environment variables" Error
**Cause:** Missing required environment variables in Vercel (especially `RESEND_API_KEY`)
**Fix:**
1. Sign up at https://resend.com and get API key
2. Add all 5 mandatory environment variables to Vercel (see Step 3)
3. Redeploy application

### Issue: 500 Error on /auth
**Cause:** Either missing environment variables OR database tables not initialized
**Fix:**
1. First: Add all required environment variables
2. Then: Complete database initialization (Step 1)

### Issue: Function does not exist error
**Cause:** Trying to run schema before creating function
**Fix:** Run Step 1.1 BEFORE Step 1.2

### Issue: Authentication not working
**Cause:** Missing BETTER_AUTH_URL or AUTH_SECRET
**Fix:** Verify Step 3 environment variables are all set

### Issue: Can't send emails
**Cause:** Missing RESEND_API_KEY
**Fix:** Add API key from https://resend.com

### Issue: File uploads failing
**Cause:** Missing UPLOADTHING_TOKEN
**Fix:** Add token from https://uploadthing.com

## Next Steps After Deployment

1. **Create Admin User**: Sign up with your email
2. **Configure Organization**: Set up your first organization
3. **Test Core Features**:
   - Create a compliance framework
   - Add a vendor
   - Run a risk assessment
4. **Set Up Integrations**: Configure AWS, Azure, Google Workspace, etc.
5. **Invite Team Members**: Add users to your organization

## Support

- Vercel Logs: https://vercel.com/[your-team]/compiel-platform-api/logs
- Supabase Logs: https://supabase.com/dashboard/project/wtqvjcmjkpjaokoxwutc/logs
- Trigger.dev Dashboard: https://cloud.trigger.dev/projects/proj_cqlwtfdjrekkxjtczpfw

---

**Current Blocker:** Missing required environment variables in Vercel (Step 3)
**Critical Missing:** `RESEND_API_KEY` - Must create account at https://resend.com
**Once Complete:** Add all env vars → Initialize database → Deployment fully functional ✅
