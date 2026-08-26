# PXLC — Plan SEO consolidé

> Document de travail interne (pas du contenu site). Révisé le 26 août 2026,
> après la suppression du blog : les vagues de contenu, les briefs et les
> piliers de maillage qui structuraient ce plan n'ont plus de support. Ne
> subsistent ici que les décisions qui engagent encore le site.

## 1. Stratégie

Conversion B2B locale : capter les lieux d'accueil des familles (structures =
clientes, familles = bénéficiaires) sur les pages `/projets/` et
`/contact/`, avec la preuve par les cas pratiques SESSAD.

Le volet « autorité parentale », qui reposait sur un blog d'articles sourcés
HCSP, est abandonné avec le blog (26 août 2026). Le site tient désormais en
5 pages : accueil, projets, à propos, contact, mentions légales.

## 2. Décisions figées (ne pas re-litiguer)

- **Crawlers IA** : posture « bloquer l'entraînement / autoriser la recherche »
  via des groupes explicites dans `public/robots.txt`, maintenu à la main. Pas
  de Content-Signal (coûte 8 points Lighthouse).
- **Mesure** : Google Search Console uniquement. Site statique GitHub Pages,
  pas d'analytics runtime.
- **Funnel** : RDV-first — « Prendre rendez-vous » (cal.eu) est l'unique action
  de conversion primaire ; devis et plaquette en secondaire.
- **Local** : fiche Google Business Profile vérifiée, liée au nœud schema
  `#identity`. Entité GBP = « PXLC - Médiation numérique », `site.name` = « PXLC ».
- **Limites meta** : title effectif ≤ 53 caractères (avant le suffixe
  « · PXLC »), description effective ≤ 120. Source unique dans
  `scripts/seo-limits.mjs`, appliquée par ds-lint R7 aux objets `seo` des
  pages et à `src/config/site.ts`.
- **Trailing slash** : activé (alignement canonical/sitemap avec GitHub Pages,
  qui 301-redirige la forme sans slash).
- **Graphe schema.org** : écrit à la main dans `src/lib/schema.ts`, typé par
  `schema-dts`. Pas de module générateur — la sortie de `nuxt-schema-org`
  avait laissé des scories (nœud dupliqué, `ReadAction`, `@id` machine)
  retirées le 26 août 2026.

## 3. Non-régression

`docs/seo-baseline/` fait foi : canonical, title, metas, og/twitter, JSON-LD
trié, sitemap et robots.txt de chaque page. Protocole dans `CLAUDE.md` — tout
delta se déclare dans la PR, puis la baseline se recapture.

## 4. Mesure

Google Search Console, revue manuelle. Points d'attention connus :

- Un « 500 » affiché par Google est une entrée d'index périmée, pas un bug
  vivant — vérifier le 200 en direct, puis demander une indexation.
- Les pages non indexées de juillet 2026 étaient un problème de trailing
  slash, résolu le 13 juillet.
- La suppression du blog retire ~20 URL de l'index. Elles répondront 404
  (GitHub Pages ne permet ni 410 ni redirection serveur) : la désindexation
  se fera au rythme des recrawls, sans action possible côté site.
