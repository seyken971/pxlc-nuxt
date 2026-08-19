import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { BLOG_CATEGORIES } from './config/blog-categories'
import { SEO_TITLE_MAX, SEO_DESC_MAX } from '../scripts/seo-limits.mjs'

// Schema d'un article de blog (repris du content.config.ts Nuxt). Les champs
// déclarés ici sont validés à l'ingestion : un article qui ne respecte pas le
// schéma fait planter le build, donc on attrape les régressions au build
// plutôt qu'en production.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Variantes SEO optionnelles : <title> et meta description courts,
    // limites partagées dans scripts/seo-limits.mjs (le layout ajoute
    // « · PXLC »). Le title/description éditorial reste le H1 et le lead de
    // la page ; la règle de fallback (title trop long sans seoTitle) est
    // vérifiée par le superRefine ci-dessous.
    seoTitle: z.string().max(SEO_TITLE_MAX).optional(),
    seoDescription: z.string().max(SEO_DESC_MAX).optional(),
    // Frontmatter YYYY-MM-DD (quoté ou non) → Date UTC minuit.
    date: z.coerce.date(),
    // Optional last-modified date — when set, drives the article's
    // dateModified in the BlogPosting schema (vs date which stays
    // datePublished) and the sitemap <lastmod>.
    updated: z.coerce.date().optional(),
    category: z.enum(BLOG_CATEGORIES),
    // Optional manual override; if absent, the page computes one from
    // the body text (200 mots/min).
    readingTime: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }).superRefine((data, ctx) => {
    // Anti-troncature SERP : c'est le title/description EFFECTIF qui compte,
    // soit la variante SEO si elle existe, soit le champ éditorial. Un title
    // éditorial long est donc légitime tant qu'un seoTitle prend le relais.
    const effTitle = data.seoTitle || data.title
    if (effTitle.length > SEO_TITLE_MAX) {
      ctx.addIssue({
        code: 'custom',
        path: ['title'],
        message: `title SEO effectif trop long (${effTitle.length} > ${SEO_TITLE_MAX}) : ajouter/raccourcir seoTitle`,
      })
    }

    const effDesc = data.seoDescription || data.description
    if (effDesc.length > SEO_DESC_MAX) {
      ctx.addIssue({
        code: 'custom',
        path: ['description'],
        message: `description SEO effective trop longue (${effDesc.length} > ${SEO_DESC_MAX}) : ajouter/raccourcir seoDescription`,
      })
    }
  }),
})

export const collections = { blog }
