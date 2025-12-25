# Microsoft/Office 365 OAuth Setup Guide

## Overview

Your application already supports Microsoft/Office 365 authentication via Better Auth. You just need to create OAuth credentials in Azure AD (Microsoft Entra ID).

**Current Status:**
- ✅ Code is ready (configured in [auth.ts](apps/app/src/utils/auth.ts))
- ⏳ Need to create Azure AD app registration
- ⏳ Need to add environment variables to Vercel

---

## Step 1: Create Azure AD App Registration

### 1.1 Go to Azure Portal
Open: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade

### 1.2 Create New Registration
1. Click **"New registration"**
2. Fill in the details:
   - **Name**: `Compiel Platform` (or your preferred name)
   - **Supported account types**: Select **"Accounts in any organizational directory and personal Microsoft accounts"**
     - This allows both Office 365 work accounts AND personal Microsoft accounts
   - **Redirect URI**:
     - Platform: **Web**
     - URL: `https://compiel-platform-api.vercel.app/api/auth/callback/microsoft`
3. Click **"Register"**

### 1.3 Add Additional Redirect URIs
After registration, go to **"Authentication"** in the left sidebar:
1. Under "Web" redirect URIs, click **"Add URI"**
2. Add these URIs:
   - `https://compiel-platform-api.vercel.app/api/auth/callback/microsoft` (production)
   - `http://localhost:3000/api/auth/callback/microsoft` (local dev)
3. Scroll down to **"Implicit grant and hybrid flows"**:
   - ✅ Check **"ID tokens"** (for authentication)
4. Click **"Save"**

### 1.4 Get Client ID
1. Go to **"Overview"** in the left sidebar
2. Copy the **"Application (client) ID"**
   - Example: `12345678-1234-1234-1234-123456789012`
   - This is your `AUTH_MICROSOFT_CLIENT_ID`

### 1.5 Create Client Secret
1. Go to **"Certificates & secrets"** in the left sidebar
2. Click **"New client secret"**
3. Add description: `Compiel Production`
4. Choose expiration: **24 months** (recommended)
5. Click **"Add"**
6. **⚠️ IMPORTANT**: Copy the **Value** immediately (you won't be able to see it again)
   - Example: `abc123~XyZ789...`
   - This is your `AUTH_MICROSOFT_CLIENT_SECRET`

### 1.6 Configure API Permissions (Optional but Recommended)
1. Go to **"API permissions"** in the left sidebar
2. By default, you should see:
   - Microsoft Graph: `User.Read` (already granted)
3. This is sufficient for basic authentication

---

## Step 2: Add Environment Variables to Vercel

### Go to Vercel Settings
Open: https://vercel.com/[your-team]/compiel-platform-api/settings/environment-variables

### Add These Variables:

**AUTH_MICROSOFT_CLIENT_ID**
```
[Your Application (client) ID from Step 1.4]
```

**AUTH_MICROSOFT_CLIENT_SECRET**
```
[Your Client Secret Value from Step 1.5]
```

**Important:**
- Check all environments: Production, Preview, Development
- Click **Save**

---

## Step 3: Add to Local Environment

Update your local `.env` file:

```bash
# Microsoft OAuth (Office 365)
AUTH_MICROSOFT_CLIENT_ID="12345678-1234-1234-1234-123456789012"
AUTH_MICROSOFT_CLIENT_SECRET="abc123~XyZ789..."
```

---

## Step 4: Redeploy

After adding the environment variables to Vercel:

**Option A - Automatic:**
- Vercel should auto-deploy when you save environment variables

**Option B - Manual:**
```bash
git commit --allow-empty -m "Trigger redeploy for Microsoft auth"
git push
```

---

## Step 5: Test Microsoft Sign-In

### 5.1 Open Your App
Go to: https://compiel-platform-api.vercel.app/auth

### 5.2 Look for Microsoft Button
You should see a "Sign in with Microsoft" button alongside Google

### 5.3 Test Sign-In
1. Click "Sign in with Microsoft"
2. You'll be redirected to Microsoft login
3. Sign in with any of these:
   - **Office 365 work/school account** (e.g., user@company.com)
   - **Personal Microsoft account** (e.g., user@outlook.com, user@hotmail.com)
4. Grant permissions when prompted
5. You'll be redirected back to your app

---

## Configuration Details

### What's Already Configured

From [auth.ts:42-52](apps/app/src/utils/auth.ts#L42-L52):

```typescript
microsoft: {
  clientId: env.AUTH_MICROSOFT_CLIENT_ID,
  clientSecret: env.AUTH_MICROSOFT_CLIENT_SECRET,
  tenantId: 'common', // Allows any Microsoft account
  prompt: 'select_account', // Forces account selection
}
```

**What this means:**
- ✅ **tenantId: 'common'**: Accepts ANY Microsoft account (personal or organizational)
- ✅ **prompt: 'select_account'**: Forces account picker (good UX for multi-account users)
- ✅ **Account linking enabled**: Users can link Microsoft account to existing accounts

### Account Types Supported

| Account Type | Email Format | Supported |
|--------------|--------------|-----------|
| Office 365 Work | user@company.com | ✅ Yes |
| Office 365 School | user@school.edu | ✅ Yes |
| Personal Microsoft | user@outlook.com | ✅ Yes |
| Personal Microsoft | user@hotmail.com | ✅ Yes |
| Personal Microsoft | user@live.com | ✅ Yes |

---

## Troubleshooting

### Issue: "Sign in with Microsoft" Button Not Showing

**Cause:** Environment variables not set or deployment not complete

**Fix:**
1. Verify environment variables are set in Vercel
2. Check deployment completed successfully
3. Clear browser cache and reload

### Issue: "AADSTS50011: The reply URL specified in the request does not match"

**Cause:** Redirect URI mismatch

**Fix:**
1. Go to Azure AD app → Authentication
2. Ensure this exact URL is listed:
   ```
   https://compiel-platform-api.vercel.app/api/auth/callback/microsoft
   ```
3. URL must match exactly (including `/api/auth/callback/microsoft`)

### Issue: "AADSTS700016: Application not found in the directory"

**Cause:** Wrong tenant ID or app not created

**Fix:**
1. Verify you're using the correct Application (client) ID
2. Make sure tenantId is set to `'common'` in auth.ts (already done)

### Issue: Users Can't Sign In with Personal Microsoft Accounts

**Cause:** Wrong account type selected during registration

**Fix:**
1. Go to Azure AD app → Authentication
2. Under "Supported account types", ensure:
   - **"Accounts in any organizational directory and personal Microsoft accounts"** is selected
3. If not, you need to create a new app registration with the correct account type

---

## Security Best Practices

### ✅ Recommended Settings (Already Configured)

1. **Account Linking Enabled**: Users can link Microsoft to existing accounts
2. **Prompt: select_account**: Prevents automatic sign-in (security)
3. **TenantId: common**: Works with any Microsoft account type

### 🔐 Azure AD Recommendations

1. **Client Secret Expiration**: Set to 24 months, add calendar reminder to rotate
2. **API Permissions**: Keep minimal (User.Read is sufficient)
3. **Certificates**: For production, consider using certificates instead of secrets
4. **Monitoring**: Enable sign-in logs in Azure AD (Entra ID)

---

## Multi-Tenant Considerations

### Current Configuration: Multi-Tenant

Your app accepts users from **any** Microsoft tenant (organization). This is correct for a SaaS application.

**If you need to restrict to specific tenants:**

1. Change `tenantId` in auth.ts from `'common'` to your specific tenant ID:
   ```typescript
   tenantId: 'your-tenant-id-here', // Restricts to one organization
   ```

2. Or use `'organizations'` to allow any organizational account (but not personal):
   ```typescript
   tenantId: 'organizations', // Work/school only, no personal accounts
   ```

**For most SaaS apps, keep it as `'common'` (current setting).**

---

## Testing Checklist

After setup, test these scenarios:

- [ ] Sign in with Office 365 work account
- [ ] Sign in with personal Microsoft account (outlook.com)
- [ ] Sign in with existing email, then link Microsoft account
- [ ] Sign out and sign back in with Microsoft
- [ ] Test on different browsers
- [ ] Test account picker shows multiple accounts
- [ ] Verify user profile data is captured correctly

---

## Quick Reference

| Setting | Value |
|---------|-------|
| **Redirect URI (Production)** | `https://compiel-platform-api.vercel.app/api/auth/callback/microsoft` |
| **Redirect URI (Localhost)** | `http://localhost:3000/api/auth/callback/microsoft` |
| **Tenant ID** | `common` (accepts all Microsoft accounts) |
| **Prompt** | `select_account` (forces account picker) |
| **API Permissions** | `User.Read` (minimum required) |
| **Account Types** | All (personal + organizational) |

---

## Next Steps After Setup

1. ✅ Create Azure AD app registration
2. ✅ Add environment variables to Vercel
3. ✅ Deploy and test
4. 🔄 Update Google Cloud Console redirect URIs (if not done yet)
5. 🔄 Test all authentication methods:
   - Email magic link
   - Google OAuth
   - Microsoft OAuth
6. 📝 Document for your team which auth methods are available

---

## Support Links

- **Azure AD Portal**: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
- **Microsoft Identity Docs**: https://learn.microsoft.com/en-us/azure/active-directory/develop/
- **Better Auth Microsoft Provider**: https://www.better-auth.com/docs/authentication/social#microsoft

---

**Status**: Configuration ready in code, waiting for Azure AD credentials
**Time to Setup**: ~10 minutes
**Cost**: Free (Azure AD app registration is free)
