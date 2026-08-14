<script setup lang="ts">
// Canonical pattern from pxlc-site/_includes/pixel-corner.html — an
// L-pointer toward the bottom-right cell, mirroring the brand's "the
// 3×3 grid resolves a coral period in its bottom-right cell" identity.
//
//   off | off | on
//   off | off | on
//   off | off | accent
//
const cells: string[] = [
  'is-off', 'is-off', 'is-on',
  'is-off', 'is-off', 'is-on',
  'is-off', 'is-off', 'is-accent',
]
</script>

<template>
  <span class="pixel-corner" aria-hidden="true">
    <span v-for="(c, i) in cells" :key="i" :class="c" />
  </span>
</template>
