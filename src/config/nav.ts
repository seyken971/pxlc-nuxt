export interface NavItem {
  label: string
  url: string
}

// Single-funnel since the offer flows exclusively through the /projets rubric
// (SESSAD, IME, associations, collectivités) — /ateliers was removed accordingly.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', url: '/' },
  { label: 'Projets', url: '/projets' },
  { label: 'À propos', url: '/a-propos' },
  { label: 'Contact', url: '/contact' },
]

// pathname porte le slash final (trailingSlash: 'always').
export const isActive = (pathname: string, url: string) => {
  if (url === '/') return pathname === '/'
  return pathname === url + '/' || pathname.startsWith(url + '/')
}

// Forme canonique avec slash final des URL de nav.
export const navHref = (url: string) => (url === '/' ? '/' : url + '/')
