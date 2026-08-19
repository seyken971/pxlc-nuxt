import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { BLOG_CATEGORY_LABELS } from '../config/blog-categories'
import { SITE } from '../config/site'

// Flux RSS du blog — endpoint statique (`dist/rss.xml`). Les descriptions
// reprennent la variante SEO si elle existe, sinon le lead éditorial ; le
// corps des articles n'est pas embarqué (le flux amène sur le site).
export async function GET() {
  const posts = await getCollection('blog', p => !p.data.draft)
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  return rss({
    title: `Blog ${SITE.name}`,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: true,
    customData: `<language>fr-FR</language>`,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.seoDescription || post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: [BLOG_CATEGORY_LABELS[post.data.category] ?? post.data.category],
    })),
  })
}
