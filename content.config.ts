import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { BLOG_CATEGORIES } from './app/utils/blog-categories'

// Schema d'un article de blog. Les champs déclarés ici sont validés à
// l'ingestion : un article qui ne respecte pas le schéma fait planter
// `nuxt prepare`, donc on attrape les régressions au build plutôt qu'en
// production.
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        // Variantes SEO optionnelles : <title> et meta description courts
        // (title ≤ 53 car le titleTemplate ajoute « · PXLC », description
        // ≤ 120 pour éviter la troncature mobile). Le title/description
        // éditorial reste le H1 et le lead de la page.
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        date: z.string(), // format YYYY-MM-DD
        // Optional last-modified date — when set, drives the article's
        // dateModified in the BlogPosting schema (vs date which stays
        // datePublished). Format YYYY-MM-DD.
        updated: z.string().optional(),
        category: z.enum(BLOG_CATEGORIES),
        // Optional manual override; if absent, the page computes one from
        // the body text via useReadingTime().
        readingTime: z.string().optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().optional().default(false),
      }),
    }),
  },
})
