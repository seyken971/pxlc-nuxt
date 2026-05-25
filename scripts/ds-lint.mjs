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
 */
import { readFile, readdir } from 'node:fs/promises'
import { join, relative }   from 'node:path'

const ROOT      = process.cwd()
const SCAN_DIRS = ['app/components', 'app/pages', 'app/layouts']

// ── Vocabulaire interdit ───────────────────────────────────────────────────────
const FORBIDDEN = [
  'addiction', 'désintoxication', 'détox numérique', 'détox',
  'coach', 'expert', 'innovant', 'révolutionnaire',
]

// ── File walker ───────────────────────────────────────────────────────────────
async function walk(dir) {
  const files = []
  let entries
  try { entries = await readdir(dir, { withFileTypes: true }) }
  catch { return files }
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory())              files.push(...await walk(full))
    else if (e.name.endsWith('.vue')) files.push(full)
  }
  return files
}

// ── SFC parser ────────────────────────────────────────────────────────────────
function parseSfc(src) {
  return {
    template: src.match(/<template[^>]*>([\s\S]*?)<\/template>/)?.[1] ?? '',
    style:    src.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1]    ?? '',
  }
}

/** Retire les blocs commentaires CSS pour ne pas signaler du code commenté. */
function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')
}

/** Numéro de ligne (1-based) de l'index idx dans src. */
function lineAt(src, idx) {
  return src.slice(0, idx).split('\n').length
}

// ── Règles <style> ────────────────────────────────────────────────────────────
function lintStyle(raw, file) {
  const vs  = []
  const css = stripCssComments(raw)

  const flag = (re, rule, msg) => {
    for (const m of css.matchAll(re))
      vs.push({ file, rule, line: lineAt(raw, m.index), detail: msg(m) })
  }

  // R1 — Hex brut
  flag(
    /#[0-9A-Fa-f]{3,8}\b/g,
    'hex-brut',
    m => `${m[0]} → utiliser un token CSS var(--pxlc-*) ou sémantique`,
  )

  // R2 — Gradient
  flag(
    /(repeating-)?(linear|radial)-gradient/g,
    'gradient',
    m => `${m[0]}(...) → les gradients sont interdits par le DS`,
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

// ── Main ──────────────────────────────────────────────────────────────────────
const main = async () => {
  const allFiles = (
    await Promise.all(SCAN_DIRS.map(d => walk(join(ROOT, d))))
  ).flat()

  const all = []
  await Promise.all(allFiles.map(async file => {
    const src            = await readFile(file, 'utf8')
    const { template, style } = parseSfc(src)
    all.push(...lintStyle(style, file), ...lintTemplate(template, file))
  }))

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
