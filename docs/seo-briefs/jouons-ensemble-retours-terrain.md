# Brief SEO — « "Jouons Ensemble !" : les retours du terrain »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog — vague 3 du plan SEO (`docs/seo-plan.md` § 4, ancrage
> B2B/local). Sujet candidat : la décision de rédiger revient à Andy.
> **BLOQUÉ en attente de deux prérequis** : (1) le témoignage Lékoklaya en
> cours de formalisation, (2) la validation du bilan par l'équipe de la
> structure (l'article `jouons-ensemble-sessad-lekoklaya` annonce déjà « le
> bilan complet sera communicable sur demande après validation par l'équipe
> Lékoklaya »). Ne pas rédiger avant. Le brief est prêt pour que la rédaction
> parte vite quand les prérequis tombent.

## Cible SEO
- **Requêtes** : « médiation numérique SESSAD retour d'expérience »,
  « atelier jeu vidéo SESSAD bilan », « dispositif écrans famille
  médico-social », « jeu vidéo thérapeutique SESSAD ».
- **Intention** : chef de service ou psychologue d'une structure
  médico-sociale qui a lu le déroulé du dispositif et se demande : *et
  concrètement, qu'est-ce que ça a donné ?* C'est l'article de preuve du
  funnel B2B — celui qu'on envoie après un premier rendez-vous.
- **Slug** : `jouons-ensemble-retours-terrain`
- **Catégorie** : `cas-pratique` · **readingTime** : ~8 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « "Jouons Ensemble !" : ce que le terrain nous a appris »
  (guillemets français « » avec insécables dans le rendu final)
- `seoTitle` : « "Jouons Ensemble !" : les retours du terrain » *(≈45 car.
  avec guillemets français)*
- `description` : « Après un cycle d'ateliers au SESSAD Lékoklaya : ce que
  les familles rapportent, ce que l'équipe observe, ce qui reste à
  améliorer. »
- `seoDescription` : « Après un cycle d'ateliers au SESSAD : ce que les
  familles rapportent, ce que l'équipe observe, ce qui reste à faire. »
  *(≈117 car.)*
- Insécables U+00A0 avant `:` etc. à poser par script à la rédaction.

## Angle éditorial (voix PXLC)
L'article de preuve, sans marketing de la preuve : **des retours qualitatifs
honnêtes, pas une étude d'impact**. La ligne est déjà posée dans l'article
fondateur (« pas de pourcentages garantis, pas d'échelle Rosenberg ») — la
tenir. Structure : ce que les familles disent (témoignage validé, citations
exactes), ce que l'équipe observe (indicateurs qualitatifs), ce qui a été
ajusté en cours de route (l'honnêteté sur les frictions crédibilise le
reste), ce que ça ouvre pour une structure qui envisage le dispositif. Voix
« je », mais large place aux mots des autres (familles, le psychologue).

## Plan (H2) + claims sourcés
Les faits Lékoklaya viennent de la fiche projet interne 2026 (Box, non
versionnée — ne jamais la committer) et du témoignage à venir. Rien d'autre.

1. **Rappel en trois lignes : le dispositif** — renvoi
   `jouons-ensemble-sessad-lekoklaya` (ne pas re-raconter). Cohorte : enfants
   suivis au SESSAD (TND, troubles du comportement ou du lien social) et
   leurs parents. Filiation Café-Parents « Enfants Écrans » (14/12/2023).

2. **Ce que les familles rapportent** — matière = témoignage formalisé +
   questionnaires de satisfaction. Citations exactes uniquement, après
   validation. Fait déjà confirmé utilisable : diminution **rapportée** des
   conflits liés aux écrans (auto-évaluation, pas mesure clinique — le dire).

3. **Ce que l'équipe observe** — grilles d'observation des compétences
   (coopération, communication, gestion des émotions), assiduité. Porteur du
   dispositif : **le psychologue** (référence Lékoklaya — toujours cette
   forme). Le regard de la psychomotricienne et de l'intervenant culturel
   (au singulier) si le témoignage le couvre.

4. **Ce qu'on ajusterait** — section d'honnêteté : frictions logistiques,
   calibrage des séances, ce que l'équipe referait autrement. Matière à
   valider avec Andy et l'équipe — rien d'inventé, quitte à garder la
   section courte.

5. **Ce que ça ouvre** — perspectives déjà publiques dans l'article
   fondateur (élargissement aux fratries, réplication en milieu scolaire ou
   associatif, boîte à outils parents) ; appui externe possible : la
   commission 2024 recommande les lieux physiques de jeu supervisé →
   `rapport-commission-enfants-ecrans-2024` Partie 4, p. 82-83. Cadre cité :
   HCSP 2019-2020 · HAS 2020. CTA primaire unique (RDV).

## Garde-fous (pour passer l'audit conformité)
- **La fiche projet source emploie « approche innovante » et « prévention
  addiction » — vocabulaire interdit, ne jamais reprendre tel quel.** Dire
  « usage problématique des écrans » (MILDECA, avis HCSP 08/03/2021).
- « le psychologue » (homme) pour Lékoklaya ; « un intervenant culturel »
  toujours au singulier (garde-fou ds-lint R12).
- Citations du témoignage : exactes, validées, entre guillemets français
  avec insécables. Aucun chiffre qui ne soit dans la fiche ou le
  questionnaire — pas de pourcentage reconstruit.
- Diminution des conflits : toujours « rapportée » / « perçue », jamais
  présentée comme mesure clinique.
- Pas d'emoji. Voix « je » ; « PXLC » jamais sujet d'un verbe d'action.
- Mettre à jour l'article fondateur le même jour : remplacer le commentaire
  `<!-- TÉMOIGNAGE LÉKOKLAYA -->` (présent dans
  `jouons-ensemble-sessad-lekoklaya.md`) par un renvoi vers ce nouvel
  article.
- Insécables FR avant `: ; ? !` et nombre + unité. Note de sources en pied.

## Maillage interne
- Depuis ce nouvel article → `jouons-ensemble-sessad-lekoklaya` (le
  dispositif complet), `mediation-numerique-parent-enfant-sessad-ime`
  (pilier B2B — le cadre et les indicateurs), `tnd-ecrans-parents-premier-entretien`
  (les inquiétudes de départ auxquelles les retours répondent).
- Vers ce nouvel article → depuis `jouons-ensemble-sessad-lekoklaya`
  (section « Suite » + remplacement du commentaire témoignage), depuis le
  pilier B2B (section indicateurs : « voir les retours du terrain »).

## Statut
- [ ] **Prérequis : témoignage Lékoklaya formalisé et validé par l'équipe**
- [ ] **Prérequis : bilan validé par l'équipe Lékoklaya**
- [ ] Validation du sujet par Andy
- [ ] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [ ] Audit conformité (claims ↔ corpus + fiche projet)
- [ ] Maillage interne posé (dont mise à jour de l'article fondateur)
- [ ] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
