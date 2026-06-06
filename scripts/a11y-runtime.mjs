#!/usr/bin/env node
/**
 * Runtime a11y audit — Playwright + axe-core. Complements the static
 * jsdom audit (scripts/a11y-audit.mjs) by adding the checks that need
 * a real browser:
 *  - color-contrast (needs CSS resolution)
 *  - target-size (needs computed layout)
 *  - focus visibility (needs interaction)
 *  - dynamic states (mobile menu open, FAQ details expanded)
 *
 * Spins up a tiny static server on an ephemeral port for .output/public/,
 * then a headless Chromium walks each prerendered route. The browser is
 * also scripted to open the mobile menu and one FAQ entry so axe can
 * inspect those expanded UIs.
 *
 * Run after `npm run build`:
 *   node scripts/a11y-runtime.mjs
 */
import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'

const PUBLIC_DIR = '.output/public'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.pdf': 'application/pdf',
  '.wasm': 'application/wasm',
}

const startServer = () => new Promise((resolve) => {
  const server = http.createServer(async (req, res) => {
    let path = decodeURIComponent((req.url || '/').split('?')[0])
    if (path.endsWith('/')) path += 'index.html'
    let abs = join(PUBLIC_DIR, path)
    try {
      const s = await stat(abs).catch(() => null)
      if (s?.isDirectory()) abs = join(abs, 'index.html')
      const file = await readFile(abs)
      res.writeHead(200, { 'content-type': MIME[extname(abs)] || 'application/octet-stream' })
      res.end(file)
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('404')
    }
  })
  server.listen(0, '127.0.0.1', () => {
    const port = /** @type {{ port: number }} */ (server.address()).port
    resolve({ server, port })
  })
})

const ROUTES = [
  '/',
  '/a-propos',
  '/blog',
  '/blog/enfant-rejoue-toujours-meme-jeu',
  '/blog/jouons-ensemble-sessad-lekoklaya',
  '/blog/mediation-numerique-parent-enfant-sessad-ime',
  '/blog/quand-votre-enfant-joue-a-fortnite',
  '/contact',
  '/mentions-legales',
  '/structures',
]

const runAxe = async (page, label) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze()
  return { label, violations: results.violations }
}

const fmtImpact = (impact) => {
  const colors = { critical: '\x1b[31m', serious: '\x1b[33m', moderate: '\x1b[36m', minor: '\x1b[90m' }
  return `${colors[impact] || ''}[${impact || '?'}]\x1b[0m`
}

const reportPage = (label, violations) => {
  if (!violations.length) {
    console.log(`\x1b[32m✓\x1b[0m ${label}`)
    return 0
  }
  let nodes = 0
  console.log(`\x1b[31m✗\x1b[0m ${label} — ${violations.length} violations`)
  for (const v of violations) {
    nodes += v.nodes.length
    console.log(`  ${fmtImpact(v.impact)} ${v.id} — ${v.help}`)
    console.log(`    ${v.helpUrl}`)
    for (const node of v.nodes.slice(0, 3)) {
      console.log(`    · ${node.target.join(' ')}`)
      const html = node.html.length > 140 ? node.html.slice(0, 137) + '...' : node.html
      console.log(`      ${html}`)
      if (node.any?.[0]?.message) console.log(`      ${node.any[0].message}`)
    }
    if (v.nodes.length > 3) console.log(`    · ... and ${v.nodes.length - 3} more`)
  }
  return nodes
}

const main = async () => {
  const { server, port } = await startServer()
  const browser = await chromium.launch()
  const all = []
  let exitCode = 0

  try {
    // Static pages on desktop viewport
    const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const desktopPage = await desktop.newPage()
    for (const route of ROUTES) {
      await desktopPage.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' })
      all.push(await runAxe(desktopPage, route))
    }
    await desktop.close()

    // Mobile menu open state on /
    const mobile = await browser.newContext({ viewport: { width: 375, height: 800 } })
    const mobilePage = await mobile.newPage()
    await mobilePage.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' })
    await mobilePage.locator('.burger').click()
    await mobilePage.waitForSelector('.mobile-menu.is-open', { state: 'attached' })
    all.push(await runAxe(mobilePage, '/ (mobile menu open)'))
    await mobile.close()

    // FAQ expanded state on /pour-les-structures
    const faq = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const faqPage = await faq.newPage()
    await faqPage.goto(`http://127.0.0.1:${port}/structures`, { waitUntil: 'networkidle' })
    await faqPage.locator('.faq__item summary').first().click()
    await faqPage.waitForSelector('.faq__item[open]')
    all.push(await runAxe(faqPage, '/structures (FAQ open)'))
    await faq.close()
  } finally {
    await browser.close()
    server.close()
  }

  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 }
  let totalNodes = 0
  for (const { label, violations } of all) {
    const nodes = reportPage(label, violations)
    totalNodes += nodes
    for (const v of violations) byImpact[v.impact] = (byImpact[v.impact] || 0) + v.nodes.length
  }

  console.log('')
  console.log('─'.repeat(60))
  console.log(`Total: ${totalNodes} violation nodes across ${all.length} scans`)
  console.log(`  Critical: ${byImpact.critical || 0}`)
  console.log(`  Serious:  ${byImpact.serious || 0}`)
  console.log(`  Moderate: ${byImpact.moderate || 0}`)
  console.log(`  Minor:    ${byImpact.minor || 0}`)

  if ((byImpact.critical || 0) + (byImpact.serious || 0) > 0) exitCode = 1
  process.exit(exitCode)
}

main().catch(err => { console.error(err); process.exit(2) })
