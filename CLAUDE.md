# PXLC — pxl-nuxt

Site vitrine de PXLC (médiation numérique, Guadeloupe). Nuxt 4, site statique
déployé sur GitHub Pages via `nuxt generate`.

Mission en une phrase (à reprendre verbatim, seule phrase où PXLC est sujet) :
« PXLC accompagne les familles dans l'éducation numérique des enfants. »

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
  l'éditer à la main. Sources : `app/assets/css/tokens.css` +
  `app/assets/css/styles.css`. Régénéré automatiquement par `predev`,
  `prebuild` et `pregenerate` ; committer la version à jour.
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
  nombre + unité (`48 h`, `20 min`, `100 €`).
- Cadre réglementaire : toujours citer « HCSP 2019-2020 · HAS 2020 » ensemble.
- Termes naked (sans guillemets ni traduction) : HCSP, SESSAD, TCND, TND,
  hyperfocus.
- Corpus de référence dans `docs/references/` (avis HCSP 12/12/2019 — section
  VII pour les recommandations parents/encadrants —, avis HCSP 08/03/2021,
  rapport HCSP, rapport DITP 2022, dossier HCFEA 2020, rapport de la
  commission Enfants et écrans 04/2024 « À la recherche du temps perdu »,
  29 propositions). Ne pas l'importer
  ici (trop volumineux) : le consulter à la demande pour sourcer toute
  affirmation santé/usage des écrans. Ne jamais inventer de chiffre ou de
  recommandation — citer le document et la section.
- Le jeu vidéo est un outil de médiation légitime — jamais un problème à résoudre.

## Garde-fous non négociables (visuel)

- Coral (`#FF5E3A`) ≤ 5 % des pixels par page ou image.
- Jamais de texte blanc sur fond coral.
- Pas de gradients. Un seul CTA primaire par section.

## Commandes (npm)

- `npm run dev` — serveur de dev (predev : gen:tokens + design)
- `npm run generate` — build statique pour GitHub Pages (pipeline complet)
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run typecheck` — vérification TypeScript Nuxt
- `npm run ds-lint` — lint du design system (tokens, règles brand)
- `npm run validate-content` — validation du contenu
- `npm run a11y` / `npm run a11y:runtime` — audits accessibilité
- `npm run lighthouse` — audit performance
- `npm run gen:tokens` — génère les tokens (source amont de tokens.css)
- `npm run design` — régénère design.md

Note : `prebuild`/`pregenerate` enchaînent gen:tokens → design → ds-lint →
validate-content. Un build qui casse sur ces étapes = règle brand ou contenu
violé, pas un bug à contourner.

## Stack & modules

- Nuxt 4 (structure `app/`), modules : @nuxt/content, @nuxt/eslint,
  @nuxt/fonts, @nuxt/icon, @nuxt/image, @nuxtjs/seo, nuxt-link-checker.
- Contenu éditorial via @nuxt/content — toute modification de contenu doit
  passer `npm run validate-content`.
- OG images : composant `app/components/OgImage/PxlcOg.takumi.vue`, générées
  au build (`ogImage.zeroRuntime: true`), non visibles en dev. Chaque page
  définit la sienne via `defineOgImage('PxlcOg', { eyebrow, title, description })`.
- Hébergement GitHub Pages : pas de runtime serveur — aucune API route,
  aucune fonctionnalité SSR dynamique. Tout doit fonctionner en statique.

## Workflow attendu

- Toute nouvelle page doit définir : meta SEO, OG image, un seul CTA primaire.
- Avant de considérer une tâche terminée, exécuter :
  `npm run lint && npm run typecheck && npm run ds-lint && npm run validate-content`.
- Petits commits ciblés ; messages en français, sans emoji.
- En cas de doute sur le ton, le positionnement ou la cible d'un texte :
  proposer, ne pas publier — Andy valide tout le copy final.
