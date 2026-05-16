<script setup lang="ts">
const cells = [
  'is-on', '', 'is-accent',
  '', 'is-on', '',
  'is-on', '', 'is-on',
]
</script>

<template>
  <span class="pixel-corner" aria-hidden="true">
    <span v-for="(c, i) in cells" :key="i" :class="c" />
  </span>
</template>
