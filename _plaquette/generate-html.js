#!/usr/bin/env node
/**
 * generate-html.js — Génère plaquette.html depuis le template + sources projet
 *
 * Usage :
 *   node generate-html.js                        # auto-détecte le .md dans le répertoire
 *   node generate-html.js --fiche <chemin.md>    # fiche explicite
 *
 * Sources de vérité (de la moins à la plus prioritaire) :
 *   - data.json                 : la copy de la plaquette (mission, méthode, cas…)
 *   - Fiche *.md (optionnelle)  : données projet-spécifiques (frontmatter JSON entre --- et ---)
 *   - ../src/config/identity.ts : NAP et immatriculations (SIRET, RCS, APE, adresse,
 *                                 e-mail, téléphone) — la même source que le JSON-LD et
 *                                 les mentions légales du site, pour ne jamais diverger
 *   - ../src/config/site.ts     : URL et nom du site
 *
 * Node ≥ 22.12 requis : les fichiers .ts sont chargés tels quels (type stripping natif).
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

const TEMPLATE = path.resolve(__dirname, 'plaquette.template.html')
const DATA     = path.resolve(__dirname, 'data.json')
const OUTPUT   = path.resolve(__dirname, 'plaquette.html')
const ROOT     = path.resolve(__dirname, '..')
const IDENTITY_TS = path.join(ROOT, 'src', 'config', 'identity.ts')
const SITE_TS     = path.join(ROOT, 'src', 'config', 'site.ts')

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

/** +590690717618 → +590 690 71 76 18 (forme affichée sur la page contact du site). */
function formatPhone(phone) {
  const raw = String(phone || '').trim()
  const compact = raw.replace(/\s+/g, '')
  const gp = compact.match(/^(\+590)(\d{3})(\d{2})(\d{2})(\d{2})$/)
  if (gp) return `${gp[1]} ${gp[2]} ${gp[3]} ${gp[4]} ${gp[5]}`
  return raw
}

/** Espaces → insécables, pour garder un numéro ou un identifiant sur une seule ligne. */
function htmlNbsp(text) {
  return String(text || '').replace(/ /g, '&nbsp;')
}

// ── Détection de la fiche .md ────────────────────────────────────────────────

function findFiche() {
  const argIdx = process.argv.indexOf('--fiche')
  if (argIdx !== -1) {
    const ficheArg = process.argv[argIdx + 1]
    if (!ficheArg || ficheArg.startsWith('--')) {
      console.error('✗ --fiche requiert un chemin de fichier')
      process.exit(1)
    }
    const p = path.resolve(ficheArg)
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

// ── Identité : src/config/identity.ts + src/config/site.ts ───────────────────
// Prioritaire sur data.json : une valeur NAP ne se tape jamais deux fois.

function loadIdentity() {
  let IDENTITY, RCS_MENTION, SITE
  try {
    ;({ IDENTITY, RCS_MENTION } = require(IDENTITY_TS))
    ;({ SITE } = require(SITE_TS))
  } catch (e) {
    console.error(`✗ Lecture de src/config/identity.ts ou site.ts impossible : ${e.message}`)
    console.error('  (Node ≥ 22.12 requis pour charger les .ts sans transpilation)')
    process.exit(1)
  }

  const a = IDENTITY.address
  const addressInline = `${a.street}, ${a.postalCode} ${a.locality}`
  const phone   = formatPhone(IDENTITY.telephone)
  const website = stripProtocol(SITE.url)

  return {
    site: {
      name: SITE.name,
      url: SITE.url,
      website,
      description: SITE.description,
    },
    contact: {
      email: IDENTITY.email,
      emailUrl: `mailto:${IDENTITY.email}`,
      phone,
      phoneUrl: `tel:${IDENTITY.telephone}`,
      website,
      websiteUrl: SITE.url,
    },
    siret: IDENTITY.siret,
    legal: {
      name: IDENTITY.legalName,
      address: addressInline,
      // Ligne légale complète, alignée sur la page des mentions légales du site.
      line: [
        SITE.name,
        IDENTITY.legalName,
        `SIRET&nbsp;${htmlNbsp(IDENTITY.siret)}`,
        `RCS&nbsp;${htmlNbsp(RCS_MENTION)}`,
        `APE&nbsp;${IDENTITY.ape}`,
        addressInline,
        IDENTITY.email,
        htmlNbsp(phone),
        website,
      ].join(' · '),
    },
  }
}

// ── Build ─────────────────────────────────────────────────────────────────────

const baseData  = JSON.parse(fs.readFileSync(DATA, 'utf8'))
const fichePath = findFiche()
const ficheData = fichePath ? parseFiche(fichePath) : {}
const identityData = loadIdentity()

if (fichePath) {
  console.log(`↳  Fiche    : ${path.basename(fichePath)}`)
}
console.log('↳  Identité : src/config/identity.ts · src/config/site.ts')

const data     = deepMerge(deepMerge(baseData, ficheData), identityData)
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
