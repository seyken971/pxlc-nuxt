#!/usr/bin/env node
/**
 * Substitue le placeholder __CSP_SCRIPT_HASHES__ de la meta
 * Content-Security-Policy par les sha256 des scripts inline de chaque page —
 * remplace nuxt-security (ssg.hashScripts). À lancer en post-build, après
 * generate-og (dernier réécrivain du HTML).
 *
 *   node scripts/csp-hash.mjs [buildDir]
 */
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const BUILD_DIR = process.argv[2] || 'dist'
const PLACEHOLDER = '__CSP_SCRIPT_HASHES__'

const findHtml = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await findHtml(p))
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(p)
  }
  return out
}

const main = async () => {
  let pages = 0
  let missing = 0
  for (const path of await findHtml(BUILD_DIR)) {
    const html = await readFile(path, 'utf8')
    if (!html.includes(PLACEHOLDER)) { missing++; continue }

    // Scripts inline uniquement (pas d'attribut src) — le contenu exact entre
    // les balises est haché tel qu'il apparaît dans le HTML servi.
    const hashes = []
    for (const m of html.matchAll(/<script(?<attrs>[^>]*)>(?<body>[\s\S]*?)<\/script>/g)) {
      if (/\bsrc\s*=/.test(m.groups.attrs)) continue
      if (!m.groups.body) continue
      const digest = createHash('sha256').update(m.groups.body, 'utf8').digest('base64')
      const source = `'sha256-${digest}'`
      if (!hashes.includes(source)) hashes.push(source)
    }

    await writeFile(path, html.replace(PLACEHOLDER, hashes.join(' ')))
    pages++
  }
  console.log(`CSP : hashes substitués sur ${pages} pages (${missing} sans placeholder)`)
}

main().catch((err) => { console.error(err); process.exit(2) })
