import { defineCollection, defineContentConfig, z } from '@nuxt/content'

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
        date: z.string(), // format YYYY-MM-DD
        category: z.string(),
        readingTime: z.string().optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().optional().default(false),
      }),
    }),
  },
})
