// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === "development"

export default defineNuxtConfig({
  compatibilityDate: "2026-05-17",
  // Devtools belong in dev only. Leaving them on in prod meant the
  // production bundle was pre-bundling @vue/devtools-* via optimizeDeps,
  // which is wasted weight in a static marketing build.
  devtools: { enabled: isDev },
  vite: isDev
    ? { optimizeDeps: { include: ["@vue/devtools-core", "@vue/devtools-kit"] } }
    : {},

  modules: [
    // Trimmed from the starter set — @nuxt/a11y, @nuxt/hints, @nuxt/icon
    // and @nuxt/scripts were installed but never referenced anywhere.
    // @nuxt/icon in particular broke prerendering with an unresolved
    // createRequire(import.meta.url) call in its server bundle.
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
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
  // `zeroRuntime: true` makes the og-image module prerender every OG PNG
  // at build time and ship them as static files — required for GitHub
  // Pages (no Node runtime to generate images on demand).
  ogImage: {
    defaults: {
      width: 1200,
      height: 600,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
    },
    zeroRuntime: true,
  },

  // SSG for GitHub Pages — crawl every internal link from `/` and turn
  // the whole site into static HTML/CSS/JS/images under `.output/public/`.
  // Blog routes come from @nuxt/content's auto-prerender hook.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      // Fail fast — a broken prerender used to slip through silently and
      // ship a half-built site. If a route 500s, the CI build now stops
      // and the deploy doesn't go out.
      failOnError: true,
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
    name: "PXLC",
    // B2B-only funnel: the offer flows exclusively through structures
    // (SESSAD, IME, associations, collectivités). Earlier wording said
    // "les familles", which we removed everywhere else — config follows.
    description:
      "PXLC accompagne les SESSAD, IME, associations et collectivités de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
    defaultLocale: "fr_FR",
    trailingSlash: false,
    currency: "EUR",
  },

  // `@nuxtjs/robots` est la SEULE source de vérité pour robots.txt.
  // Le fichier public/_robots.txt (legacy Jekyll) a été supprimé — il
  // dupliquait le bloc `User-agent: *` parce que le module fusionne
  // public/_robots.txt avec ce config block.
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
      // Disallow explicite pour les principaux scrapers IA — équivalent
      // de blockAiBots:true du module, mais listés ici pour traçabilité.
      ...[
        "GPTBot",
        "ChatGPT-User",
        "Claude-Web",
        "anthropic-ai",
        "Applebot-Extended",
        "Bytespider",
        "CCBot",
        "cohere-ai",
        "Diffbot",
        "FacebookBot",
        "Google-Extended",
        "ImagesiftBot",
        "PerplexityBot",
        "OmigiliBot",
        "Omigili",
      ].map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: ["https://pxlc.fr/sitemap.xml"],
  },

  // Le sitemap est auto-généré à partir des routes prérendues par
  // @nuxtjs/seo. Pas de `sources` externe — l'ancien Jekyll au même
  // domaine remontait des routes mortes (/ateliers, /presse).

  seo: {
    meta: {
      twitterCard: "summary_large_image",
      // ogImage / twitterImage are produced dynamically by the og-image
      // module from the PxlcOg component (see ogImage.defaults below).
      themeColor: [
        { content: "#082B36", media: "(prefers-color-scheme: dark)" },
        { content: "#EAF6F4", media: "(prefers-color-scheme: light)" },
      ],
      // Default description — only used as fallback when a page doesn't
      // call useSeoMeta({ description }). @nuxtjs/seo's inferSeoMeta
      // plugin then propagates the page-level value to ogDescription and
      // twitterDescription automatically.
      description:
        "PXLC accompagne les SESSAD, IME, associations et collectivités de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
      author: "Andy Zébus",
      // light listed first = preferred when the user has no preference.
      colorScheme: "light dark",
      twitterCreator: "@seyken971",
      ogSiteName: "PXLC",
      ogLocale: "fr_FR",
      ogType: "website",
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      // NB: do NOT set ogTitle / ogDescription / twitterTitle / ogUrl here.
      // When global defaults exist for those, they override the per-page
      // values inferred from useSeoMeta({ title, description }) — meaning
      // every page would share the same social preview. Let inference do
      // its job; pages can still call useSeoMeta to customize.
    },
  },

  schemaOrg: {
    identity: {
      type: "LocalBusiness",
      logo: "/logo.svg",
      name: "PXLC",
      alternateName: "Pixels Caraïbes",
      // Aligned on the mentions-legales page wording: em-dash + capital
      // "Individuel" (the INSEE-conformant form for EI).
      legalName: "Andy Zébus — Entrepreneur Individuel",
      description:
        "PXLC accompagne les SESSAD, IME, associations et collectivités de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
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
});
