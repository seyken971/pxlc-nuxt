# Brief SEO — « Écrans et vision de l'enfant »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog — recréation du brief perdu du 03/07/2026 (cf.
> `docs/seo-plan.md` § 4, vague 1). Requête parentale à fort volume couverte par
> le corpus `docs/references/` mais non traitée.
> Sources à vérifier dans `docs/references/CITATIONS.md` (entrée « Effets sur la
> vision / myopie / lumière bleue ») avant publication.

## Cible SEO
- **Requêtes** : « écran yeux enfant », « lumière bleue enfant »,
  « écran myopie enfant », « les écrans abîment-ils les yeux ».
- **Intention** : informationnelle, parent inquiet (souvent nourri par le
  marketing anti-lumière bleue). Sujet YMYL → l'autorité HCSP est décisive
  (E-E-A-T), d'autant que la réponse honnête est nuancée.
- **Slug** : `ecrans-et-vision-enfant`
- **Catégorie** : `parents` · **readingTime** : ~8 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « Écrans et vision de l'enfant : ce qui fatigue les yeux, ce qui
  les protège »
- `seoTitle` : « Écrans et vision de l'enfant : ce que dit le HCSP » *(49 car.)*
- `description` : « Fatigue visuelle, myopie, lumière bleue : ce que le rapport
  HCSP montre vraiment sur les écrans et les yeux de l'enfant — et les repères
  qui protègent. »
- `seoDescription` : « Fatigue visuelle, myopie, lumière bleue : ce que dit
  vraiment le HCSP sur les écrans et les yeux de l'enfant. » *(≈109 car.)*
- Insécables U+00A0 avant `:` comme le reste du frontmatter.

## Angle éditorial (voix PXLC)
Démêler le vrai du flou, sans vendre de peur. La conclusion du rapport HCSP est
nuancée : **pas de preuve d'une altération durable de la vision par les écrans**
— mais une fatigue visuelle bien réelle (et réversible), et un facteur
protecteur massivement sous-exploité : le temps passé dehors. On désamorce au
passage le marketing « lumière bleue » (le vrai terrain de la lumière bleue,
c'est le sommeil, pas la rétine). Voix « je » pour les gestes.

## Plan (H2) + claims sourcés
Chaque affirmation doit pointer une source — rien d'inventé.

1. **Ce que les écrans font vraiment aux yeux (fatigue, sécheresse)**
   - Utilisation prolongée → symptômes possibles : gêne oculaire, fatigue
     oculaire, sécheresse, maux de tête, vision floue voire double (OMS 2014) →
     `hcspr20191212` §V.1, p. 24.
   - On cligne moins des yeux devant un écran → film lacrymal dégradé,
     sécheresse oculaire → `hcspr20191212` §V.1.1, p. 25.
   - Fatigue oculaire accrue après 4 h d'écran → `hcspr20191212` §V.1.1, p. 27.
   - Point rassurant : ces difficultés ne perdurent pas après l'arrêt de
     l'écran et le repos visuel → `hcspr20191212` §V.1.1, p. 26 ; après
     4 semaines sans smartphone, les signes d'œil sec disparaissent (Moon 2016)
     → `hcspr20191212` §V.1.1, p. 28.

2. **Myopie : ce qu'on sait, ce qu'on ne sait pas**
   - Conclusion du HCSP à reprendre honnêtement : ni consensus ni preuve
     d'effets de l'exposition aux écrans sur la vision des enfants — « ce qui
     ne signifie pas qu'ils n'existent pas » → `hcspr20191212` §V.1.5
     (conclusions), p. 35 (+ synthèse `hcspa20191212` §V.1, p. 9).
   - Chez des enfants déjà myopes : aggravation associée à la durée de
     lecture/écriture sur écran et au temps d'ordinateur/jeux vidéo
     (> 7 h/sem.) ; pas d'association avec la télévision (Saxena 2017) →
     `hcspr20191212` §V.1.2, p. 31.
   - Le facteur protecteur le plus net : le temps passé dehors à la lumière du
     jour (> 2 h/j) — protecteur indépendamment de l'activité physique
     (Saxena 2017 ; ANSES 2019) → `hcspr20191212` §V.1.2, p. 31.

3. **Lumière bleue : moins un problème d'yeux qu'un problème de sommeil**
   - Les LED de rétroéclairage des écrans ont des luminances très faibles :
     pas de risque démontré pour la rétine à ces niveaux (INRS) →
     `hcspr20191212` §V.1.3, p. 32-33.
   - Pourquoi la prudence reste de mise chez l'enfant : cristallin encore
     clair, qui laisse passer plus de 80 % des ondes 380-500 nm avant 8 ans
     (ANSES 2019) → `hcspr20191212` §V.1.3, p. 32.
   - Le soir, l'exposition aux écrans perturbe l'horloge biologique et le
     sommeil ; et ce n'est pas tant la lumière bleue que le contenu de
     l'activité qui a un effet éveillant → `hcspr20191212` §V.1.3, p. 33.
     → Pont vers l'article `ecrans-et-sommeil-enfant`.

4. **Les repères du rapport HCSP**
   - Distance œil-écran d'au moins 50 cm · réduire la durée d'exposition ·
     limiter la lumière bleue avant le coucher · pas de lumière bleue dans la
     chambre · favoriser les activités en extérieur → `hcspr20191212` §V.1.5
     (recommandations), p. 35.
   - Rythme d'usage : sessions de 30 min à 1 h avec un repos de 10 min →
     `hcspr20191212` §V.1.5, p. 35. Format liste → favorable au featured
     snippet.

5. **La médiation parentale, le levier qui marche** (cœur PXLC)
   - « La médiation parentale pour faire appliquer ces mesures est efficace »
     → `hcspr20191212` §V.1.5, p. 35 ; une médiation parentale efficace peut
     compenser les inégalités socio-économiques (Chang 2018) →
     `hcspr20191212` §V.1.5, p. 34.
   - Angle : on ne diabolise pas l'écran — on installe des habitudes (pauses,
     distance, temps dehors), ensemble, dans le dialogue. Renvoi à la méthode.

## Garde-fous (pour passer l'audit conformité)
- Ne jamais écrire « les écrans rendent myope » : non démontré (conclusion
  §V.1.5). L'aggravation observée par Saxena 2017 ne vaut que pour des enfants
  **déjà myopes** — le préciser.
- Pas de vente de peur lumière bleue : aux luminances des écrans, pas de risque
  rétinien démontré (INRS). Ne pas recommander de lunettes ou filtres.
- Seuils d'âge : le rapport (p. 35) mentionne « pas d'écran avant 2 ans » —
  c'est une recommandation issue de la littérature vision. Le repère canon du
  site reste celui de l'avis : pas d'écran avant 3 ans sans interaction
  parentale (`hcspa20191212` §VII.1, p. 14). Ne pas mélanger les deux.
- « usage problématique », jamais « addiction ». Pas d'emoji.
- Citer « HCSP 2019-2020 · HAS 2020 » ensemble (note de sources + mention cadre).
- Jeu vidéo = outil de médiation ; la vision n'est pas un prétexte à l'interdire.
- Note de sources en pied (modèle des autres articles).
- Insécables FR avant `: ; ? !` et nombre + unité (`50 cm`, `4 h`, `10 min`).

## Maillage interne
- Depuis ce nouvel article → `ecrans-et-sommeil-enfant` (le vrai terrain de la
  lumière bleue), `cadre-hcsp-enfants-ecrans` (le cadre),
  `bonnes-pratiques-ecrans-famille` (les règles), et le futur
  `a-quel-age-quel-ecran` (repères 3D par âge) quand il sera publié.
- Vers ce nouvel article → ajouter un lien depuis la section lumière bleue de
  `ecrans-et-sommeil-enfant`, depuis `cadre-hcsp-enfants-ecrans` et depuis
  `bonnes-pratiques-ecrans-famille`. L'ajouter dans un `RelatedReading`.

## Statut
- [x] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [x] Audit conformité (claims ↔ corpus)
- [x] Maillage interne posé
- [x] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
