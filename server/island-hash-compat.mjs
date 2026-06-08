import { hash } from 'ohash'

export function filterIslandProps(props) {
  if (!props) return {}
  const out = {}
  for (const key in props) {
    if (!key.startsWith('data-v-')) out[key] = props[key]
  }
  return out
}

// nuxt-og-image (via @nuxtjs/seo) computes hash([name, props]) — without context/source.
// Nuxt 4.4 added context+source to computeIslandHash as a CSRF hardening.
// This compat shim accepts the new signature but ignores context/source,
// matching @nuxtjs/seo's computation so OG image islands validate correctly
// during nuxt generate.
// TODO: remove this file + alias overrides in nuxt.config.ts once @nuxtjs/seo fixes it.
export function computeIslandHash(name, filteredProps, context, source) {
  // Intentionally ignore context/source to stay compatible with @nuxtjs/seo
  // which computes hashes without these parameters
  return hash([name, filteredProps]).replaceAll('_', '-')
}
