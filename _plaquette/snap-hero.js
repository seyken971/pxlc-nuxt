const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');

  // Inspect what font is actually used on the title.
  const info = await page.evaluate(() => {
    const el = document.querySelector('.hero__title');
    const cs = getComputedStyle(el);
    const loaded = [];
    document.fonts.forEach((f) => loaded.push({ family: f.family, weight: f.weight, status: f.status }));
    return {
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      fontSize: cs.fontSize,
      letterSpacing: cs.letterSpacing,
      textRendering: cs.textRendering,
      fontFeatureSettings: cs.fontFeatureSettings,
      fontVariationSettings: cs.fontVariationSettings,
      loaded,
    };
  });
  console.log(JSON.stringify(info, null, 2));

  const hero = await page.$('.hero__title');
  const out = path.resolve(__dirname, '.previews', 'hero-current.png');
  await hero.screenshot({ path: out });
  console.log('Saved', out);

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
