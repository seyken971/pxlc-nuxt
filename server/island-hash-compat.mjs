import { hash } from 'ohash'

export function filterIslandProps(props) {
  if (!props) return {}
  const out = {}
  for (const key in props) {
    if (!key.startsWith('data-v-')) out[key] = props[key]
  }
  return out
}

// nuxt-og-image v6.5 computes hash([name, props]) — without context/source.
// Nuxt 4.4 added context+source to computeIslandHash as a CSRF hardening.
// This compat shim matches nuxt-og-image's computation so OG image islands
// validate correctly during nuxt generate. Remove once nuxt-og-image ships
// a fix for the new signature.
export function computeIslandHash(name, filteredProps, _context, _source) {
  return hash([name, filteredProps]).replaceAll('_', '-')
}
