# Upstash Redis Setup Guide

## Pourquoi Redis est nécessaire

Votre application utilise Redis (via Upstash) pour:
- **Sessions d'onboarding/setup**: Stocker l'état de configuration utilisateur
- **Rate limiting**: Limiter les requêtes API
- **Cache**: Améliorer les performances

L'erreur 500 sur `/setup` après authentification Microsoft est causée par l'absence de configuration Redis.

---

## Configuration Upstash Redis (5 minutes)

### Étape 1: Créer un compte Upstash

1. Allez sur: https://console.upstash.com/
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec:
   - GitHub (recommandé)
   - Google
   - Email

**C'est gratuit** - 10,000 commandes/jour incluses gratuitement

### Étape 2: Créer une base de données Redis

1. Une fois connecté, cliquez sur **"Create Database"**
2. Configurez:
   - **Name**: `compiel-production` (ou votre nom préféré)
   - **Type**: **Global** (recommandé pour meilleure latence mondiale)
     - ou **Regional** si vous voulez spécifier une région (ex: EU West)
   - **Region**:
     - Si Global: Sélectionnez votre région primaire (ex: Europe West)
     - Si Regional: Sélectionnez la région la plus proche de vos utilisateurs
   - **TLS**: ✅ Activé (par défaut, recommandé)
3. Cliquez sur **"Create"**

### Étape 3: Obtenir les identifiants

Une fois la base de données créée:

1. Vous êtes redirigé vers la page de détails de la database
2. Cliquez sur l'onglet **"REST API"** (pas Redis)
3. Vous verrez deux variables:

**UPSTASH_REDIS_REST_URL**
```
https://your-database-12345.upstash.io
```

**UPSTASH_REDIS_REST_TOKEN**
```
AXyzAbC123...longtoken...
```

4. Cliquez sur **"Copy"** ou **".env"** pour copier les deux

---

## Ajouter les variables à Vercel

### Méthode 1: Via l'interface Vercel

1. Allez sur: https://vercel.com/[your-team]/compiel-platform-api/settings/environment-variables

2. Ajoutez **UPSTASH_REDIS_REST_URL**:
   - Name: `UPSTASH_REDIS_REST_URL`
   - Value: `https://your-database-12345.upstash.io`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Cliquez **Save**

3. Ajoutez **UPSTASH_REDIS_REST_TOKEN**:
   - Name: `UPSTASH_REDIS_REST_TOKEN`
   - Value: `AXyzAbC123...`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Cliquez **Save**

### Méthode 2: Via CLI (optionnel)

```bash
vercel env add UPSTASH_REDIS_REST_URL
# Entrez la valeur: https://your-database-12345.upstash.io

vercel env add UPSTASH_REDIS_REST_TOKEN
# Entrez la valeur: AXyzAbC123...
```

---

## Ajouter au fichier local .env

Pour le développement local, ajoutez à `.env`:

```bash
# Upstash Redis
UPSTASH_REDIS_REST_URL="https://your-database-12345.upstash.io"
UPSTASH_REDIS_REST_TOKEN="AXyzAbC123..."
```

---

## Redéployer

Après avoir ajouté les variables:

**Option A - Auto-redéploiement:**
- Vercel redéploie automatiquement quand vous ajoutez des variables

**Option B - Redéploiement manuel:**
```bash
git commit --allow-empty -m "Trigger redeploy for Redis config"
git push
```

---

## Tester après déploiement

### 1. Authentifiez-vous
Allez sur: https://compiel-platform-api.vercel.app/auth

Connectez-vous avec Microsoft (ou Google/Email)

### 2. Vérifiez /setup
Après connexion, vous devriez être redirigé vers `/setup/[id]`

**Attendu:**
- ✅ Page de configuration/onboarding charge correctement
- ✅ Pas d'erreur 500
- ✅ Formulaire de setup s'affiche

**Si erreur 500 persiste:**
- Vérifiez les logs Vercel pour l'erreur exacte
- Vérifiez que les variables sont bien définies
- Vérifiez que Upstash est accessible

---

## Vérification dans Upstash Console

Après quelques utilisations:

1. Retournez sur: https://console.upstash.com/
2. Cliquez sur votre database
3. Allez dans l'onglet **"Data Browser"**
4. Vous devriez voir des clés comme:
   ```
   setup:session:abc123def456
   ```

Cela confirme que Redis fonctionne!

---

## Plan Gratuit Upstash

**Limites du plan gratuit:**
- ✅ 10,000 commandes/jour
- ✅ 256 MB de stockage
- ✅ TLS/SSL inclus
- ✅ Pas de carte de crédit requise

**Pour la plupart des applications en démarrage, c'est largement suffisant.**

Si vous dépassez:
- Passez au plan Pay-As-You-Go ($0.20 par 100,000 commandes)

---

## Monitoring et Maintenance

### Vérifier l'utilisation

1. Dashboard Upstash: https://console.upstash.com/
2. Cliquez sur votre database
3. Voir les graphiques:
   - Commandes par jour
   - Latence
   - Stockage utilisé

### Nettoyage automatique

Les sessions de setup ont une expiration automatique (TTL de 24h), configurée dans le code:

```typescript
const SETUP_SESSION_TTL = 60 * 60 * 24; // 24 heures
```

Pas besoin de nettoyage manuel!

---

## Alternative: Mode Mock (Temporaire)

Si vous voulez tester rapidement **sans configurer Upstash**, utilisez le mode mock:

### Ajouter à Vercel:
```bash
MOCK_REDIS=true
```

**⚠️ Limitations du mode mock:**
- Les données sont en mémoire (perdues au redéploiement)
- Pas de persistance entre les instances Vercel
- OK pour tester, **PAS pour production**

---

## Troubleshooting

### Erreur: "Cannot connect to Upstash"

**Cause:** URL ou token incorrect

**Fix:**
1. Vérifiez que vous avez copié depuis l'onglet **REST API** (pas "Redis")
2. Vérifiez qu'il n'y a pas d'espaces avant/après
3. Recréez les variables dans Vercel

### Erreur: "Unauthorized"

**Cause:** Token expiré ou invalide

**Fix:**
1. Allez dans Upstash Console
2. Régénérez le token REST API
3. Mettez à jour dans Vercel

### Sessions ne persistent pas

**Cause:** Variables non appliquées ou mode mock activé

**Fix:**
1. Vérifiez que `MOCK_REDIS=true` n'est PAS défini
2. Vérifiez que les deux variables Upstash sont présentes
3. Redéployez après modification des variables

---

## Sécurité

### ✅ Bonnes pratiques

1. **Ne commitez JAMAIS le token Redis** dans git
2. **Utilisez TLS** (activé par défaut sur Upstash)
3. **Rotation des tokens**: Changez le token tous les 6-12 mois
4. **Monitoring**: Activez les alertes Upstash pour usage anormal

### Variables d'environnement sensibles

Ces variables sont **sensibles** et ne doivent JAMAIS être exposées:
- `UPSTASH_REDIS_REST_TOKEN` ⚠️ SECRET
- `UPSTASH_REDIS_REST_URL` ℹ️ Peut être publique mais mieux de garder privée

---

## Résumé rapide

| Étape | Action | Temps |
|-------|--------|-------|
| 1 | Créer compte Upstash | 1 min |
| 2 | Créer database Redis | 1 min |
| 3 | Copier URL + Token | 30 sec |
| 4 | Ajouter à Vercel | 2 min |
| 5 | Redéployer | Auto |
| 6 | Tester /setup | 1 min |

**Total: ~5 minutes**

---

## Prochaines étapes

Après avoir configuré Redis:

1. ✅ Testez l'authentification Microsoft → /setup
2. ✅ Configurez Google OAuth (si pas déjà fait)
3. ✅ Mettez à jour DATABASE_URL et DIRECT_URL dans Vercel
4. ✅ Testez le flux complet d'onboarding
5. 📝 Documentez pour votre équipe

---

## Support

- **Documentation Upstash**: https://docs.upstash.com/redis
- **Console Upstash**: https://console.upstash.com/
- **Support Upstash**: support@upstash.com (très réactifs!)

---

**Status**: Configuration requise pour /setup
**Priorité**: Haute (bloque l'onboarding)
**Difficulté**: Facile
**Coût**: Gratuit (plan free tier)
