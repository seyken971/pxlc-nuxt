<script setup lang="ts">
interface TocEntry {
  tag: string
  id: string
  label: string
}
interface Props {
  entries: TocEntry[]
}
const props = defineProps<Props>()
</script>

<template>
  <aside v-if="props.entries.length" class="toc" aria-labelledby="toc-title">
    <span id="toc-title" class="toc__title">Sommaire</span>
    <ol class="toc__list" role="list">
      <li v-for="e in props.entries" :key="e.id" class="toc__item">
        <a :href="`#${e.id}`" class="toc__link">{{ e.label }}</a>
      </li>
    </ol>
  </aside>
</template>

<style scoped>
.toc {
  background: var(--bg-soft);
  border: 1px solid var(--bg-rule);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  margin-bottom: 40px;
}
.toc__title {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase; color: var(--eyebrow);
  display: block; margin-bottom: var(--space-2-5);
}
.toc__list { list-style: decimal inside; padding: 0; margin: 0; display: grid; gap: 6px; }
.toc__item { font-size: 14px; line-height: 1.5; color: var(--ink-quiet); }
.toc__link { color: var(--teal-deep); transition: color var(--dur-fast); }
.toc__link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .toc__link { color: var(--cyan); }
</style>
