<script setup lang="ts">
// Head config — recommended Nuxt 4 pattern is to own this in app.vue
// rather than nuxt.config.ts so it stays reactive and colocated with
// the app's runtime concerns (theme anti-flash, etc.).
// `htmlAttrs.lang` is driven by `site.defaultLocale` in nuxt.config.ts
// (currently "fr_FR" → emitted as lang="fr-FR"). Setting it here too
// would duplicate the source of truth and risk drift.
useHead({
  // titleTemplate lives in nuxt.config.ts → seo.titleTemplate ('%s · %siteName')
  // so site.name is the single source of truth.
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/assets/img/favicon.svg" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/icon-32x32.png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  script: [
    {
      // Anti-flash: set data-theme before paint so the first render matches
      // the stored / system preference. Runs from <head> as a sync inline.
      innerHTML: `(function(){try{var s=localStorage.getItem('pxlc-theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
      tagPosition: "head",
      tagPriority: "critical",
    },
  ],
});

// Register the brand OG image as the site-wide default. Pages can override
// per-route via defineOgImage(...) if they want custom title/eyebrow.
defineOgImage("PxlcOg");
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
