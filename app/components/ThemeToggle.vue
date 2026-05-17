<script setup lang="ts">
interface Props {
  variant?: 'default' | 'on-dark'
}
const props = withDefaults(defineProps<Props>(), { variant: 'default' })
const { theme, toggle } = useTheme()
const label = computed(() =>
  theme.value === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre',
)
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'theme-toggle--on-dark': props.variant === 'on-dark' }"
    :aria-label="label"
    :aria-pressed="theme === 'dark'"
    @click="toggle"
  >
    <svg class="icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <svg class="icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  </button>
</template>
