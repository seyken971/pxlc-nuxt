// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === "development";

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
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/seo",
    // Détecte les liens cassés à la génération (SSG fail-fast).
    // Dev: overlay inline. Build: rapport console + exit 1 si lien mort.
    "nuxt-link-checker",
  ],

  // @nuxt/eslint regenerates a flat config (eslint.config.mjs) that
  // imports our project-aware rules + Nuxt's built-in rule set (Vue 3,
  // auto-imports, typescript). Keep `standalone: false` so the module
  // wires itself into Nuxt's lifecycle instead of expecting a separate
  // ESLint server.
  eslint: {
    config: {
      stylistic: false,
    },
  },

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
      // optional avoids FOUT entirely — no font-swap after initial render,
      // so the eyebrow/kicker elements (mono font, many above fold on
      // /pour-les-structures) stop contributing to CLS.
      {
        name: "JetBrains Mono",
        weights: [400, 500, 600],
        provider: "google",
        display: "optional",
      },
    ],
  },

  // The default component is registered via defineOgImage('PxlcOg') in
  // app.vue — @nuxt/og-image explicitly excludes `component` from
  // ogImage.defaults (it lives at call-site only).
  // `zeroRuntime: true` makes the og-image module prerender every OG PNG
  // at build time and ship them as static files — required for GitHub
  // Pages (no Node runtime to generate images on demand).
  // Bundle only the 3 share icons at build time — no CDN call needed in SSG.
  // localApiEndpoint avoids the createRequire(import.meta.url) server-bundle
  // crash seen with older versions when the API endpoint ran server-side.
  icon: {
    clientBundle: {
      icons: [
        "simple-icons:linkedin",
        "simple-icons:x",
        "simple-icons:whatsapp",
        "lucide:mail",
        "lucide:message-square",
        "lucide:calendar",
        "lucide:moon",
        "lucide:sun",
      ],
      scan: false,
    },
  },

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
  // nuxt-og-image v6.5 computes island hashes without context/source, but
  // Nuxt 4.4 added both to computeIslandHash. Override in all build contexts
  // to match nuxt-og-image's computation until it ships a compatibility fix.
  alias: {
    '#app/island-hash': './server/island-hash-compat.mjs',
  },

  nitro: {
    alias: {
      '#app/island-hash': './server/island-hash-compat.mjs',
    },
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
  // Pas de `contentUsage` / `contentSignal` ici : ce sont des directives
  // forward-looking (proposition Anthropic et al.) que Lighthouse rejette
  // comme "Unknown directive" — -8pts SEO sitewide pour un signal que
  // quasi aucun crawler n'honore encore. blockAiBots: true couvre le
  // besoin réel via la liste maintenue par le module.
  robots: {
    blockAiBots: true,
    groups: [{ userAgent: "*", allow: "/" }],
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
      // description vient de site.description — @nuxtjs/seo la propage
      // automatiquement vers og:description / twitter:description.
      // Ne pas la dupliquer ici pour éviter la dérive entre les deux sources.
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
      taxID: "813 793 528 00031",
      description:
        "PXLC accompagne les SESSAD, IME, associations et collectivités de Guadeloupe avec des ateliers Parent–Écran–Enfant.",
      url: "https://pxlc.fr",
      email: "contact@pxlc.fr",
      telephone: "+590690717618",
      contactPoint: {
        contactType: "customer service",
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
