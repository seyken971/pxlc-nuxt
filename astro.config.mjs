import { createHash } from 'node:crypto'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { blogLastmod } from './scripts/blog-lastmod.mjs'
import { THEME_SCRIPT } from './src/lib/theme-script.ts'

// GitHub Pages sert chaque page en `/chemin/index.html` : l'URL avec slash
// final répond 200, la version sans slash 301-redirige vers elle. On aligne
// donc canonical + sitemap + liens internes sur la forme avec slash
// (trailingSlash + format directory), comme le faisait la config Nuxt.

// <lastmod> : date réelle du contenu pour les articles (frontmatter
// `updated` ?? `date`), date du build pour les pages statiques (signal de
// fraîcheur pour le recrawl).
const lastmodBySlug = blogLastmod()
const buildStamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')

// GitHub Pages ne permet pas d'en-tête HTTP : Astro émet la CSP en <meta> sur
// chaque page, avec les hashes des scripts et styles qu'il traite. Restent à
// déclarer à la main le script anti-flash (`is:inline`, donc non traité par
// Astro) — le JSON-LD, lui, est haché page par page dans BaseLayout.
const themeScriptHash = `sha256-${createHash('sha256').update(THEME_SCRIPT, 'utf8').digest('base64')}`

export default defineConfig({
  site: 'https://pxlc.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self'",
        "font-src 'self'",
        "form-action 'self'",
        "frame-src 'none'",
        "img-src 'self' data:",
        "manifest-src 'self'",
        "object-src 'none'",
        // Pas de script-src-attr : Astro le refuse dans `directives`, et un
        // script-src à base de hashes (sans 'unsafe-inline') bloque déjà les
        // gestionnaires inline type onclick=.
        'upgrade-insecure-requests',
      ],
      scriptDirective: { hashes: [themeScriptHash] },
      // Quelques scripts vanilla écrivent des styles inline à l'exécution
      // (filtre du blog, barre de progression d'article, verrou de scroll du
      // menu mobile) : les attributs `style` doivent rester autorisés. Portée
      // limitée à `style-src-attr` — les feuilles et balises <style>, elles,
      // restent couvertes par les hashes générés par Astro.
      styleDirective: { resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  integrations: [
    // Sitemap officiel : `dist/sitemap-index.xml` + `dist/sitemap-0.xml`.
    // Les pages 404/500 sont exclues par l'intégration ; on retire en plus
    // les pages noindex du site.
    sitemap({
      filter: page => !page.includes('/mentions-legales/'),
      serialize: (item) => {
        const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1]
        return { ...item, lastmod: (slug && lastmodBySlug.get(slug)) || buildStamp }
      },
    }),
  ],
})
