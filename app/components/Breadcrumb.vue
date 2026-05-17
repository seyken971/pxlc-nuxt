<script setup lang="ts">
interface Crumb {
  label: string
  /** Absolute path (e.g. /blog). Leave empty/undefined for the current page. */
  to?: string
}
interface Props {
  items: Crumb[]
}
const props = defineProps<Props>()

// BreadcrumbList JSON-LD — Google rich result. Each crumb gets a position;
// only items with a `to` become clickable in the schema (Google requires
// the item URL to be absolute for ranking).
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: props.items.map((c, i) => ({
      name: c.label,
      ...(c.to ? { item: `https://pxlc.fr${c.to}` } : {}),
      position: i + 1,
    })),
  }),
])
</script>

<template>
  <nav class="breadcrumb" aria-label="Fil d’Ariane">
    <ol class="breadcrumb__list" role="list">
      <li
        v-for="(c, i) in props.items"
        :key="`${c.label}-${i}`"
        class="breadcrumb__item"
      >
        <NuxtLink v-if="c.to" :to="c.to" class="breadcrumb__link">{{ c.label }}</NuxtLink>
        <span v-else class="breadcrumb__current" aria-current="page">{{ c.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb { margin-bottom: 24px; }
.breadcrumb__list {
  display: flex; flex-wrap: wrap; gap: 8px;
  list-style: none; padding: 0; margin: 0;
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--quiet);
}
.breadcrumb__item:not(:last-child)::after {
  content: "/"; margin-left: 8px; color: var(--quiet);
}
.breadcrumb__link { color: var(--teal-deep); transition: color 120ms; }
.breadcrumb__link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .breadcrumb__link { color: var(--cyan); }
.breadcrumb__current { color: var(--ink); font-weight: 600; }
</style>
