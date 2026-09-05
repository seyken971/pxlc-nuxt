#!/usr/bin/env node
/**
 * Snapshot de la surface SEO d'un build statique — un JSON par route
 * (canonical, title, metas, og/twitter, JSON-LD trié) + sitemap.json +
 * robots.txt. Référence de non-régression : docs/seo-baseline est comparée
 * au build par scripts/seo-check.mjs (postbuild).
 *
 * N'est capturé que ce qui est du SEO. Sont ignorés, parce qu'ils bougent
 * sans que le SEO change :
 *   - la meta CSP (hashes des scripts et styles inline) ;
 *   - dateModified dans le JSON-LD et lastmod du sitemap (dérivés du dernier
 *     commit, donc décalés par chaque fusion en squash).
 *
 *   node scripts/seo-snapshot.mjs [buildDir] [outDir]
 *   npm run seo:accept   → dist vers docs/seo-baseline
 */
import { readFile, readdir, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

const IGNORED_METAS = new Set(['http-equiv:content-security-policy'])
const IGNORED_JSONLD_KEYS = new Set(['dateModified'])

// Tri récursif des clés d'objet pour des diffs stables.
const sortDeep = (value) => {
  if (Array.isArray(value)) return value.map(sortDeep)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).sort().map(k => [k, sortDeep(value[k])]),
    )
  }
  return value
}

// Retrait récursif des clés hors SEO du JSON-LD (dateModified…).
const stripKeys = (value) => {
  if (Array.isArray(value)) return value.map(stripKeys)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([k]) => !IGNORED_JSONLD_KEYS.has(k))
        .map(([k, v]) => [k, stripKeys(v)]),
    )
  }
  return value
}

const findHtml = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await findHtml(p))
    else if (entry.isFile() && entry.name === 'index.html') out.push(p)
  }
  return out
}

const snapshotPage = async (path) => {
  const html = await readFile(path, 'utf8')
  const dom = new JSDOM(html)
  const doc = dom.window.document

  const metas = {}
  for (const meta of doc.querySelectorAll('meta[name], meta[property], meta[http-equiv]')) {
    const key = meta.getAttribute('name') || meta.getAttribute('property') || `http-equiv:${meta.getAttribute('http-equiv')}`
    if (IGNORED_METAS.has(key)) continue
    const content = meta.getAttribute('content') ?? ''
    // Une clé peut être répétée (ex : theme-color par media query).
    if (key in metas) {
      metas[key] = [].concat(metas[key], content)
    }
    else {
      metas[key] = content
    }
  }

  const links = {}
  for (const rel of ['canonical', 'alternate']) {
    const nodes = [...doc.querySelectorAll(`link[rel="${rel}"]`)]
    if (nodes.length) {
      links[rel] = nodes.map(l => ({
        href: l.getAttribute('href'),
        ...(l.getAttribute('hreflang') ? { hreflang: l.getAttribute('hreflang') } : {}),
        ...(l.getAttribute('type') ? { type: l.getAttribute('type') } : {}),
      }))
    }
  }

  const jsonLd = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => {
      try {
        return stripKeys(sortDeep(JSON.parse(s.textContent)))
      }
      catch {
        return { __parseError: s.textContent.slice(0, 200) }
      }
    })

  dom.window.close()

  return {
    title: doc.title,
    lang: doc.documentElement.getAttribute('lang'),
    links,
    metas: sortDeep(metas),
    jsonLd,
  }
}

// @astrojs/sitemap émet un index (sitemap-index.xml) qui pointe vers un ou
// plusieurs fichiers d'URLs (sitemap-0.xml…) — on agrège tous les segments.
// Seul <loc> compte : <lastmod> suit le dernier commit de la page.
const snapshotSitemap = async (buildDir) => {
  const segments = (await readdir(buildDir))
    .filter(name => /^sitemap-\d+\.xml$/.test(name))
    .sort()
  if (!segments.length) return null

  const urls = []
  for (const name of segments) {
    const xml = await readFile(join(buildDir, name), 'utf8')
    const dom = new JSDOM(xml, { contentType: 'text/xml' })
    const doc = dom.window.document
    for (const url of doc.getElementsByTagName('url')) {
      urls.push({ loc: url.getElementsByTagName('loc')[0]?.textContent ?? null })
    }
    dom.window.close()
  }
  return urls.sort((a, b) => a.loc.localeCompare(b.loc))
}

const routeToFilename = (route) => {
  if (route === '/') return 'index.json'
  return route.replace(/^\/|\/$/g, '').replace(/\//g, '__') + '.json'
}

/**
 * Capture la surface SEO de buildDir dans outDir (vidé au préalable).
 * Réutilisée par seo-check.mjs ; `quiet` coupe le détail par route.
 */
export const snapshot = async (buildDir, outDir, { quiet = false } = {}) => {
  const log = quiet ? () => {} : console.log
  if (!existsSync(buildDir)) {
    throw new Error(`Build introuvable : ${buildDir} — lancer le build d'abord.`)
  }
  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })

  const pages = await findHtml(buildDir)
  for (const path of pages) {
    const rel = relative(buildDir, path).split(sep).join('/')
    const route = '/' + rel.replace(/index\.html$/, '')
    const snap = await snapshotPage(path)
    await writeFile(
      join(outDir, routeToFilename(route)),
      JSON.stringify({ route, ...snap }, null, 2) + '\n',
    )
    log(`✓ ${route}`)
  }

  const sitemap = await snapshotSitemap(buildDir)
  if (sitemap) {
    await writeFile(join(outDir, 'sitemap.json'), JSON.stringify(sitemap, null, 2) + '\n')
    log(`✓ sitemap-index.xml (${sitemap.length} URLs)`)
  }
  else {
    console.warn('⚠ sitemap absent du build')
  }

  const robotsPath = join(buildDir, 'robots.txt')
  if (existsSync(robotsPath)) {
    await writeFile(join(outDir, 'robots.txt'), await readFile(robotsPath, 'utf8'))
    log('✓ robots.txt')
  }
  else {
    console.warn('⚠ robots.txt absent du build')
  }

  log(`\nSnapshot : ${pages.length} routes → ${outDir}`)
  return pages.length
}

// Exécution directe (npm run seo:accept) — pas à l'import depuis seo-check.
const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isCli) {
  snapshot(process.argv[2] || 'dist', process.argv[3] || 'docs/seo-baseline')
    .catch((err) => { console.error(err.message ?? err); process.exit(2) })
}
