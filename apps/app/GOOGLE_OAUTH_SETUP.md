# Configuration Google OAuth pour Compiel

## 🎯 Objectif
Activer la connexion "Sign in with Google" pour votre application Compiel.

## 📝 Étapes de configuration

### 1. Accéder à Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet ou créez-en un nouveau
3. Activez l'API "Google+ API" ou "Google Identity"

### 2. Créer des identifiants OAuth 2.0

1. Dans le menu, allez à **APIs & Services** → **Credentials**
2. Cliquez sur **Create Credentials** → **OAuth client ID**
3. Si demandé, configurez l'écran de consentement OAuth:
   - User Type: **External** (pour permettre à tous les utilisateurs Google)
   - Application name: **Compiel**
   - User support email: votre email
   - Developer contact information: votre email
   - Scopes: Ajoutez `.../auth/userinfo.email` et `.../auth/userinfo.profile`
   - Test users: Ajoutez vos emails de test (optionnel)

4. Créez l'OAuth Client ID:
   - Application type: **Web application**
   - Name: **Compiel App**
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://dev.trycompiel.com
     https://app.trycompiel.com
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://dev.trycompiel.com/api/auth/callback/google
     https://app.trycompiel.com/api/auth/callback/google
     ```

5. Cliquez sur **Create**
6. Copiez le **Client ID** et le **Client Secret**

### 3. Ajouter les variables d'environnement

Créez ou modifiez le fichier `.env.local` dans `apps/app/`:

```env
# Google OAuth Configuration
AUTH_GOOGLE_ID=votre-client-id-ici.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=votre-client-secret-ici

# Better Auth Configuration (si pas déjà défini)
AUTH_SECRET=votre-secret-aleatoire-32-caracteres-minimum
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### 4. Générer un AUTH_SECRET (si nécessaire)

Utilisez cette commande pour générer un secret aléatoire sécurisé:

```bash
openssl rand -base64 32
```

### 5. Redémarrer le serveur de développement

```bash
cd apps/app
bun run dev
```

## ✅ Vérification

1. Ouvrez http://localhost:3000/auth
2. Vous devriez voir le bouton **"Continue with Google"**
3. Cliquez dessus pour tester la connexion
4. Vous serez redirigé vers Google pour vous connecter
5. Après authentification, vous serez redirigé vers votre application

## 🎨 Interface actuelle

L'application affiche déjà:
- ✅ Bouton "Continue with Google" comme option principale (si configuré)
- ✅ Options alternatives (Magic Link, Microsoft, GitHub) sous "More options"
- ✅ Gestion automatique des sessions et organisations

## 🔧 Troubleshooting

### Le bouton Google n'apparaît pas
- Vérifiez que `AUTH_GOOGLE_ID` et `AUTH_GOOGLE_SECRET` sont définis dans `.env.local`
- Redémarrez le serveur après avoir modifié `.env.local`

### Erreur "redirect_uri_mismatch"
- Vérifiez que l'URI de redirection dans Google Cloud Console correspond exactement à:
  `http://localhost:3000/api/auth/callback/google` (pour dev local)

### Erreur "invalid_client"
- Vérifiez que le Client ID et Client Secret sont corrects
- Assurez-vous qu'il n'y a pas d'espaces avant/après les valeurs

## 📚 Documentation Better Auth

Pour plus d'informations sur la configuration OAuth:
https://www.better-auth.com/docs/authentication/social
