export interface NavItem {
  label: string
  url: string
}

export const useNav = () => {
  const items: NavItem[] = [
    { label: 'Accueil', url: '/' },
    { label: 'Ateliers', url: '/ateliers' },
    { label: 'Pour les structures', url: '/pour-les-structures' },
    { label: 'À propos', url: '/a-propos' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact', url: '/contact' },
  ]
  return { items }
}
