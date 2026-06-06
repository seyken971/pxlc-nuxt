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

  await page.pdf({
    path: PDF_TMP,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
} finally {
  await browser.close()
}
fs.renameSync(PDF_TMP, PDF_OUT)
console.log(`✓ PDF exporté → ${PDF_OUT}`)
