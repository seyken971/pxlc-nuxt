<script setup lang="ts">
interface Props {
  count?: number
  accentAt?: number
}
const props = withDefaults(defineProps<Props>(), { count: 14, accentAt: 10 })
const cells = computed(() => Array.from({ length: props.count }, (_, i) => i))
</script>

<template>
  <span class="pixel-strip" aria-hidden="true">
    <span v-for="i in cells" :key="i" :class="{ 'is-accent': i === props.accentAt }" />
  </span>
</template>
