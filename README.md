# pxlc.fr — site marketing

Site marketing de **Andy Zébus**, gamer médiateur-numérique basé aux Abymes (Guadeloupe).  
Déployé sur **https://pxlc.fr**.

## Stack

| Couche | Tech |
|---|---|
| Framework | [Nuxt](https://nuxt.com) 4.4 + Vue 3.5 |
| Contenu | [@nuxt/content](https://content.nuxt.com) v3 (Markdown, SSG) |
| SEO | [@nuxtjs/seo](https://nuxtseo.com) — sitemap, robots, schemaOrg, OG images |
| Images | @nuxt/image (WebP auto) |
| Fonts | @nuxt/fonts (auto-hébergé, pas de Google CDN) |
| Hosting | GitHub Pages — SSG via `actions/deploy-pages` |
| CI | GitHub Actions — lint + typecheck + a11y + deploy (bloquant) · Lighthouse hebdo (info) |

## Démarrage rapide

```bash
npm install
npm run dev       # http://localhost:3000
```

> `npm ci` ne fonctionne pas — conflit transitif `commander` entre `@nuxt/content` (lunr) et `@bomb.sh/tab`. Utiliser `npm install`.

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de dev |
| `npm run generate` | Build SSG → `.output/public/` |
| `npm run preview` | Prévisualisation du build |
| `npm run gen:tokens` | Régénère le bloc `--pxlc-*` dans `tokens.css` depuis `brand-colors.ts` — lancé automatiquement en `prebuild` / `pregenerate` / `predev` |
| `npm run lint` | ESLint v9 flat config |
| `npm run lint:fix` | ESLint avec auto-fix |
| `npm run typecheck` | `vue-tsc` via `nuxt typecheck` |
| `npm run a11y` | Audit axe-core statique (jsdom) |
| `npm run a11y:runtime` | Audit axe-core Playwright (Chrome headless, couvre menu mobile + FAQ ouverts) |
| `npm run lighthouse` | Lighthouse mobile sur 7 routes (Chrome headless) — Markdown summary CI-aware |
| `node scripts/probe-sqlite-network.mjs` | Mesure le coût réseau du WASM `@nuxt/content` — confirmé à 0 octet en runtime SSG |

## Architecture des couleurs (source unique)

```
app/utils/brand-colors.ts          ← source canonique (TypeScript)
    │
    ├── consommé par PxlcOg.takumi.vue  (rendu OG build-time, hex direct)
    │
    └── scripts/generate-tokens.mjs  → régénère le bloc BRAND HEX dans
           app/assets/css/tokens.css  (--pxlc-*)
                 ↓
           consommé runtime par PxlcMark.vue et toute la feuille de style
```

Pour modifier une couleur : éditer `brand-colors.ts` — `prebuild` synchronise `tokens.css` automatiquement.

## Pages

| Route | Description |
|---|---|
| `/` | Accueil |
| `/a-propos` | Présentation d'Andy Zébus |
| `/pour-les-structures` | Offre B2B (SESSAD, IME, associations, collectivités) |
| `/blog` | Index des articles |
| `/blog/[slug]` | Article Markdown |
| `/contact` | Formulaire + WhatsApp |
| `/mentions-legales` | Mentions légales (`noindex`) |

## CI

Le pipeline `deploy.yml` est bloquant sur `master` :

```
checkout → node 22 → npm install → lint → typecheck
→ nuxt generate → verify output → a11y static → a11y runtime
→ upload artifact → deploy
```

Le workflow `lighthouse.yml` tourne chaque dimanche 18h UTC (non-bloquant, summary Markdown dans l'onglet Actions).

## Conventions

- **Commits** : Conventional Commits (`feat(scope):`, `fix(scope):`, `chore(scope):`)
- **Branches** : `feat/X`, `fix/X`, `chore/X`
- **Design tokens** : ne jamais éditer `tokens.css` manuellement — passer par `brand-colors.ts`
- **OG images** : light-mode uniquement (`#EAF6F4`) — `app/components/OgImage/PxlcOg.takumi.vue`
- **Funnel** : offre B2B exclusivement via structures porteuses — pas de direct-to-parent dans le wording

## Licence

© 2025 Andy Zébus – pxlc. Voir [LICENSE](LICENSE).
