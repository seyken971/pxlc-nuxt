#!/usr/bin/env node
/**
 * export-pdf.mjs — Génère plaquette-pxlc.pdf depuis plaquette.html
 *
 * Usage :
 *   node _plaquette/export-pdf.mjs
 *   node _plaquette/export-pdf.mjs --fiche "_plaquette/Fiche Projet Jouons Ensemble - 2026.md"
 *
 * Enchaîne : generate-html.js → Puppeteer PDF → métadonnées (pdf-lib)
 *            → public/files/plaquette-pxlc.pdf
 */

import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const HTML_PATH = path.join(__dirname, 'plaquette.html')
const PDF_OUT   = path.join(ROOT, 'public', 'files', 'plaquette-pxlc.pdf')
const PDF_TMP   = path.join(ROOT, 'public', 'files', `plaquette-pxlc.${process.pid}.tmp.pdf`)

// ── 1. Générer plaquette.html ─────────────────────────────────────────────────

const generateArgs = ['generate-html.js']
const ficheIdx = process.argv.indexOf('--fiche')
if (ficheIdx !== -1) {
  const ficheArg = process.argv[ficheIdx + 1]
  if (!ficheArg || ficheArg.startsWith('--')) {
    console.error('✗ --fiche requiert un chemin de fichier')
    process.exit(1)
  }
  // Résoudre depuis le CWD de l'appelant (racine projet), pas depuis __dirname
  const absFiche = path.resolve(process.cwd(), ficheArg)
  generateArgs.push('--fiche', absFiche)
}

console.log('→ Génération HTML…')
execFileSync(process.execPath, generateArgs, { cwd: __dirname, stdio: 'inherit' })

// ── 2. Lancer Puppeteer ───────────────────────────────────────────────────────

const require = createRequire(import.meta.url)
const puppeteer = require('puppeteer')

console.log('→ Export PDF…')
fs.mkdirSync(path.dirname(PDF_OUT), { recursive: true })
const browser = await puppeteer.launch({ headless: true })
try {
  const page = await browser.newPage()

  await page.goto(`file://${HTML_PATH.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluateHandle('document.fonts.ready')

  // Garde-fou : aucun texte ne doit avoir la couleur de son fond (un <strong>
  // hérité en encre sombre sur une carte sombre rend un CTA invisible — vécu).
  const invisible = await page.evaluate(() => {
    const bgOf = el => {
      for (let e = el; e; e = e.parentElement) {
        const c = getComputedStyle(e).backgroundColor
        if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c
      }
      return 'rgb(255, 255, 255)'
    }
    const out = []
    for (const el of document.querySelectorAll('.page *')) {
      const ownText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
      if (!ownText) continue
      if (getComputedStyle(el).color === bgOf(el))
        out.push(`<${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ').join('.') : ''}> « ${el.textContent.trim().slice(0, 70)} »`)
    }
    return out
  })
  if (invisible.length) {
    console.error('✗ Texte invisible (couleur identique au fond) :')
    invisible.forEach(l => console.error(`  · ${l}`))
    process.exitCode = 1
    throw new Error('plaquette : texte invisible')
  }

  await page.pdf({
    path: PDF_TMP,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
} finally {
  await browser.close()
}
if (process.exitCode) process.exit(process.exitCode)

// ── 3. Métadonnées PDF ────────────────────────────────────────────────────────
// Chromium ne reporte que le <title> et expose son user-agent en Creator ;
// on réécrit le dictionnaire Info pour un document propre.

const { PDFDocument } = require('pdf-lib')

console.log('→ Métadonnées…')
const titleMatch = fs.readFileSync(HTML_PATH, 'utf8').match(/<title>([^<]+)<\/title>/)
// Court, sur la convention des onglets du site (« Page · PXLC ») : c'est le
// titre de l'onglet quand le PDF s'ouvre dans le navigateur.
const title = titleMatch ? titleMatch[1] : 'Plaquette · PXLC'

const doc = await PDFDocument.load(fs.readFileSync(PDF_TMP), { updateMetadata: false })
doc.setTitle(title)
doc.setAuthor('Andy Zébus — PXLC')
// Formule canonique des descriptions (CLAUDE.md) — même texte que SITE.description.
doc.setSubject('Andy Zébus, créateur de PXLC, aide les structures en Guadeloupe à accompagner les familles autour des écrans.')
doc.setKeywords([
  'médiation numérique', 'écrans', 'famille', 'parent-enfant', 'jeu vidéo', 'Guadeloupe',
  'structures', 'médiathèque', 'centre social', 'école', 'CCAS', 'SESSAD', 'IME',
])
doc.setCreator('PXLC — pxlc.fr')
doc.setProducer('PXLC — pxlc.fr')
doc.setLanguage('fr-FR')
doc.setModificationDate(new Date())
fs.writeFileSync(PDF_TMP, await doc.save())

fs.renameSync(PDF_TMP, PDF_OUT)
console.log(`✓ PDF exporté → ${PDF_OUT}`)
