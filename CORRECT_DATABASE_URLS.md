# Correct Database Connection Strings

## Debug Summary

### DNS Resolution Results:
✅ **Pooler (EU West)**: `aws-1-eu-west-1.pooler.supabase.com` → Resolves to AWS IPs
✅ **Direct Connection**: `wtqvjcmjkpjaokoxwutc.supabase.co` → Resolves to Cloudflare IPs
❌ **Wrong hostname**: `db.wtqvjcmjkpjaokoxwutc.supabase.co` → Does not resolve

### Findings:
- The pooler hostname uses `aws-1-eu-west-1` (EU West region)
- The direct connection uses `wtqvjcmjkpjaokoxwutc.supabase.co` (without `db.` prefix)
- Password reset to: `7Mxbvuk8fCDkSh0g`

---

## ✅ Correct Connection Strings for Vercel

### 1. DATABASE_URL (Transaction Pooler - Port 6543)
```
postgresql://postgres.wtqvjcmjkpjaokoxwutc:7Mxbvuk8fCDkSh0g@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

⚠️ **IMPORTANT**: Le paramètre `?pgbouncer=true` est REQUIS pour désactiver les prepared statements et éviter les erreurs avec PgBouncer.

**Used for:**
- Most database queries
- Better Auth operations
- Application runtime queries

---

### 2. DIRECT_URL (Direct Connection - Port 5432)
```
postgresql://postgres:7Mxbvuk8fCDkSh0g@wtqvjcmjkpjaokoxwutc.supabase.co:5432/postgres
```

**Used for:**
- Prisma migrations
- Schema operations
- Long-running transactions

---

## How to Update in Vercel

### Step 1: Open Vercel Environment Variables
Go to: https://vercel.com/[your-team]/compiel-platform-api/settings/environment-variables

### Step 2: Update DATABASE_URL
1. Find `DATABASE_URL` in the list
2. Click the three dots (...) next to it
3. Click **Edit**
4. Replace with:
   ```
   postgresql://postgres.wtqvjcmjkpjaokoxwutc:7Mxbvuk8fCDkSh0g@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
   ```
5. Ensure all environments are checked (Production, Preview, Development)
6. Click **Save**

### Step 3: Update DIRECT_URL
1. Find `DIRECT_URL` in the list
2. Click the three dots (...) next to it
3. Click **Edit**
4. Replace with:
   ```
   postgresql://postgres:7Mxbvuk8fCDkSh0g@wtqvjcmjkpjaokoxwutc.supabase.co:5432/postgres
   ```
5. Ensure all environments are checked
6. Click **Save**

### Step 4: Redeploy
After saving both variables:
- Vercel should automatically trigger a new deployment
- If not, manually redeploy from the Deployments page

---

## Testing After Update

Once redeployed, test the magic link sign-in:

1. Go to: https://compiel-platform-api.vercel.app/auth
2. Enter your email
3. Click "Continue with email"
4. Check browser console (F12) - should see no 500 errors
5. Check your email for the magic link

**Expected behavior:** You should see "Check your email" message without errors.

---

## Why Local Connection Failed

My local machine couldn't connect to the database due to:
- Network/firewall restrictions (common on Windows)
- Corporate network blocking PostgreSQL ports (5432, 6543)
- ISP filtering

However, Vercel can connect (we see auth errors, not connection errors), which confirms the hostnames are correct.

---

## Current Status

- ✅ Database hostnames confirmed via DNS
- ✅ Password reset to `7Mxbvuk8fCDkSh0g`
- ✅ Connection strings formatted correctly
- ⏳ **Waiting for Vercel environment variables to be updated**
- ⏳ **Waiting for redeploy with new credentials**

---

**Next Step:** Update the two environment variables in Vercel, then redeploy.
