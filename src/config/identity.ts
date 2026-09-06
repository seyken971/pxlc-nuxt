// Source unique des données d'identité légale (NAP + immatriculations).
// Les mêmes valeurs alimentent le JSON-LD (src/lib/schema.ts) et la page des
// mentions légales : toute divergence casse la cohérence NAP avec la fiche
// Google Business Profile, d'où la source unique.
// Note : contact.astro et a-propos.astro affichent encore ces valeurs en dur,
// mêlées à des libellés formatés — à câbler ici si elles bougent.
export const IDENTITY = {
  legalName: 'Andy Zébus - Entrepreneur Individuel',
  brandName: 'PXLC - Médiation numérique',
  siret: '813 793 528 00031',
  siren: '813 793 528',
  rcsCity: 'Pointe-à-Pitre',
  ape: '70.21Z',
  apeLabel: 'Conseil en relations publiques et communication',
  email: 'contact@pxlc.fr',
  // Format E.164 pour les liens tel: et le JSON-LD.
  telephone: '+590690717618',
  telephoneDisplay: '0690 71 76 18',
  address: {
    street: '8 Résidence la familiale, rue Man Manigard Alfred, Dugazon',
    postalCode: '97139',
    locality: 'Les Abymes',
    region: 'Guadeloupe',
    country: 'FR',
  },
  // Horaires publiés sur la fiche Google Business Profile (relevés le
  // 06/09/2026) : lundi à vendredi, fermé le week-end. Format HH:MM attendu
  // par schema.org (opens / closes).
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
} as const

/** Mention RCS publiée, ex. « Pointe-à-Pitre 813 793 528 ». */
export const RCS_MENTION = `${IDENTITY.rcsCity} ${IDENTITY.siren}`

/**
 * Formes compactes des immatriculations, pour le JSON-LD : les référentiels
 * attendent une chaîne sans séparateur. Les mentions légales gardent la forme
 * espacée d’IDENTITY — même source, deux rendus.
 */
export const SIRET_COMPACT = IDENTITY.siret.replace(/ /g, '')
export const SIREN_COMPACT = IDENTITY.siren.replace(/ /g, '')
