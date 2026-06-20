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
import { SEO_TITLE_MAX, SEO_DESC_MAX } from './seo-limits.mjs'

const ROOT     = new URL('..', import.meta.url)
const CONTENT  = fileURLToPath(new URL('content', ROOT))
const REQUIRED = ['title', 'description', 'date']

// Anti-troncature SERP : le <title> effectif (seoTitle || title) reçoit le
// suffixe « · PXLC » via le titleTemplate ; la description effective
// (seoDescription || description) doit tenir sous la limite mobile.
// Limites partagées avec content.config.ts et ds-lint.mjs (seo-limits.mjs).

/** Retire les guillemets YAML englobants d'une valeur brute du frontmatter. */
const strip = v => (v || '').replace(/^["']|["']$/g, '')

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

  // Strip AVANT le fallback : `seoTitle: ""` (vide quoté) doit retomber sur
  // title, comme le fait le vrai parser YAML de @nuxt/content au runtime.
  const effTitle = strip(fm.seoTitle) || strip(fm.title)
  const effDesc  = strip(fm.seoDescription) || strip(fm.description)
  if (effTitle.length > SEO_TITLE_MAX) {
    console.error(`✗ ${rel} — title SEO effectif trop long (${effTitle.length} > ${SEO_TITLE_MAX}) : ajouter/raccourcir seoTitle`)
    errors++
  }
  if (effDesc.length > SEO_DESC_MAX) {
    console.error(`✗ ${rel} — description SEO effective trop longue (${effDesc.length} > ${SEO_DESC_MAX}) : ajouter/raccourcir seoDescription`)
    errors++
  }
}

if (errors > 0) {
  console.error(`\n${errors} fichier(s) avec frontmatter invalide. Build annulé.`)
  process.exit(1)
}

console.log('✓ validate-content — tous les articles sont valides')
