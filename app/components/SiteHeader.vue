<script setup lang="ts">
const { items, isActive } = useNav()
const menuOpen = useState<boolean>('pxlc-menu-open', () => false)

// Scrolled state: tightens header padding and adds a soft shadow once the
// user has scrolled past the very top. Pure scroll listener, throttled
// via rAF to stay cheap.
const isScrolled = ref(false)
let scrollRaf = 0
const onScroll = () => {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 8
    scrollRaf = 0
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', onScroll)
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container site-header__inner">
      <Lockup />

      <nav class="site-nav" aria-label="Navigation principale">
        <NuxtLink
          v-for="n in items"
          :key="n.url"
          :to="n.url"
          class="site-nav__link"
          :class="{ 'is-active': isActive(n.url) }"
          :aria-current="isActive(n.url) ? 'page' : undefined"
        >{{ n.label }}</NuxtLink>
      </nav>

      <div class="site-header__right">
        <ThemeToggle />

        <a
          href="https://cal.eu/pxlc-gp"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--primary site-header__cta"
          aria-label="Réserver un échange (nouvel onglet)"
        >Réserver</a>

        <button
          type="button"
          class="burger"
          :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>
