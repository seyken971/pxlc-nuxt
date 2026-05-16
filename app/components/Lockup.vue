<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  to?: string
}
const props = withDefaults(defineProps<Props>(), { size: 'sm', to: '/' })
const markSize = computed(() => (props.size === 'lg' ? 56 : props.size === 'md' ? 40 : 36))
const nameSize = computed(() => (props.size === 'lg' ? 28 : 18))
// Tag size: 10 (small) / 11 (md) / 12 (large). Was 9 / 11 — 9 px is
// unreadable on standard displays and visually disintegrates into dots
// stacked under the wordmark.
const tagSize = computed(() => (props.size === 'lg' ? 12 : props.size === 'md' ? 11 : 10))
</script>

<template>
  <NuxtLink class="lockup" :to="props.to" aria-label="PXLC — Pixels Caraïbes — accueil">
    <PxlcMark :size="markSize" />
    <span class="lockup__text">
      <span class="lockup__name" :style="{ fontSize: nameSize + 'px' }"
        >PXLC<span class="coral-dot" aria-hidden="true">.</span></span>
      <span class="lockup__tag" :style="{ fontSize: tagSize + 'px' }">Pixels Caraïbes</span>
    </span>
  </NuxtLink>
</template>
