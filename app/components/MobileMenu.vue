<script setup lang="ts">
const { items } = useNav()
const { theme, toggle } = useTheme()
const route = useRoute()
const menuOpen = useState<boolean>('pxlc-menu-open', () => false)

const closeBtn = ref<HTMLButtonElement | null>(null)

const isActive = (url: string) => {
  if (url === '/') return route.path === '/'
  return route.path === url || route.path.startsWith(url + '/')
}

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
  >
    <div class="mobile-menu__head">
      <Lockup @click="close" />
      <div class="mobile-menu__head-actions">
        <button
          type="button"
          class="theme-toggle theme-toggle--on-dark"
          aria-label="Basculer le thème clair/sombre"
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
        rel="noopener"
        class="mobile-menu__link"
        @click="close"
      >Plaquette PDF · 12 p.</a>
    </nav>
    <div class="mobile-menu__cta">
      <a
        href="https://cal.eu/pxlc-gp"
        target="_blank"
        rel="noopener"
        class="btn btn--primary btn--block btn--lg"
        @click="close"
      >
        Réserver un échange
      </a>
      <a
        href="https://wa.me/590690717618"
        target="_blank"
        rel="noopener"
        class="btn btn--ghost btn--block btn--lg mobile-menu__cta-secondary"
        @click="close"
      >
        WhatsApp
      </a>
    </div>
  </div>
</template>
