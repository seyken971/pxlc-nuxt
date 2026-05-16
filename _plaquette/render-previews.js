const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.resolve(__dirname, 'plaquette.html');
const HTML_FILE = 'file://' + HTML_PATH.replace(/\\/g, '/');
const OUT_DIR = path.resolve(__dirname, '.previews');
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(HTML_FILE, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const pages = await page.$$('section.page');
  console.log('Found ' + pages.length + ' pages.');
  for (let i = 0; i < pages.length; i++) {
    const out = path.join(OUT_DIR, 'page-' + String(i + 1).padStart(2, '0') + '.png');
    await pages[i].screenshot({ path: out, type: 'png' });
    console.log('  -> ' + out);
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
