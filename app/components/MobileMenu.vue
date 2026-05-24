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
    <div class="mobile-menu__head">
      <Lockup @click="close" />
      <div class="mobile-menu__head-actions">
        <ThemeToggle />
        <button
          ref="closeBtn"
          type="button"
          class="mobile-menu__close"
          aria-label="Fermer le menu"
          @click="closeAndRestore"
        >✕</button>
      </div>
    </div>
    <nav class="mobile-menu__nav" aria-label="Navigation mobile">
      <NuxtLink
        v-for="n in items"
        :key="n.url"
        :to="n.url"
        class="mobile-menu__link"
        :class="{ 'is-active': isActive(n.url) }"
        @click="close"
      >{{ n.label }}</NuxtLink>
      <a
        href="/files/plaquette-pxlc.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Télécharger la plaquette (PDF, 12 pages, nouvel onglet)"
        class="mobile-menu__link"
        @click="close"
      >Télécharger la plaquette</a>
    </nav>
    <div class="mobile-menu__cta">
      <a
        href="https://cal.eu/pxlc-gp"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--primary btn--block btn--lg"
        @click="close"
      >
        Réserver un échange
      </a>
      <a
        href="https://wa.me/590690717618"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--ghost btn--block btn--lg mobile-menu__cta-secondary"
        @click="close"
      >
        WhatsApp
      </a>
    </div>
  </div>
</template>
