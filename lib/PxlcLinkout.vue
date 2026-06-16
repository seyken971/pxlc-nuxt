<script setup lang="ts">
defineProps<{ to: string }>()
</script>

<template>
  <a class="linkout" :href="to"><slot /></a>
</template>
