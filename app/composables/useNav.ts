export interface NavItem {
  label: string
  url: string
}

export const useNav = () => {
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
  return { items }
}
