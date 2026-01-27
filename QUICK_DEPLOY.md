# 🚀 Guide de Déploiement Rapide Compiel

## Architecture Finale

```
┌─────────────────────────────────────────────────────┐
│                  compiel.com                        │
│           (Site Marketing - Public)                 │
│  Pages: Home, Features, Pricing, About, Contact    │
└─────────────────────────────────────────────────────┘
                        │
                        ├── "Get Started" →
                        │
┌─────────────────────────────────────────────────────┐
│              app.compiel.com                        │
│          (Application SaaS - Clients)               │
│   Auth, Dashboard, Compliance Management, AI        │
└─────────────────────────────────────────────────────┘
                        │
                        ├── Invite Employees →
                        │
┌─────────────────────────────────────────────────────┐
│            portal.compiel.com                       │
│         (Portail Employé - Restricted)              │
│        Training, Policies, Compliance Tasks         │
└─────────────────────────────────────────────────────┘
```

---

## ⚡ Déploiement en 10 Minutes

### 1️⃣ Créer les 3 Projets Vercel (5 min)

#### A. Site Marketing → `compiel.com`
```bash
1. Vercel Dashboard → "Add New Project"
2. Import votre repo GitHub
3. Configurez:
   - Name: compiel-marketing
   - Root Directory: apps/marketing
   - Framework: Next.js (auto-détecté)
   - Build Command: (override) cd ../.. && bunx turbo build --filter=@compiel/marketing
   - Output Directory: .next (défaut)
   - Install Command: bun install
4. Deploy
5. Dans Settings → Domains, ajoutez:
   - compiel.com
   - www.compiel.com
```

#### B. Application → `app.compiel.com`
```bash
1. Vercel Dashboard → "Add New Project"
2. Import le même repo GitHub
3. Configurez:
   - Name: compiel-app
   - Root Directory: apps/app
   - Framework: Next.js (auto-détecté)
   - Build Command: (override) cd ../.. && bunx turbo build --filter=@compiel/app
   - Output Directory: .next (défaut)
   - Install Command: bun install
4. Deploy
5. Dans Settings → Domains, ajoutez:
   - app.compiel.com
```

#### C. Portail → `portal.compiel.com`
```bash
1. Vercel Dashboard → "Add New Project"
2. Import le même repo GitHub
3. Configurez:
   - Name: compiel-portal
   - Root Directory: apps/portal
   - Framework: Next.js (auto-détecté)
   - Build Command: (override) cd ../.. && bunx turbo build --filter=@compiel/portal
   - Output Directory: .next (défaut)
   - Install Command: bun install
4. Deploy
5. Dans Settings → Domains, ajoutez:
   - portal.compiel.com
```

---

### 2️⃣ Configurer les Variables d'Environnement (3 min)

#### Pour `compiel-app` (le plus important)

Allez dans **Project Settings** → **Environment Variables**, ajoutez:

**✅ Obligatoires**:
```env
AUTH_GOOGLE_ID=<your-google-oauth-client-id>
AUTH_GOOGLE_SECRET=<your-google-oauth-secret>
AUTH_SECRET=<generate-random-32-byte-secret>
SECRET_KEY=<generate-random-32-byte-secret>
NEXT_PUBLIC_BETTER_AUTH_URL=https://app.compiel.com
BETTER_AUTH_URL=https://app.compiel.com
DATABASE_URL=<votre-postgresql-url>
OPENAI_API_KEY=<votre-clé-openai>
RESEND_API_KEY=<votre-clé-resend>
TRIGGER_SECRET_KEY=<votre-clé-trigger>
NEXT_PUBLIC_PORTAL_URL=https://portal.compiel.com
REVALIDATION_SECRET=<générer-avec-openssl>
```

**📦 Optionnels mais recommandés**:
```env
GROQ_API_KEY=<pour-ai-chat>
APP_AWS_ACCESS_KEY_ID=<pour-uploads-s3>
APP_AWS_SECRET_ACCESS_KEY=<pour-uploads-s3>
APP_AWS_REGION=eu-west-3
APP_AWS_BUCKET_NAME=compiel-prod-attachments
FIRECRAWL_API_KEY=<pour-vendor-research>
UPSTASH_REDIS_REST_URL=<pour-rate-limiting>
UPSTASH_REDIS_REST_TOKEN=<pour-rate-limiting>
```

#### Pour `compiel-marketing` (simple)
```env
NEXT_PUBLIC_APP_URL=https://app.compiel.com
RESEND_API_KEY=<même-clé-que-app>
```

#### Pour `compiel-portal` (minimal)
```env
AUTH_SECRET=<même-que-app>
NEXT_PUBLIC_BETTER_AUTH_URL=https://app.compiel.com
BETTER_AUTH_URL=https://app.compiel.com
DATABASE_URL=<même-db-que-app>
```

---

### 3️⃣ Mettre à jour Google OAuth (2 min)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Trouvez votre OAuth 2.0 Client ID
3. Ajoutez ces URIs:

**Authorized JavaScript origins**:
```
https://compiel.com
https://app.compiel.com
https://portal.compiel.com
```

**Authorized redirect URIs**:
```
https://app.compiel.com/api/auth/callback/google
```

4. Sauvegardez

---

## ✅ Vérification Post-Déploiement

### Tests à faire (2 min)

- [ ] **https://compiel.com** → Page d'accueil marketing
- [ ] Cliquer "Get Started" → Redirige vers **https://app.compiel.com/signup**
- [ ] **https://app.compiel.com/auth** → Page de connexion
- [ ] Cliquer "Continue with Google" → Google OAuth fonctionne
- [ ] Se connecter → Dashboard s'affiche
- [ ] **https://portal.compiel.com** → Portail employé

---

## 🐛 Problèmes Fréquents

### ❌ "Build Failed"
**Solution**: Dans Vercel, allez dans le déploiement échoué → **View Logs**
- Si erreur TypeScript → Fix localement et push
- Si dépendances manquantes → Vérifiez `package.json`

### ❌ "redirect_uri_mismatch" Google OAuth
**Solution**:
1. Vérifiez que l'URI dans Google Console est **exactement**:
   `https://app.compiel.com/api/auth/callback/google`
2. Pas de trailing slash `/`
3. Attendez 5 minutes pour propagation

### ❌ "Database Connection Failed"
**Solution**:
- Vérifiez que `DATABASE_URL` est correcte
- Ajoutez `?sslmode=require` à la fin si nécessaire
- Vérifiez que votre DB accepte les connexions externes

### ❌ Page 404 ou routes-manifest.json not found
**Solution**:
- Vérifiez que **Root Directory** est correctement défini:
  - `compiel-marketing`: `apps/marketing`
  - `compiel-app`: `apps/app`
  - `compiel-portal`: `apps/portal`
- Vérifiez que **Output Directory** est `.next` (défaut)
- Vérifiez que **Build Command** est: `cd ../.. && bunx turbo build --filter=@compiel/xxx`

---

## 📊 Ressources de Suivi

### Logs en temps réel
- Vercel Dashboard → Votre projet → **Runtime Logs**

### Déploiements
- Vercel Dashboard → Votre projet → **Deployments**

### Analytics
- Activez dans: Project Settings → **Analytics**

---

## 🎯 Prochaines Étapes

Après le premier déploiement réussi:

1. **Migrer la base de données**:
   ```bash
   DATABASE_URL="postgresql://prod-url" bun run db:migrate
   ```

2. **Tester l'inscription complète**:
   - Créer un compte
   - Créer une organisation
   - Inviter un membre

3. **Configurer les backups DB** (Vercel Postgres le fait automatiquement)

4. **Activer les alertes** pour les erreurs critiques

5. **Documenter l'accès** pour l'équipe

---

## 💡 Tips

- **Preview Deployments**: Chaque PR créera des URLs de preview automatiquement
- **Rollback facile**: Dans Deployments, cliquez sur un ancien déploiement → **Promote to Production**
- **Environment Branches**: Créez des env différents pour `staging` branch
- **Cache**: Vercel cache automatiquement les assets statiques (images, CSS, JS)

---

## 🆘 Support

Si vous rencontrez des problèmes:
1. Consultez [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) pour plus de détails
2. Vérifiez les logs Vercel
3. Testez en local d'abord avec les mêmes variables d'env

---

**Temps total estimé: 10-15 minutes** ⏱️

Bonne chance! 🚀
