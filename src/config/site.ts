// Source unique d'identité du site — remplace le bloc `site` de nuxt.config.ts.
// Consommée par BaseLayout, les builders schema.org, et les scripts Node
// (ds-lint R7, export-design).
export const SITE = {
  url: 'https://pxlc.fr',
  name: 'PXLC',
  description:
    'Andy Zébus, créateur de PXLC, aide les lieux d’accueil des familles en Guadeloupe autour des écrans.',
  lang: 'fr-FR',
  locale: 'fr_FR',
  author: 'Andy Zébus',
  twitter: '@seyken971',
  // Suffixe appliqué par BaseLayout à chaque titre de page (%s · PXLC).
  // Budget : titre de page ≤ 53 caractères pour un <title> complet ≤ 60.
  titleSuffix: ' · PXLC',
} as const
