#!/usr/bin/env node
/**
 * scripts/ds-lint.mjs
 * Design-system compliance linter.
 *
 * Scanne app/components, app/pages, app/layouts à la recherche
 * de violations du design system PXLC et quitte avec code 1
 * (build annulé) si au moins une violation est trouvée.
 *
 * Usage :
 *   node scripts/ds-lint.mjs
 *   npm run ds-lint
 *
 * Règles :
 *   R1 hex-brut       — #RRGGBB / #RGB dans <style> → utiliser var(--pxlc-*)
 *   R2 gradient       — linear/radial-gradient interdits
 *   R3 font-famille   — "Sora", "DM Sans", "JetBrains Mono" hardcodés
 *   R4 radius-brut    — border-radius > 2 px sans var(--radius-*)
 *   R5 vocab-interdit — termes bannis dans <template>
 *   R6 emoji          — emoji interdits dans <template>
 *   R7 seo-longueur   — title/description useSeoMeta trop longs (pages)
 *                       et site.description de nuxt.config.ts
 *
 * Corrections v2 :
 *   - parseSfc : tous les blocs <style> sont capturés (matchAll, pas match)
 *   - lintStyle : regexes sur raw — m.index == position réelle → lineAt correct
 *   - R1 : sélecteurs CSS id ignorés (# sans ':' sur la même ligne)
 *   - walk : seul ENOENT est swallowé — les autres erreurs fs sont propagées
 *   - FORBIDDEN : 'détox' supprimé (sous-ensemble de 'détox numérique')
 */
import { readFile, readdir } from 'node:fs/promises'
import { join, relative }   from 'node:path'
import { SEO_TITLE_MAX, SEO_DESC_MAX } from './seo-limits.mjs'

const ROOT      = process.cwd()
const SCAN_DIRS = ['app/components', 'app/pages', 'app/layouts']

// ── Vocabulaire interdit ───────────────────────────────────────────────────────
// Classé du plus long au plus court pour éviter les faux-positifs en cas de
// sous-chaînes (ex. 'détox' ⊂ 'détox numérique' — on ne garde que le composé).
const FORBIDDEN = [
  'addiction', 'désintoxication', 'détox numérique',
  'coach', 'expert', 'innovant', 'révolutionnaire',
]

// ── File walker ───────────────────────────────────────────────────────────────
async function walk(dir) {
  const files = []
  let entries
  try { entries = await readdir(dir, { withFileTypes: true }) }
  catch (err) {
    // ENOENT = répertoire absent (ex. app/layouts inexistant) → OK, on skip.
    // Toute autre erreur (EACCES, EPERM…) est propagée pour ne pas masquer
    // un problème de permissions qui donnerait un faux ✓.
    if (err.code !== 'ENOENT') throw err
    return files
  }
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory())              files.push(...await walk(full))
    else if (e.name.endsWith('.vue')) files.push(full)
  }
  return files
}

// ── SFC parser ────────────────────────────────────────────────────────────────
function parseSfc(src) {
  // matchAll (avec g) capture TOUS les blocs <style> et <style scoped>.
  // Les blocs sont concaténés : les numéros de ligne restent cohérents
  // au sein de chaque bloc, avec un décalage d'une ligne entre blocs.
  const styleBlocks = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map(m => m[1])
  return {
    template: src.match(/<template[^>]*>([\s\S]*?)<\/template>/)?.[1] ?? '',
    style:    styleBlocks.join('\n'),
  }
}

/** Retourne les plages [start, end) de tous les blocs commentaires CSS. */
function commentRanges(css) {
  const ranges = []
  for (const m of css.matchAll(/\/\*[\s\S]*?\*\//g))
    ranges.push([m.index, m.index + m[0].length])
  return ranges
}

/** Retourne true si idx est à l'intérieur d'un bloc commentaire. */
function inComment(idx, ranges) {
  return ranges.some(([s, e]) => idx >= s && idx < e)
}

/** Numéro de ligne (1-based) de l'index idx dans src. */
function lineAt(src, idx) {
  return src.slice(0, idx).split('\n').length
}

// ── Règles <style> ────────────────────────────────────────────────────────────
function lintStyle(raw, file) {
  const vs     = []
  const ranges = commentRanges(raw)

  // Les regexes tournent sur `raw` (pas sur la chaîne stripée) pour que
  // m.index corresponde toujours à la position réelle → lineAt(raw, m.index)
  // est exact. Les correspondances dans des commentaires sont filtrées via
  // inComment() plutôt qu'en supprimant physiquement les commentaires.
  const flag = (re, rule, msg, extra) => {
    for (const m of raw.matchAll(re)) {
      if (inComment(m.index, ranges)) continue
      if (extra && !extra(m))         continue
      vs.push({ file, rule, line: lineAt(raw, m.index), detail: msg(m) })
    }
  }

  // R1 — Hex brut
  // Le filtre `extra` détecte le contexte « valeur de propriété » en cherchant
  // un ':' entre la dernière limite de déclaration ({, }, ;) et le '#'.
  // Couvre à la fois les valeurs sur une seule ligne et les valeurs sur plusieurs
  // lignes (continuation) où le ':' est sur la ligne précédente.
  // Les sélecteurs CSS id (#facade, #abc…) n'ont jamais de ':' entre la
  // limite de déclaration et eux-mêmes → correctement ignorés.
  flag(
    /#[0-9A-Fa-f]{3,8}\b/g,
    'hex-brut',
    m => `${m[0]} → utiliser un token CSS var(--pxlc-*) ou sémantique`,
    m => {
      const before   = raw.slice(0, m.index)
      const boundary = Math.max(
        before.lastIndexOf(';'),
        before.lastIndexOf('{'),
        before.lastIndexOf('}'),
      ) + 1
      return before.slice(boundary).includes(':')
    },
  )

  // R2 — Gradient (linear-gradient et repeating-* interdits ;
  //   radial-gradient autorisé pour les textures type dot-grid)
  flag(
    /(repeating-linear|repeating-radial|linear)-gradient/g,
    'gradient',
    m => `${m[0]}(...) → les gradients linéaires et repeating sont interdits par le DS`,
  )

  // R3 — Font-family hardcodée
  flag(
    /"(Sora|DM Sans|JetBrains Mono)"/g,
    'font-famille-brut',
    m => `${m[0]} → utiliser var(--font-display|body|mono)`,
  )

  // R4 — border-radius hardcodé > 2 px (1 px et 2 px : micro-détails autorisés)
  flag(
    /border-radius\s*:[^\n;]*\b([3-9]\d*|[1-9]\d+)px/g,
    'radius-brut',
    m => `${m[0].trim()} → utiliser var(--radius-xs|sm|md|lg|pill)`,
  )

  return vs
}

// ── Règles <template> ─────────────────────────────────────────────────────────
function lintTemplate(raw, file) {
  const vs    = []
  const lines = raw.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]

    // R5 — Vocabulaire interdit
    for (const word of FORBIDDEN) {
      if (ln.toLowerCase().includes(word))
        vs.push({ file, rule: 'vocab-interdit', line: i + 1,
          detail: `"${word}" → vocabulaire interdit par le DS` })
    }

    // R6 — Emoji (Emoji_Presentation = affiché emoji par défaut ;
    //   exclut ©, ·, ® et autres Extended_Pictographic purement textuels)
    if (/\p{Emoji_Presentation}/u.test(ln))
      vs.push({ file, rule: 'emoji', line: i + 1,
        detail: 'Emoji détecté → les emoji sont interdits par le DS' })
  }

  return vs
}

// ── R7 — Longueurs SEO ────────────────────────────────────────────────────────
// Limites partagées avec content.config.ts et validate-content.mjs
// (scripts/seo-limits.mjs). Seules les valeurs LITTÉRALES sont vérifiées —
// les expressions dynamiques (ex. post.value.seoTitle || …) sont couvertes
// par validate-content côté contenu.
function lintSeoMeta(src, file) {
  const vs = []
  const limits = { title: SEO_TITLE_MAX, description: SEO_DESC_MAX, ogDescription: SEO_DESC_MAX }

  for (const block of src.matchAll(/useSeoMeta\(\s*\{([\s\S]*?)\}\s*\)/g)) {
    const body = block[1]
    const bodyOffset = block.index + block[0].indexOf(body)
    for (const m of body.matchAll(/\b(title|description|ogDescription)\s*:\s*(['"])((?:\\.|(?!\2)[\s\S])*?)\2/g)) {
      const [, key, , value] = m
      const max = limits[key]
      if (value.length > max) {
        const hint = key === 'title'
          ? `le titleTemplate ajoute « · PXLC » → base ≤ ${max}`
          : `limite mobile/cartes sociales ≤ ${max}`
        vs.push({ file, rule: 'seo-longueur', line: lineAt(src, bodyOffset + m.index),
          detail: `${key} de ${value.length} caractères — ${hint}` })
      }
    }
  }
  return vs
}

/** Vérifie site.description de nuxt.config.ts (meta description par défaut). */
async function lintNuxtConfig() {
  const file = join(ROOT, 'nuxt.config.ts')
  let src
  try { src = await readFile(file, 'utf8') }
  catch (err) {
    if (err.code !== 'ENOENT') throw err
    return []
  }
  const m = src.match(/site:\s*\{[\s\S]*?description:\s*(['"])((?:\\.|(?!\1)[\s\S])*?)\1/)
  if (m && m[2].length > SEO_DESC_MAX) {
    return [{ file, rule: 'seo-longueur', line: lineAt(src, m.index),
      detail: `site.description de ${m[2].length} caractères — limite mobile/cartes sociales ≤ ${SEO_DESC_MAX}` }]
  }
  return []
}

// ── Main ──────────────────────────────────────────────────────────────────────
const main = async () => {
  const allFiles = (
    await Promise.all(SCAN_DIRS.map(d => walk(join(ROOT, d))))
  ).flat()

  const all = []
  await Promise.all(allFiles.map(async file => {
    const src = await readFile(file, 'utf8')
    const { template, style } = parseSfc(src)
    all.push(...lintStyle(style, file), ...lintTemplate(template, file), ...lintSeoMeta(src, file))
  }))
  all.push(...await lintNuxtConfig())

  if (!all.length) {
    console.log('ds-lint: ✓ aucune violation DS')
    return
  }

  // Regroupe par fichier
  const byFile = {}
  for (const v of all) (byFile[v.file] ??= []).push(v)

  console.error('\nds-lint — violations DS\n')
  for (const [file, vs] of Object.entries(byFile)) {
    console.error(`  ${relative(ROOT, file)}`)
    for (const { rule, line, detail } of vs.sort((a, b) => a.line - b.line))
      console.error(`    L${String(line).padEnd(4)}  [${rule}]  ${detail}`)
  }
  console.error(`\n  ${all.length} violation(s) — corrige avant de builder.\n`)
  process.exit(1)
}

main().catch(err => { console.error(err); process.exit(2) })
