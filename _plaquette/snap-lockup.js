const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');
  const lockup = await page.$('.site-header .lockup');
  const out = path.resolve(__dirname, '.previews', 'lockup-current.png');
  await lockup.screenshot({ path: out });
  console.log('Saved', out);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
