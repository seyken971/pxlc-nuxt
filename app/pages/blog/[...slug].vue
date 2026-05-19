<script setup lang="ts">
const route = useRoute()

// `path` for blog posts is /blog/<slug> — exact match against the
// current route's path.
const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable', fatal: true })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
})

defineOgImage('PxlcOg', {
  eyebrow: `PXLC · ${(post.value.category || 'JOURNAL').toUpperCase()}`,
  title: post.value.title,
  description: post.value.description,
})

const articleUrl = `https://pxlc.fr${route.path}`
const dateModified = post.value.updated || post.value.date

// BlogPosting structured data so Google can surface the article in Discover,
// rich results, and the Top Stories carousel. Author references the Person
// node from /a-propos; publisher references the global LocalBusiness.
useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.description,
    datePublished: post.value.date,
    dateModified,
    // nuxt-schema-org types articleSection as the intersection
    // `string[] & string` (a TS narrowing artifact). Cast to the array
    // form since articleSection is a single category here.
    articleSection: [post.value.category],
    author: { '@id': 'https://pxlc.fr/#andy' },
    publisher: { '@id': 'https://pxlc.fr/#identity' },
    inLanguage: 'fr-FR',
    url: articleUrl,
    ...(post.value.cover ? { image: `https://pxlc.fr${post.value.cover}` } : {}),
  }),
])

// Override /blog label — its page title is too long for a breadcrumb.
const crumbs = useBreadcrumbItems({
  overrides: [undefined, { label: 'Blog' }],
})

// Reading time + table of contents derived from the parsed body. Fallback
// to the manual frontmatter value if the AST walk yields nothing (defensive
// — shouldn't happen for real articles).
const { readingTimeLabel, tableOfContents } = useArticleBody()
const computedReading = computed(() => readingTimeLabel(post.value?.body))
const readingTime = computed(() => post.value?.readingTime || computedReading.value)
const toc = computed(() => tableOfContents(post.value?.body, ['h2']))

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
</script>

<template>
  <article v-if="post" class="section">
    <div class="container post-container">
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <ol class="breadcrumb__list" role="list">
          <li v-for="c in crumbs" :key="c.to || c.label" class="breadcrumb__item">
            <NuxtLink v-if="c.to && !c.current" :to="c.to" class="breadcrumb__link">{{ c.label }}</NuxtLink>
            <span v-else class="breadcrumb__current" aria-current="page">{{ c.label }}</span>
          </li>
        </ol>
      </nav>

      <header class="post-header">
        <span class="badge">{{ post.category }}</span>
        <h1 class="post-title">
          {{ post.title }}<span class="coral-dot" aria-hidden="true">.</span>
        </h1>
        <p class="lead post-lead">{{ post.description }}</p>
        <div class="post-meta">
          <time :datetime="post.date">{{ fmtDate(post.date) }}</time>
          <span v-if="readingTime">· {{ readingTime }} de lecture</span>
          <span v-if="post.updated && post.updated !== post.date">
            · mis à jour le <time :datetime="post.updated">{{ fmtDate(post.updated) }}</time>
          </span>
        </div>
      </header>

      <figure v-if="post.cover" class="post-cover">
        <NuxtImg :src="post.cover" :alt="post.coverAlt || ''" format="webp" loading="eager" fetchpriority="high" />
      </figure>

      <BlogToc :entries="toc" />

      <div class="prose post-body">
        <ContentRenderer :value="post" />
      </div>

      <BlogShare class="post-share" :url="articleUrl" :title="post.title" />

      <BlogCta />

      <BlogRelated :current-path="route.path" :current-category="post.category" />
    </div>
  </article>
</template>

<style scoped>
.post-container { max-width: 760px; }
.post-header { margin-bottom: var(--space-6); padding-bottom: var(--space-5); border-bottom: 1px solid var(--rule); }
.post-title {
  font-size: clamp(34px, 5vw, 52px);
  letter-spacing: -0.025em; line-height: 1.1;
  margin: 16px 0 24px;
  text-wrap: balance;
}
.post-lead { margin-bottom: var(--space-4); }
.post-meta {
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--quiet);
  display: flex; flex-wrap: wrap; gap: var(--space-2);
}
.post-cover {
  margin: 0 0 32px; border-radius: var(--radius-lg); overflow: hidden;
}
.post-cover :deep(img) { width: 100%; height: auto; display: block; }
.post-body { font-size: 16px; line-height: 1.7; }
/* Anchored h2 from the TOC shouldn't disappear under the sticky header. */
.post-body :deep(h2[id]) { scroll-margin-top: 96px; }
.post-share { margin-top: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--rule); }
.breadcrumb { margin-bottom: var(--space-4); }
.breadcrumb__list {
  display: flex; flex-wrap: wrap; gap: var(--space-2);
  list-style: none; padding: 0; margin: 0;
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--quiet);
}
.breadcrumb__item:not(:last-child)::after {
  content: "/"; margin-left: var(--space-2); color: var(--quiet);
}
.breadcrumb__link { color: var(--teal-deep); transition: color var(--dur-fast); }
.breadcrumb__link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .breadcrumb__link { color: var(--cyan); }
.breadcrumb__current { color: var(--ink); font-weight: 600; }
</style>
