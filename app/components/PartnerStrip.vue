<script setup lang="ts">
interface Props { partners?: string[] }
withDefaults(defineProps<Props>(), {
  partners: () => ['Esports Guadeloupe', 'SESSAD Lékoklaya'],
})
</script>

<template>
  <section class="partners" aria-label="Partenaires et structures de confiance">
    <div class="container partners__inner">
      <span class="partners__label">Partenaires de confiance</span>
      <ul class="partners__list" role="list">
        <li v-for="p in partners" :key="p" class="partners__item">{{ p }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.partners { background: var(--bg-soft); border-top: 1px solid var(--bg-rule); border-bottom: 1px solid var(--bg-rule); padding: var(--space-4) 0; }
.partners__inner { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-5); justify-content: space-between; }
.partners__label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--quiet); }
.partners__list { display: flex; flex-wrap: wrap; gap: clamp(16px, 3vw, 48px); align-items: center; list-style: none; padding: 0; margin: 0; }
.partners__item {
  display: flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-display); font-weight: 500; font-size: 15px;
  /* No opacity multiplier — diluting --quiet by 15% pushed the
     effective text below WCAG AA contrast on --bg-soft. */
  color: var(--quiet);
}
.partners__item::before { content: ""; width: 10px; height: 10px; background: var(--rule); border-radius: 2px; }
</style>
