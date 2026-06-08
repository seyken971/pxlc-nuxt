import { hash } from 'ohash'

export function filterIslandProps(props) {
  if (!props) return {}
  const out = {}
  for (const key in props) {
    if (!key.startsWith('data-v-')) out[key] = props[key]
  }
  return out
}

// nuxt-og-image 6.5.3 (via @nuxtjs/seo 5.1.4) computes:
//   hash([name, props, {}, undefined]).replace(/[-_]/g, "")
// Nuxt 4.4 validates with computeIslandHash(name, props, context, source).
// This shim overrides the server-side validation to match og-image's client-side
// computation, using hardcoded {} and undefined regardless of actual context/source.
// TODO: remove once @nuxtjs/seo / nuxt-og-image ships a native fix.
export function computeIslandHash(name, filteredProps, _context, _source) {
  return hash([name, filteredProps, {}, undefined]).replace(/[-_]/g, '')
}
