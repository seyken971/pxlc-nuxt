<script setup lang="ts">
const { items } = useNav()
const { theme, toggle } = useTheme()
const route = useRoute()
const menuOpen = useState<boolean>('pxlc-menu-open', () => false)

const isActive = (url: string) => {
  if (url === '/') return route.path === '/'
  return route.path === url || route.path.startsWith(url + '/')
}
</script>

<template>
  <header class="site-header" role="banner">
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
        <button
          type="button"
          class="theme-toggle"
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

        <a
          v-if="route.path !== '/'"
          href="https://cal.eu/pxlc-gp"
          target="_blank"
          rel="noopener"
          class="btn btn--primary site-header__cta"
        >Réserver</a>

        <button
          type="button"
          class="burger"
          aria-label="Ouvrir le menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>
