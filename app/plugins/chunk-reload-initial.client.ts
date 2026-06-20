// Récupération des erreurs de chunk AU PREMIER CHARGEMENT.
//
// Nuxt recharge déjà automatiquement la page quand un chunk échoue pendant une
// NAVIGATION entre pages (experimental.emitRouteChunkError: 'automatic', défaut).
// Mais ce mécanisme ne couvre pas le tout premier chargement : si le HTML servi
// (onglet ou cache CDN périmé après un déploiement) référence d'anciens chunks
// `_nuxt/*.js` désormais absents, l'import dynamique échoue à l'hydratation et la
// page d'erreur s'affiche — c'est ce cas qui a fait indexer à Google le titre
// « 500 - Failed to fetch dynamically imported module ».
//
// Ce plugin comble UNIQUEMENT ce trou (avant le premier `app:mounted`), sans
// toucher au reload de navigation de Nuxt. Garde anti-boucle : on recharge une
// seule fois ; si le chunk est réellement absent (et non un simple cache périmé),
// le 2e échec laisse la page d'erreur s'afficher proprement.
export default defineNuxtPlugin((nuxtApp) => {
  const KEY = 'pxlc:chunk-reload'
  let mounted = false

  nuxtApp.hook('app:mounted', () => {
    mounted = true
    // Rendu réussi → on réarme pour qu'un futur déploiement puisse de nouveau
    // déclencher un rechargement de récupération.
    try { sessionStorage.removeItem(KEY) } catch { /* sessionStorage indispo */ }
  })

  nuxtApp.hook('app:chunkError', () => {
    if (mounted) return // navigation → déjà géré par le reload auto de Nuxt
    try {
      if (sessionStorage.getItem(KEY)) return // déjà retenté → laisser error.vue
      sessionStorage.setItem(KEY, '1')
    } catch { /* sessionStorage indispo : on recharge quand même, une fois */ }
    window.location.reload()
  })
})
