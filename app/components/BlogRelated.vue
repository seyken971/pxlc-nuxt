<script setup lang="ts">
interface Post {
  path: string
  title: string
  description?: string
  category?: string
  date: string
}
interface Props {
  /** Path of the post currently being viewed — excluded from the list. */
  currentPath: string
  /** Category of the current post — used to prefer same-category matches. */
  currentCategory?: string
  /** Maximum number of suggestions to render. */
  limit?: number
}
const props = withDefaults(defineProps<Props>(), { limit: 3 })

// Pull every published blog post once per page load, then pick neighbours.
// Same-category first, fallback to most recent — so the block is never empty
// (assuming at least one other post exists).
const { data: posts } = await useAsyncData(
  `blog-related-${props.currentPath}`,
  () => queryCollection('blog').where('draft', '<>', true).order('date', 'DESC').select('path', 'title', 'description', 'category', 'date').all(),
)

const related = computed<Post[]>(() => {
  const all = (posts.value || []) as Post[]
  const others = all.filter(p => p.path !== props.currentPath)
  const sameCat = props.currentCategory
    ? others.filter(p => p.category === props.currentCategory)
    : []
  const picked: Post[] = []
  const seen = new Set<string>()
  for (const p of [...sameCat, ...others]) {
    if (seen.has(p.path)) continue
    seen.add(p.path)
    picked.push(p)
    if (picked.length >= props.limit) break
  }
  return picked
})
</script>

<template>
  <section v-if="related.length" class="blog-related" aria-labelledby="related-title">
    <div class="container blog-related__inner">
      <span id="related-title" class="eyebrow">Articles connexes</span>
      <ul class="blog-related__list" role="list">
        <li v-for="p in related" :key="p.path" class="blog-related__item">
          <NuxtLink :to="p.path + '/'" class="blog-related__link">
            <span v-if="p.category" class="badge">{{ p.category }}</span>
            <h3 class="blog-related__post-title">{{ p.title }}</h3>
            <p v-if="p.description" class="blog-related__excerpt">{{ p.description }}</p>
            <time :datetime="p.date" class="blog-related__date">{{ fmtDate(p.date) }}</time>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Full-width bg-soft section per DS BlogArticle "related articles" */
.blog-related {
  background: var(--bg-soft);
  border-top: 1px solid var(--bg-rule);
  padding: clamp(40px, 6vw, 64px) 0;
  transition: background var(--dur-base);
}
.blog-related__inner { max-width: 800px; }

.blog-related__list {
  list-style: none; padding: 0; margin: var(--space-4) 0 0;
  display: grid; gap: var(--space-3); grid-template-columns: 1fr;
}
@media (min-width: 600px) { .blog-related__list { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .blog-related__list { grid-template-columns: repeat(3, 1fr); } }

.blog-related__item { display: flex; }
.blog-related__link {
  display: flex; flex-direction: column; gap: var(--space-2);
  padding: var(--space-3); width: 100%;
  background: var(--bg-elev); border: 1px solid var(--rule); border-radius: var(--radius-md);
  color: inherit; transition: border-color var(--dur-fast), transform var(--dur-fast);
}
.blog-related__link:hover {
  border-color: var(--pxlc-coral); text-decoration: none;
  transform: translateY(-2px);
}
.blog-related__post-title { font-size: 16px; line-height: 1.3; color: var(--ink); }
.blog-related__excerpt { font-size: 13.5px; line-height: 1.5; color: var(--ink-quiet); flex: 1; }
.blog-related__date {
  margin-top: auto;
  font-family: var(--font-label); font-size: 11px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--quiet);
}
.badge { align-self: flex-start; }
</style>
