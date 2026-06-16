<script setup lang="ts">
import { computed } from 'vue'
import PxlcMark from '../app/components/PxlcMark.vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  to?: string
}
const props = withDefaults(defineProps<Props>(), { size: 'sm', to: '/' })
const markSize = computed(() => (props.size === 'lg' ? 56 : props.size === 'md' ? 40 : 36))
const nameSize = computed(() => (props.size === 'lg' ? 28 : 18))
</script>

<template>
  <a class="lockup" :href="props.to" aria-label="PXLC — accueil">
    <PxlcMark :size="markSize" />
    <span class="lockup__name" :style="{ fontSize: nameSize + 'px' }">
      PXLC<span class="coral-dot" aria-hidden="true">.</span>
    </span>
  </a>
</template>
