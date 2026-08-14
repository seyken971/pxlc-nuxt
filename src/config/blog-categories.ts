export const BLOG_CATEGORIES = ['parents', 'cas-pratique', 'decryptage'] as const
export type BlogCategory = typeof BLOG_CATEGORIES[number]

export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  'parents': 'Parents',
  'cas-pratique': 'Cas pratique',
  'decryptage': 'Décryptage',
}
