/**
 * scripts/blog-lastmod.mjs
 * Map slug → date de dernière modification (`updated` sinon `date`) des
 * articles de content/blog.
 *
 * Consommé par le `serialize` de @astrojs/sitemap dans astro.config.mjs :
 * l'intégration découvre les URLs elle-même mais ne connaît pas les dates du
 * frontmatter, et la config Astro ne peut pas appeler `getCollection`.
 * Lecture minimale (deux clés), pas d'analyseur YAML complet.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = 'content/blog'

export const blogLastmod = () => {
  const map = new Map()
  for (const file of readdirSync(CONTENT_DIR)) {
    if (!file.endsWith('.md')) continue
    const fm = readFileSync(join(CONTENT_DIR, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
    const pick = key => fm.match(new RegExp(`^${key}:\\s*"?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1]
    const lastmod = pick('updated') ?? pick('date')
    if (lastmod) map.set(file.replace(/\.md$/, ''), lastmod)
  }
  return map
}
