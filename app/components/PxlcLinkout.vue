<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
defineProps<{ to: RouteLocationRaw }>()
</script>

<template>
  <NuxtLink class="linkout" :to="to"><slot /></NuxtLink>
</template>
