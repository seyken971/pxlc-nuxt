/**
 * scripts/sitemap-lastmod.mjs
 * Politique de `<lastmod>` du sitemap, en un seul endroit.
 *
 * - Articles : `updated` sinon `date` du frontmatter — la date éditoriale.
 * - Pages statiques : date du dernier commit touchant le fichier de la page.
 * - `/blog/` : la plus récente des deux (la page liste les articles, elle
 *   change donc quand un article paraît).
 * - Repli : l'horodatage du build, quand rien de mieux n'est disponible.
 *
 * Pourquoi pas l'horodatage du build partout, comme avant : il changeait à
 * chaque déploiement même sans modification de contenu. Deux conséquences —
 * un signal mensonger pour les moteurs, que Google finit par ignorer, et une
 * baseline SEO qui bougeait à chaque capture, rendant impossible la règle
 * « le diff doit être vide hors deltas volontaires ».
 *
 * Limite assumée : la date d'une page statique suit son propre fichier, pas
 * les composants qu'elle importe. Une refonte de composant partagé ne bouge
 * donc pas les lastmod — sous-déclarer vaut mieux que crier au loup.
 *
 * Prérequis CI : un clone complet (`fetch-depth: 0`). Sur un clone
 * superficiel, l'historique est absent et tout retombe sur le repli.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = 'content/blog'

/** slug -> date éditoriale (YYYY-MM-DD) des articles. */
const blogDates = () => {
  const map = new Map()
  for (const file of readdirSync(CONTENT_DIR)) {
    if (!file.endsWith('.md')) continue
    const fm = readFileSync(join(CONTENT_DIR, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
    const pick = key => fm.match(new RegExp(`^${key}:\\s*"?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1]
    const date = pick('updated') ?? pick('date')
    if (date) map.set(file.replace(/\.md$/, ''), date)
  }
  return map
}

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
  const byslug = blogDates()
  const shallow = git(['rev-parse', '--is-shallow-repository']) !== 'false'
  const newestArticle = [...byslug.values()].sort().at(-1)
  const cache = new Map()

  return (url) => {
    const { pathname } = new URL(url)

    const slug = pathname.match(/^\/blog\/([^/]+)\/$/)?.[1]
    if (slug) return byslug.get(slug) ?? fallback
    if (shallow) return fallback

    if (!cache.has(pathname)) {
      const source = pageSource(pathname)
      let date = source ? git(['log', '-1', '--format=%cI', '--', source]) : ''
      if (pathname === '/blog/' && newestArticle && newestArticle > date.slice(0, 10)) {
        date = newestArticle
      }
      cache.set(pathname, date || fallback)
    }
    return cache.get(pathname)
  }
}
