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
  ogType: 'article',
  // Strip the "· PXLC" titleTemplate suffix from OG cards — og:site_name already
  // carries the brand; the full title alone can exceed the ~60-char social limit.
  ogTitle: post.value.title,
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
// node from /a-propos; publisher references the global Organization.
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
    image: post.value.cover
      ? `https://pxlc.fr${post.value.cover}`
      : `https://pxlc.fr${route.path}/__og-image__/og.png`,
  }),
])

const crumbs = useBreadcrumbItems({
  overrides: [
    { label: 'Accueil' },
    { label: 'Blog' },
    { label: post.value.title },
  ],
})

// Reading time + table of contents derived from the parsed body. Fallback
// to the manual frontmatter value if the AST walk yields nothing (defensive
// — shouldn't happen for real articles).
const { readingTimeLabel, tableOfContents } = useArticleBody()
const readingTime = computed(() => post.value?.readingTime || readingTimeLabel(post.value?.body))
const toc = computed(() => tableOfContents(post.value?.body, ['h2']))

// Reading progress — coral bar fixed at top of viewport, per DS.
const readingProgress = ref(0)
let progressRaf: number | null = null
const onReadingScroll = () => {
  if (progressRaf !== null) return
  progressRaf = requestAnimationFrame(() => {
    const scrollTop = window.scrollY
    const docH = document.documentElement.scrollHeight - window.innerHeight
    readingProgress.value = docH > 0 ? Math.min(100, Math.round((scrollTop / docH) * 100)) : 0
    progressRaf = null
  })
}
onMounted(() => {
  onReadingScroll()
  window.addEventListener('scroll', onReadingScroll, { passive: true })
})
onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', onReadingScroll)
  if (progressRaf !== null) cancelAnimationFrame(progressRaf)
})
</script>

<template>
  <article v-if="post">

    <!-- Reading progress bar — coral line fixed at viewport top -->
    <div class="reading-bar" aria-hidden="true">
      <div class="reading-bar__fill" :style="{ width: readingProgress + '%' }" />
    </div>

    <!-- Article header — bg-soft section per DS -->
    <section class="article-intro">
      <div class="container article-intro__inner">
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
          <!-- Author card — per DS BlogArticle -->
          <div class="post-author">
            <div class="post-author__avatar">
              <NuxtImg
                src="/assets/img/photos/andy-portrait.jpg"
                alt="Andy Zébus"
                width="48"
                height="48"
                format="webp"
              />
            </div>
            <div>
              <div class="post-author__name">Andy Zébus</div>
              <div class="post-author__role">Médiateur numérique par le jeu · PXLC · Guadeloupe</div>
            </div>
          </div>
        </header>
      </div>
    </section>

    <!-- Article body -->
    <section class="article-body">
      <div class="container post-container">
        <figure v-if="post.cover" class="post-cover">
          <NuxtImg :src="post.cover" :alt="post.coverAlt || ''" format="webp" loading="eager" fetchpriority="high" />
        </figure>

        <BlogToc :entries="toc" />

        <div class="prose post-body">
          <ContentRenderer :value="post" />
        </div>

        <BlogShare class="post-share" :url="articleUrl" :title="post.title" />

        <BlogCta />
      </div>
    </section>

    <!-- Related articles — full-width bg-soft section, rendered by component -->
    <BlogRelated :current-path="route.path" :current-category="post.category" />

  </article>
</template>

<style scoped>
/* ── Reading progress bar ─────────────────────────────────────── */
.reading-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 3px; background: transparent; pointer-events: none;
}
.reading-bar__fill {
  height: 100%; background: var(--pxlc-coral);
  transition: width 80ms linear;
}

/* ── Article header (bg-soft section) ───────────────────────── */
.article-intro {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--bg-rule);
  padding: clamp(32px, 4vw, 56px) 0;
  transition: background var(--dur-base);
}
.article-intro__inner { max-width: 800px; }

/* ── Article body ────────────────────────────────────────────── */
.article-body { padding: clamp(40px, 6vw, 72px) 0; }
.post-container { max-width: 680px; }

/* ── Post header ─────────────────────────────────────────────── */
.post-header { margin-bottom: 0; }
.post-title {
  font-size: clamp(34px, 5vw, 52px);
  letter-spacing: -0.025em; line-height: 1.1;
  margin: var(--space-3) 0 var(--space-4);
  text-wrap: balance;
}
.post-lead { margin-bottom: var(--space-4); }
.post-meta {
  font-family: var(--font-label); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--quiet);
  display: flex; flex-wrap: wrap; gap: var(--space-2);
}

/* ── Author card ─────────────────────────────────────────────── */
.post-author {
  display: flex; align-items: center; gap: var(--space-3);
  margin-top: var(--space-4); padding-top: var(--space-4);
  border-top: 1px solid var(--bg-rule);
}
.post-author__avatar {
  width: 48px; height: 48px; border-radius: 50%;
  overflow: hidden; flex-shrink: 0; border: 2px solid var(--rule);
}
.post-author__avatar :deep(img) {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.post-author__name {
  font-family: var(--font-display); font-weight: 600; font-size: 15px;
  color: var(--ink); margin-bottom: var(--space-1);
}
.post-author__role {
  font-family: var(--font-label); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--quiet);
}

/* ── Cover + body ────────────────────────────────────────────── */
.post-cover {
  margin: 0 0 32px; border-radius: var(--radius-lg); overflow: hidden;
}
.post-cover :deep(img) { width: 100%; height: auto; display: block; }
.post-body { font-size: 16px; line-height: 1.7; }
/* Anchored h2 from the TOC shouldn't disappear under the sticky header. */
.post-body :deep(h2[id]) { scroll-margin-top: 96px; }
.post-share { margin-top: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--rule); }

/* ── Breadcrumb ──────────────────────────────────────────────── */
.breadcrumb { margin-bottom: var(--space-4); }
.breadcrumb__list {
  display: flex; flex-wrap: wrap; gap: var(--space-2);
  list-style: none; padding: 0; margin: 0;
  font-family: var(--font-label); font-size: 11px;
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
