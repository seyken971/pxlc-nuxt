# PXLC — pxlc-site

Site vitrine de PXLC (médiation numérique, Guadeloupe). Astro, site 100 %
statique déployé sur GitHub Pages (`dist/`), zéro JavaScript expédié hors
quelques scripts vanilla inline (thème, menu mobile, formulaire, filtres).

Mission en une phrase (à reprendre verbatim, seule phrase où PXLC est sujet) :
« PXLC accompagne les familles autour des écrans. »

Formule des descriptions (meta, OG, bios auteur) — ≤ 20 mots, cible puis
bénéfice : « Andy Zébus aide les structures (en Guadeloupe) à accompagner
les familles autour des écrans. »

Le contexte de positionnement et de stratégie vit dans `CLAUDE.local.md`
(non versionné) — le consulter quand il est présent.

## Voix : « je » vs « PXLC »

- **« je »** = Andy. Sujet des verbes d'action dans le copy des pages :
  j'anime, j'accompagne, j'interviens, je construis.
- **« PXLC »** = nom de marque, jamais sujet d'un verbe d'action dans le copy
  page (exception : la mission verbatim ci-dessus). Apparaît comme nom de
  l'offre : « les ateliers PXLC », « contacter PXLC ».
- **Meta, OG images, mentions légales, références tierces** : 3e personne OK
  (« Andy Zébus, créateur de PXLC, accompagne… »).
- Jamais « Andy Zébus accompagne » dans le copy des pages.
- Jamais « fondateur » → « créateur de PXLC ».

## Design system & règles de marque

@design.md

- `design.md` est **généré** par `scripts/export-design.mjs` — ne jamais
  l'éditer à la main. Sources : `src/styles/tokens.css` +
  `src/styles/styles.css`. Régénéré automatiquement par `predev` et
  `prebuild` ; committer la version à jour.
- Toujours utiliser les custom properties (`--pxlc-*`, tokens sémantiques) —
  jamais de couleurs ou d'espacements en dur dans les composants.
- Dark mode via `[data-theme="dark"]` — toute nouvelle couleur sémantique doit
  avoir sa variante dark dans `tokens.css`.
- Les sections de `styles.css` sont délimitées par des commentaires
  `── Titre ──` — respecter ce format, le parser d'export-design en dépend.

## Garde-fous non négociables (copy)

Aussi dans design.md, mais bloquants — vérifier chaque texte généré ou modifié :

- Vocabulaire interdit : addiction, désintoxication, détox numérique, coach,
  expert, innovant, révolutionnaire. Fondement : l'avis HCSP du 08/03/2021
  relève que le terme « addiction » est contesté scientifiquement et que la
  MILDECA préfère « usage problématique des écrans » — utiliser ce terme.
- Pas d'emoji, nulle part (copy, code, commits, iconographie).
- Typographie française : espace insécable avant `!` `?` `:` `;` `»` et entre
  nombre + unité (`48 h`, `20 min`, `100 €`). Dans les sources : `&nbsp;` dans
  le balisage, `\u00A0` dans les template literals, U+00A0 littéral toléré
  dans les chaînes simples — garde-fou `ds-lint` R11.
- Cadre réglementaire : toujours citer « HCSP 2019-2020 · HAS 2020 » ensemble.
- Termes naked (sans guillemets ni traduction) : HCSP, SESSAD, TCND, TND,
  hyperfocus.
- Corpus de référence dans `docs/references/` (avis HCSP 12/12/2019, avis HCSP
  08/03/2021, rapport HCSP, rapport DITP 2022, dossier HCFEA 2020, rapport de
  la commission Enfants et écrans 04/2024 « À la recherche du temps perdu »,
  29 propositions). Ne pas l'importer ici (trop volumineux) : lire d'abord
  `docs/references/CITATIONS.md` (carte claim → section + page PDF) pour
  identifier le bon document, puis ouvrir le .md ou le PDF pour vérifier la
  citation exacte. Ne jamais inventer de chiffre ou de recommandation.
- Le jeu vidéo est un outil de médiation légitime — jamais un problème à résoudre.
- « intervenant culturel » toujours au singulier (un seul, à Lékoklaya) — jamais
  « intervenants culturels ». Outillé par `ds-lint` R12 (`phrase-interdite`), qui
  balaie `.astro`/`.vue`/`.ts` (`src/`), `.md` (`content/`) et la plaquette :
  tout pluriel casse le build. Ajouter un fait à garder dans
  `FORBIDDEN_PHRASES` (`scripts/ds-lint.mjs`).

## Garde-fous non négociables (visuel)

- Coral (`#FF5E3A`) ≤ 5 % des pixels par page ou image.
- Jamais de texte blanc sur fond coral.
- Pas de gradients. Un seul CTA primaire par section.

## Commandes (npm)

- `npm run dev` — serveur de dev Astro (predev : gen:tokens + design)
- `npm run build` — build statique complet pour GitHub Pages :
  - prebuild : gen:tokens → design → ds-lint
  - build : `astro build` (~24 pages dans `dist/`)
  - postbuild : check-links
- `npm run preview` — sert `dist/` en local
- `npm run lint` / `npm run lint:fix` — ESLint (flat config : astro + TS)
- `npm run typecheck` — `astro check`
- `npm run ds-lint` — lint du design system (tokens, règles brand, R1-R12)
- `npm run seo:snapshot` — capture la surface SEO d'un build (voir ci-dessous)
- `npm run check-links` — liens internes du build (slash final, ancres)
- `npm run a11y` / `npm run a11y:runtime` — audits accessibilité
- `npm run lighthouse` — audit performance
- `npm run gen:tokens` — régénère tokens.css depuis `src/lib/brand-colors.ts`
- `npm run design` — régénère design.md
- `npm run gen:communes` — régénère `src/data/communes-971.json` (contours des
  communes depuis geo.api.gouv.fr, projetés au build en SVG par `CommuneMap`) —
  manuel, réseau requis

Un build qui casse sur les gates pre/post = règle brand, contenu ou lien
violé, pas un bug à contourner.

## Non-régression SEO (mécanisme central)

`docs/seo-baseline/` contient la référence de la surface SEO (canonical,
title, metas, og/twitter, JSON-LD trié, sitemap, robots.txt), capturée par
`scripts/seo-snapshot.mjs`. Toute modification SEO-sensible se vérifie ainsi :

1. `npm run build`
2. `node scripts/seo-snapshot.mjs dist docs/seo-current`
3. `git diff --no-index docs/seo-baseline docs/seo-current` — doit être vide
   hors deltas volontaires, déclarés dans la PR.

Jamais de comparaison `-eq` PowerShell pour vérifier du texte : elle assimile
l'espace insécable à l'espace simple. `git diff` ou comparaison ordinale.
Après un changement SEO volontaire mergé, re-capturer la baseline.

Le diff est réellement vide quand rien ne change : les `lastmod` du sitemap
sont dérivés du contenu et de l'historique git, pas de l'heure du build. Un
`lastmod` de page statique ne bouge donc que lorsque le fichier de la page est
commité — recapture attendue dans la PR qui la modifie.

## Stack & architecture

- Astro (`src/`), zéro île hydratée : toute l'interactivité est en `<script>`
  vanilla dans les composants `.astro`.
- `src/layouts/BaseLayout.astro` — head complet (titre `%s · PXLC`, canonical
  avec slash final, og/twitter, anti-flash thème, JSON-LD), chrome du site.
  La CSP est émise par Astro (`security.csp`) : il hache ses propres scripts
  et styles, le layout déclare en plus le hash du JSON-LD de la page via
  `Astro.csp.insertScriptHash` et la config celui du script anti-flash
  (`src/lib/theme-script.ts`, seul `is:inline` du site avec la 404).
- `src/config/site.ts` — identité du site (source unique, lue aussi par
  ds-lint R7). `src/config/identity.ts` (NAP + immatriculations, lue aussi
  par les mentions légales), `src/config/nav.ts`, `project-themes.ts`.
- SEO : graphe schema.org construit à la main dans `src/lib/schema.ts`
  (@id croisés `#identity`/`#andy`/`#service`…) ; sitemap via
  l'intégration `@astrojs/sitemap` (`dist/sitemap-index.xml`, `lastmod`
  injectés par `serialize` depuis `scripts/sitemap-lastmod.mjs` : date du
  dernier commit touchant la page — d'où le `fetch-depth: 0` du workflow) ;
  carte OG rendue par l'endpoint `src/pages/og/site.png.ts` (satori + resvg,
  gabarit dans `src/lib/og-templates.ts`, TTF vendorées
  `src/assets/og-fonts/`) — visible en dev, contrairement à l’ancien
  script post-build.
- `public/robots.txt` est statique (3 groupes : tous, bots d'entraînement IA
  refusés, bots de recherche IA autorisés) — le maintenir à la main.
- Images : `astro:assets` (sources `src/assets/photos/`) ; les originaux de
  `public/img/photos/` restent en place, référencés par le JSON-LD et la
  fiche Google Business Profile — ne pas les supprimer.
- GitHub Pages : pas de runtime serveur — aucune API route, tout doit
  fonctionner en statique. Trailing slash partout (canonical = forme avec
  slash, GitHub Pages 301-redirige la forme sans slash).

## Workflow attendu

- Toute nouvelle page doit définir : `const seo = { title ≤ 53, description
  ≤ 120, … }` passé à BaseLayout, un `schemaGraph` (via `pageGraph`), un seul
  CTA primaire.
- Avant de considérer une tâche terminée, exécuter :
  `npm run lint && npm run typecheck && npm run ds-lint`.
- Petits commits ciblés ; messages en français, sans emoji.
- En cas de doute sur le ton, le positionnement ou la cible d'un texte :
  proposer, ne pas publier — Andy valide tout le copy final.
