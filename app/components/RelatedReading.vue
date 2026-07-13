<script setup lang="ts">
// Bloc de maillage interne pour les pages d'offre (/structures, /a-propos) :
// elles ne pointaient vers aucun article. On y liste 2-3 piliers choisis à la
// main, par chemin, pour distribuer l'autorité vers le blog et aider la
// découverte. Distinct de BlogRelated (auto, contexte blog) : ici la sélection
// est éditoriale et passée en prop.
interface Post {
  path: string
  title: string
  description?: string
  category?: string
  date: string
}
interface Props {
  /** Chemins /blog/<slug> à mettre en avant, dans l'ordre d'affichage. */
  paths: string[]
  /** Surtitre de section. */
  eyebrow?: string
  /** Titre de section (h2). */
  title: string
}
const props = withDefaults(defineProps<Props>(), { eyebrow: 'À lire' })

const headingId = useId()

// Une requête, puis on conserve l'ordre demandé. where('draft', '<>', true)
// pour ne jamais afficher un brouillon — même garde que BlogRelated.
const { data: posts } = await useAsyncData(
  `related-reading-${props.paths.join(',')}`,
  () =>
    queryCollection('blog')
      .where('draft', '<>', true)
      .select('path', 'title', 'description', 'category', 'date')
      .all(),
)

const items = computed<Post[]>(() => {
  const byPath = new Map(((posts.value as Post[]) || []).map(p => [p.path, p]))
  return props.paths
    .map(p => byPath.get(p))
    .filter((p): p is Post => Boolean(p))
})
</script>

<template>
  <section v-if="items.length" class="related-reading" :aria-labelledby="headingId">
    <div class="container related-reading__inner">
      <header class="section__head">
        <span class="eyebrow">{{ props.eyebrow }}</span>
        <h2 :id="headingId">{{ props.title }}<span class="coral-dot" aria-hidden="true">.</span></h2>
      </header>
      <ul class="related-reading__list" role="list">
        <li v-for="p in items" :key="p.path" class="related-reading__item">
          <NuxtLink :to="p.path + '/'" class="related-reading__link">
            <span v-if="p.category" class="badge">{{ p.category }}</span>
            <h3 class="related-reading__post-title">{{ p.title }}</h3>
            <p v-if="p.description" class="related-reading__excerpt">{{ p.description }}</p>
            <span class="related-reading__more">Lire l’article</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.related-reading {
  padding: clamp(40px, 6vw, 64px) 0;
}
.related-reading__list {
  list-style: none; padding: 0; margin: var(--space-4) 0 0;
  display: grid; gap: var(--space-3); grid-template-columns: 1fr;
}
@media (min-width: 600px) { .related-reading__list { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .related-reading__list { grid-template-columns: repeat(3, 1fr); } }

.related-reading__item { display: flex; }
.related-reading__link {
  display: flex; flex-direction: column; gap: var(--space-2);
  padding: var(--space-3); width: 100%;
  background: var(--bg-elev); border: 1px solid var(--rule); border-radius: var(--radius-md);
  color: inherit; transition: border-color var(--dur-fast), transform var(--dur-fast);
}
.related-reading__link:hover {
  border-color: var(--pxlc-coral); text-decoration: none;
  transform: translateY(-2px);
}
.related-reading__post-title { font-size: 16px; line-height: 1.3; color: var(--ink); }
.related-reading__excerpt { font-size: 13.5px; line-height: 1.5; color: var(--ink-quiet); flex: 1; }
.related-reading__more {
  margin-top: auto;
  font-family: var(--font-label); font-size: 11px; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--teal-deep);
}
[data-theme="dark"] .related-reading__more { color: var(--cyan); }
.badge { align-self: flex-start; }
</style>
