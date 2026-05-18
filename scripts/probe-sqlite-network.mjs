#!/usr/bin/env node
/**
 * Drives a Playwright Chromium through a realistic blog navigation
 * (/blog → article → another article → back to /blog) and captures every
 * network request. Reports whether the @nuxt/content client SQLite WASM
 * gets downloaded along the way.
 *
 * Decision-grade telemetry for: "is the 1.7 MB sqlite3 WASM in
 * .output/public/_nuxt actually pulled by real users navigating the
 * site, or is it dead weight on disk only?"
 *
 * Run after `npm run build`:
 *   node scripts/probe-sqlite-network.mjs
 */
import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { chromium } from 'playwright'

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
  '.woff2': 'font/woff2',
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
    resolve({ server, port: server.address().port })
  })
})

const main = async () => {
  const { server, port } = await startServer()
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  const requests = []
  page.on('request', req => {
    requests.push({ url: req.url(), method: req.method() })
  })

  const base = `http://127.0.0.1:${port}`

  try {
    // Realistic navigation: land on blog index, open an article via
    // client-side NuxtLink, hop to another article, hop back. Mirrors
    // what a reader actually does.
    console.log('1. Visit /blog')
    await page.goto(`${base}/blog`, { waitUntil: 'networkidle' })

    console.log('2. Click first blog card (client-side nav)')
    await page.locator('a.blog-card').first().click()
    await page.waitForLoadState('networkidle')

    console.log('3. Click first BlogRelated link (client-side nav)')
    const relatedLink = page.locator('.blog-related a').first()
    if (await relatedLink.count() > 0) {
      await relatedLink.click()
      await page.waitForLoadState('networkidle')
    } else {
      console.log('   (no related posts surfaced)')
    }

    console.log('4. Back to /blog (NuxtLink in <Breadcrumb>)')
    const breadcrumbBlog = page.locator('.breadcrumb a[href="/blog"]').first()
    if (await breadcrumbBlog.count() > 0) {
      await breadcrumbBlog.click()
      await page.waitForLoadState('networkidle')
    }
  } finally {
    await browser.close()
    server.close()
  }

  const sqliteHits = requests.filter(r =>
    r.url.includes('sqlite') ||
    r.url.includes('wa-sqlite') ||
    r.url.endsWith('.wasm'),
  )

  console.log('')
  console.log('─'.repeat(60))
  console.log(`Total requests:      ${requests.length}`)
  console.log(`SQLite/WASM-related: ${sqliteHits.length}`)
  if (sqliteHits.length) {
    console.log('')
    console.log('SQLite/WASM URLs requested:')
    for (const h of sqliteHits) console.log(`  ${h.method} ${h.url}`)
  } else {
    console.log('')
    console.log('✓ The SQLite WASM was NOT downloaded during this navigation.')
    console.log('  @nuxt/content client adapter is dead at runtime for these')
    console.log('  routes — the .wasm file in .output/public is disk-only.')
  }

  process.exit(0)
}

main().catch(err => { console.error(err); process.exit(2) })
