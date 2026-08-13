# PXLC — Plan SEO consolidé

> Document de travail interne (pas du contenu site). Version reconstituée le
> 12 août 2026 : l'original du 3 juillet 2026 n'avait jamais été committé et a
> été perdu avec son worktree, ainsi que deux briefs (« vision » et
> « à quel âge »). Les décisions figées ci-dessous sont reprises telles
> quelles ; la composition détaillée des vagues est une reconstruction à
> valider avant exécution.

## 1. Stratégie en 2 temps

1. **Autorité parentale** — construire du trafic informationnel sur les
   requêtes parents/écrans, systématiquement sourcé HCSP (E-E-A-T sur un
   domaine YMYL). Le blog est le véhicule.
2. **Conversion B2B locale** — transformer cette autorité en contacts venant
   des lieux d'accueil des familles (structures = clientes, familles =
   bénéficiaires). Pages `/structures/` et `/contact/`, preuve par les cas
   pratiques SESSAD.

## 2. Décisions figées (ne pas re-litiguer)

- **Crawlers IA** : `blockAiBots: true` maintenu — posture « bloquer
  l'entraînement / autoriser la recherche » via groups explicites dans
  robots.txt. Pas de Content-Signal (coûte 8 points Lighthouse), nuxt-llms
  abandonné.
- **Mesure** : Google Search Console uniquement. Site statique GitHub Pages,
  pas d'analytics runtime.
- **Funnel** : RDV-first — « Prendre rendez-vous » (cal.eu) est l'unique
  action de conversion primaire ; devis et plaquette en secondaire.
- **Local** : fiche Google Business Profile vérifiée, liée au schema
  `#identity`. Entité GBP = « PXLC - Médiation numérique », site.name = « PXLC ».
- **Limites meta** (gate `validate-content`) : title effectif ≤ 53 caractères
  (avant suffixe « · PXLC »), description effective ≤ 120 caractères.
- **Trailing slash** : activé (alignement canonical/sitemap avec GitHub Pages).

## 3. État des lieux contenu (12 août 2026)

17 articles publiés, répartis sur 3 catégories.

| Slug | Catégorie | Date |
|------|-----------|------|
| `enfant-rejoue-toujours-meme-jeu` | parents | 2026-01-15 |
| `jouons-ensemble-sessad-lekoklaya` | cas-pratique | 2026-02-10 |
| `quand-votre-enfant-joue-a-fortnite` | decryptage | 2026-03-05 |
| `mediation-numerique-parent-enfant-sessad-ime` | cas-pratique | 2026-05-18 |
| `bonnes-pratiques-ecrans-famille` | parents | 2026-06-03 |
| `cadre-hcsp-enfants-ecrans` | parents | 2026-06-03 |
| `methode-mediation-jeu-video-parent-enfant` | decryptage | 2026-06-03 |
| `programme-parent-ecran-enfant` | cas-pratique | 2026-06-03 |
| `esport-guadeloupe-mediation-numerique-familles` | decryptage | 2026-06-08 |
| `jeu-video-selection-ateliers-sessad-ime` | cas-pratique | 2026-06-08 |
| `tnd-ecrans-parents-premier-entretien` | parents | 2026-06-08 |
| `ecrans-et-sommeil-enfant` | parents | 2026-08-12 |
| `ecrans-et-vision-enfant` | parents | 2026-08-12 |
| `a-quel-age-quel-ecran` | parents | 2026-08-12 |
| `jeu-en-ligne-amis-enfant` | decryptage | 2026-08-12 |
| `contenus-choquants-enfant` | parents | 2026-08-12 |
| `reseaux-sociaux-image-de-soi-ado` | parents | 2026-08-12 |

Constat qui fonde la roadmap : le corpus `docs/references/` est sous-utilisé.
Le rapport HCSP contient des sections « effets santé » entières sans article
(surpoids/sédentarité restant à couvrir), et le volet risques socio-numériques
(rapport commission Enfants et écrans 2024) est absent du blog.

## 4. Roadmap contenu en 3 vagues (reconstruction — à valider)

### Vague 1 — Effets santé HCSP (autorité parentale)

Exploiter les sections V du rapport HCSP, une requête parentale par article.

| Sujet | Requête type | Source principale | Statut |
|-------|--------------|-------------------|--------|
| Écrans et sommeil | « écran avant de dormir enfant » | `hcspr20191212` §V.5 | Publié (2026-08-12) |
| Écrans et vision | « écran yeux enfant », « lumière bleue enfant » | `hcspr20191212` §V.1 | Publié (2026-08-12) |
| À quel âge quel écran | « écran quel âge », « téléphone quel âge » | `hcspa20191212` §VII | Publié (2026-08-12) |

### Vague 2 — Risques socio-numériques (rapport commission 2024)

Sujets candidats — briefs rédigés le 12/08/2026, décision de rédaction à
prendre par Andy, sujet par sujet : exposition aux
contenus inadaptés, réseaux sociaux et image de soi, jeu en ligne et
sociabilité. Source : `rapport-commission-enfants-ecrans-2024` +
`dossier_enfantsecransnumerique`. Garde-fou : le jeu vidéo reste un outil de
médiation, jamais un problème à résoudre — l'angle est l'accompagnement.

| Sujet | Brief | Statut |
|-------|-------|--------|
| Contenus choquants | `contenus-choquants-enfant` | Publié (2026-08-12) |
| Réseaux sociaux et image de soi | `reseaux-sociaux-image-de-soi-ado` | Publié (2026-08-12) |
| Jeu en ligne et sociabilité | `jeu-en-ligne-amis-enfant` | Publié (2026-08-12) |

### Vague 3 — Ancrage B2B et local

Contenus qui parlent aux lieux d'accueil des familles : déroulé type d'un
atelier, place du parent dans le dispositif, retours du terrain SESSAD
(témoignage Lékoklaya en cours de formalisation). Objectif : nourrir le
funnel RDV-first depuis `/structures/`.

## 5. Pipeline de production (rodé sur l'article sommeil)

1. **Brief** dans `docs/seo-briefs/` — format du brief
   `ecrans-et-sommeil-enfant.md` : requêtes cibles, slug, frontmatter proposé
   (limites 53/120), plan H2 avec chaque claim sourcé (document + section +
   page via `docs/references/CITATIONS.md`), garde-fous, plan de maillage,
   bloc statut à cocher.
2. **Rédaction** — skill ghostwriter, voix « je », insécables U+00A0.
3. **Audit conformité** — chaque claim vérifié dans le corpus, vocabulaire
   interdit balayé.
4. **Maillage** — liens sortants ET entrants posés le même jour que la
   publication.
5. **Gates** — `lint · typecheck · ds-lint · validate-content`, puis PR.
   Andy valide tout le copy final avant merge.

## 6. Piliers de maillage interne

- **Pilier parental** : `cadre-hcsp-enfants-ecrans` — tout article parents y
  renvoie.
- **Pilier B2B** : `mediation-numerique-parent-enfant-sessad-ime` — tout
  article cas-pratique/structures y renvoie.

## 7. Mesure

Google Search Console, revue manuelle. Points d'attention connus : les 500
affichés par Google sont un index périmé (pas un bug vivant) — purge par
recrawl GSC ; pages non indexées résolues par le trailing slash (13 juillet).
