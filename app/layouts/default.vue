<script setup lang="ts">
const { hydrate } = useTheme()
const route = useRoute()

// Pages can opt out of the global CTA via
//   definePageMeta({ hideGlobalCta: true })
// — used today by /contact (already heavy in cal.eu CTAs) and
// /mentions-legales (legal page, no marketing). Default: show.
const showGlobalCta = computed(() => !route.meta.hideGlobalCta)

let cleanupTheme: (() => void) | undefined
onMounted(() => { cleanupTheme = hydrate() })
onUnmounted(() => cleanupTheme?.())
</script>

<template>
  <a class="skip-link" href="#main">Aller au contenu</a>
  <SiteHeader />
  <MobileMenu />
  <!-- tabindex="-1" makes <main> a valid focus target so the skip link
       actually moves focus (and screen-reader virtual cursor) into the
       page content instead of just scrolling past the header. -->
  <main id="main" tabindex="-1">
    <slot />
  </main>
  <CtaBlock v-if="showGlobalCta" />
  <SiteFooter />
</template>
