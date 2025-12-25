# Google OAuth Setup Guide

## ✅ Credentials Configured

Your Google OAuth credentials have been added to the local environment:

- **Client ID**: `[Your Google OAuth Client ID]`
- **Client Secret**: `[Your Google OAuth Client Secret]`
- **Status**: Active
- **Created**: 19 December 2025, 13:57:10 GMT+1

## 🔧 Required Actions

### 1. Configure Authorized Redirect URIs in Google Cloud Console

**CRITICAL:** Google OAuth will not work until you add the authorized redirect URIs.

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID from Google Cloud Console
3. Click on it to edit
4. Scroll to **Authorized redirect URIs**
5. Add these URIs:
   - `https://compiel-platform-api.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`
6. Click **Save**

### 2. Add to Vercel Environment Variables

Go to your Vercel project settings: https://vercel.com/[your-team]/compiel-platform-api/settings/environment-variables

Add these two environment variables:

| Variable Name | Value |
|--------------|-------|
| `AUTH_GOOGLE_ID` | `[Your Google OAuth Client ID]` |
| `AUTH_GOOGLE_SECRET` | `[Your Google OAuth Client Secret]` |

**Important:** After adding these, you need to **redeploy** your application for the changes to take effect.

### 3. Redeploy Application

After adding the environment variables, trigger a new deployment:

**Option A - Via Vercel Dashboard:**
- Go to Deployments tab
- Click "Redeploy" on the latest deployment

**Option B - Via Git Push:**
```bash
git commit --allow-empty -m "Trigger redeploy for Google OAuth env vars"
git push
```

## 🧪 Testing Google Sign-In

After completing the setup:

1. Go to: https://compiel-platform-api.vercel.app
2. Click **"Sign in with Google"** button
3. Select your Google account
4. Grant permissions
5. You should be redirected back to the app and signed in ✅

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
**Cause:** Authorized redirect URI not configured in Google Cloud Console
**Fix:** Complete Step 1 above and ensure the URI exactly matches

### Error: "Invalid client"
**Cause:** Environment variables not set in Vercel
**Fix:** Complete Step 2 above and redeploy

### Error: "Access blocked: App not verified"
**Cause:** Google OAuth consent screen not configured
**Solution:**
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Add app logo, privacy policy, terms of service
3. Add test users (or publish the app)

### Google Sign-In Button Not Appearing
**Cause:** Environment variables missing or app not redeployed
**Fix:** Verify environment variables are set and redeploy

## 📝 Local Development

For local development, add your Google OAuth credentials to your `.env` file:

```bash
AUTH_GOOGLE_ID="[Your Google OAuth Client ID]"
AUTH_GOOGLE_SECRET="[Your Google OAuth Client Secret]"
```

Make sure you have the localhost redirect URI configured in Google Cloud Console:
- `http://localhost:3000/api/auth/callback/google`

Then start your dev server:
```bash
cd apps/app
bun run dev
```

## 🔐 Security Notes

- **Never commit** the client secret to public repositories (it's in `.env` which is gitignored)
- Keep the client secret secure
- Rotate credentials if they're ever exposed
- Monitor OAuth usage in Google Cloud Console

## ✅ Checklist

- [ ] Added redirect URIs to Google Cloud Console
- [ ] Added `AUTH_GOOGLE_ID` to Vercel environment variables
- [ ] Added `AUTH_GOOGLE_SECRET` to Vercel environment variables
- [ ] Redeployed application
- [ ] Tested Google sign-in on production
- [ ] Tested Google sign-in on localhost (optional)

---

**Status**: Configuration complete, pending Vercel deployment
**Next Step**: Add environment variables to Vercel and redeploy
