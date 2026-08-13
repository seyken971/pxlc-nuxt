# Brief SEO — « À quel âge quel écran ? »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog — recréation du brief perdu du 03/07/2026 (cf.
> `docs/seo-plan.md` § 4, vague 1). Requête parentale à fort volume couverte par
> le corpus `docs/references/` mais non traitée.
> Sources à vérifier dans `docs/references/CITATIONS.md` (entrée
> « Recommandations pratiques parents / encadrants ») avant publication.

## Cible SEO
- **Requêtes** : « écran quel âge », « téléphone quel âge »,
  « tablette quel âge », « écran bébé quel âge ».
- **Intention** : informationnelle, parent qui cherche un seuil simple. Sujet
  YMYL → l'autorité HCSP est décisive (E-E-A-T). Fort potentiel featured
  snippet sur un tableau récapitulatif par tranche d'âge.
- **Slug** : `a-quel-age-quel-ecran`
- **Catégorie** : `parents` · **readingTime** : ~8 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « À quel âge quel écran ? Les repères du HCSP, âge par âge »
- `seoTitle` : « À quel âge quel écran ? Les repères du HCSP » *(43 car.)*
- `description` : « Avant 3 ans, avant 5 ans, à l'adolescence : les vrais
  repères d'âge du HCSP pour les écrans — et ce qui compte plus que l'âge. »
- `seoDescription` : « Avant 3 ans, avant 5 ans, à l'adolescence : les repères
  d'âge du HCSP pour les écrans, et comment les tenir. » *(≈108 car.)*
- Insécables U+00A0 avant `:` comme le reste du frontmatter.

## Angle éditorial (voix PXLC)
La question que tous les parents posent — et la réponse honnête : le HCSP fixe
**peu d'âges-couperets et beaucoup de conditions d'usage**. On donne les vrais
seuils qui existent (3 ans, 5 ans pour la 3D, les interdits valables à tout
âge), on refuse d'inventer ceux qui n'existent pas (aucun âge officiel pour le
premier téléphone), et on déplace la question du « quel âge » vers le « dans
quel cadre ». Voix « je » pour les gestes.

## Plan (H2) + claims sourcés
Chaque affirmation doit pointer une source — rien d'inventé.

1. **Pourquoi l'âge compte : deux fenêtres sensibles**
   - Le début de la vie (0-4 ans) et l'adolescence sont des périodes
     développementales hypersensibles à l'environnement (forte maturation
     cérébrale) — les risques d'effets délétères y semblent plus marqués →
     `hcspa20191212` §VI.3, p. 12.
   - Avant 6 ans : l'exposition précoce est une distraction qui pourrait peser
     sur le développement cognitif, l'alimentation, la sédentarité et le
     sommeil — preuves limitées, niveau faible à modéré (le dire) ;
     l'accompagnement est l'élément essentiel qui explique les divergences des
     études → `hcspa20191212` §IV, p. 8.

2. **Avant 3 ans : pas d'écran subi**
   - Écrans à proscrire si les conditions d'une interaction parentale ne sont
     pas réunies ; même accompagné, temps faible et délimité (début et fin) →
     `hcspa20191212` §VII.1, p. 14.
   - Jamais installé devant un écran allumé servant de distraction (exposition
     passive) → `hcspa20191212` §VII.1, p. 14.

3. **De 3 à 6 ans : accompagné, jamais en 3D**
   - À partir de 3 ans, l'interdiction totale n'est pas pertinente si les
     conditions d'accompagnement sont réunies (contenu adapté au développement,
     périodes d'utilisation respectées) → `hcspa20191212` §VI.5, p. 12.
   - Pas d'images en 3D avant 5 ans (fatigue visuelle, non-respect du principe
     de convergence et d'accommodation) → `hcspa20191212` §VII.1, p. 14.

4. **À tout âge : les trois interdits transverses**
   - Pas d'écran dans la chambre, quel que soit l'âge → `hcspa20191212`
     §VII.1, p. 14.
   - Aucun écran allumé ou utilisé dans l'heure avant l'endormissement →
     `hcspa20191212` §VII.1, p. 14. → Pont vers `ecrans-et-sommeil-enfant`.
   - Aucun écran allumé pendant les repas (distracteur qui modifie les
     comportements alimentaires) → `hcspa20191212` §VII.1, p. 14.
   - C'est ici que se joue le featured snippet : tableau 0-3 ans / 3-6 ans /
     après 6 ans / à tout âge, construit uniquement sur ces repères.

5. **Et le premier téléphone, alors ?** (la requête star — réponse honnête)
   - Constat de lecture à assumer dans l'article : l'avis HCSP ne fixe aucun
     âge pour le premier smartphone. Il raisonne en conditions d'usage :
     objectif précis, tâche à durée définie (début et fin), moments définis,
     contrôle des contenus, planning des médias → `hcspa20191212` §VII.2,
     p. 14-15.
   - Repère qui existe, lui : respecter les âges indiqués sur les jeux et les
     films (signalétique) → `hcspa20191212` §VII.2, p. 14.
   - Piste complémentaire, à vérifier avant rédaction (ne pas citer de
     paliers sans relire la section) : le rapport de la commission Enfants et
     écrans 2024 propose une progressivité des usages par âge →
     `rapport-commission-enfants-ecrans-2024` Partie 4, axe 3.

6. **Plus utile qu'un âge : le cadre** (cœur PXLC)
   - « Ce n'est pas l'écran en soi qui est peut-être délétère mais son usage »
     (citer avec le « peut-être ») → `hcspa20191212` §VI (chapeau), p. 11 ;
     l'écran interactif ne compense pas la présence d'un adulte qui
     contextualise et discute → `hcspa20191212` §VI.1, p. 11.
   - Les gestes : usages partagés parents-enfants, exemplarité des adultes
     (ne pas être accaparé par les écrans devant les enfants), échanger en
     famille sur ses pratiques, aider l'enfant à s'autoréguler →
     `hcspa20191212` §VII.3, p. 15.
   - Planning des médias préservant les autres activités, dont 2 h d'activités
     quotidiennes en extérieur → `hcspa20191212` §VII.2, p. 14-15.
   - Angle : je transforme le « quel âge » en « dans quel cadre » — c'est le
     cœur de la médiation.

## Garde-fous (pour passer l'audit conformité)
- Ne pas inventer d'âge : aucun seuil « premier téléphone », « premières
  tablettes » ou « premiers réseaux sociaux » dans l'avis HCSP. Si l'article
  en parle, c'est pour dire qu'il n'y en a pas et renvoyer aux conditions.
- Seuils 3D : l'avis dit « pas d'images 3D avant 5 ans » (§VII.1, p. 14) et
  « ne pas exposer les moins de 6 ans aux écrans 3D » (§VI.5, p. 12-13). Ne
  pas fusionner les deux formulations — citer §VII.1 pour la recommandation
  opérationnelle.
- Le seuil canon du site est « pas d'écran avant 3 ans sans interaction
  parentale » (avis §VII.1) — ne pas reprendre le « 2 ans » du rapport
  (`hcspr20191212` §V.1.5, p. 35, littérature vision).
- Périodes sensibles ≠ alarmisme : §IV précise que les preuves restent
  limitées (niveau faible à modéré) — garder cette honnêteté.
- « usage problématique », jamais « addiction ». Pas d'emoji.
- Citer « HCSP 2019-2020 · HAS 2020 » ensemble (note de sources + mention cadre).
- Jeu vidéo = outil de médiation ; l'âge n'est pas un prétexte à l'interdire —
  la signalétique d'âge (PEGI) est un repère de contenu, pas une condamnation
  du jeu.
- Note de sources en pied (modèle des autres articles).
- Insécables FR avant `: ; ? !` et nombre + unité (`3 ans`, `1 h`, `2 h`).

## Maillage interne
- Depuis ce nouvel article → `cadre-hcsp-enfants-ecrans` (le cadre, pilier
  parental), `ecrans-et-sommeil-enfant` (l'interdit de l'heure avant le
  coucher), `bonnes-pratiques-ecrans-famille` (les règles au quotidien), et
  `ecrans-et-vision-enfant` (repères vision/3D) quand il sera publié.
- Vers ce nouvel article → ajouter un lien depuis `cadre-hcsp-enfants-ecrans`
  (paragraphe repères d'âge), depuis `bonnes-pratiques-ecrans-famille` et
  depuis `ecrans-et-sommeil-enfant`. L'ajouter dans un `RelatedReading`.

## Statut
- [x] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [x] Audit conformité (claims ↔ corpus — jalons commission 2024 vérifiés,
      proposition n°13, Partie 4 § 4.3.1, p. 99-100 ; entrée ajoutée à
      CITATIONS.md)
- [x] Maillage interne posé
- [x] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
