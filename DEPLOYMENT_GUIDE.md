# Guide de Déploiement Compiel

## 🎯 Architecture des Domaines

Votre infrastructure Compiel utilise **3 applications** déployées sur **3 domaines différents**:

```
compiel.com               → Site vitrine marketing (apps/marketing)
app.compiel.com           → Application principale (apps/app)
portal.compiel.com        → Portail employé (apps/portal)
```

## 📦 Applications du Monorepo

### 1. Site Marketing - `apps/marketing`
- **Domaine**: `compiel.com` (et `www.compiel.com`)
- **Description**: Site vitrine public avec pages marketing
- **Pages**: Home, Features, Pricing, About, Contact
- **Framework**: Next.js 16 avec Turbopack
- **Port local**: 3003

### 2. Application Principale - `apps/app`
- **Domaine**: `app.compiel.com`
- **Description**: Application SaaS principale pour les clients
- **Features**: Dashboard, Compliance automation, AI features
- **Framework**: Next.js 16 avec Turbopack
- **Port local**: 3000
- **Base de données**: PostgreSQL
- **Auth**: Better Auth avec Google OAuth

### 3. Portail Employé - `apps/portal`
- **Domaine**: `portal.compiel.com`
- **Description**: Portail pour les employés des organisations clientes
- **Framework**: Next.js 16
- **Port local**: 3002

---

## 🚀 Déploiement sur Vercel

### Prérequis

1. Compte Vercel avec accès au domaine `compiel.com`
2. Domaine `compiel.com` configuré dans Vercel
3. Accès à la base de données PostgreSQL (production)
4. Variables d'environnement préparées

### Étape 1: Créer 3 Projets Vercel

Vous devez créer **3 projets Vercel séparés**:

#### Projet 1: Marketing Site
1. Dans Vercel Dashboard → **Add New Project**
2. Importez votre repo GitHub
3. **Project Name**: `compiel-marketing`
4. **Framework Preset**: Next.js
5. **Root Directory**: `apps/marketing` (Vercel saura où chercher l'app Next.js)
6. **Build Command**: `cd ../.. && bunx turbo build --filter=@compiel/marketing` (remonte à la racine pour Turbo)
7. **Install Command**: `bun install` (s'exécute à la racine)
8. **Output Directory**: `.next` (défaut, relatif au Root Directory)

#### Projet 2: Application Principale
1. Dans Vercel Dashboard → **Add New Project**
2. Importez votre repo GitHub
3. **Project Name**: `compiel-app`
4. **Framework Preset**: Next.js
5. **Root Directory**: `apps/app`
6. **Build Command**: `cd ../.. && bunx turbo build --filter=@compiel/app`
7. **Install Command**: `bun install`
8. **Output Directory**: `.next` (défaut)

#### Projet 3: Portail Employé
1. Dans Vercel Dashboard → **Add New Project**
2. Importez votre repo GitHub
3. **Project Name**: `compiel-portal`
4. **Framework Preset**: Next.js
5. **Root Directory**: `apps/portal`
6. **Build Command**: `cd ../.. && bunx turbo build --filter=@compiel/portal`
7. **Install Command**: `bun install`
8. **Output Directory**: `.next` (défaut)

---

### Étape 2: Configurer les Domaines

#### Pour le Site Marketing (`compiel-marketing`)
1. Allez dans **Project Settings** → **Domains**
2. Ajoutez les domaines:
   - `compiel.com` (domaine principal)
   - `www.compiel.com` (redirection automatique)

#### Pour l'Application (`compiel-app`)
1. Allez dans **Project Settings** → **Domains**
2. Ajoutez le domaine:
   - `app.compiel.com`

#### Pour le Portail (`compiel-portal`)
1. Allez dans **Project Settings** → **Domains**
2. Ajoutez le domaine:
   - `portal.compiel.com`

---

### Étape 3: Variables d'Environnement

#### Variables pour `compiel-marketing`

```env
# App URL
NEXT_PUBLIC_APP_URL=https://app.compiel.com

# Resend (for contact form)
RESEND_API_KEY=re_xxx

# Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_GTM_ID=GTM-xxx
```

#### Variables pour `compiel-app`

```env
# Authentication & Database
AUTH_GOOGLE_ID=973201244464-xxx.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-xxx
AUTH_SECRET=xxx # openssl rand -base64 32
SECRET_KEY=xxx # openssl rand -base64 32
NEXT_PUBLIC_BETTER_AUTH_URL=https://app.compiel.com
BETTER_AUTH_URL=https://app.compiel.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# OpenAI & AI
OPENAI_API_KEY=sk-xxx
GROQ_API_KEY=gsk_xxx
ANTHROPIC_API_KEY=sk-ant-xxx

# Email
RESEND_API_KEY=re_xxx

# AWS S3 (pour uploads)
APP_AWS_ACCESS_KEY_ID=xxx
APP_AWS_SECRET_ACCESS_KEY=xxx
APP_AWS_REGION=eu-west-3
APP_AWS_BUCKET_NAME=compiel-attachments
APP_AWS_ORG_ASSETS_BUCKET=compiel-org-assets

# Trigger.dev (async jobs)
TRIGGER_SECRET_KEY=tr_xxx
TRIGGER_API_KEY=tr_xxx

# Portal URL
NEXT_PUBLIC_PORTAL_URL=https://portal.compiel.com

# Revalidation
REVALIDATION_SECRET=xxx # openssl rand -base64 32

# Redis (optional - rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_GTM_ID=GTM-xxx

# Vercel (pour trust portal)
VERCEL_ACCESS_TOKEN=xxx
VERCEL_TEAM_ID=xxx
VERCEL_PROJECT_ID=xxx

# Firecrawl (vendor research)
FIRECRAWL_API_KEY=fc-xxx

# Microsoft OAuth (optional)
AUTH_MICROSOFT_CLIENT_ID=xxx
AUTH_MICROSOFT_CLIENT_SECRET=xxx

# GitHub OAuth (optional)
AUTH_GITHUB_ID=xxx
AUTH_GITHUB_SECRET=xxx
```

#### Variables pour `compiel-portal`

```env
# Auth
AUTH_SECRET=xxx # même que compiel-app
NEXT_PUBLIC_BETTER_AUTH_URL=https://app.compiel.com
BETTER_AUTH_URL=https://app.compiel.com

# Database (même DB que compiel-app)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

### Étape 4: Configurer Google OAuth

Mettez à jour votre configuration Google Cloud Console:

#### Authorized JavaScript origins:
```
https://compiel.com
https://www.compiel.com
https://app.compiel.com
https://portal.compiel.com
http://localhost:3000
```

#### Authorized redirect URIs:
```
https://app.compiel.com/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

---

## 🔄 Workflow de Déploiement

### Déploiement Automatique (Recommandé)

1. **Push sur `main` branch**:
   ```bash
   git add .
   git commit -m "feat: your changes"
   git push origin main
   ```

2. Vercel détecte automatiquement les changements et déploie les 3 projets

### Preview Deployments

- Chaque Pull Request créera des **preview URLs** pour tester avant merge
- Format: `compiel-app-xxx.vercel.app`

---

## 📊 Configuration Turbo (Monorepo)

Votre `turbo.json` doit définir les pipelines pour chaque app:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## 🔐 Base de Données PostgreSQL

### Options de Déploiement

#### Option 1: Vercel Postgres (Recommandé)
- Intégration native avec Vercel
- Auto-scaling
- Backups automatiques
- Prix: ~$20/mois

**Configuration**:
1. Dans votre projet Vercel → **Storage** → **Create Database**
2. Sélectionnez **Postgres**
3. Copiez le `DATABASE_URL` dans les variables d'environnement des 3 projets

#### Option 2: Neon (PostgreSQL Serverless)
- Gratuit jusqu'à 3GB
- Auto-scaling
- URL: https://neon.tech

#### Option 3: Supabase
- PostgreSQL + Auth + Storage
- Gratuit jusqu'à 500MB
- URL: https://supabase.com

### Migrations

Pour appliquer les migrations en production:

```bash
# En local, pointez vers la DB de production
DATABASE_URL="postgresql://prod-url" bun run db:migrate
```

---

## 🔍 Vérification Post-Déploiement

### Checklist

- [ ] **compiel.com** affiche le site marketing
- [ ] **app.compiel.com** affiche l'application
- [ ] **portal.compiel.com** affiche le portail
- [ ] Google OAuth fonctionne sur `app.compiel.com`
- [ ] Les redirections HTTPS sont actives
- [ ] Les variables d'environnement sont correctes
- [ ] La base de données est accessible
- [ ] Les emails (Resend) fonctionnent
- [ ] Les uploads S3 fonctionnent
- [ ] Analytics/tracking actif

### Tests à effectuer

1. **Site Marketing**:
   - Naviguer sur toutes les pages
   - Tester le formulaire de contact
   - Vérifier les boutons "Get Started" → redirigent vers `app.compiel.com/signup`

2. **Application**:
   - Créer un compte
   - Se connecter avec Google
   - Créer une organisation
   - Tester les features principales

3. **Portail**:
   - Se connecter comme employé
   - Vérifier l'accès aux ressources

---

## 🛠️ Troubleshooting

### Problème: Build Failed

**Solution**: Vérifiez les logs de build dans Vercel Dashboard:
- Erreurs de dépendances → `bun install` manquant
- Erreurs TypeScript → Corriger les erreurs localement d'abord
- Variables manquantes → Ajouter dans Environment Variables

### Problème: 404 ou "routes-manifest.json couldn't be found"

**Solution**:
- Vérifiez que **Root Directory** est correctement défini:
  - `compiel-marketing`: `apps/marketing`
  - `compiel-app`: `apps/app`
  - `compiel-portal`: `apps/portal`
- Vérifiez que **Output Directory** est `.next` (défaut, pas un chemin absolu)
- Vérifiez que **Build Command** est: `cd ../.. && bunx turbo build --filter=@compiel/xxx`
- Le `cd ../..` est crucial pour que Turbo trouve `turbo.json` à la racine
- Pour Next.js App Router, assurez-vous que les pages existent dans `app/`

### Problème: Database Connection Failed

**Solution**:
- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que la DB autorise les connexions depuis Vercel
- Pour PostgreSQL, ajoutez `?sslmode=require` à la fin de l'URL

### Problème: Google OAuth ne fonctionne pas

**Solution**:
- Vérifiez que les redirect URIs dans Google Console matchent exactement
- Vérifiez `NEXT_PUBLIC_BETTER_AUTH_URL` pointe vers le bon domaine
- Effacez le cache du navigateur

---

## 📈 Monitoring et Analytics

### Vercel Analytics
Activez dans chaque projet:
- **Settings** → **Analytics** → Enable

### Logs en Production
Accédez aux logs:
- **Project** → **Deployments** → Cliquez sur un déploiement → **Logs**

---

## 💰 Coûts Estimés (Vercel)

- **Hobby Plan** (Gratuit):
  - 100GB bandwidth
  - Limité aux projets personnels

- **Pro Plan** ($20/mois par équipe):
  - 1TB bandwidth
  - Déploiements illimités
  - Analytics avancées
  - Support prioritaire
  - **Recommandé pour production**

---

## 🚦 Commandes Utiles

### Lancer tous les serveurs en local
```bash
# Terminal 1: Marketing
cd apps/marketing && bun run dev

# Terminal 2: App
cd apps/app && bun run dev

# Terminal 3: Portal
cd apps/portal && bun run dev
```

### Build local pour tester
```bash
# Build toutes les apps
bunx turbo build

# Build une app spécifique
bunx turbo build --filter=@compiel/marketing
```

### Vérifier les types
```bash
bunx turbo typecheck
```

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Better Auth Documentation](https://www.better-auth.com/)

---

## 🎉 Prochaines Étapes

Après le déploiement initial:

1. **Configurez les domaines personnalisés** pour les emails (SPF, DKIM avec Resend)
2. **Activez les backups automatiques** de la base de données
3. **Configurez un CDN** pour les assets statiques (images, etc.)
4. **Mettez en place un monitoring** (Sentry, LogRocket)
5. **Configurez les alertes** pour les erreurs critiques
6. **Documentez les procédures** de rollback en cas de problème
