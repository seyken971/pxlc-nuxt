<script setup lang="ts">
const { hydrate } = useTheme()

onMounted(() => {
  hydrate()
})
</script>

<template>
  <a class="skip-link" href="#main">Aller au contenu</a>
  <SiteHeader />
  <MobileMenu />
  <main id="main">
    <slot />
  </main>
  <CtaBlock />
  <SiteFooter />
</template>
