<script setup lang="ts">
// 44 chars → 51 with " · PXLC" suffix from titleTemplate.
useSeoMeta({ title: 'Le journal — médiation numérique' })
if (import.meta.server) {
  useSeoMeta({
    description:
      'Ressources PXLC sur la médiation numérique — décryptages fondés sur les rapports HCSP, retours de terrain en SESSAD et repères pour les équipes et les familles.',
  })
}

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · LE JOURNAL',
  title: 'Décryptages, repères, retours de terrain',
  description: 'Ressources et décryptages de PXLC sur la médiation numérique — pour les familles et les équipes qui accompagnent.',
})

// `queryCollection` est l'API Nuxt Content v3 — tri descendant par date,
// brouillons exclus. Le schéma est défini dans content.config.ts.
const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'category', 'date', 'readingTime')
    .all(),
)

// Type this page as CollectionPage and reference each article in hasPart
// so Google understands the blog index as the parent of its posts.
useSchemaOrg([
  defineWebPage({
    '@type': ['WebPage', 'CollectionPage'],
    name: 'Le journal PXLC',
    description: 'Décryptages, repères et retours de terrain sur la médiation numérique Parents-Écran-Enfant en Guadeloupe.',
    hasPart: (posts.value || []).map(p => ({
      '@type': 'BlogPosting',
      '@id': `https://pxlc.fr${p.path}#article`,
      headline: p.title,
      url: `https://pxlc.fr${p.path}`,
    })),
  }),
])

// Categories distillées depuis les articles existants — pas de filtre si
// un seul est présent (anti-clutter).
const categories = computed(() => {
  const set = new Set<string>()
  ;(posts.value || []).forEach(p => p.category && set.add(p.category))
  return Array.from(set).sort()
})

const activeCategory = ref<string | null>(null)
const filteredPosts = computed(() => {
  const all = posts.value || []
  if (!activeCategory.value) return all
  return all.filter(p => p.category === activeCategory.value)
})

// Map a category to a thumbnail pattern modifier so cards aren't visually
// identical. Falls back to "default" if a new unknown category appears.
const thumbModifier = (category?: string): string => {
  if (!category) return 'default'
  const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (BLOG_CATEGORIES as readonly string[]).includes(slug) ? slug : 'default'
}

const categoryLabel = (slug?: string): string =>
  slug ? (BLOG_CATEGORY_LABELS[slug] ?? slug) : ''
</script>

<template>
  <!-- Page header — bg-soft + border-bottom per DS BlogPage -->
  <section class="section section--page blog-page-header">
    <div class="container">
      <span class="eyebrow eyebrow--lg">Le journal</span>
      <h1 class="blog-title">
        Décryptages, repères, retours de terrain<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead blog-lead">
        Décryptages et retours de terrain de PXLC, pour les familles et les équipes.
      </p>

      <div v-if="categories.length > 1" class="blog-filters" role="group" aria-label="Filtrer par catégorie">
        <button
          type="button"
          class="blog-filters__chip"
          :class="{ 'is-active': activeCategory === null }"
          :aria-pressed="activeCategory === null"
          @click="activeCategory = null"
        >Tous</button>
        <button
          v-for="c in categories"
          :key="c"
          type="button"
          class="blog-filters__chip"
          :class="{ 'is-active': activeCategory === c }"
          :aria-pressed="activeCategory === c"
          @click="activeCategory = c"
        >{{ categoryLabel(c) }}</button>
      </div>
    </div>
  </section>

  <!-- Cards grid -->
  <section class="section">
    <div class="container">
      <div v-if="filteredPosts.length" class="grid grid--3">
        <NuxtLink
          v-for="(p, idx) in filteredPosts"
          :key="p.path"
          :to="p.path"
          class="card card--hover blog-card"
        >
          <div
            class="blog-card__thumb"
            :class="`blog-card__thumb--${thumbModifier(p.category)}`"
            aria-hidden="true"
          >
            <PixelCorner />
          </div>
          <div class="blog-card__body">
            <div class="blog-card__badges">
              <span v-if="idx === 0 && !activeCategory" class="badge badge--new">Nouveau</span>
              <span class="badge">{{ categoryLabel(p.category) }}</span>
            </div>
            <h2 class="blog-card__title">{{ p.title }}</h2>
            <p v-if="p.description" class="blog-card__excerpt">{{ p.description }}</p>
            <div class="blog-card__meta">
              <time :datetime="p.date">{{ fmtDate(p.date) }}</time>
              <span v-if="p.readingTime" class="blog-card__rt">
                <Icon name="lucide:clock" aria-hidden="true" />{{ p.readingTime }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <p v-else class="lead mt-6">
        Aucun article dans la catégorie « {{ activeCategory }} » pour le moment.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Page header section — bg-soft + border-bottom per DS */
.blog-page-header {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--bg-rule);
  transition: background var(--dur-base);
}

.blog-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; margin-bottom: var(--space-4); }
.blog-lead { max-width: 640px; margin-bottom: var(--space-5); }

.blog-filters { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4); }
.blog-filters__chip {
  font-family: var(--font-body); font-size: 13px; font-weight: 500;
  padding: 8px 14px; border-radius: var(--radius-pill);
  background: transparent; color: var(--ink-quiet);
  border: 1px solid var(--rule); cursor: pointer;
  transition: color var(--dur-fast), border-color var(--dur-fast), background var(--dur-fast);
}
.blog-filters__chip:hover {
  color: var(--ink); border-color: var(--ink); background: var(--bg-soft);
}
.blog-filters__chip.is-active {
  color: var(--pxlc-text-ink); background: var(--pxlc-coral); border-color: var(--pxlc-coral);
}
.blog-filters__chip:focus-visible {
  outline: 3px solid var(--pxlc-coral); outline-offset: 2px;
}

.blog-card {
  padding: 0; overflow: hidden; display: flex; flex-direction: column;
  min-height: 360px; text-decoration: none; color: inherit;
}
.blog-card:hover { text-decoration: none; }
/* Each category gets its own thumbnail colour so the index is not a
   wall of identical cards. Light/dark variants follow the brand. */
.blog-card__thumb {
  aspect-ratio: 16 / 9;
  position: relative;
  background: var(--pxlc-pattern-warm-deep);
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0,
    transparent 6px,
    rgba(0, 0, 0, 0.04) 6px,
    rgba(0, 0, 0, 0.04) 7px
  );
}
.blog-card__thumb--parents      { background-color: var(--pxlc-ivory-soft); }
.blog-card__thumb--cas-pratique { background-color: var(--pxlc-pattern-warm); }
.blog-card__thumb--decryptage   { background-color: var(--pxlc-bg-light); }
.blog-card__thumb :deep(.pixel-corner) { position: absolute; bottom: 0; left: 0; }

[data-theme="dark"] .blog-card__thumb              { background-color: var(--pxlc-border-dark-2); }
[data-theme="dark"] .blog-card__thumb--parents     { background-color: var(--pxlc-bg-dark-soft); }
[data-theme="dark"] .blog-card__thumb--cas-pratique { background-color: var(--pxlc-border-dark); }
[data-theme="dark"] .blog-card__thumb--decryptage  { background-color: var(--pxlc-bg-dark-soft); }
[data-theme="dark"] .blog-card__thumb {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0,
    transparent 6px,
    rgba(255, 255, 255, 0.07) 6px,
    rgba(255, 255, 255, 0.07) 7px
  );
}
.blog-card__body { padding: var(--space-4) var(--space-4) var(--space-5); display: flex; flex-direction: column; gap: var(--space-2-5); flex: 1; }
.blog-card__badges { display: flex; flex-wrap: wrap; gap: var(--space-1-5); align-items: center; }
.badge--new { background: var(--pxlc-coral); color: var(--pxlc-text-ink); border-color: var(--pxlc-coral); }
.blog-card__title { font-size: 18px; line-height: 1.25; letter-spacing: -0.01em; color: var(--ink); }
.blog-card__excerpt { font-size: 14px; line-height: 1.5; color: var(--ink-quiet); flex: 1; }
.blog-card__meta {
  margin-top: auto; display: flex; gap: var(--space-2);
  font-family: var(--font-label); font-size: 11px; letter-spacing: 0.1em;
  color: var(--quiet); text-transform: uppercase;
}
.blog-card__rt { display: inline-flex; align-items: center; gap: 4px; }
.blog-card__rt svg { width: 11px; height: 11px; flex-shrink: 0; }
</style>
