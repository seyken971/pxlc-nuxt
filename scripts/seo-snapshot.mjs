#!/usr/bin/env node
/**
 * Snapshot de la surface SEO d'un build statique — un JSON par route
 * (canonical, title, metas, og/twitter, JSON-LD trié) + sitemap.json +
 * robots.txt. Sert de référence de non-régression pour la migration :
 * on capture la sortie Nuxt (baseline), puis on diffe la sortie Astro
 * contre elle avec `git diff --no-index`.
 *
 *   node scripts/seo-snapshot.mjs [buildDir] [outDir]
 *   node scripts/seo-snapshot.mjs dist docs/seo-current
 */
import { readFile, readdir, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { JSDOM } from 'jsdom'

const BUILD_DIR = process.argv[2] || 'dist'
const OUT_DIR = process.argv[3] || 'docs/seo-baseline'

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
        return sortDeep(JSON.parse(s.textContent))
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

const snapshotSitemap = async (buildDir) => {
  const path = join(buildDir, 'sitemap.xml')
  if (!existsSync(path)) return null
  const xml = await readFile(path, 'utf8')
  const dom = new JSDOM(xml, { contentType: 'text/xml' })
  const doc = dom.window.document
  const urls = [...doc.getElementsByTagName('url')].map((url) => {
    const get = tag => url.getElementsByTagName(tag)[0]?.textContent ?? null
    const images = [...url.getElementsByTagName('image:loc')].map(n => n.textContent)
    return {
      loc: get('loc'),
      ...(get('lastmod') ? { lastmod: get('lastmod') } : {}),
      ...(images.length ? { images } : {}),
    }
  }).sort((a, b) => a.loc.localeCompare(b.loc))
  dom.window.close()
  return urls
}

const routeToFilename = (route) => {
  if (route === '/') return 'index.json'
  return route.replace(/^\/|\/$/g, '').replace(/\//g, '__') + '.json'
}

const main = async () => {
  if (!existsSync(BUILD_DIR)) {
    console.error(`Build introuvable : ${BUILD_DIR} — lancer le build d'abord.`)
    process.exit(2)
  }
  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  const pages = await findHtml(BUILD_DIR)
  for (const path of pages) {
    const rel = relative(BUILD_DIR, path).split(sep).join('/')
    const route = '/' + rel.replace(/index\.html$/, '')
    const snap = await snapshotPage(path)
    await writeFile(
      join(OUT_DIR, routeToFilename(route)),
      JSON.stringify({ route, ...snap }, null, 2) + '\n',
    )
    console.log(`✓ ${route}`)
  }

  const sitemap = await snapshotSitemap(BUILD_DIR)
  if (sitemap) {
    await writeFile(join(OUT_DIR, 'sitemap.json'), JSON.stringify(sitemap, null, 2) + '\n')
    console.log(`✓ sitemap.xml (${sitemap.length} URLs)`)
  }
  else {
    console.warn('⚠ sitemap.xml absent du build')
  }

  const robotsPath = join(BUILD_DIR, 'robots.txt')
  if (existsSync(robotsPath)) {
    await writeFile(join(OUT_DIR, 'robots.txt'), await readFile(robotsPath, 'utf8'))
    console.log('✓ robots.txt')
  }
  else {
    console.warn('⚠ robots.txt absent du build')
  }

  console.log(`\nSnapshot : ${pages.length} routes → ${OUT_DIR}`)
}

main().catch((err) => { console.error(err); process.exit(2) })
