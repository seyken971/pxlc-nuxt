#!/usr/bin/env node
/**
 * export-pdf.mjs — Génère plaquette-pxlc.pdf depuis plaquette.html
 *
 * Usage :
 *   node _plaquette/export-pdf.mjs
 *   node _plaquette/export-pdf.mjs --fiche "_plaquette/Fiche Projet Jouons Ensemble - 2026.md"
 *
 * Enchaîne : generate-html.js → Puppeteer PDF → public/files/plaquette-pxlc.pdf
 */

import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const HTML_PATH = path.join(__dirname, 'plaquette.html')
const PDF_OUT   = path.join(ROOT, 'public', 'files', 'plaquette-pxlc.pdf')

// ── 1. Générer plaquette.html ─────────────────────────────────────────────────

const generateArgs = ['generate-html.js']
const ficheIdx = process.argv.indexOf('--fiche')
if (ficheIdx !== -1) {
  // Résoudre depuis le CWD de l'appelant (racine projet), pas depuis __dirname
  const absFiche = path.resolve(process.cwd(), process.argv[ficheIdx + 1])
  generateArgs.push('--fiche', absFiche)
}

console.log('→ Génération HTML…')
execFileSync(process.execPath, generateArgs, { cwd: __dirname, stdio: 'inherit' })

// ── 2. Lancer Puppeteer ───────────────────────────────────────────────────────

const require = createRequire(import.meta.url)
const puppeteer = require('puppeteer')

console.log('→ Export PDF…')
const browser = await puppeteer.launch({ headless: true })
const page    = await browser.newPage()

await page.goto(`file://${HTML_PATH.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 })

await page.pdf({
  path: PDF_OUT,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
})

await browser.close()
console.log(`✓ PDF exporté → ${PDF_OUT}`)
