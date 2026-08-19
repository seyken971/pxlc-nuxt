import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { blogLastmod } from './scripts/blog-lastmod.mjs'

// GitHub Pages sert chaque page en `/chemin/index.html` : l'URL avec slash
// final répond 200, la version sans slash 301-redirige vers elle. On aligne
// donc canonical + sitemap + liens internes sur la forme avec slash
// (trailingSlash + format directory), comme le faisait la config Nuxt.

// <lastmod> : date réelle du contenu pour les articles (frontmatter
// `updated` ?? `date`), date du build pour les pages statiques (signal de
// fraîcheur pour le recrawl).
const lastmodBySlug = blogLastmod()
const buildStamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')

export default defineConfig({
  site: 'https://pxlc.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
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
