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

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
</script>

<template>
  <article v-if="post" class="section">
    <div class="container post-container">
      <NuxtLink to="/blog" class="post-back">← Tous les articles</NuxtLink>

      <header class="post-header">
        <span class="badge">{{ post.category }}</span>
        <h1 class="post-title">
          {{ post.title }}<span class="coral-dot" aria-hidden="true">.</span>
        </h1>
        <p class="lead post-lead">{{ post.description }}</p>
        <div class="post-meta">
          <span>{{ fmtDate(post.date) }}</span>
          <span v-if="post.readingTime">· {{ post.readingTime }} de lecture</span>
        </div>
      </header>

      <div class="prose post-body">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.post-container { max-width: 760px; }
.post-back {
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--teal-deep);
  display: inline-block; margin-bottom: 32px;
}
[data-theme="dark"] .post-back { color: var(--cyan); }
.post-header { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid var(--rule); }
.post-title {
  font-size: clamp(34px, 5vw, 52px);
  letter-spacing: -0.025em; line-height: 1.1;
  margin: 16px 0 24px;
}
.post-lead { margin-bottom: 24px; }
.post-meta {
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--quiet);
  display: flex; gap: 8px;
}
.post-body { font-size: 16px; line-height: 1.7; }
</style>
