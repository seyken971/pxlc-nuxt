/**
 * scripts/sitemap-lastmod.mjs
 * Politique de `<lastmod>` du sitemap, en un seul endroit.
 *
 * - Pages : date du dernier commit touchant le fichier de la page.
 * - Repli : l'horodatage du build, quand rien de mieux n'est disponible.
 *
 * Pourquoi pas l'horodatage du build partout, comme avant : il changeait à
 * chaque déploiement même sans modification de contenu. Deux conséquences —
 * un signal mensonger pour les moteurs, que Google finit par ignorer, et une
 * baseline SEO qui bougeait à chaque capture, rendant impossible la règle
 * « le diff doit être vide hors deltas volontaires ».
 *
 * Limite assumée : la date d'une page suit son propre fichier, pas les
 * composants qu'elle importe. Une refonte de composant partagé ne bouge donc
 * pas les lastmod — sous-déclarer vaut mieux que crier au loup.
 *
 * Prérequis CI : un clone complet (`fetch-depth: 0`). Sur un clone
 * superficiel, l'historique est absent et tout retombe sur le repli.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const git = (args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  }
  catch {
    return ''
  }
}

/** Fichier source d'une route : /a-propos/ -> src/pages/a-propos.astro */
const pageSource = (pathname) => {
  const base = pathname.replace(/^\/|\/$/g, '') || 'index'
  return [`src/pages/${base}.astro`, `src/pages/${base}/index.astro`].find(existsSync) ?? null
}

/**
 * Fabrique la fonction passée au `serialize` de @astrojs/sitemap.
 * @param {string} fallback horodatage du build, utilisé en dernier recours
 */
export const createLastmod = (fallback) => {
  const shallow = git(['rev-parse', '--is-shallow-repository']) !== 'false'
  const cache = new Map()

  return (url) => {
    const { pathname } = new URL(url)
    if (shallow) return fallback

    if (!cache.has(pathname)) {
      const source = pageSource(pathname)
      const date = source ? git(['log', '-1', '--format=%cI', '--', source]) : ''
      cache.set(pathname, date || fallback)
    }
    return cache.get(pathname)
  }
}
