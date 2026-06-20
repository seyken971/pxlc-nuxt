<script setup lang="ts">
// Fil d'Ariane partagé — useBreadcrumbItems (@nuxtjs/seo) émet aussi le
// BreadcrumbList JSON-LD côté serveur (schemaOrg activé par défaut),
// signal de hiérarchie utilisé par Google pour les sitelinks.
const props = defineProps<{
  /** Libellé du segment final quand il n'est pas dans la nav (ex. titre d'article). */
  currentLabel?: string
}>()

const route = useRoute()
const { items: navItems } = useNav()

// Libellés repris de NAV_ITEMS (source unique, alignée header/footer) par
// correspondance de chemin ; currentLabel couvre le segment final hors nav.
const overrides = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const paths = ['/', ...segments.map((_, i) => '/' + segments.slice(0, i + 1).join('/'))]
  return paths.map((p, i) => {
    const nav = navItems.find(n => n.url === p)
    if (nav) return { label: nav.label }
    return i === paths.length - 1 && props.currentLabel ? { label: props.currentLabel } : undefined
  })
})

const crumbs = useBreadcrumbItems({ overrides })
</script>

<template>
  <nav class="breadcrumb" aria-label="Fil d'Ariane">
    <ol class="breadcrumb__list" role="list">
      <li v-for="c in crumbs" :key="c.to || c.label" class="breadcrumb__item">
        <NuxtLink v-if="c.to && !c.current" :to="c.to" class="breadcrumb__link">{{ c.label }}</NuxtLink>
        <span v-else class="breadcrumb__current" aria-current="page">{{ c.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb { margin-bottom: var(--space-3); }
.breadcrumb__list {
  display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center;
  list-style: none; padding: 0; margin: 0;
  font-family: var(--font-label); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--quiet);
}
.breadcrumb__item:not(:last-child)::after {
  content: "/"; margin-left: var(--space-2); color: var(--quiet);
}
/* Zone de tap ≥ 44 px sans grossir le libellé de 11 px. */
.breadcrumb__link, .breadcrumb__current {
  display: inline-flex; align-items: center; min-height: 44px;
}
.breadcrumb__link { color: var(--teal-deep); transition: color var(--dur-fast); }
.breadcrumb__link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .breadcrumb__link { color: var(--cyan); }
.breadcrumb__current { color: var(--ink); font-weight: 600; }
</style>
