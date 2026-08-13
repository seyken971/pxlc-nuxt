# Brief SEO — « Réseaux sociaux et image de soi à l'adolescence »

> Document de travail interne (pas du contenu site). Brief de rédaction pour un
> nouvel article de blog — vague 2 du plan SEO (`docs/seo-plan.md` § 4, risques
> socio-numériques). Sujet candidat : la décision de rédiger revient à Andy
> sur la base de ce brief.
> Sources à vérifier dans `docs/references/CITATIONS.md` (entrées « Effets
> émotionnels / bien-être / réseaux sociaux » et commission 2024) avant
> publication.

## Cible SEO
- **Requêtes** : « réseaux sociaux estime de soi ado », « instagram image de
  soi adolescent », « tiktok santé mentale ado », « ma fille se compare sur
  les réseaux ».
- **Intention** : informationnelle, parent d'ado (souvent de fille) inquiet
  après des signaux (comparaison, retrait, humeur). Sujet YMYL fort, débat
  médiatique saturé → la nuance sourcée est le différenciateur (E-E-A-T).
- **Slug** : `reseaux-sociaux-image-de-soi-ado`
- **Catégorie** : `parents` · **readingTime** : ~9 min

## Frontmatter proposé (limites validate-content : seoTitle ≤ 53, seoDescription ≤ 120)
- `title` : « Réseaux sociaux et image de soi : ce qui se joue à
  l'adolescence »
- `seoTitle` : « Réseaux sociaux et image de soi à l'adolescence » *(47 car.)*
- `description` : « Comparaison, likes, algorithmes : ce que les réseaux
  sociaux font — et ne font pas — à l'image de soi des adolescents, et
  comment accompagner. »
- `seoDescription` : « Comparaison, likes, algorithmes : ce que les réseaux
  sociaux font à l'image de soi des ados — et comment accompagner. »
  *(≈117 car.)*
- Insécables U+00A0 avant `:` comme le reste du frontmatter.

## Angle éditorial (voix PXLC)
Le sujet le plus médiatisé, donc celui qui exige le plus de rigueur. Position :
**ni « les réseaux détruisent nos ados » ni « circulez »**. La science ne
démontre pas de causalité générale — mais elle identifie des mécanismes précis
(usage passif, comparaison, algorithmes) et des profils plus exposés (ados
vulnérables, filles). On explique les mécanismes pour redonner prise aux
parents, et on finit sur l'accompagnement, pas sur l'interdiction. Voix « je ».

## Plan (H2) + claims sourcés
Chaque affirmation doit pointer une source — rien d'inventé.

1. **Une inquiétude légitime, un lien moins simple qu'annoncé**
   - La santé mentale des jeunes se dégrade nettement depuis 2020 ; chez les
     collégiens et lycéens, seule la moitié présente un bon niveau de
     bien-être mental, dégradation plus marquée chez les filles (EnCLASS,
     2022) → `rapport-commission-enfants-ecrans-2024` § 2.3, p. 43.
   - Les études manquent pour établir un lien de causalité entre réseaux
     sociaux et bien-être mental — mais la consommation excessive est un
     « facteur aggravant de risque pour les jeunes présentant des
     vulnérabilités » (citation à reprendre telle quelle) →
     `rapport-commission-enfants-ecrans-2024` § 2.3, p. 44.
   - Même prudence côté HCSP : relation bi-directionnelle (les écrans
     révèlent la vulnérabilité autant qu'ils la créent), les adolescentes
     étant la population la plus vulnérable aux contenus des réseaux →
     `hcspr20191212` § V.7 (conclusions), p. 54.

2. **Les mécanismes qui pèsent sur l'image de soi**
   - L'usage passif (regarder la vie des autres sans échanger) est associé à
     un bien-être plus faible ; l'usage actif ne l'est pas →
     `hcspr20191212` § V.7.2, p. 52-53.
   - Le biais d'optimisme : ce qui est publié est toujours présenté sous son
     meilleur jour → comparaisons sociales et envie, source de détresse
     surtout en usage passif → `hcspr20191212` § V.7 (recommandations), p. 54.
   - L'adolescence est une période d'hypersensibilité à la récompense : les
     likes et la popularité comptent démesurément, et ceux qui recherchent le
     plus ces indicateurs s'engagent ensuite davantage dans des comportements
     à risques → `hcspr20191212` § V.7.2, p. 53.
   - C'est aussi la période où « l'identité et l'estime de soi se forment »,
     avec un cerveau particulièrement sensible à la pression sociale et aux
     opinions des pairs → `rapport-commission-enfants-ecrans-2024` § 2.3,
     p. 47.

3. **Les algorithmes ne sont pas neutres**
   - Des conceptions qui visent à maximiser le temps passé en ligne et
     enferment dans des bulles de filtre — renforçant les risques chez les
     jeunes déjà vulnérables → `rapport-commission-enfants-ecrans-2024`
     § 2.3, p. 45.
   - Étude Amnesty International sur le fil « Pour toi » de TikTok (comptes
     simulant des enfants de 13 ans) : après 5-6 h, près d'une vidéo sur deux
     liée à la santé mentale et potentiellement nocive →
     `rapport-commission-enfants-ecrans-2024` § 2.3, p. 45.
   - Les modèles algorithmiques les plus délétères portent des risques
     accrus pour les jeunes filles →
     `rapport-commission-enfants-ecrans-2024` § 2.3, p. 47.
   - Seuil utile côté HCSP : composantes de la qualité de vie impactées chez
     les filles dès 2 h quotidiennes d'exposition → `hcspa20191212` § VI.3,
     p. 12.

4. **Ce que les réseaux apportent aussi (le dire honnêtement)**
   - Usage actif : occasion de se connecter aux autres, d'accroître son
     capital social, de renforcer le sentiment de lien →
     `hcspr20191212` § V.7 (recommandations), p. 54.
   - Opportunités de connexion à des communautés, notamment pour les jeunes
     plus marginalisés → `rapport-commission-enfants-ecrans-2024` § 2.3,
     p. 44.
   - Une utilisation modérée des écrans permet aux adolescents d'être moins
     isolés → `hcspa20191212` § V.4, p. 10.

5. **Accompagner : parler des mécanismes, pas seulement du temps** (cœur PXLC)
   - Faire prendre conscience du biais d'optimisme (les publications sont
     toujours à l'avantage de leur auteur) → `hcspr20191212` § V.7
     (recommandations), p. 54.
   - Travailler sur les motivations à publier (ne pas être exclu, être
     reconnu) plutôt que de marteler les risques — 71 % des jeunes publient
     des informations personnelles en connaissant les risques (TNS-Sofres,
     2010) → `hcspr20191212` § V.7.4 (recommandations), p. 58-59.
   - Renforcer les compétences psychosociales, apprendre à résister à la
     pression des pairs → `hcspr20191212` § V.7.4 (recommandations), p. 59.
   - Conditions concrètes (compte privé, contacts connus, notifications,
     droit à l'image) → renvoi bonnes pratiques règle 9 ; repères d'âge
     (13 ans légal, jalons 2024) → renvoi article à-quel-âge.
   - La dette de sommeil liée aux écrans du soir est un facteur de risque
     indépendant d'anxiété et de dépression →
     `rapport-commission-enfants-ecrans-2024` § 2.3, p. 44 → pont vers
     l'article sommeil (protéger la nuit protège aussi l'humeur).

## Garde-fous (pour passer l'audit conformité)
- Ne jamais écrire « les réseaux sociaux rendent dépressif » : pas de
  causalité établie — reprendre la formulation « facteur aggravant pour les
  jeunes présentant des vulnérabilités » (commission § 2.3, p. 44).
- Le débat scientifique est réel (Twenge/Haidt vs Hancock vs
  Orben/Przybylski, commission p. 44-45) — le mentionner d'une phrase plutôt
  que de trancher.
- Effet genre : factuel et sourcé (filles plus exposées), sans essentialiser
  ni culpabiliser les intéressées.
- La commission emploie « addiction/addictogène » (encadré p. 45-46) —
  vocabulaire interdit en copy PXLC : dire « conception qui capte
  l'attention », « usage problématique ».
- TikTok : citable uniquement adossé à l'étude Amnesty relayée par la
  commission — pas de procès général des plateformes.
- « usage problématique », jamais « addiction ». Pas d'emoji.
- Citer « HCSP 2019-2020 · HAS 2020 » ensemble (note de sources + mention cadre).
- Note de sources en pied (modèle des autres articles).
- Insécables FR avant `: ; ? !` et nombre + unité (`2 h`, `5-6 h`).

## Maillage interne
- Depuis ce nouvel article → `bonnes-pratiques-ecrans-famille` (règle 9,
  réseaux sociaux), `a-quel-age-quel-ecran` (repères d'âge, jalons 2024),
  `ecrans-et-sommeil-enfant` (dette de sommeil et humeur),
  `cadre-hcsp-enfants-ecrans` (pilier parental).
- Vers ce nouvel article → depuis `bonnes-pratiques-ecrans-famille` (règle 9),
  depuis `a-quel-age-quel-ecran` (paragraphe 15 ans / réseaux sociaux) et
  depuis `tnd-ecrans-parents-premier-entretien` si une accroche naturelle
  existe (vulnérabilités) — à vérifier à la rédaction.

## Statut
- [ ] Validation du sujet par Andy (vague 2 : décision avant rédaction)
- [ ] Rédaction (ghostwriter, voix PXLC, sourcé selon ce plan)
- [ ] Audit conformité (claims ↔ corpus)
- [ ] Maillage interne posé
- [ ] Gate (lint · typecheck · ds-lint · validate-content) + déploiement
