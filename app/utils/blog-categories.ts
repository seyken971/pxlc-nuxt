export const BLOG_CATEGORIES = ['parents', 'cas-pratique', 'decryptage'] as const
export type BlogCategory = typeof BLOG_CATEGORIES[number]
