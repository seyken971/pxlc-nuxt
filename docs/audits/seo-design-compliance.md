# Audit conformité SEO / OG / schema.org ↔ design.md

> Contrôle des chaînes destinées au SEO, aux cartes sociales et au schema.org
> contre les règles de marque de `design.md`. États vérifiés au codepoint
> (l'espace insécable U+00A0 s'affiche comme une espace normale dans la plupart
> des éditeurs — d'où une vérification programmatique, pas visuelle).
>
> **APPLIQUÉ** = correction mécanique faite ; **PROPOSÉ** = en attente de
> validation (sens / contenu éditorial) ; **OK** = déjà conforme.

## 1. Typographie — insécables (mécanique)

Règle : insécable U+00A0 avant `! ? : ; »` et entre nombre + unité.

Constat majeur : le copy SEO/OG et **tout le frontmatter blog sont déjà
conformes** (insécables présentes avant les `:` de titres, les `?`, dans
`« … ! »`, et dans `readingTime` `8 min`…). Le seul écart réel : les chaînes
authorées en dur dans `app/pages/structures.vue` (description courte + FAQ).

| Fichier:ligne | Chaîne (extrait) | Problème | Statut |
| --- | --- | --- | --- |
| `app/pages/a-propos.vue:6` | `… — 6 ans de scène esport …` | `6 ans` | **APPLIQUÉ** |
| `app/pages/structures.vue:25` | `… typique d'un dispositif ?` | espace avant `?` | **APPLIQUÉ** |
| `app/pages/structures.vue:26` | `… votre structure : un cycle …` · `Ensemble ! »` | avant `:` et `»` | **APPLIQUÉ** |
| `app/pages/structures.vue:30` | `Quel est le tarif ?` | espace avant `?` | **APPLIQUÉ** |
| `app/pages/structures.vue:31` | `… du médiateur intervenant ; le prêt …` | espace avant `;` | **APPLIQUÉ** |
| `app/pages/structures.vue:35` | `Combien d'enfants par dispositif ?` | espace avant `?` | **APPLIQUÉ** |
| `app/pages/structures.vue:36` | `… âgés de 12 à 17 ans avec leurs parents …` | `17 ans` | **APPLIQUÉ** |
| `app/pages/structures.vue:40` | `Quels profils d'enfants sont accueillis ?` | espace avant `?` | **APPLIQUÉ** |

Vérifiées conformes (échantillon) : `app/app.vue:15` (`écrans : conflits`),
`contact.vue:8/10/17` (`20 min`, `2 jours`), les 11 frontmatter blog,
défauts OG de `PxlcOg.takumi.vue`. → **OK**

### Hors périmètre SEO/schema — observations (PROPOSÉ)

Copy de page (rendu dans `<template>` / tables de faits), pas des chaînes
SEO/schema — non corrigé pour rester dans le périmètre, signalé pour une passe
typo « contenu » éventuelle :

- `app/pages/structures.vue:63` — fait « 12 à 17 ans (adaptable) » (`17 ans`).
- `app/pages/structures.vue:211` — lead « … sur les écrans : un cadre … ».
- `app/pages/structures.vue:302` — « … reste la même ; le portage … ».

## 2. Voix « je » vs « PXLC » — PROPOSÉ

| Fichier:ligne | Actuel | Problème | Proposition |
| --- | --- | --- | --- |
| `nuxt.config.ts:204` | « PXLC est un service de médiation numérique en Guadeloupe, porté par Andy Zébus, qui aide les structures (IME, SESSAD, associations, collectivités) à accompagner les familles autour des écrans. » | « PXLC » sujet d'un verbe d'action (`aide`) | « Service de médiation numérique en Guadeloupe. Andy Zébus aide les structures (IME, SESSAD, associations, collectivités) à accompagner les familles autour des écrans. » |

`founder: "Andy Zébus"` (`nuxt.config.ts:228`) = propriété schema, valeur =
nom propre → **OK** (pas le mot « fondateur »). `site.description`,
ogDescription des pages et défaut OG en 3ᵉ personne « Andy Zébus … » → **OK**.

## 3. Formule ≤ 20 mots (meta / OG / bios) — PROPOSÉ

`<title>` et meta `description` respectent ≤ 53 / ≤ 120 (R7). La *formule*
≤ 20 mots est dépassée par deux descriptions d'image OG (texte de carte
sociale, pas de gate auto) :

| Fichier:ligne | Mots | Extrait |
| --- | --- | --- |
| `app/pages/structures.vue:15` | ~30 | « Ateliers thématiques parent-enfant co-encadrés … indicateurs d'évaluation, bilan en fin de dispositif. » |
| `app/pages/contact.vue:17` | ~24 | « Visio ou WhatsApp … réponse personnelle sous 2 jours ouvrés. » |

Resserrage seulement si tu valides — non bloquant.

## 4. Cadre réglementaire & termes naked — quasi OK

- « HCSP 2019-2020 · HAS 2020 » cité ensemble dans tous les meta/OG/schema. **OK**
- **PROPOSÉ** : `content/blog/tnd-ecrans-parents-premier-entretien.md:3`
  (`description`) écrit « le cadre HCSP · HAS » sans millésimes (le
  `seoDescription` du même article est, lui, complet). Aligner sur la forme
  complète ?
- Termes naked (HCSP, SESSAD, IME, TND) sans guillemets ni traduction. **OK**

## 5. Cohérence Person / Org / Service — PROPOSÉ

| Point | Constat | Proposition |
| --- | --- | --- |
| `sameAs` désynchronisés | Org (`nuxt.config.ts:229`) = 7 profils (incl. YouTube, Threads) ; Person (`app/app.vue:19`) = 5 (sans YouTube ni Threads) | Aligner Person sur Org si ces comptes sont ceux d'Andy |
| `founder` non lié | `founder: "Andy Zébus"` est une chaîne, pas un lien vers `#andy` | Passer à `founder: { '@id': 'https://pxlc.fr/#andy' }` pour relier les nœuds |
| `Parent-Écran-Enfant` vs `Parents-Écran-Enfant` | `programme-parent-ecran-enfant.md` au singulier ; `jouons-ensemble` et `blog/index.vue:34` au pluriel ; design.md impose `Parents-Écran-Enfant` | Trancher le nom canonique du programme et uniformiser |

`areaServed` = Guadeloupe partout (config, Person occupation, Service). **OK**

## 6. Règle ds-lint R11 — APPLIQUÉ

Règle `seo-typo` ajoutée à `scripts/ds-lint.mjs` (modèle R7) : scanne les
valeurs de chaîne (`'…'` / `"…"`) dans `useSeoMeta`, `defineOgImage`,
`useSchemaOrg` (pages + composants + `app/app.vue`) ainsi que `site.description`
et `schemaOrg.identity.description` de `nuxt.config.ts`. Flagge l'espace normale
(U+0020) entre nombre et unité (`min h s ans jours mois semaines € %`) et avant
`! ? : ; »`. Sort en code 1 comme les autres règles. Vérifiée : déclenche sur
une régression `20 min`, silencieuse sur la version U+00A0, sans faux positif
sur les ternaires `??` ni « 6 structures ». Portée = typographie objective ;
voix et formule restent humaines.

> Limite connue : les chaînes définies hors appel (ex. `const faqs = […]`
> spreadé dans `useSchemaOrg`) ne sont pas couvertes par R11 — corrigées à la
> main ici, mais non verrouillées.
