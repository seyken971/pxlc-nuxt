'use strict'
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const OUT_DIR = path.resolve(__dirname, 'out')
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const BANNERS = [
  { name: 'linkedin', file: 'linkedin.html', w: 1584, h: 396 },
  { name: 'twitter',  file: 'twitter.html',  w: 1500, h: 500 },
  { name: 'bluesky',  file: 'bluesky.html',  w: 3000, h: 1000 },
]

;(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const b of BANNERS) {
    const page = await browser.newPage()
    await page.setViewport({ width: b.w, height: b.h, deviceScaleFactor: 1 })

    // file:/// prefix with forward slashes for cross-platform compatibility
    const filePath = 'file:///' + path.resolve(__dirname, b.file).replace(/\\/g, '/')
    await page.goto(filePath, { waitUntil: 'networkidle0' })
    await page.evaluateHandle('document.fonts.ready')

    const outPath = path.resolve(OUT_DIR, `${b.name}.png`)
    await page.screenshot({
      path: outPath,
      type: 'png',
      clip: { x: 0, y: 0, width: b.w, height: b.h },
    })
    await page.close()
    console.log(`✓ ${b.name}.png  (${b.w}×${b.h})  →  ${outPath}`)
  }

  await browser.close()
})()
