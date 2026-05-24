<template>
  <div class="mark-separator" aria-hidden="true">
    <span class="mark-separator__line" />
    <PxlcMark :size="18" decorative />
    <span class="mark-separator__line" />
  </div>
</template>

<style scoped>
.mark-separator {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: clamp(24px, 4vw, 40px) 0;
  max-width: 320px;
  margin: 0 auto;
}

.mark-separator__line {
  flex: 1;
  height: 1px;
  background: var(--rule);
}
</style>
