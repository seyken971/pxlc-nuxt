<script setup lang="ts">
// Fil d'Ariane partagé — useBreadcrumbItems (@nuxtjs/seo) émet aussi le
// BreadcrumbList JSON-LD côté serveur (schemaOrg activé par défaut),
// signal de hiérarchie utilisé par Google pour les sitelinks.
const props = defineProps<{
  /** Libellés par segment, alignés sur l'index du chemin (racine incluse). */
  overrides?: { label: string }[]
}>()

const crumbs = useBreadcrumbItems({ overrides: props.overrides })
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
