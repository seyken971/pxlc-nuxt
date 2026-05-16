const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  // 1. Method card on home — should show corrected pixel-corner (L pointing bottom-right).
  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');
  const methodCard = await page.$('.card--method');
  await methodCard.screenshot({ path: path.resolve(__dirname, '.previews', 'method-card.png') });

  // 2. Mentions légales — full page.
  await page.goto('http://localhost:3941/mentions-legales', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');
  const status = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText,
    proseCount: document.querySelectorAll('.prose h2').length,
  }));
  console.log('mentions-legales:', JSON.stringify(status, null, 2));
  await page.screenshot({ path: path.resolve(__dirname, '.previews', 'mentions-legales-top.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
