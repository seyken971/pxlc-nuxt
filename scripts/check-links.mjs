#!/usr/bin/env node
/**
 * Vérifie les liens internes du build statique — remplace nuxt-link-checker
 * (le build échoue sur lien mort). Pour chaque page de dist :
 *
 *  - tout href interne doit résoudre vers un fichier émis (page/, asset) ;
 *  - toute page interne doit porter le slash final (parité canonical
 *    GitHub Pages — la forme sans slash 301-redirige) ;
 *  - les ancres #fragment vers une page interne doivent exister dans la cible.
 *
 *   node scripts/check-links.mjs [buildDir]
 */
import { readFile, readdir, stat } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { JSDOM } from 'jsdom'

const BUILD_DIR = process.argv[2] || 'dist'

const findHtml = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await findHtml(p))
    else if (entry.isFile() && entry.name === 'index.html') out.push(p)
  }
  return out
}

const exists = async (path) => {
  try { await stat(path); return true }
  catch { return false }
}

const main = async () => {
  const pages = await findHtml(BUILD_DIR)
  const idsByRoute = new Map()
  const linksByPage = []

  for (const path of pages) {
    const rel = relative(BUILD_DIR, path).split(sep).join('/')
    const route = '/' + rel.replace(/index\.html$/, '')
    const dom = new JSDOM(await readFile(path, 'utf8'))
    const doc = dom.window.document
    idsByRoute.set(route, new Set([...doc.querySelectorAll('[id]')].map(el => el.id)))
    linksByPage.push({
      route,
      hrefs: [...doc.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
    })
    dom.window.close()
  }

  const errors = []
  for (const { route, hrefs } of linksByPage) {
    for (const href of hrefs) {
      // Externes, mailto/tel et ancres locales : hors périmètre.
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue

      const [pathname, fragment] = href.split('#')

      if (/\.[a-z0-9]+$/i.test(pathname)) {
        // Asset (PDF, image…) — le fichier doit exister.
        if (!await exists(join(BUILD_DIR, ...pathname.split('/').filter(Boolean)))) {
          errors.push(`${route} → ${href} : fichier introuvable`)
        }
        continue
      }

      if (!pathname.endsWith('/')) {
        errors.push(`${route} → ${href} : slash final manquant (parité canonical GitHub Pages)`)
        continue
      }
      if (!idsByRoute.has(pathname)) {
        errors.push(`${route} → ${href} : page interne inexistante`)
        continue
      }
      if (fragment && !idsByRoute.get(pathname).has(fragment)) {
        errors.push(`${route} → ${href} : ancre #${fragment} absente de la cible`)
      }
    }
  }

  if (errors.length) {
    console.error('\ncheck-links — liens internes cassés\n')
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error(`\n  ${errors.length} lien(s) — corrige avant de déployer.\n`)
    process.exit(1)
  }
  console.log(`check-links: ✓ liens internes valides sur ${pages.length} pages`)
}

main().catch((err) => { console.error(err); process.exit(2) })
