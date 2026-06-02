#!/usr/bin/env node
/**
 * scripts/validate-content.mjs
 * Valide le frontmatter YAML de tous les articles @nuxt/content.
 *
 * Vérifie que chaque .md dans content/ possède les champs requis.
 * Quitte avec code 1 si un champ est manquant (bloque le build).
 *
 * Usage :
 *   node scripts/validate-content.mjs
 *   npm run validate-content
 */
import { readFile, readdir } from 'node:fs/promises'
import { join, relative }   from 'node:path'
import { fileURLToPath }    from 'node:url'

const ROOT     = new URL('..', import.meta.url)
const CONTENT  = fileURLToPath(new URL('content', ROOT))
const REQUIRED = ['title', 'description', 'date']

/** Extrait le bloc frontmatter YAML entre les délimiteurs --- */
function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return null
  const fm = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+)\s*:\s*(.+)/)
    if (kv) fm[kv[1].trim()] = kv[2].trim()
  }
  return fm
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.name.endsWith('.md')) yield full
  }
}

let errors = 0

for await (const file of walk(CONTENT)) {
  const src  = await readFile(file, 'utf8')
  const fm   = parseFrontmatter(src)
  const rel  = relative(fileURLToPath(ROOT), file)

  if (!fm) {
    console.error(`✗ ${rel} — frontmatter manquant`)
    errors++
    continue
  }

  const missing = REQUIRED.filter(k => !fm[k] || fm[k] === '')
  if (missing.length) {
    console.error(`✗ ${rel} — champs manquants : ${missing.join(', ')}`)
    errors++
  }
}

if (errors > 0) {
  console.error(`\n${errors} fichier(s) avec frontmatter invalide. Build annulé.`)
  process.exit(1)
}

console.log(`✓ validate-content — ${errors === 0 ? 'tous les articles sont valides' : ''}`)
