<script setup lang="ts">
interface Props { partners?: string[] }
withDefaults(defineProps<Props>(), {
  partners: () => ['Esports Guadeloupe', 'SESSAD Lékoklaya'],
})
</script>

<template>
  <section class="partners" aria-label="Partenaires et structures de confiance">
    <div class="container partners__inner">
      <span class="partners__label">Ils m’ont fait confiance</span>
      <ul class="partners__list" role="list">
        <li v-for="p in partners" :key="p" class="partners__item">{{ p }}</li>
      </ul>
    </div>
  </section>
</template>
