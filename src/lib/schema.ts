/**
 * Graphe schema.org du site. Un seul bloc JSON-LD par page, émis par
 * BaseLayout, vérifié contre les fixtures docs/seo-baseline/.
 *
 * Ordre du @graph :
 *   #website · #webpage · #identity · #andy · #service · [nœuds de page :
 *   Question / #article] · [BreadcrumbList] · #photo-event · #logo ·
 *   #photo-andy · [#primaryimage pour les articles]
 *
 * Le graphe a d'abord été transcrit de nuxt-schema-org ; ses scories
 * (#organization dupliqué, ReadAction, primaryImageOfPage, @id machine)
 * ont été retirées depuis.
 */
import { SITE } from '../config/site'
import { IDENTITY, RCS_MENTION } from '../config/identity'
import type { Crumb } from './breadcrumb'

const URL_BASE = SITE.url

type Node = Record<string, unknown>

// ── Nœuds globaux (identiques sur toutes les pages) ─────────────────────────

const websiteNode: Node = {
  '@id': `${URL_BASE}/#website`,
  '@type': 'WebSite',
  'alternateName': IDENTITY.brandName,
  'description': SITE.description,
  'inLanguage': 'fr-FR',
  'name': 'PXLC',
  'publisher': { '@id': `${URL_BASE}/#identity` },
  'url': URL_BASE,
}

const postalAddress: Node = {
  '@type': 'PostalAddress',
  'addressCountry': IDENTITY.address.country,
  'addressLocality': IDENTITY.address.locality,
  'addressRegion': IDENTITY.address.region,
  'postalCode': IDENTITY.address.postalCode,
  'streetAddress': IDENTITY.address.street,
}

// ProfessionalService = sous-type LocalBusiness le plus précis pour une
// prestation de médiation sans point de vente. Données reprises verbatim de
// l'ancien defineLocalBusiness (nuxt.config.ts) — cohérence NAP avec la fiche
// Google Business Profile.
const identityNode: Node = {
  '@id': `${URL_BASE}/#identity`,
  '@type': ['Organization', 'ProfessionalService'],
  'address': postalAddress,
  'areaServed': [
    { '@type': 'AdministrativeArea', 'name': 'Guadeloupe' },
    { '@type': 'City', 'name': 'Les Abymes' },
    { '@type': 'City', 'name': 'Pointe-à-Pitre' },
    { '@type': 'City', 'name': 'Baie-Mahault' },
    { '@type': 'City', 'name': 'Le Gosier' },
  ],
  'availableLanguage': 'fr',
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'customer service',
    'email': IDENTITY.email,
    'telephone': IDENTITY.telephone,
  },
  'description': 'PXLC accompagne les familles dans l’éducation numérique des enfants. Médiation numérique en Guadeloupe, portée par Andy Zébus, auprès des structures qui accompagnent des familles.',
  'email': IDENTITY.email,
  'founder': { '@id': `${URL_BASE}/#andy` },
  'foundingDate': '2015',
  'geo': { '@type': 'GeoCoordinates', 'latitude': 16.1496296, 'longitude': -61.39705 },
  'hasMap': 'https://maps.app.goo.gl/4UPhQWdzboD6HnAs8',
  // Immatriculations. PropertyValue plutôt que taxID, déjà pris par le SIRET.
  // propertyID porte le référentiel, value la mention légale publiée.
  'identifier': [
    { '@type': 'PropertyValue', 'propertyID': 'RCS', 'value': RCS_MENTION },
    { '@type': 'PropertyValue', 'propertyID': 'SIREN', 'value': IDENTITY.siren },
    { '@type': 'PropertyValue', 'propertyID': 'NAF', 'value': IDENTITY.ape },
  ],
  'image': { '@id': `${URL_BASE}/#photo-event` },
  'legalName': IDENTITY.legalName,
  'logo': { '@id': `${URL_BASE}/#logo` },
  'name': IDENTITY.brandName,
  'sameAs': [
    'https://maps.app.goo.gl/4UPhQWdzboD6HnAs8',
    'https://www.linkedin.com/company/pxlc-mediation-numerique/',
  ],
  'taxID': IDENTITY.siret,
  'telephone': IDENTITY.telephone,
  'url': URL_BASE,
}

const andyNode: Node = {
  '@id': `${URL_BASE}/#andy`,
  '@type': 'Person',
  'alumniOf': [
    { '@type': 'EducationalOrganization', 'name': 'Talis Business School (Paris)' },
    { '@type': 'EducationalOrganization', 'name': 'Université des Antilles' },
    { '@type': 'EducationalOrganization', 'name': 'Institut Supérieur Caraïbe (ISCA)' },
  ],
  'description': 'Médiateur numérique basé à Les Abymes (Guadeloupe). Aide les structures — SESSAD, IME, associations, collectivités — à accompagner les familles autour des écrans : conflits autour du temps d’écran, bonnes pratiques numériques.',
  'hasCredential': [
    { '@type': 'EducationalOccupationalCredential', 'credentialCategory': 'Licence', 'name': 'Licence d’anglais, spécialité médiation interculturelle euro-caribéenne — Université des Antilles' },
  ],
  'hasOccupation': {
    '@type': 'Occupation',
    'name': 'Médiateur numérique',
    'occupationLocation': { '@type': 'AdministrativeArea', 'name': 'Guadeloupe' },
  },
  'image': { '@id': `${URL_BASE}/#photo-andy` },
  'jobTitle': 'Médiateur numérique',
  'knowsAbout': [
    'Médiation numérique',
    'Médiation par le jeu vidéo',
    'Parentalité numérique',
    'esport',
    'Guadeloupe',
  ],
  'knowsLanguage': ['fr', 'en'],
  'name': 'Andy Zébus',
  'sameAs': [
    'https://www.linkedin.com/in/azebus',
    'https://www.github.com/seyken971',
    'https://www.instagram.com/seyken971',
    'https://www.youtube.com/@seyken971',
    'https://www.threads.net/@seyken971',
    'https://www.twitter.com/seyken971',
    'https://bsky.app/profile/seyken971.pxlc.fr',
  ],
  'url': `${URL_BASE}/a-propos/`,
  'worksFor': { '@id': `${URL_BASE}/#identity` },
}

const serviceNode: Node = {
  '@id': `${URL_BASE}/#service`,
  '@type': 'Service',
  'areaServed': { '@type': 'AdministrativeArea', 'name': 'Guadeloupe' },
  'audience': {
    '@type': 'BusinessAudience',
    'audienceType': 'SESSAD, IME, associations, collectivités',
  },
  'description': 'Médiation numérique pour les structures qui accompagnent des familles en Guadeloupe. Résolution des conflits autour du temps d’écran, ateliers de bonnes pratiques, vulgarisation numérique.',
  'name': 'Médiation numérique - Programmes PXLC',
  'provider': { '@id': `${URL_BASE}/#identity` },
  'serviceType': 'Médiation numérique',
  'url': `${URL_BASE}/structures/`,
}

const imageNode = (id: string, url: string): Node => ({
  '@id': id,
  '@type': 'ImageObject',
  'contentUrl': url,
  'inLanguage': 'fr-FR',
  'url': url,
})

const logoNode: Node = {
  '@id': `${URL_BASE}/#logo`,
  '@type': 'ImageObject',
  'caption': IDENTITY.brandName,
  'contentUrl': `${URL_BASE}/logo.svg`,
  'inLanguage': 'fr-FR',
  'url': `${URL_BASE}/logo.svg`,
}

// ── Builders de page ────────────────────────────────────────────────────────

export interface WebPageOptions {
  /** Chemin avec slash final, ex. '/a-propos/'. */
  path: string
  type?: string | string[]
  name: string
  description: string
  /** @id du nœud visé par `about` (défaut : #identity). */
  aboutId?: string
  /** Fil d'Ariane de la page (breadcrumbItems) — ajoute le nœud + la réf. */
  crumbs?: Crumb[]
  /** Dates (articles) — reportées sur le nœud WebPage. */
  datePublished?: string
  dateModified?: string
  /** Nœuds Question (structures) — référencés via mainEntity. */
  questions?: { q: string, a: string }[]
  /** Références hasPart (index du blog). */
  hasPart?: Node[]
}

const breadcrumbId = (pageUrl: string) => `${pageUrl}#breadcrumb`

const breadcrumbNode = (pageUrl: string, crumbs: Crumb[]): Node => ({
  '@id': breadcrumbId(pageUrl),
  '@type': 'BreadcrumbList',
  'itemListElement': crumbs.map((c, i) => ({
    '@type': 'ListItem',
    'item': c.href ? `${URL_BASE}${c.href}` : pageUrl,
    'name': c.label,
    'position': i + 1,
  })),
})

/** Graphe complet d'une page standard (toutes les pages sauf articles). */
export const pageGraph = (opts: WebPageOptions & { extraNodes?: Node[], extraImages?: Node[] }): Node[] => {
  const pageUrl = `${URL_BASE}${opts.path}`
  const questionNodes = (opts.questions ?? []).map((f, i) => ({
    '@id': `${pageUrl}#faq-${i + 1}`,
    '@type': 'Question',
    'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    'inLanguage': 'fr-FR',
    'name': f.q,
  }))

  const webpage: Node = {
    '@id': `${pageUrl}#webpage`,
    '@type': opts.type ?? 'WebPage',
    'about': { '@id': opts.aboutId ?? `${URL_BASE}/#identity` },
    ...(opts.crumbs ? { breadcrumb: { '@id': breadcrumbId(pageUrl) } } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    'description': opts.description,
    ...(opts.hasPart ? { hasPart: opts.hasPart } : {}),
    'isPartOf': { '@id': `${URL_BASE}/#website` },
    ...(questionNodes.length
      ? { mainEntity: questionNodes.map(q => ({ '@id': q['@id'] })) }
      : {}),
    'name': opts.name,
    'url': pageUrl,
  }

  return [
    websiteNode,
    webpage,
    identityNode,
    andyNode,
    serviceNode,
    ...questionNodes,
    ...(opts.extraNodes ?? []),
    ...(opts.crumbs ? [breadcrumbNode(pageUrl, opts.crumbs)] : []),
    imageNode(`${URL_BASE}/#photo-event`, `${URL_BASE}/img/photos/andy-event.jpg`),
    logoNode,
    imageNode(`${URL_BASE}/#photo-andy`, `${URL_BASE}/img/photos/andy-portrait.jpg`),
    ...(opts.extraImages ?? []),
  ]
}

export interface ArticleOptions {
  /** Chemin avec slash final, ex. '/blog/slug/'. */
  path: string
  /** Titre éditorial complet (headline). */
  title: string
  /** name du WebPage — seoTitle court s'il existe. */
  pageName: string
  /** description du WebPage / meta — seoDescription si elle existe. */
  pageDescription: string
  /** description éditoriale complète (nœud Article). */
  description: string
  category: string
  datePublished: string
  dateModified: string
  /** Image absolue de repli pour les rich results Article. */
  image: string
  crumbs: Crumb[]
}

/** Graphe complet d'un article de blog (WebPage + Article/BlogPosting). */
export const articleGraph = (opts: ArticleOptions): Node[] => {
  const pageUrl = `${URL_BASE}${opts.path}`
  const articleNode: Node = {
    '@id': `${pageUrl}#article`,
    '@type': ['Article', 'BlogPosting'],
    'articleSection': [opts.category],
    'author': { '@id': `${URL_BASE}/#andy` },
    'dateModified': opts.dateModified,
    'datePublished': opts.datePublished,
    'description': opts.description,
    'headline': opts.title,
    'image': { '@id': `${pageUrl}#primaryimage` },
    'inLanguage': 'fr-FR',
    'isPartOf': { '@id': `${pageUrl}#webpage` },
    'mainEntityOfPage': { '@id': `${pageUrl}#webpage` },
    'publisher': { '@id': `${URL_BASE}/#identity` },
    'thumbnailUrl': opts.image,
    'url': pageUrl,
  }

  return pageGraph({
    path: opts.path,
    type: 'WebPage',
    name: opts.pageName,
    description: opts.pageDescription,
    crumbs: opts.crumbs,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    extraNodes: [articleNode],
    extraImages: [imageNode(`${URL_BASE}${opts.path}#primaryimage`, opts.image)],
  })
}

/** Référence hasPart d'un article depuis l'index du blog. */
export const blogPostPartRef = (slug: string, headline: string): Node => ({
  '@id': `${URL_BASE}/blog/${slug}/#article`,
  '@type': 'BlogPosting',
  'headline': headline,
  'url': `${URL_BASE}/blog/${slug}/`,
})
