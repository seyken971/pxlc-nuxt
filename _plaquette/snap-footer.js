const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');

  // List every coral-dot occurrence with surrounding context
  const dots = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.site-footer .coral-dot').forEach((el) => {
      const parent = el.parentElement;
      const tag = parent ? parent.tagName.toLowerCase() : '?';
      const cls = parent ? parent.className : '';
      const innerText = parent ? parent.innerText.slice(0, 60) : '';
      out.push({ tag, cls, innerText });
    });
    return out;
  });
  console.log('coral-dots in footer:', JSON.stringify(dots, null, 2));

  const footer = await page.$('.site-footer');
  await footer.screenshot({ path: path.resolve(__dirname, '.previews', 'footer-current.png') });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
