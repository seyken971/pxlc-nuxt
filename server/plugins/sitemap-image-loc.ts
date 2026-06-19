import { defineNitroPlugin } from 'nitropack/runtime'
import type { SitemapRenderCtx } from '@nuxtjs/sitemap'

// @nuxtjs/sitemap déclare ses hooks Nitro côté app (via nuxt.d.ts), hors de
// portée du tsconfig serveur. On ré-augmente localement la signature du hook
// utilisé pour que ce plugin serveur reste typé sans cast.
declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'sitemap:resolved': (ctx: SitemapRenderCtx) => void | Promise<void>
  }
}

// @nuxt/image génère les URL _ipx en joignant les modificateurs de transformation
// avec « & » (ex. /_ipx/f_webp&s_1480x1480/img/photos/andy-event.jpg). Au prérendu,
// @nuxtjs/sitemap auto-découvre les images en lisant l'attribut src du HTML via
// ultrahtml, qui NE décode PAS les entités HTML : le « & » arrive donc sous sa
// forme littérale « &amp; ». Le sérialiseur XML du sitemap ré-échappe ensuite ce
// « & », produisant « &amp;amp; » dans <image:loc> — une URL d'image invalide pour
// Google. On décode l'entité ici, avant que la sérialisation ne la ré-échappe une
// seule fois. L'URL rendue dans le HTML et le fichier image statique ne sont pas
// touchés : seul le sitemap est corrigé.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('sitemap:resolved', (ctx) => {
    for (const url of ctx.urls) {
      if (!url.images) continue
      for (const img of url.images) {
        if (typeof img.loc === 'string') {
          img.loc = img.loc.replace(/&amp;/g, '&')
        }
      }
    }
  })
})
