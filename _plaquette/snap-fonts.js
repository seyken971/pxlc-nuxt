const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  // Capture every CSS font request so we know what's actually downloaded.
  const fontRequests = [];
  page.on('response', (res) => {
    const url = res.url();
    const ct = res.headers()['content-type'] || '';
    if (/\.(woff2?|ttf|otf)(\?|$)/i.test(url) || ct.startsWith('font/')) {
      fontRequests.push({ url, status: res.status(), type: ct });
    }
  });

  await page.goto('http://localhost:3941/', { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');

  // Inventory loaded vs unloaded font faces (de-dup by family+weight).
  const inventory = await page.evaluate(() => {
    const seen = new Map();
    document.fonts.forEach((f) => {
      const key = f.family + ' ' + f.weight + ' ' + (f.style || 'normal');
      if (!seen.has(key)) seen.set(key, f.status);
      else if (seen.get(key) === 'unloaded' && f.status === 'loaded') seen.set(key, 'loaded');
    });
    return [...seen.entries()].map(([k, v]) => ({ key: k, status: v }));
  });

  // Probe one element per typography role.
  const probes = await page.evaluate(() => {
    const sample = (sel, role) => {
      const el = document.querySelector(sel);
      if (!el) return { role, sel, missing: true };
      const cs = getComputedStyle(el);
      return {
        role,
        sel,
        family: cs.fontFamily,
        weight: cs.fontWeight,
        size: cs.fontSize,
        usedFamily: cs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
      };
    };
    return [
      sample('.hero__title', 'hero h1 (display 600)'),
      sample('.section__head h2', 'h2 (display 600)'),
      sample('.card--method h3', 'card h3 (display 600)'),
      sample('.lockup__name', 'lockup name (display 600)'),
      sample('.lead', 'lead (body 400)'),
      sample('p', 'body p (body 400)'),
      sample('.eyebrow', 'eyebrow (mono 600)'),
      sample('.kicker', 'kicker (mono 600/500)'),
      sample('.btn--primary', 'btn (body 600)'),
      sample('.lockup__tag', 'tag (mono 500)'),
    ];
  });

  console.log('=== font requests (network) ===');
  fontRequests.forEach((r) => console.log(`${r.status} ${r.type.padEnd(28)} ${r.url}`));
  console.log('\n=== document.fonts inventory (loaded vs unloaded, de-duped) ===');
  inventory
    .filter((i) => !i.key.includes('Fallback'))
    .forEach((i) => console.log(`${i.status.padEnd(10)} ${i.key}`));
  console.log('\n=== fallback aliases (size-adjusted, never network-loaded) ===');
  inventory
    .filter((i) => i.key.includes('Fallback'))
    .slice(0, 5)
    .forEach((i) => console.log(`${i.status.padEnd(10)} ${i.key}`));
  console.log('  (+ more)');
  console.log('\n=== element probes ===');
  probes.forEach((p) => {
    if (p.missing) return console.log(`MISSING ${p.sel}`);
    console.log(`${p.role}\n  used: ${p.usedFamily}  w=${p.weight}  size=${p.size}`);
  });

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
