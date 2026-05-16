const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.resolve(__dirname, '.previews');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function snap(prefersDark, label) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  // Force the OS-level color scheme media query.
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: prefersDark ? 'dark' : 'light' }]);

  // Desktop snapshot first.
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');

  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log(`prefers-color-scheme=${prefersDark ? 'dark' : 'light'} → data-theme=${theme}`);

  await page.screenshot({ path: path.join(OUT_DIR, `theme-${label}-desktop.png`), clip: { x: 0, y: 0, width: 1280, height: 900 } });

  // Mobile snapshot + open the menu.
  await page.setViewport({ width: 414, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: path.join(OUT_DIR, `theme-${label}-mobile-closed.png`) });

  await page.click('.burger');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, `theme-${label}-mobile-open.png`) });

  await browser.close();
}

(async () => {
  await snap(false, 'light-pref');
  await snap(true, 'dark-pref');
})().catch((e) => { console.error(e); process.exit(1); });
