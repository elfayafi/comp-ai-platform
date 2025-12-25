# Supabase Database Initialization - Quick Reference

## 🚨 CRITICAL: Follow This Exact Order

Your deployment is live but getting errors because the database tables don't exist yet.
Follow these 2 steps IN ORDER to fix it:

---

## Step 1️⃣: Create Function (3 minutes)

1. Go to: https://supabase.com/dashboard/project/wtqvjcmjkpjaokoxwutc/sql/new
2. Copy and paste this EXACT code:

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

3. Click **RUN** button
4. ✅ You should see: `Success. No rows returned`

---

## Step 2️⃣: Create Schema (5 minutes)

1. Open the file: `supabase-init-clean.sql` (1921 lines, 73KB)
2. Copy the **ENTIRE FILE** contents
3. Go to: https://supabase.com/dashboard/project/wtqvjcmjkpjaokoxwutc/sql/new
4. Paste the entire content
5. Click **RUN** button
6. ✅ Wait for completion (may take 30-60 seconds)

**Expected Output:** You'll see many success messages like:
- `CREATE SCHEMA`
- `CREATE EXTENSION`
- `CREATE TYPE`
- `CREATE TABLE` (many times)
- `CREATE INDEX` (many times)
- `ALTER TABLE` (many times)

---

## Verification

After both steps complete:

### Test 1: Check Function Exists
```sql
SELECT generate_prefixed_cuid('test');
```
**Expected:** Returns something like `test_67676f2a8a4f3c1d`

### Test 2: Check Tables Exist
```sql
SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
```
**Expected:** Returns a number > 50 (you have many tables)

### Test 3: Check App Works
Open: https://compiel-platform-api.vercel.app

**Expected:** Homepage loads without 500 errors ✅

---

## Common Errors & Solutions

### ❌ Error: "syntax error at or near Loaded"
**Fix:** You're using the wrong file. Use `supabase-init-clean.sql` (not `supabase-init.sql`)

### ❌ Error: "function generate_prefixed_cuid does not exist"
**Fix:** You skipped Step 1. Go back and create the function FIRST.

### ❌ Error: "relation already exists"
**Fix:** You already ran the schema. This is fine, ignore and continue.

---

## Why This Order Matters

Every table in your schema uses this pattern:
```sql
CREATE TABLE "Something" (
  "id" TEXT NOT NULL DEFAULT generate_prefixed_cuid('prefix'::text),
  ...
)
```

PostgreSQL needs the function to exist BEFORE creating tables that reference it.

---

## Files Reference

- **Function Definition:** `packages/db/prisma/functionDefinition.sql`
- **Clean Schema:** `supabase-init-clean.sql` (use this one)
- **Original Schema:** `supabase-init.sql` (don't use - has header issues)

---

## Next Steps After Initialization

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for:
- Environment variable verification
- Trigger.dev production deployment
- Feature testing
- Team setup

---

**Current Status:** Database initialization in progress
**Time Required:** ~8 minutes total
**Blocker Level:** 🔴 Critical - app won't work until complete
