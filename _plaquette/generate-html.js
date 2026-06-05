#!/usr/bin/env node
/**
 * generate-html.js — Génère plaquette.html depuis le template + sources projet
 *
 * Usage :
 *   node generate-html.js                        # auto-détecte le .md dans le répertoire
 *   node generate-html.js --fiche <chemin.md>    # fiche explicite
 *
 * Sources de vérité :
 *   - data.json        : données stables fallback (contact, siret, andy, version…)
 *   - Fiche *.md       : données projet-spécifiques (frontmatter JSON entre --- et ---)
 *   - ../nuxt.config.ts: identité/contact/légal/site (prioritaire sur data.json)
 *   - ../design.md     : tokens et règles brand utiles au contrôle de dérive
 *
 * Tokens dans le template : {{section.clé}} (notation pointée, profondeur arbitraire)
 *
 * CONTRAT DES VALEURS :
 *   - Injectées VERBATIM dans le HTML (pas d'échappement).
 *   - Les entités HTML (&nbsp; &amp; &lt;) doivent être écrites telles quelles.
 *   - Les balises HTML (<strong>, <em>) sont autorisées intentionnellement.
 *   - Un & littéral doit être écrit &amp;
 *   - Une valeur null ou undefined → token non résolu → exit 1.
 */

const fs = require('fs')
const path = require('path')
const vm = require('vm')

const TEMPLATE = path.resolve(__dirname, 'plaquette.template.html')
const DATA     = path.resolve(__dirname, 'data.json')
const OUTPUT   = path.resolve(__dirname, 'plaquette.html')
const ROOT     = path.resolve(__dirname, '..')
const NUXT     = path.join(ROOT, 'nuxt.config.ts')
const DESIGN   = path.join(ROOT, 'design.md')

// ── Utilitaires ──────────────────────────────────────────────────────────────

function resolve(obj, key) {
  return key.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj)
}

function deepMerge(base, override) {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
      result[key] = deepMerge(base[key] || {}, override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

function stripProtocol(url) {
  return String(url || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function formatPhone(phone) {
  const raw = String(phone || '').trim()
  const compact = raw.replace(/\s+/g, '')
  const gp = compact.match(/^(\+590)(\d{3})(\d{2})(\d{2})(\d{2})$/)
  if (gp) return `${gp[1]} ${gp[2]} ${gp[3]} ${gp[4]} ${gp[5]}`
  return raw
}

function phoneToWaUrl(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
}

function htmlNbsp(text) {
  return String(text || '').replace(/ /g, '&nbsp;')
}

function firstSameAs(identity, needle) {
  return (identity.sameAs || []).find(url => url.includes(needle)) || ''
}

function buildAddressInline(address) {
  if (!address) return ''
  const city = [address.postalCode, address.addressLocality].filter(Boolean).join(' ')
  const region = [address.addressRegion, address.addressCountry].filter(Boolean).join(' (') + (address.addressCountry ? ')' : '')
  return [address.streetAddress, city, region].filter(Boolean).join(' — ')
}

function parseMarkdownTableSection(markdown, heading) {
  const start = markdown.indexOf(heading)
  if (start === -1) return {}
  const next = markdown.slice(start + heading.length).search(/\n## /)
  const block = next === -1
    ? markdown.slice(start)
    : markdown.slice(start, start + heading.length + next)
  const rows = [...block.matchAll(/^\|\s*`([^`]+)`\s*\|\s*`?([^`|\n]+)`?\s*(?:\|.*)?$/gm)]
  return Object.fromEntries(rows.map(([, key, value]) => [key, value.trim()]))
}

function parseListSection(markdown, heading) {
  const start = markdown.indexOf(heading)
  if (start === -1) return []
  const next = markdown.slice(start + heading.length).search(/\n###? /)
  const block = next === -1
    ? markdown.slice(start)
    : markdown.slice(start, start + heading.length + next)
  return [...block.matchAll(/^- (.+)$/gm)].map(([, item]) => item.trim())
}

function normalizeBrandCopy(text) {
  return String(text || '')
}

// ── Détection de la fiche .md ────────────────────────────────────────────────

function findFiche() {
  const argIdx = process.argv.indexOf('--fiche')
  if (argIdx !== -1) {
    const p = path.resolve(process.argv[argIdx + 1])
    if (!fs.existsSync(p)) { console.error(`✗ Fiche introuvable : ${p}`); process.exit(1) }
    return p
  }
  const files = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
  if (files.length === 0) return null
  if (files.length > 1) {
    console.warn(`⚠  Plusieurs fiches .md trouvées — utilisation de : ${files[0]}`)
    console.warn(`   (utilisez --fiche <nom.md> pour en choisir une autre)`)
  }
  return path.resolve(__dirname, files[0])
}

// ── Lecture du frontmatter JSON ───────────────────────────────────────────────

function parseFiche(fichePath) {
  const content = fs.readFileSync(fichePath, 'utf8')
  const match   = content.match(/^---\r?\n([\s\S]+?)\r?\n---/)
  if (!match) {
    console.warn(`⚠  Aucun frontmatter JSON trouvé dans ${path.basename(fichePath)} — ignoré.`)
    return {}
  }
  try {
    return JSON.parse(match[1])
  } catch (e) {
    console.error(`✗ Frontmatter JSON invalide dans ${path.basename(fichePath)} : ${e.message}`)
    process.exit(1)
  }
}

// ── Lecture de nuxt.config.ts ────────────────────────────────────────────────

function parseNuxtConfig() {
  if (!fs.existsSync(NUXT)) {
    console.warn(`⚠  nuxt.config.ts introuvable : ${NUXT}`)
    return {}
  }

  const source = fs.readFileSync(NUXT, 'utf8')
  const runnable = source.replace(
    /export\s+default\s+defineNuxtConfig\s*\(/,
    'module.exports = defineNuxtConfig(',
  )

  const sandbox = {
    module: { exports: {} },
    exports: {},
    process: { env: { NODE_ENV: 'production' } },
    defineNuxtConfig: config => config,
  }

  try {
    vm.runInNewContext(runnable, sandbox, {
      filename: NUXT,
      timeout: 1000,
      displayErrors: true,
    })
  } catch (e) {
    console.error(`✗ Lecture nuxt.config.ts impossible : ${e.message}`)
    process.exit(1)
  }

  const config = sandbox.module.exports || {}
  const site = config.site || {}
  const identity = config.schemaOrg && config.schemaOrg.identity
    ? config.schemaOrg.identity
    : {}
  const addressInline = buildAddressInline(identity.address)
  const linkedin = firstSameAs(identity, 'linkedin.com')
  const websiteUrl = identity.url || site.url || ''
  const website = stripProtocol(websiteUrl)
  const email = identity.email || (identity.contactPoint && identity.contactPoint.email) || ''
  const phone = formatPhone(identity.telephone || (identity.contactPoint && identity.contactPoint.telephone) || '')
  const siret = identity.taxID || ''
  const areaServed = identity.areaServed && identity.areaServed.name
    ? identity.areaServed.name
    : 'Guadeloupe'

  return {
    site: {
      name: site.name || identity.name || 'PXLC',
      url: websiteUrl,
      website,
      description: normalizeBrandCopy(site.description || identity.description || ''),
      defaultLocale: site.defaultLocale || 'fr_FR',
      currency: site.currency || 'EUR',
    },
    identity: {
      ...identity,
      addressInline,
      legalLine: [
        identity.name || site.name || 'PXLC',
        identity.legalName || 'Andy Zébus — Entrepreneur Individuel',
        `SIRET&nbsp;${htmlNbsp(siret)}`,
        'APE&nbsp;70.21Z',
        addressInline,
      ].filter(Boolean).join(' · '),
      areaServed,
      areaServedCode: identity.address && identity.address.postalCode
        ? identity.address.postalCode.slice(0, 3)
        : '971',
    },
    contact: {
      email,
      emailUrl: email ? `mailto:${email}` : '',
      phone,
      phoneWaUrl: phoneToWaUrl(identity.telephone || (identity.contactPoint && identity.contactPoint.telephone) || phone),
      linkedin: stripProtocol(linkedin),
      linkedinUrl: linkedin,
      cal: 'cal.eu/pxlc-gp',
      calUrl: 'https://cal.eu/pxlc-gp',
      website,
      websiteUrl,
    },
    siret,
    plaquette: {
      eyebrow: `${site.name || identity.name || 'PXLC'} · ${areaServed} · ${identity.address && identity.address.postalCode ? identity.address.postalCode.slice(0, 3) : '971'}`,
      title: 'Médiation<br>numérique<br>par le jeu',
      coverLead: 'PXLC aide les familles à mieux utiliser les écrans. Auprès de vos équipes, pour résoudre les conflits autour du temps d\'écran et construire de bonnes pratiques numériques — pour que les familles s\'en servent sans subir.',
      hcspValidation: 'Pour les enfants présentant des troubles cognitifs ou autistiques, l\'utilisation <strong>encadrée</strong> du numérique a des effets <strong>positifs</strong> sur l\'apprentissage et les interactions sociales. — HCSP&nbsp;2019, §&nbsp;VI.2',
      mildecaStat: '44&nbsp;% des parents ne se sentent pas accompagnés pour réguler les écrans. — MILDECA&nbsp;·&nbsp;DITP&nbsp;2022',
      legalFooter: [
        identity.legalName || 'Andy Zébus — Entrepreneur Individuel',
        `SIRET&nbsp;${htmlNbsp(siret)}`,
        'APE&nbsp;70.21Z',
        addressInline,
      ].filter(Boolean).join(' · '),
      public: 'TSA · TDAH · TND · dystrophie musculaire · neuropathies',
      references: 'HAS&nbsp;2020 · HCSP&nbsp;2019-2020',
      format: 'Ateliers thématiques parent-enfant',
    },
  }
}

// ── Lecture de design.md ─────────────────────────────────────────────────────

function parseDesignData() {
  if (!fs.existsSync(DESIGN)) {
    console.warn(`⚠  design.md introuvable : ${DESIGN}`)
    return {}
  }

  const markdown = fs.readFileSync(DESIGN, 'utf8')
  return {
    design: {
      palette: parseMarkdownTableSection(markdown, '## Palette'),
      typography: parseMarkdownTableSection(markdown, '## Typographie'),
      brandRules: {
        copy: parseListSection(markdown, '### Copy'),
        visual: parseListSection(markdown, '### Visuel'),
      },
    },
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────

const baseData  = JSON.parse(fs.readFileSync(DATA, 'utf8'))
const fichePath = findFiche()
const ficheData = fichePath ? parseFiche(fichePath) : {}
const designData = parseDesignData()
const nuxtData = parseNuxtConfig()

if (fichePath) {
  console.log(`↳  Fiche    : ${path.basename(fichePath)}`)
}

console.log('↳  Design   : design.md')
console.log('↳  Config   : nuxt.config.ts')

const data     = deepMerge(deepMerge(deepMerge(baseData, designData), ficheData), nuxtData)
const template = fs.readFileSync(TEMPLATE, 'utf8')

const missing = []
const result = template.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
  const val = resolve(data, key)
  if (val === undefined || val === null) { missing.push(key); return match }
  return val
})

if (missing.length) {
  console.error('✗ Tokens non résolus :')
  missing.forEach(k => console.error(`  · {{${k}}}`))
  process.exit(1)
}

fs.writeFileSync(OUTPUT, result, 'utf8')
console.log(`✓ plaquette.html généré (${Object.keys(data).length} sections, 0 token manquant)`)
