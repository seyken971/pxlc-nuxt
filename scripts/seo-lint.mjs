#!/usr/bin/env node
/**
 * scripts/seo-lint.mjs
 * Invariants SEO du build statique — le build échoue s'ils sont violés.
 * Complète seo-check (non-régression : « rien n'a bougé ») par des règles
 * absolues (« c'est correct »), reprises du guide SEO Astro de Joost de Valk
 * (validations à la compilation de son intégration seoGraph) :
 *
 *  - un seul <h1> par page ;
 *  - title et meta description uniques sur tout le site ;
 *  - toute <img> porte un attribut alt (vide autorisé : image décorative) ;
 *  - une page noindex n'apparaît pas dans le sitemap.
 *
 * Les pages de redirection (meta refresh) et la 404 sont hors périmètre.
 *
 *   node scripts/seo-lint.mjs [buildDir]
 */
import { readFile, readdir } from 'node:fs/promises'
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

const sitemapUrls = async () => {
  const urls = new Set()
  for (const name of (await readdir(BUILD_DIR)).filter(n => /^sitemap-\d+\.xml$/.test(n))) {
    const xml = await readFile(join(BUILD_DIR, name), 'utf8')
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(new URL(m[1]).pathname)
  }
  return urls
}

const main = async () => {
  const errors = []
  const titles = new Map()
  const descriptions = new Map()
  const inSitemap = await sitemapUrls()
  let checked = 0

  for (const path of await findHtml(BUILD_DIR)) {
    const rel = relative(BUILD_DIR, path).split(sep).join('/')
    const route = '/' + rel.replace(/index\.html$/, '')
    const html = await readFile(path, 'utf8')
    if (/http-equiv="refresh"/i.test(html)) continue
    const dom = new JSDOM(html)
    const doc = dom.window.document

    const h1 = doc.querySelectorAll('h1').length
    if (h1 !== 1) errors.push(`${route} : ${h1} <h1>, un seul attendu`)

    for (const img of doc.querySelectorAll('img')) {
      if (!img.hasAttribute('alt')) errors.push(`${route} : <img src="${img.getAttribute('src')}"> sans attribut alt`)
    }

    const title = doc.title.trim()
    const description = doc.querySelector('meta[name="description"]')?.content?.trim() ?? ''
    if (titles.has(title)) errors.push(`${route} : title identique à ${titles.get(title)} — « ${title} »`)
    else titles.set(title, route)
    if (description) {
      if (descriptions.has(description)) errors.push(`${route} : meta description identique à ${descriptions.get(description)}`)
      else descriptions.set(description, route)
    }

    const robots = doc.querySelector('meta[name="robots"]')?.content ?? ''
    if (/noindex/i.test(robots) && inSitemap.has(route)) errors.push(`${route} : noindex mais présente dans le sitemap`)

    dom.window.close()
    checked += 1
  }

  if (errors.length) {
    console.error('\nseo-lint — invariants SEO violés\n')
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error(`\n  ${errors.length} problème(s) — corrige avant de déployer.\n`)
    process.exit(1)
  }
  console.log(`seo-lint: ✓ h1 unique, titles et descriptions uniques, alt présents sur ${checked} pages`)
}

main().catch((err) => { console.error(err); process.exit(2) })
