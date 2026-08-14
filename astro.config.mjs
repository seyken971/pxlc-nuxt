import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import icon from 'astro-icon'

// GitHub Pages sert chaque page en `/chemin/index.html` : l'URL avec slash
// final répond 200, la version sans slash 301-redirige vers elle. On aligne
// donc canonical + sitemap + liens internes sur la forme avec slash
// (trailingSlash + format directory), comme le faisait la config Nuxt.
export default defineConfig({
  site: 'https://pxlc.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Le sitemap est généré par scripts/generate-sitemap.mjs en post-build
  // (URLs + lastmod + image:image, pages noindex exclues) — pas d'intégration.
  integrations: [vue(), icon()],
})
