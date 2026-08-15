# Brief SEO — « Un atelier jeu vidéo parent-enfant dans votre médiathèque »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog — vague 3 du plan SEO (`docs/seo-plan.md` § 4, ancrage
> B2B/local). Sujet candidat : la décision de rédiger revient à Andy sur la
> base de ce brief. Différenciation voulue : le blog couvre déjà très bien le
> dispositif médico-social (pilier B2B, Lékoklaya, sélection de jeux) mais
> **aucun contenu ne parle aux autres segments cibles** — lecture publique,
> centres sociaux/EVS, CLAS. Cet article est le premier à s'adresser à eux.
> Sources à vérifier dans `docs/references/CITATIONS.md` avant publication.

## Cible SEO
- **Requêtes** : « atelier jeu vidéo médiathèque », « animation jeu vidéo
  bibliothèque », « atelier parents enfants écrans », « atelier numérique
  centre social », « action parentalité numérique ».
- **Intention** : responsable de médiathèque, coordination EVS/centre social,
  référent famille ou CLAS qui cherche une action parentalité numérique avec
  du fond — pas une borne d'arcade en libre accès, pas une conférence
  descendante de plus.
- **Slug** : `atelier-jeu-video-mediatheque`
- **Catégorie** : `cas-pratique` · **readingTime** : ~10 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « Un atelier jeu vidéo parent-enfant dans votre médiathèque »
- `seoTitle` : « Atelier jeu vidéo parent-enfant en médiathèque » *(46 car.)*
- `description` : « Le lieu apporte le public, j'apporte l'atelier et le
  cadre. Le déroulé d'une séance type, ce que votre équipe y gagne, ce qu'il
  faut prévoir. »
- `seoDescription` : « Le lieu apporte le public, j'apporte l'atelier et le
  cadre. Déroulé d'une séance type et ce qu'il faut prévoir. » *(≈114 car.)*
- Insécables U+00A0 avant `:` etc. à poser par script à la rédaction.

## Angle éditorial (voix PXLC)
Le principe du positionnement, énoncé tel quel : **le lieu apporte le public,
j'apporte l'atelier et le cadre**. L'article fait vivre une séance de
l'intérieur, du point de vue du lieu qui l'accueille : ce qui se passe avant,
pendant, après — et ce que l'équipe du lieu y gagne (une action parentalité
qui touche des familles que les formats classiques ne touchent pas). Adresse
directe « votre médiathèque », « votre structure ». Ton concret, logistique
assumée (durée, espace, matériel). Hors médico-social : ici l'atelier relève
de la médiation culturelle et de la parentalité, **pas du soin** — aucun
vocabulaire clinique.

## Plan (H2) + claims sourcés
Chaque affirmation doit pointer une source — rien d'inventé.

1. **Pourquoi un atelier jeu vidéo a sa place dans un lieu culturel ou social**
   - La commission Enfants et écrans 2024 recommande d'accroître les lieux
     physiques où les jeunes jouent ensemble sous la supervision d'un adulte
     capable de faire de la prévention →
     `rapport-commission-enfants-ecrans-2024` Partie 4, p. 82-83. (Le claim
     central de l'article — c'est mot pour mot le terrain des lieux
     d'accueil des familles ; sobriété, pas d'autopromotion appuyée.)
   - Le jeu, c'est déjà une pratique familiale : 69 % des parents jouent au
     moins occasionnellement avec leurs enfants (Médiamétrie/SELL, 2023) →
     `rapport-commission-enfants-ecrans-2024` Partie 1 § 1.2-2, p. 21.

2. **Ce que la séance change par rapport à une conférence sur les écrans**
   - L'accompagnement dans l'utilisation des écrans est « l'élément
     essentiel » — pas le temps d'écran → `hcspa20191212` § IV (citation
     reprise du pilier B2B, formulation exacte à vérifier).
   - L'étude DITP/MILDECA 2022 : l'aspect ludique embarque les enfants
     (Enseignement 2), l'outil partagé facilite le dialogue parent-enfant
     (Enseignement 5), le ton « bienveillant et sans jugement » rassure les
     parents (Enseignement 4) → `rapport-promouvoir-bon-usage-ecrans-2022`
     § 5, p. 40-43. Un atelier fait ce qu'une conférence ne peut pas :
     mettre parent et enfant en situation.

3. **Le déroulé d'une séance type** (cœur logistique de l'article)
   - Structure éprouvée sur le terrain SESSAD, transposée : temps de jeu
     partagé parent-enfant (30-45 min) puis temps d'échange entre parents
     (45 min-1 h) → renvoi `jouons-ensemble-sessad-lekoklaya` (même ossature,
     contexte différent). Source interne, pas de claim santé.
   - Le choix des jeux se fait par mécanique (coopération, rôles
     complémentaires), pas par genre → renvoi
     `jeu-video-selection-ateliers-sessad-ime`.
   - Ce que le lieu prévoit : un espace, des binômes inscrits ; le matériel
     et les jeux, je les apporte si besoin. (Factuel PXLC — à faire valider
     par Andy, ne rien promettre qui n'est pas l'offre réelle.)

4. **Ce que votre équipe y gagne**
   - La formation des adultes encadrants est une nécessité identifiée par le
     HCSP → `hcspa20191212` § VII.4, p. 15. L'atelier est aussi un temps où
     l'équipe du lieu voit des familles en situation et repart outillée.
   - Par segment : médiathèque (action culturelle jeu vidéo qui touche les
     familles, pas que les ados), centre social/EVS (support concret pour
     l'accompagnement à la parentalité), CLAS (entrée relationnelle avec des
     parents difficiles à mobiliser). Formulations à ancrer dans le
     vocabulaire de chaque segment, sans jargon plaqué.

5. **Comment ça démarre** (conversion, un seul CTA primaire)
   - Prendre rendez-vous (cal.eu) = action primaire unique, conforme au
     funnel RDV-first. Mention secondaire possible de la plaquette.
   - Cadre de référence cité en clôture : HCSP 2019-2020 · HAS 2020.

## Garde-fous (pour passer l'audit conformité)
- **Pas de vocabulaire clinique hors médico-social** : ici on ne « repère »
  pas, on ne « prend pas en charge » — on anime, on outille, on met en lien.
  Les mots soin/thérapeutique sont réservés aux contenus SESSAD/IME.
- Jamais coach, expert, innovant ; « usage problématique des écrans » si le
  sujet est effleuré. Pas d'emoji.
- Nommage : « les lieux d'accueil des familles » en générique ; « votre
  médiathèque », « votre structure » en adresse directe.
- Voix « je » pour l'action ; « PXLC » jamais sujet d'un verbe d'action.
- Le jeu vidéo est un outil de médiation légitime, jamais un problème à
  résoudre — l'atelier n'est pas une « sensibilisation aux dangers ».
- Un seul CTA primaire. Insécables FR avant `: ; ? !` et nombre + unité.
- Note de sources en pied (modèle des autres articles).

## Maillage interne
- Depuis ce nouvel article → `mediation-numerique-parent-enfant-sessad-ime`
  (pilier B2B, pour le versant médico-social), `jouons-ensemble-sessad-lekoklaya`
  (l'ossature de séance vient du terrain), `jeu-video-selection-ateliers-sessad-ime`
  (le choix des jeux), `esport-guadeloupe-mediation-numerique-familles`
  (l'ancrage local et la légitimité joueur).
- Vers ce nouvel article → depuis le pilier B2B (section « à quoi ressemble
  un dispositif » : mentionner la déclinaison hors médico-social), depuis
  `esport-guadeloupe-mediation-numerique-familles` (la scène locale rencontre
  les lieux publics). Évaluer un lien depuis la page `/structures/` (hors
  blog — décision à part, impact SEO baseline).

## Statut
- [ ] Validation du sujet par Andy
- [ ] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [ ] Audit conformité (claims ↔ corpus)
- [ ] Maillage interne posé
- [ ] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
