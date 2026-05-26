#!/usr/bin/env node
/**
 * generate-html.js — Génère plaquette.html depuis plaquette.template.html + data.json
 *
 * Usage :
 *   node generate-html.js
 *
 * Tokens dans le template : {{section.clé}} (notation pointée, profondeur arbitraire)
 * Toutes les valeurs variables sont dans data.json — ne jamais éditer plaquette.html à la main.
 *
 * CONTRAT DES VALEURS data.json :
 *   - Les valeurs sont injectées VERBATIM dans le HTML (pas d'échappement).
 *   - Les entités HTML (&nbsp; &amp; &lt;) doivent être écrites telles quelles dans le JSON.
 *   - Les balises HTML (<strong>, <em>) sont autorisées dans les valeurs, intentionnellement.
 *   - Conséquence : un & littéral dans une valeur doit être écrit &amp; (ex: "SESSAD &amp; IME").
 *   - Une valeur null ou undefined est traitée comme un token manquant → exit 1.
 */

const fs   = require('fs')
const path = require('path')

const TEMPLATE = path.resolve(__dirname, 'plaquette.template.html')
const DATA     = path.resolve(__dirname, 'data.json')
const OUTPUT   = path.resolve(__dirname, 'plaquette.html')

function resolve(obj, key) {
  return key.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj)
}

const data     = JSON.parse(fs.readFileSync(DATA, 'utf8'))
const template = fs.readFileSync(TEMPLATE, 'utf8')

const missing = []
const result = template.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
  const val = resolve(data, key)
  if (val === undefined || val === null) { missing.push(key); return match }
  return val
})

if (missing.length) {
  console.error('✗ Tokens non résolus dans data.json :')
  missing.forEach(k => console.error(`  · {{${k}}}`))
  process.exit(1)
}

fs.writeFileSync(OUTPUT, result, 'utf8')
console.log(`✓ plaquette.html généré (${Object.keys(data).length} sections, 0 token manquant)`)
