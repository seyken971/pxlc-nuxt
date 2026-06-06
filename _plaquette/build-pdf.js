#!/usr/bin/env node
/**
 * build-pdf.js — Génère la plaquette PXLC en PDF A4 depuis plaquette.html
 *
 * Usage :
 *   cd _plaquette
 *   npm install        (première fois)
 *   npm run build
 *
 * Sortie : ../public/files/plaquette-pxlc.pdf
 * (servi par Nuxt à https://pxlc.fr/files/plaquette-pxlc.pdf)
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_FILE = path.resolve(__dirname, 'plaquette.html');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'files');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'plaquette-pxlc.pdf');

(async () => {
  if (!fs.existsSync(HTML_FILE)) {
    console.error(`✗ HTML source introuvable : ${HTML_FILE}`);
    process.exit(1);
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('▸ Lancement de Chromium headless...');
  const launchArgs = process.env.PUPPETEER_NO_SANDBOX === '1'
    ? ['--no-sandbox', '--disable-setuid-sandbox']
    : []
  const browser = await puppeteer.launch({
    headless: true,
    args: launchArgs,
  });

  try {
    const page = await browser.newPage();

    const fileUrl = 'file://' + HTML_FILE.replace(/\\/g, '/');
    console.log(`▸ Chargement de ${fileUrl}`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 60_000 });

    // Attendre le chargement complet des Google Fonts.
    await page.evaluateHandle('document.fonts.ready');

    console.log('▸ Génération du PDF A4...');
    await page.pdf({
      path: OUTPUT_FILE,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });

    const sizeKb = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(0);
    console.log(`✓ PDF généré : ${OUTPUT_FILE} (${sizeKb} Ko)`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error('✗ Échec de la génération :', err);
  process.exit(1);
});
