<script setup lang="ts">
interface Props {
  size?: number
  decorative?: boolean
}
const props = withDefaults(defineProps<Props>(), { size: 36, decorative: false })
</script>

<template>
  <svg
    class="mark-svg lockup__mark"
    viewBox="0 0 100 100"
    :width="props.size"
    :height="props.size"
    :role="props.decorative ? undefined : 'img'"
    :aria-label="props.decorative ? undefined : 'Logo PXLC'"
    :aria-hidden="props.decorative ? 'true' : undefined"
  >
    <rect x="2"     y="2"     width="29.33" height="29.33" rx="3.5" fill="#036E73" />
    <rect x="35.33" y="2"     width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
    <rect x="68.67" y="2"     width="29.33" height="29.33" rx="3.5" fill="#00D2C8" />
    <rect x="2"     y="35.33" width="29.33" height="29.33" rx="3.5" fill="#036E73" />
    <rect x="35.33" y="35.33" width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
    <rect x="68.67" y="35.33" width="29.33" height="29.33" rx="3.5" fill="#00D2C8" />
    <rect x="2"     y="68.67" width="29.33" height="29.33" rx="3.5" fill="#036E73" />
    <rect x="35.33" y="68.67" width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
    <rect x="68.67" y="68.67" width="29.33" height="29.33" rx="3.5" fill="#FF5E3A" />
  </svg>
</template>
