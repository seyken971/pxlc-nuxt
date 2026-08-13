# Brief SEO — « Contenus choquants : préparer et protéger son enfant »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog — vague 2 du plan SEO (`docs/seo-plan.md` § 4, risques
> socio-numériques). Sujet candidat : la décision de rédiger revient à Andy
> sur la base de ce brief.
> Sources à vérifier dans `docs/references/CITATIONS.md` (entrées « Droits de
> l'enfant / cyberviolence / fake news / risques sexuels » et « Effets
> émotionnels ») avant publication.

## Cible SEO
- **Requêtes** : « contenu choquant internet enfant », « mon enfant a vu des
  images choquantes », « protéger enfant contenus violents internet »,
  « enfant tombé sur un site pour adultes ».
- **Intention** : mixte — prévention (parent qui anticipe) et réaction à chaud
  (parent après incident, souvent en panique). Sujet YMYL sensible → ton posé
  et autorité des sources décisifs (E-E-A-T).
- **Slug** : `contenus-choquants-enfant`
- **Catégorie** : `parents` · **readingTime** : ~9 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « Contenus choquants en ligne : préparer son enfant, réagir sans
  punir »
- `seoTitle` : « Contenus choquants en ligne : protéger son enfant » *(49 car.)*
- `description` : « Violence, images pour adultes, propos haineux : la plupart
  des enfants y seront exposés. Comment préparer, réagir sans punir, et
  signaler. »
- `seoDescription` : « En ligne, 7 jeunes sur 10 ont déjà vu un contenu
  choquant. Préparer son enfant, réagir sans punir, savoir signaler. »
  *(≈115 car.)*
- Insécables U+00A0 avant `:` comme le reste du frontmatter.

## Angle éditorial (voix PXLC)
Ni panique, ni déni. Le point de départ honnête : **l'exposition arrivera
probablement** — la question n'est pas « si » mais « quand, et est-ce qu'il
m'en parlera ». On donne l'ampleur réelle (chiffrée), on explique pourquoi le
tout-technique ne suffit pas (le HCSP le dit), et on déplace vers ce qui
marche : préparer avant, réagir sans punir après. L'enfant qui vient parler
doit y gagner, jamais y perdre. Voix « je » pour les gestes.

## Plan (H2) + claims sourcés
Chaque affirmation doit pointer une source — rien d'inventé.

1. **L'ampleur, sans catastrophisme**
   - 7 jeunes sur 10 (11-18 ans) déclarent avoir déjà été exposés à des
     contenus choquants en ligne (enquête Génération numérique, début 2023) →
     `rapport-commission-enfants-ecrans-2024` § 2.4.1, p. 47.
   - Typologie des risques : contenu non désiré, contact malintentionné et
     cyberharcèlement, désinformation → `dossier_enfantsecransnumerique`
     Partie I § III, p. 18.
   - Recul utile : 17 % des 9-16 ans dérangés ou perturbés par un contenu en
     ligne (EU Kids Online, 2014) — l'exposition est fréquente, le trouble
     durable est plus rare → `dossier_enfantsecransnumerique` § III.B, p. 18.

2. **Ce que « choquant » recouvre concrètement**
   - Violence : 47 % des 11-18 ans exposés à des scènes de maltraitance
     animale, 42 % à des bagarres, 26 % à des contenus très violents (guerre,
     torture) → `rapport-commission-enfants-ecrans-2024` § 2.4.1, p. 47-48.
   - Haine : 48 % des jeunes disent avoir été insultés en ligne ; environ
     30 % ont vu circuler des propos racistes (Génération numérique/DILCRAH,
     2024) → `rapport-commission-enfants-ecrans-2024` § 2.4.1, p. 48.
   - Images pour adultes : 36 % des 11-18 ans y ont eu accès ; premier
     contact vers 10-11 ans en moyenne, souvent non recherché →
     `rapport-commission-enfants-ecrans-2024` § 2.4.1, p. 47-48 ; exposition
     pas toujours volontaire, encore moins désirée → `hcspr20191212` § V.7.4,
     p. 56.

3. **Pourquoi le tout-technique ne suffit pas**
   - « Il n'existe pas de solution technique permettant d'interdire l'accès »
     aux sites qui devraient être interdits aux enfants → `hcspa20191212`
     § VI.5, p. 12.
   - Filtres contournés, contrôle parental insuffisamment activé, modération
     des plateformes trop lente → `rapport-commission-enfants-ecrans-2024`
     § 2.4.1, p. 48.
   - La voie du HCSP : impossible d'interdire l'accès, mais possible de
     « limiter, informer et éduquer l'enfant pour qu'il comprenne ce qu'il
     voit » → `hcspa20191212` § VI.4, p. 12 ; l'intervention des parents est
     le moyen de contrôler et d'expliquer en quoi certains contenus ne sont
     pas adaptés → `hcspa20191212` § VII.2, p. 14.

4. **Préparer avant : le pacte de parole**
   - Dire explicitement à l'enfant qu'il peut venir parler, même s'il pense
     avoir fait une bêtise → reprendre le pacte de la règle 7 des
     [bonnes pratiques] (« mon premier rôle sera de t'aider »).
   - L'information et la prévention font baisser les faits : les taux de
     cyberharcèlement diminuent quand les élèves reçoivent des temps de
     formation (Hinduja et Patchin, 2012) → `dossier_enfantsecransnumerique`
     § III.C, p. 19.
   - À l'inverse, un accompagnement uniquement prohibitif et coercitif est
     perçu comme intrusif et risque d'être contre-productif →
     `dossier_enfantsecransnumerique` § III.C, p. 19.

5. **Réagir après : sans punir, sans minimiser**
   - Le frein n°1 à la parole : les jeunes victimes craignent d'être jugés et
     que la seule réponse des parents soit la confiscation du smartphone —
     inenvisageable pour eux, donc ils se taisent →
     `dossier_enfantsecransnumerique` § III.G, p. 24.
   - Gestes : écouter d'abord, qualifier ensuite (choquant ≠ traumatisant),
     signaler quand il le faut — 3018 (e-Enfance) et les ressources du
     répertoire → `guide_parentalite_numerique` (3018, Cybermalveillance,
     PédaGoJeux).
   - Si les signes durent (sommeil, isolement, refus d'en parler) → relais
     professionnel, reprendre la liste de « quand demander de l'aide » des
     [bonnes pratiques].

## Garde-fous (pour passer l'audit conformité)
- Ton : ni catastrophisme ni minimisation. Les chiffres d'exposition sont
  élevés, le trouble durable est plus rare — donner les deux.
- Chaque chiffre avec sa source et son année (enquêtes déclaratives : le dire).
- La commission 2024 emploie « addictif/addictogène » — vocabulaire interdit
  en copy PXLC, reformuler (« conception qui capte l'attention »).
- Le jeu vidéo n'est pas le sujet de cet article : ne pas le citer comme
  vecteur type de contenus choquants. La vigilance en ligne propre au jeu
  (chat vocal, inconnus) vit dans le futur article jeu en ligne.
- « usage problématique », jamais « addiction ». Pas d'emoji.
- Citer « HCSP 2019-2020 · HAS 2020 » ensemble (note de sources + mention cadre).
- Note de sources en pied (modèle des autres articles).
- Insécables FR avant `: ; ? !` et nombre + unité.

## Maillage interne
- Depuis ce nouvel article → `bonnes-pratiques-ecrans-famille` (règles 6 et 7,
  le pacte de parole), `a-quel-age-quel-ecran` (contenus contrôlés, conditions
  d'usage), `cadre-hcsp-enfants-ecrans` (pilier parental).
- Vers ce nouvel article → depuis `bonnes-pratiques-ecrans-famille` (règle 7,
  « parler des contenus choquants »), depuis `a-quel-age-quel-ecran`
  (paragraphe contrôle des contenus) et depuis `cadre-hcsp-enfants-ecrans`
  (liste accompagnement : « parler des images choquantes avant qu'elles ne
  deviennent un secret »).

## Statut
- [x] Validation du sujet par Andy (12/08/2026, rédaction demandée)
- [x] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [x] Audit conformité (claims ↔ corpus — fiche 3018 vérifiée dans le
      répertoire parentalité numérique)
- [x] Maillage interne posé
- [x] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
