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
    // vérifiée par scripts/validate-content.mjs.
    seoTitle: z.string().max(SEO_TITLE_MAX).optional(),
    seoDescription: z.string().max(SEO_DESC_MAX).optional(),
    // Format YYYY-MM-DD. Le YAML d'Astro parse les dates non quotées en objets
    // Date — on normalise vers la chaîne YYYY-MM-DD que tout le code consomme.
    date: z.union([z.string(), z.date()]).transform(v =>
      typeof v === 'string' ? v : v.toISOString().slice(0, 10)),
    // Optional last-modified date — when set, drives the article's
    // dateModified in the BlogPosting schema (vs date which stays
    // datePublished). Format YYYY-MM-DD.
    updated: z.union([z.string(), z.date()]).transform(v =>
      typeof v === 'string' ? v : v.toISOString().slice(0, 10)).optional(),
    category: z.enum(BLOG_CATEGORIES),
    // Optional manual override; if absent, the page computes one from
    // the body text (200 mots/min).
    readingTime: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { blog }
