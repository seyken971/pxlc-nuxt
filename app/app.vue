<script setup lang="ts">
// Entités globales du graphe schema.org — présentes sur TOUTES les pages.
// #identity (Organization) est déclaré via schemaOrg.identity dans nuxt.config.ts.
// Note : schemaOrg.identity.logo génère un nœud #organization (comportement interne
//   nuxt-schema-org non suppressible) — le validator ne remonte pas d'erreur dessus.
// #andy et #service sont ici car ils sont référencés depuis plusieurs pages :
//   - #andy : author des BlogPosting dans blog/[...slug].vue
//   - #service : offre principale, utile sur homepage et blog aussi
useSchemaOrg([
  definePerson({
    '@id': 'https://pxlc.fr/#andy',
    name: 'Andy Zébus',
    jobTitle: 'Gamer médiateur-numérique',
    description:
      'Médiateur numérique par le jeu vidéo, basé aux Abymes (Guadeloupe). Ateliers parent-enfant ancrés dans les rapports HCSP 2019-2020, en partenariat avec les structures médico-sociales et associatives.',
    image: 'https://pxlc.fr/assets/img/photos/andy-portrait.jpg',
    url: 'https://pxlc.fr/a-propos',
    worksFor: { '@id': 'https://pxlc.fr/#identity' },
    sameAs: [
      'https://www.linkedin.com/in/azebus',
      'https://www.github.com/seyken971',
      'https://www.instagram.com/seyken971',
      'https://www.twitter.com/seyken971',
      'https://bsky.app/profile/seyken.pxlc.fr',
    ],
  }),
  {
    '@id': 'https://pxlc.fr/#service',
    '@type': 'Service',
    name: 'Médiation numérique par le jeu — Programmes PXLC',
    description:
      "Programmes de médiation numérique sur mesure pour les structures médico-sociales et associatives. Programme phare : Parents-Écran-Enfant, ateliers thématiques parent-enfant co-encadrés par l'équipe pluridisciplinaire. Cadre HCSP 2019-2020.",
    serviceType: 'Médiation numérique',
    provider: { '@id': 'https://pxlc.fr/#identity' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Guadeloupe' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'SESSAD, IME, associations, collectivités',
    },
  },
])

// Head config — recommended Nuxt 4 pattern is to own this in app.vue
// rather than nuxt.config.ts so it stays reactive and colocated with
// the app's runtime concerns (theme anti-flash, etc.).
// `htmlAttrs.lang` is driven by `site.defaultLocale` in nuxt.config.ts
// (currently "fr_FR" → emitted as lang="fr-FR"). Setting it here too
// would duplicate the source of truth and risk drift.
useHead({
  // %s = page title, %siteName resolved from site.name in nuxt.config.ts.
  // Budget: keep per-page titles ≤53 chars so the full <title> stays ≤60.
  titleTemplate: '%s · %siteName',
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
