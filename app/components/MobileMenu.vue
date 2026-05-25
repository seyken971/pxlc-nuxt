<script setup lang="ts">
const { items, isActive } = useNav()
const route = useRoute()
const menuOpen = useState<boolean>('pxlc-menu-open', () => false)

const closeBtn = ref<HTMLButtonElement | null>(null)

const close = () => { menuOpen.value = false }

// Return focus to the burger trigger after explicit dismissals (✕ or Escape).
// Route-change closes are handled by Nuxt's natural focus reset, so we don't
// force focus back there.
const closeAndRestore = () => {
  close()
  if (!import.meta.client) return
  nextTick(() => {
    document.querySelector<HTMLButtonElement>('.burger')?.focus()
  })
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && menuOpen.value) closeAndRestore()
}

watch(menuOpen, async (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    closeBtn.value?.focus()
  }
})

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})

watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <div
    id="mobile-menu"
    class="mobile-menu"
    :class="{ 'is-open': menuOpen }"
    :inert="!menuOpen"
    role="dialog"
    aria-modal="true"
    aria-label="Menu de navigation"
  >
    <!-- Decorative: PxlcMark watermark (bottom-right, 7 % opacity) -->
    <div class="mobile-menu__watermark">
      <PxlcMark :size="400" :decorative="true" />
    </div>

    <!-- Decorative: pixel strip (top-right, 40 % opacity) -->
    <div class="mobile-menu__strip">
      <PixelStrip :count="7" :accent-at="5" />
    </div>

    <!-- Header row: lockup + close button -->
    <div class="mobile-menu__head">
      <Lockup @click="close" />
      <button
        ref="closeBtn"
        type="button"
        class="mobile-menu__close"
        aria-label="Fermer le menu"
        @click="closeAndRestore"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Nav links — staggered entrance via --i CSS custom property -->
    <nav class="mobile-menu__nav" aria-label="Navigation mobile">
      <NuxtLink
        v-for="(n, i) in items"
        :key="n.url"
        :to="n.url"
        class="mobile-menu__link"
        :class="{ 'is-active': isActive(n.url) }"
        :aria-current="isActive(n.url) ? 'page' : undefined"
        :style="{ '--i': i }"
        @click="close"
      >
        {{ n.label }}
        <span class="mobile-menu__arrow" aria-hidden="true">→</span>
      </NuxtLink>
    </nav>

    <!-- Bottom bar: primary CTA only — ThemeToggle is already in the header -->
    <div class="mobile-menu__bottom">
      <a
        href="https://cal.eu/pxlc-gp"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--primary mobile-menu__cta-btn"
        @click="close"
      >
        Réserver un échange
      </a>
    </div>
  </div>
</template>
