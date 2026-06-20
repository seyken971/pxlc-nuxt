<script setup lang="ts">
const { items, isActive } = useNav()
const route = useRoute()
const menuOpen = useState<boolean>('pxlc-menu-open', () => false)

const closeBtn = ref<HTMLButtonElement | null>(null)
const menuRoot = ref<HTMLElement | null>(null)

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

// Sélecteur des éléments focusables du menu — base du piège de focus.
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Tant que le menu (role="dialog" aria-modal) est ouvert, on confine le focus :
// Échap ferme ; Tab / Maj+Tab bouclent entre le premier et le dernier élément
// focusable ; tout focus égaré hors du menu est ramené dedans. Sans ce piège,
// Tab atteignait les liens situés derrière l'overlay.
const onKeydown = (e: KeyboardEvent) => {
  if (!menuOpen.value) return
  if (e.key === 'Escape') { closeAndRestore(); return }
  if (e.key !== 'Tab') return

  const root = menuRoot.value
  if (!root) return
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE))
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  if (!first || !last) return

  const active = document.activeElement
  if (!root.contains(active)) {
    e.preventDefault()
    first.focus()
  }
  else if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  }
  else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
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
    ref="menuRoot"
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
      <PxlcPixelStrip :count="7" :accent-at="4" />
    </div>

    <!-- Header row: lockup + close button -->
    <div class="mobile-menu__head">
      <PxlcLockup @click="close" />
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
        Prendre rendez-vous
      </a>
    </div>
  </div>
</template>
