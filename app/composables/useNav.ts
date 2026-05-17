export interface NavItem {
  label: string
  url: string
}

export const useNav = () => {
  const route = useRoute()

  // Single-funnel since the offer flows exclusively through structures
  // (SESSAD, IME, associations, collectivités) — there's no direct-to-parent
  // workshop path. /ateliers was removed accordingly.
  const items: NavItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Pour les structures', url: '/pour-les-structures' },
    { label: 'À propos', url: '/a-propos' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact', url: '/contact' },
  ]

  const isActive = (url: string) => {
    if (url === '/') return route.path === '/'
    return route.path === url || route.path.startsWith(url + '/')
  }

  return { items, isActive }
}
