<script setup lang="ts">
useSeoMeta({
  title: 'Le journal — décryptages et cas pratiques PXLC',
  description:
    'Décryptages, repères et retours de terrain : ce que les écrans des enfants nous apprennent, en Guadeloupe et ailleurs.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · LE JOURNAL',
  title: 'Décryptages, repères, retours de terrain',
  description: 'Ce que les écrans des enfants nous apprennent — sur eux, sur nous, sur le lien.',
})

// `queryCollection` est l'API Nuxt Content v3 — tri descendant par date,
// brouillons exclus. Le schéma est défini dans content.config.ts.
const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .all(),
)

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
</script>

<template>
  <section class="section">
    <div class="container">
      <span class="eyebrow eyebrow--lg">Le journal</span>
      <h1 class="blog-title">
        Décryptages, repères, retours de terrain<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead blog-lead">
        Ce que les écrans des enfants nous apprennent — sur eux, sur nous, sur le lien.
      </p>

      <div v-if="posts && posts.length" class="grid grid--3 mt-6">
        <NuxtLink
          v-for="p in posts"
          :key="p.path"
          :to="p.path"
          class="card card--hover blog-card"
        >
          <div class="blog-card__thumb" aria-hidden="true" />
          <div class="blog-card__body">
            <span class="badge">{{ p.category }}</span>
            <h3 class="blog-card__title">{{ p.title }}</h3>
            <p v-if="p.description" class="blog-card__excerpt">{{ p.description }}</p>
            <div class="blog-card__meta">
              <span>{{ fmtDate(p.date) }}</span>
              <span v-if="p.readingTime">· {{ p.readingTime }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <p v-else class="lead mt-6">Aucun article publié pour le moment.</p>
    </div>
  </section>
</template>

<style scoped>
.blog-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; margin-bottom: 24px; }
.blog-lead { max-width: 640px; margin-bottom: 32px; }

.blog-card {
  padding: 0; overflow: hidden; display: flex; flex-direction: column;
  min-height: 360px; text-decoration: none; color: inherit;
}
.blog-card:hover { text-decoration: none; }
.blog-card__thumb {
  aspect-ratio: 16 / 9;
  background-image: repeating-linear-gradient(135deg, #d6cebd 0 6px, #cdc4b0 6px 12px);
}
[data-theme="dark"] .blog-card__thumb {
  background-image: repeating-linear-gradient(135deg, #103847 0 6px, #1F4A59 6px 12px);
}
.blog-card__body { padding: 24px 24px 32px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.blog-card__title { font-size: 18px; line-height: 1.25; letter-spacing: -0.01em; color: var(--ink); }
.blog-card__excerpt { font-size: 14px; line-height: 1.5; color: var(--ink-quiet); flex: 1; }
.blog-card__meta {
  margin-top: auto; display: flex; gap: 8px;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em;
  color: var(--quiet); text-transform: uppercase;
}
.badge { align-self: flex-start; }
</style>
