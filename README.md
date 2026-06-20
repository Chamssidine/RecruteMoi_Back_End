# recruteMoi — Back Office

Ce dépôt contient le back office (interface d'administration) pour l'application Android "recruteMoi". L'application permet aux administrateurs de gérer les catégories d'emploi, les offres et d'autres données liées au recrutement.

> Back office construit avec Next.js (TypeScript), Tailwind CSS et Firebase. Inclut des outils AI (GenKit) pour des fonctionnalités d'assistance.

Sommaire
- Aperçu
- Fonctionnalités
- Technologies
- Prérequis
- Installation
- Scripts utiles
- Configuration / Variables d'environnement
- Structure du projet
- Déploiement
- Contribuer
- Aide / Contact
- Licence

Aperçu
-------
Le back office expose une interface web (Next.js) destinée aux administrateurs pour gérer le contenu de l'application mobile. Le point d'entrée principal de l'interface se trouve dans `src/app/page.tsx`.

Fonctionnalités
---------------
- Gestion des catégories d'emploi (CRUD)
- Gestion des offres d'emploi (CRUD)
- Authentification et connexions via Firebase (utilisé comme backend BaaS)
- Tableaux et visualisations (ex. Recharts)
- Composants réutilisables (Radix UI, lucide-react)
- Intégration d'outils AI via GenKit (dossier `src/ai`)

Technologies
------------
- Next.js 15 (TypeScript)
- React 18
- Tailwind CSS
- Firebase
- GenKit (pour fonctionnalités AI)
- Zod (validation)
- React Hook Form
- Radix UI

Prérequis
---------
- Node.js (v18+ recommandé)
- npm (ou yarn)
- Compte Firebase si vous utilisez l'intégration Firebase
- Si vous utilisez les fonctionnalités AI : clé GenKit/Google GenAI ou configuration correspondante

Installation locale
-------------------
1. Clonez le dépôt :

```bash
git clone https://github.com/Chamssidine/RecruteMoi_Back_End.git
cd RecruteMoi_Back_End
```

2. Installez les dépendances :

```bash
npm install
# ou
# yarn install
```

3. Du développement local :

```bash
npm run dev
# lance Next.js sur le port 9002 (voir package.json)
```

Scripts utiles (depuis package.json)
-----------------------------------
- `npm run dev` — lance le serveur de développement Next.js (avec turbopack) sur le port 9002
- `npm run build` — construit l'application pour la production
- `npm run start` — démarre l'application construite
- `npm run lint` — exécute Next.js lint
- `npm run typecheck` — vérifie les types TypeScript
- `npm run genkit:dev` et `npm run genkit:watch` — scripts liés à GenKit (environnement AI)

Configuration / Variables d'environnement
-----------------------------------------
Créez un fichier `.env.local` à la racine pour vos variables d'environnement locales. Les noms ci-dessous sont des suggestions basées sur les dépendances détectées ; adaptez-les à votre configuration réelle :

```text
# Firebase (exemples)
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

# GenKit / AI
GENKIT_API_KEY=
# ou
GOOGLE_GENAI_API_KEY=

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:9002
NODE_ENV=development
```

Remarque : ne comitez jamais de clés secrètes. Utilisez les secrets d'hébergement (Vercel, Cloud Run, etc.) pour la production.

Structure du projet
-------------------
Aperçu des fichiers et dossiers principaux :

- .gitignore
- apphosting.yaml
- next.config.ts
- package.json
- postcss.config.mjs
- tailwind.config.ts
- tsconfig.json
- src/
  - ai/            # logique et scripts AI (GenKit) — ex: src/ai/dev.ts
  - app/           # routes et pages Next.js (ex: src/app/page.tsx)
  - components/    # composants UI réutilisables
  - hooks/         # hooks React personnalisés
  - lib/           # fonctions / clients partagés (ex: firebase client)

Explorez `src/app/page.tsx` pour le point d'entrée de l'interface.

Déploiement
-----------
Le projet est une application Next.js ; vous pouvez déployer via Vercel, Netlify (Next adapter) ou tout hôte capable d'exécuter Next.js.

Exemples :
- Vercel : branchez le dépôt et ajoutez vos variables d'environnement dans le tableau de bord Vercel.
- Docker / Cloud Run : construisez avec `npm run build` puis exécutez `npm run start` en production.

Bonnes pratiques de déploiement
- Stockez les clés Firebase et GenKit dans les secrets d'environnement.
- Activez les protections de branche et les pipelines CI quand nécessaire.

Tests & Qualité
---------------
Ce dépôt n'inclut pas de suite de tests automatisés pour l'instant. Recommandations :
- Ajouter des tests unitaires (Jest + Testing Library) pour les composants React.
- Ajouter des tests d'intégration pour les routes API et l'intégration Firebase.
- Mettre en place un pipeline CI (GitHub Actions) pour lint, typecheck et tests.

Contribuer
----------
1. Forkez le dépôt.
2. Créez une branche feature/bugfix.
3. Faites vos changements.
4. Ouvrez une Pull Request en décrivant clairement les changements.

Aide / Contact
--------------
Pour toute question sur ce dépôt, contactez l'auteur : Chamssidine (via GitHub profile).

Licence
-------
Ajoutez un fichier LICENSE à la racine pour indiquer la licence du projet (par exemple MIT). Si vous souhaitez, je peux générer un modèle de licence pour vous.

Notes finales
-------------
J'ai ajouté ici une documentation de base complète pour démarrer, configurer et contribuer au back office. Si vous voulez que je :
- Traduise ce README en anglais,
- Ajoute des exemples d'API (routes),
- Génère un fichier .env.example ou un Dockerfile,
je peux le faire ensuite.
