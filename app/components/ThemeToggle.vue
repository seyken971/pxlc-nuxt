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
    <Icon name="lucide:moon" class="icon--moon" aria-hidden="true" />
    <Icon name="lucide:sun" class="icon--sun" aria-hidden="true" />
  </button>
</template>
