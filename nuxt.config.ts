// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  modules: [
    "@nuxt/a11y",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/seo",
  ],

  css: ["~/assets/css/styles.css"],

  // @nuxt/fonts auto-discovers families from font-family CSS, but it
  // only loads the weights it can detect inline. Sora 600 / DM Sans 500-600 /
  // JetBrains Mono 500-600 are set via CSS variables (not literal weights
  // next to the family name), so they're missed by auto-detection and the
  // browser synthesises a fake bold from weight 400 — producing the doubled
  // vertical strokes on letters like "l". Declaring them explicitly here.
  fonts: {
    families: [
      { name: "Sora", weights: [400, 500, 600, 700], provider: "google" },
      { name: "DM Sans", weights: [400, 500, 600], provider: "google" },
      { name: "JetBrains Mono", weights: [400, 500, 600], provider: "google" },
    ],
  },

  // The default component is registered via defineOgImage('PxlcOg') in
  // app.vue — @nuxt/og-image explicitly excludes `component` from
  // ogImage.defaults (it lives at call-site only).
  ogImage: {
    defaults: {
      width: 1200,
      height: 600,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
    },
  },

  // Head tags are owned by app.vue (useHead) — Nuxt 4 recommended pattern.
  // Only config-time options live here.
  app: {
    pageTransition: false,
    layoutTransition: false,
  },

  site: {
    url: "https://pxlc.fr",
    name: "PXLC - Médiation numérique pour les familles en Guadeloupe",
    description:
      "PXLC accompagne les familles et structures sociales de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
    defaultLocale: "fr_FR",
    trailingSlash: false,
    currency: "EUR",
  },

  robots: {
    groups: [
      {
        userAgent: "*",
        allow: "/",
        contentUsage: {
          search: "y",
          "train-ai": "n",
        },
        contentSignal: {
          search: "yes",
          "ai-input": "no",
          "ai-train": "no",
        },
      },
    ],
    sitemap: ["https://pxlc.fr/sitemap.xml"],
  },

  sitemap: {
    sources: ["https://pxlc.fr/sitemap.xml"],
  },

  seo: {
    meta: {
      twitterCard: "summary_large_image",
      // ogImage / twitterImage are produced dynamically by the og-image
      // module from the PxlcOg component (see ogImage.defaults below).
      themeColor: [
        { content: "#082B36", media: "(prefers-color-scheme: dark)" },
        { content: "#EAF6F4", media: "(prefers-color-scheme: light)" },
      ],
      description:
        "PXLC accompagne les familles et structures sociales de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
      author: "Andy Zébus",
      colorScheme: "dark light",
      twitterTitle:
        "PXLC - Médiation numérique pour les familles en Guadeloupe",
      twitterCreator: "@seyken971",
      ogSiteName: "PXLC",
      ogLocale: "fr_FR",
      ogType: "website",
      ogUrl: "https://pxlc.fr",
      ogTitle: "PXLC - Médiation numérique pour les familles en Guadeloupe",
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      ogDescription:
        "PXLC - Médiation numérique pour les familles en Guadeloupe",
      // Social Media
      //twitterSite: "@mysite",

      // App Info
      //applicationName: "My App",
    },
  },

  schemaOrg: {
    identity: {
      type: "LocalBusiness",
      logo: "/logo.svg",
      name: "PXLC",
      alternateName: "Pixels Caraïbes",
      legalName: "Andy Zébus - Entrepreneur individuel",
      description:
        "PXLC accompagne les familles et structures sociales de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
      url: "https://pxlc.fr",
      email: "contact@pxlc.fr",
      telephone: "+590690717618",
      contactPoint: {
        contactType: "Prise de contact",
        email: "contact@pxlc.fr",
        telephone: "+590690717618",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "8 Résidence la familiale, rue Man Manigard Alfred, Dugazon",
        addressLocality: "Les Abymes",
        postalCode: "97139",
        addressRegion: "Guadeloupe",
        addressCountry: "FR",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Guadeloupe",
      },
      foundingDate: "2015",
      founder: "Andy Zébus",
      sameAs: [
        "https://www.linkedin.com/in/azebus",
        "https://www.github.com/seyken971",
        "https://www.instagram.com/seyken971",
        "https://www.twitter.com/seyken971",
        "https://bsky.app/profile/seyken.pxlc.fr",
      ],
    },
  },

  // ogImage: {
  //   zeroRuntime: true,
  // },
});
