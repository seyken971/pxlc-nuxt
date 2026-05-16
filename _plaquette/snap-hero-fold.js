const puppeteer = require('puppeteer');
const path = require('path');

const VIEWPORTS = [
  { w: 1920, h: 1080, label: '1920x1080' },
  { w: 1440, h: 900,  label: '1440x900' },
  { w: 1366, h: 768,  label: '1366x768' },
  { w: 1280, h: 720,  label: '1280x720' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const v of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: v.w, height: v.h, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluateHandle('document.fonts.ready');

    const info = await page.evaluate(() => {
      const primary = document.querySelector('.hero__actions .btn--primary');
      const r = primary.getBoundingClientRect();
      return { topPx: Math.round(r.top), bottomPx: Math.round(r.bottom), viewportH: window.innerHeight };
    });
    const visible = info.bottomPx <= info.viewportH ? 'OK' : 'CLIPPED';
    console.log(`${v.label}: CTA bottom=${info.bottomPx}px, viewport=${info.viewportH}px → ${visible}`);

    await page.screenshot({ path: path.resolve(__dirname, '.previews', `hero-${v.label}.png`), clip: { x: 0, y: 0, width: v.w, height: v.h } });
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
