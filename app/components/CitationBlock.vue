<script setup lang="ts">
interface Props {
  source: string
  quote: string
  attribution: string
  soft?: boolean
}
withDefaults(defineProps<Props>(), { soft: true })
</script>

<template>
  <section class="section" :class="{ 'section--soft': soft }" aria-label="Référence institutionnelle">
    <div class="container">
      <figure class="citation">
        <div class="citation__source">{{ source }}</div>
        <blockquote class="citation__quote">
          <span class="quotemark" aria-hidden="true">«&nbsp;</span>{{ quote }}<span class="quotemark" aria-hidden="true">&nbsp;»</span>
        </blockquote>
        <figcaption class="citation__attr">{{ attribution }}</figcaption>
      </figure>
    </div>
  </section>
</template>
