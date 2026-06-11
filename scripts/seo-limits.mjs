/**
 * scripts/seo-limits.mjs
 * Source unique des limites anti-troncature SEO.
 *
 * - SEO_TITLE_MAX : longueur max du <title> AVANT le suffixe « · PXLC »
 *   (7 caractères) ajouté par le titleTemplate → 60 affichés au total,
 *   la limite de troncature des SERP Google desktop.
 * - SEO_DESC_MAX : longueur max des meta/og descriptions — limite de
 *   troncature mobile Google et des cartes sociales.
 *
 * Consommé par : content.config.ts (schéma zod), scripts/validate-content.mjs
 * (articles blog) et scripts/ds-lint.mjs (pages app/ et nuxt.config.ts).
 */
export const SEO_TITLE_MAX = 53
export const SEO_DESC_MAX = 120
