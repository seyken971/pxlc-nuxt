---
name: new-blog-post
description: Scaffolde un nouvel article de blog dans content/blog/ avec un frontmatter conforme au schéma @nuxt/content et aux limites SEO, et rappelle les garde-fous copy PXLC.
disable-model-invocation: true
---

# Nouvel article de blog

Créer un article dans `content/blog/<slug>.md` à partir du sujet donné en argument : $ARGUMENTS

Si aucun sujet n'est fourni, demander le sujet avant de continuer.

## Étapes

1. **Slug** : dériver du sujet un slug kebab-case, en français, sans article
   ni mot vide superflu (ex : `mediation-numerique-parent-enfant-sessad-ime`).
   Vérifier qu'il n'existe pas déjà dans `content/blog/`.

2. **Frontmatter** : remplir ce gabarit. Schéma de référence :
   `content.config.ts` (zod) ; limites : `scripts/seo-limits.mjs`.

   ```yaml
   ---
   title: ""
   description: ""
   seoTitle: ""
   seoDescription: ""
   date: YYYY-MM-DD
   category: parents | cas-pratique | decryptage
   draft: true
   ---
   ```

   Règles :
   - Le `<title>` effectif est `seoTitle || title` et reçoit le suffixe
     « · PXLC » : il doit faire **≤ 53 caractères**. Si `title` dépasse,
     `seoTitle` est obligatoire.
   - La description effective est `seoDescription || description` :
     **≤ 120 caractères**.
   - `date` au format `YYYY-MM-DD` (date du jour par défaut).
   - `category` : une des trois valeurs de `app/utils/blog-categories.ts`.
   - `readingTime` : ne pas le mettre — calculé automatiquement.
   - `draft: true` tant qu'Andy n'a pas validé le copy final.

3. **Corps** : rédiger ou poser la structure (`##` uniquement, pas de `#` —
   le H1 vient du `title`). S'inspirer du ton des articles existants
   (ex : `content/blog/jouons-ensemble-sessad-lekoklaya.md`).

   Terminer l'article par la bio auteur, verbatim (3e personne autorisée
   pour les bios) :

   ```markdown
   *Les écrans sont devenus un point de friction dans les familles. Andy Zébus, médiateur numérique et créateur de PXLC, aide les structures en Guadeloupe à accompagner les familles — avec le jeu vidéo comme outil de médiation, jamais comme problème.*
   ```

4. **Vérifier** : lancer `npm run validate-content` et corriger jusqu'à zéro
   erreur. (Le hook post-édition le fait aussi automatiquement.)

## Garde-fous copy (bloquants — voir CLAUDE.md et design.md)

- Voix : **« je »** (= Andy) pour les verbes d'action ; « PXLC » n'est jamais
  sujet d'un verbe d'action (seule exception : la mission verbatim).
- Vocabulaire interdit : addiction, désintoxication, détox numérique, coach,
  expert, innovant, révolutionnaire → utiliser « usage problématique des
  écrans » (MILDECA).
- Pas d'emoji, nulle part.
- Typographie française : espace insécable avant `!` `?` `:` `;` `»` et entre
  nombre et unité (`48 h`, `20 min`, `100 €`).
- « esport » : minuscule, invariable.
- Cadre réglementaire : toujours « HCSP 2019-2020 · HAS 2020 » ensemble.
- Toute affirmation santé/usage des écrans doit être sourcée depuis
  `docs/references/` — jamais de chiffre inventé.
- Le jeu vidéo est un outil de médiation légitime, jamais un problème à
  résoudre.

À la fin : proposer le texte, ne pas considérer le copy comme final —
Andy valide.
