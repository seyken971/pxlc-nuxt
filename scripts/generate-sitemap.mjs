#!/usr/bin/env node
/**
 * Génère dist/sitemap.xml après le build Astro : URLs prérendues avec slash
 * final, pages noindex exclues, <lastmod> tamponné à la date du build (signal
 * de fraîcheur pour le recrawl), <image:image> découvertes depuis les <img>
 * du HTML de chaque page.
 *
 *   node scripts/generate-sitemap.mjs [buildDir]
 */
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import { JSDOM } from 'jsdom'

const BUILD_DIR = process.argv[2] || 'dist'
const SITE_URL = 'https://pxlc.fr'

const findHtml = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await findHtml(p))
    else if (entry.isFile() && entry.name === 'index.html') out.push(p)
  }
  return out
}

const escapeXml = s => s
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const main = async () => {
  // Précision à la seconde, format « 2026-08-13T18:21:46Z » comme l'ancien module.
  const lastmod = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')

  const entries = []
  for (const path of await findHtml(BUILD_DIR)) {
    const rel = relative(BUILD_DIR, path).split(sep).join('/')
    const route = '/' + rel.replace(/index\.html$/, '')
    const html = await readFile(path, 'utf8')
    const dom = new JSDOM(html)
    const doc = dom.window.document

    const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') ?? ''
    if (robots.includes('noindex')) { dom.window.close(); continue }

    const images = [...new Set(
      [...doc.querySelectorAll('img[src]')]
        .map(img => img.getAttribute('src'))
        .filter(src => src && !src.startsWith('data:'))
        .map(src => src.startsWith('http') ? src : `${SITE_URL}${src}`),
    )]
    dom.window.close()

    entries.push({ loc: `${SITE_URL}${route}`, images })
  }

  entries.sort((a, b) => a.loc.localeCompare(b.loc))

  const urls = entries.map(({ loc, images }) => {
    const imageXml = images.map(img =>
      `        <image:image>\n            <image:loc>${escapeXml(img)}</image:loc>\n        </image:image>`,
    ).join('\n')
    return `    <url>\n        <loc>${escapeXml(loc)}</loc>\n        <lastmod>${lastmod}</lastmod>${imageXml ? '\n' + imageXml : ''}\n    </url>`
  }).join('\n')

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls
    + '\n</urlset>\n'

  await writeFile(join(BUILD_DIR, 'sitemap.xml'), xml)
  console.log(`sitemap.xml : ${entries.length} URLs (lastmod ${lastmod})`)
}

main().catch((err) => { console.error(err); process.exit(2) })
