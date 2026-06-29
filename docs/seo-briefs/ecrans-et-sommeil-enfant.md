# Brief SEO — « Écrans et sommeil de l'enfant »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog, issu d'un gap de contenu : requête parentale à fort
> volume couverte par le corpus `docs/references/` mais non traitée.
> Sources à vérifier dans `docs/references/CITATIONS.md` (entrée « Effets sur le
> sommeil ») avant publication.

## Cible SEO
- **Requêtes** : « écrans et sommeil enfant », « écran avant de dormir enfant »,
  « écran le soir enfant », « jeu vidéo le soir sommeil ».
- **Intention** : informationnelle, parent inquiet du coucher. Sujet YMYL →
  l'autorité HCSP est décisive (E-E-A-T).
- **Slug** : `ecrans-et-sommeil-enfant`
- **Catégorie** : `parents` · **readingTime** : ~8 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « Écrans et sommeil de l'enfant : ce qui se joue le soir »
- `seoTitle` : « Écrans et sommeil de l'enfant : que faire le soir » *(49 car.)*
- `description` : « Lumière, stimulation, coucher repoussé : les écrans pèsent
  sur le sommeil de l'enfant. Ce que dit le HCSP, et ce qu'on peut faire le soir. »
- `seoDescription` : « Comment les écrans perturbent le sommeil de l'enfant —
  lumière, stimulation, coucher repoussé — et les repères du soir. » *(≈115 car.)*
- Insécables U+00A0 avant `:` comme le reste du frontmatter.

## Angle éditorial (voix PXLC)
Pas d'alarmisme, pas d'écran diabolisé. Le **jeu vidéo n'est pas l'ennemi du
sommeil — c'est l'heure et le cadre de fin de soirée**. On explique les
mécanismes, on cite le HCSP, on donne des repères tenables, et on relie à la
médiation (accompagner l'arrêt de partie). Voix « je » pour les gestes.

## Plan (H2) + claims sourcés
Chaque affirmation doit pointer une source — rien d'inventé.

1. **Pourquoi le soir, les écrans abîment le sommeil**
   - Lumière bleue → suppression de la sécrétion de mélatonine, endormissement
     retardé → `hcspr20191212` §V.1.3 (lumière bleue, p. 32).
   - Lumière vive + stimulation = effet d'éveil ; 2ᵉ facteur (avec la mélatonine)
     qui allonge la latence d'endormissement → `hcspr20191212` §V.5, p. 44.
   - Contenu engageant + déplacement du temps (la partie/vidéo repousse le
     coucher) → `hcspr20191212` §V.5.

2. **Ce que montrent les études (sans dramatiser)**
   - Coucher plus tardif, temps de sommeil total raccourci, qualité dégradée,
     somnolence diurne → `hcspr20191212` §V.5, p. 43-44 (+ synthèse
     `hcspa20191212` §V.5, p. 10).
   - Écrans portables au coucher → probabilité accrue de durée inadéquate
     (< 10 h enfants, < 9 h ados) → `hcspr20191212` §V.5, p. 44 (chiffres dans
     la source, citables).
   - Jeux vidéo le soir → latence d'endormissement augmentée, TST encore plus
     court → `hcspr20191212` §V.5, p. 44.

3. **Les deux repères du HCSP : la chambre et l'heure**
   - Pas d'écran dans la chambre ; pas d'écran dans l'heure avant le coucher →
     `hcspa20191212` §VII.1, p. 14.
   - Limiter la lumière bleue le soir → `hcspr20191212` (recommandations sommeil).

4. **Le jeu vidéo n'est pas le problème — l'heure et le cadre, oui** (cœur PXLC)
   - Donnée clé sourcée : une régulation parentale (stopper à 21-22 h, cadrer le
     contenu) prédit moins de temps de jeu ET un coucher plus tôt →
     `hcspr20191212` §V.5, p. 44. → On cadre la fin de partie, on ne diabolise
     pas le jeu.
   - Accompagner la transition (prévenir, laisser finir/sauvegarder, rituel de
     retour au calme) → renvoi à la méthode.

5. **Quoi faire le soir — concrètement**
   Checklist actionnable : sortir l'écran de la chambre · couper ~1 h avant ·
   annoncer la fin de partie · rituel de calme · cohérence des adultes. Format
   liste → favorable au featured snippet.

## Garde-fous (pour passer l'audit conformité)
- « usage problématique », jamais « addiction ». Pas d'emoji.
- Citer « HCSP 2019-2020 · HAS 2020 » ensemble (note de sources + mention cadre).
- Chaque chiffre/effet sourcé (les seuils < 10 h / < 9 h viennent du rapport).
- Jeu vidéo = outil de médiation ; le sommeil n'est pas un prétexte à l'interdire.
- Note de sources en pied (modèle des autres articles).
- Insécables FR avant `: ; ? !` et nombre + unité.

## Maillage interne
- Depuis ce nouvel article → `cadre-hcsp-enfants-ecrans` (le cadre),
  `bonnes-pratiques-ecrans-famille` (les règles),
  `methode-mediation-jeu-video-parent-enfant` (l'arrêt de partie / la transition).
- Vers ce nouvel article → ajouter un lien depuis la section sommeil de
  `bonnes-pratiques`, depuis `cadre-hcsp` (paragraphe coucher) et depuis
  `quand-votre-enfant-joue-a-fortnite` (l'arrêt du soir). L'ajouter dans un
  `RelatedReading`.

## Statut
- [ ] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [ ] Audit conformité (claims ↔ corpus)
- [ ] Maillage interne posé
- [ ] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
