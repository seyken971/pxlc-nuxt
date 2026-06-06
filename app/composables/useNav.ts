export interface NavItem {
  label: string
  url: string
}

// Single-funnel since the offer flows exclusively through structures
// (SESSAD, IME, associations, collectivités) — /ateliers was removed accordingly.
const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', url: '/' },
  { label: 'Pour les structures', url: '/structures' },
  { label: 'À propos', url: '/a-propos' },
  { label: 'Blog', url: '/blog' },
  { label: 'Contact', url: '/contact' },
]

export const useNav = () => {
  const route = useRoute()

  const isActive = (url: string) => {
    if (url === '/') return route.path === '/'
    return route.path === url || route.path.startsWith(url + '/')
  }

  return { items: NAV_ITEMS, isActive }
}
