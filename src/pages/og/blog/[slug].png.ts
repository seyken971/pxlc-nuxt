import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { articleCard, renderOgPng } from '../../../lib/og-templates'

// Une carte OG par article publié — mêmes slugs que /blog/<slug>/.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', p => !p.data.draft)
  return posts.map(post => ({
    params: { slug: post.id },
    props: { title: post.data.title, category: post.data.category },
  }))
}

export const GET: APIRoute = async ({ props }) => new Response(
  new Uint8Array(await renderOgPng(articleCard(props.title, props.category))),
  { headers: { 'Content-Type': 'image/png' } },
)
