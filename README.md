# pxlc.fr — site vitrine de PXLC

Site vitrine de **PXLC**, médiation numérique portée par Andy Zébus à Les Abymes (Guadeloupe).  
Déployé sur **https://pxlc.fr**.

## Stack

| Couche        | Tech                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| Framework     | [Astro](https://astro.build) 7 — 100 % statique, zéro JS hydraté (scripts vanilla inline) |
| Contenu       | Collection Astro `blog` (`src/content.config.ts`, schéma zod, `content/blog/*.md`)      |
| SEO           | Graphe schema.org à la main (`src/lib/schema.ts`) · sitemap `@astrojs/sitemap` · flux RSS `@astrojs/rss` · CSP native (`security.csp`) · cartes OG en endpoints (`src/pages/og/`) · liens vérifiés en post-build |
| Images        | `astro:assets` (sources `src/assets/photos/`, WebP auto)                                |
| Icônes        | SVG vendorées dans `src/icons/` (imports natifs Astro — Lucide, Simple Icons)            |
| Fonts         | woff2 auto-hébergées (`fonts.css` écrit à la main, pas de Google CDN)                   |
| Hosting       | GitHub Pages — build statique dans `dist/`, déployé via `actions/deploy-pages`          |
| CI            | GitHub Actions — lint + typecheck + build (gates) + a11y + deploy (bloquant) · Lighthouse hebdo (info) |
| Environnement | Node 24 LTS                                                                             |

## Démarrage rapide

```bash
npm install
npm run dev       # http://localhost:4321
```

## Scripts

`npm run build` enchaîne automatiquement les hooks npm :

- **prebuild** : `gen:tokens` → `design` → `ds-lint`
- **build** : `astro build` (~24 pages statiques dans `dist/`)
- **postbuild** : `check-links`

Un build qui casse sur ces gates signale une règle brand, contenu ou lien violée — pas un bug à contourner.

| Commande                   | Rôle                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`              | Serveur de dev Astro (predev : gen:tokens + design)                                                                             |
| `npm run build`            | Build statique complet → `dist/` (gates pre/post ci-dessus)                                                                     |
| `npm run preview`          | Sert `dist/` en local                                                                                                           |
| `npm run gen:tokens`       | Régénère le bloc `--pxlc-*` dans `tokens.css` depuis `brand-colors.ts`                                                          |
| `npm run design`           | Génère `design.md` depuis `tokens.css` + `styles.css`                                                                           |
| `npm run ds-lint`          | Lint du design system (tokens, règles brand R1-R12)                                                                             |
| `npm run seo:snapshot`     | Capture la surface SEO d'un build (voir non-régression SEO)                                                                     |
| `npm run check-links`      | Vérifie les liens internes du build (slash final, ancres)                                                                       |
| `npm run lint`             | ESLint flat config (astro + TS)                                                                                                 |
| `npm run lint:fix`         | ESLint avec auto-fix                                                                                                            |
| `npm run typecheck`        | `astro check`                                                                                                                   |
| `npm run a11y`             | Audit axe-core statique (jsdom)                                                                                                 |
| `npm run a11y:runtime`     | Audit axe-core Playwright (Chromium headless, couvre menu mobile + FAQ ouverts)                                                 |
| `npm run lighthouse`       | Lighthouse mobile sur 7 routes (Chrome headless) — Markdown summary CI-aware                                                    |

## Architecture des couleurs (source unique)

```
src/lib/brand-colors.ts            ← source canonique (TypeScript)
    │
    ├── consommé par src/lib/og-templates.ts (rendu OG, hex direct)
    │
    └── scripts/generate-tokens.mjs  → régénère le bloc BRAND HEX dans
           src/styles/tokens.css  (--pxlc-*)
                 ↓
           consommé runtime par toute la feuille de style
```

Pour modifier une couleur : éditer `brand-colors.ts` — `prebuild` synchronise `tokens.css` automatiquement.

## Non-régression SEO

`docs/seo-baseline/` contient la référence de la surface SEO (canonical, title, metas, og/twitter, JSON-LD trié, sitemap, robots.txt). Toute modification SEO-sensible se vérifie ainsi :

```bash
npm run build
node scripts/seo-snapshot.mjs dist docs/seo-current
git diff --no-index docs/seo-baseline docs/seo-current
```

Le diff doit être vide hors deltas volontaires, déclarés dans la PR. Après un changement SEO volontaire mergé, re-capturer la baseline.

## Pages

| Route               | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `/`                 | Accueil                                              |
| `/a-propos`         | Présentation d'Andy Zébus                            |
| `/structures`       | Offre B2B (SESSAD, IME, associations, collectivités) |
| `/blog`             | Index des articles                                   |
| `/blog/[slug]`      | Article Markdown                                     |
| `/contact`          | Formulaire + WhatsApp                                |
| `/mentions-legales` | Mentions légales (`noindex`)                         |
| `/404`              | Page introuvable                                     |

## CI

Le pipeline `deploy.yml` tourne sur `push main` et sur chaque **pull request** :

```
checkout → node 24 → npm install → lint → typecheck
→ build (gates pre/post) → verify output (index, sitemap, robots, .nojekyll, CNAME)
→ a11y static → a11y runtime (Playwright Chromium)
→ upload artifact → deploy (main uniquement, avec retry)
```

Le workflow `lighthouse.yml` tourne chaque dimanche 18 h UTC (non-bloquant, summary Markdown dans l'onglet Actions).

Les mises à jour de dépendances npm sont gérées via **Dependabot** (`.github/dependabot.yml`) — PRs groupées chaque lundi matin.

## Conventions

- **Commits** : petits commits ciblés, messages en français, sans emoji (ex. `docs : aligne le README sur la stack Astro`)
- **Design tokens** : ne jamais éditer `tokens.css` ni `design.md` manuellement — passer par `brand-colors.ts` et les scripts de génération
- **OG images** : rendues par les endpoints `src/pages/og/` (satori + resvg, gabarits dans `src/lib/og-templates.ts`) — carte de marque unique + carte par article
- **Funnel** : offre B2B exclusivement via structures porteuses — pas de direct-to-parent dans le wording

## Licence

© 2026 Andy Zébus – pxlc. Voir [LICENSE](LICENSE).
