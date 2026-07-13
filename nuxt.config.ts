// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineLocalBusiness } from "nuxt-schema-org/schema";

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
    // En-têtes de sécurité. En SSG (voir bloc `security`), seule la CSP est
    // injectable — via <meta http-equiv> avec hash des scripts inline.
    "nuxt-security",
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
  // only loads the weights it can detect inline. Plus Jakarta Sans 400/500/600 and
  // Lora 500/600 are set via CSS variables (not literal weights next to
  // the family name), so they're missed by auto-detection. Declaring them
  // explicitly here to avoid synthesised bold artefacts.
  fonts: {
    families: [
      // Display / headings / labels
      {
        name: "Plus Jakarta Sans",
        weights: [400, 500, 600],
        provider: "google",
        global: true,
      },
      // Body / prose (replaces DM Sans)
      {
        name: "Lora",
        weights: [400, 500, 600],
        provider: "google",
        global: true,
      },
    ],
  },

  // The default component is registered via defineOgImage('PxlcOg') in
  // app.vue — @nuxt/og-image explicitly excludes `component` from
  // ogImage.defaults (it lives at call-site only).
  // `zeroRuntime: true` makes the og-image module prerender every OG PNG
  // at build time and ship them as static files — required for GitHub
  // Pages (no Node runtime to generate images on demand).
  // GitHub Pages = aucun runtime serveur. On désactive donc le serverBundle :
  // par défaut il vaut `local` et embarque TOUTES les collections @iconify-json
  // installées (lucide + simple-icons, ~5000 icônes) — visible en dev. Toutes
  // les icônes réellement utilisées sont listées ici et inlinées au build.
  // Toute nouvelle icône doit être ajoutée à cette liste (scan: false).
  icon: {
    serverBundle: false,
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
        "lucide:clock",
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
    "#app/island-hash": "./server/island-hash-compat.mjs",
  },

  nitro: {
    // Le site est 100 % SSG. Déclarer `static` ici (et pas seulement via
    // `--preset github_pages` en CI) permet à nuxt-og-image de détecter le
    // runtime `nitro-prerender` au setup — sinon il lit le nom de preset
    // "github-pages", absent de sa table de compatibilité, et log
    // « Unknown Nitro preset » avant de retomber sur node-server.
    // Jamais en dev : @nuxt/nitro-server ajoute routeRules['/**'] =
    // { prerender: true } quand static && dev, ce qui fait passer chaque
    // réponse SSR de dev par le cache payload (risque de rendus obsolètes).
    static: !isDev,
    alias: {
      "#app/island-hash": "./server/island-hash-compat.mjs",
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

  // En-têtes de sécurité (nuxt-security).
  // Le site est 100 % SSG sur GitHub Pages : aucun runtime serveur ne peut
  // émettre de vrais en-têtes HTTP. On bascule donc la CSP dans une
  // <meta http-equiv> (ssg.meta) et on hache chaque script inline au build
  // (ssg.hashScripts) — dont le payload `window.__NUXT__`, dont le hash change
  // à chaque build, d'où l'impossibilité d'une CSP figée écrite à la main.
  // Limite assumée : `X-Content-Type-Options`, `X-Frame-Options` et `HSTS`
  // exigent de vrais en-têtes HTTP (proxy type Cloudflare) — non couverts par
  // cette voie statique ; désactivés ici pour ne pas donner un faux signal.
  // Le site ne charge aucune ressource tierce (polices et images auto-hébergées,
  // pas d'analytics) → CSP self-only stricte.
  security: {
    strict: false,
    nonce: false,
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
    },
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "base-uri": ["'self'"],
        "object-src": ["'none'"],
        "frame-ancestors": ["'none'"],
        "img-src": ["'self'", "data:"],
        "font-src": ["'self'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "script-src": ["'self'", "'strict-dynamic'"],
        "connect-src": ["'self'"],
        "manifest-src": ["'self'"],
        "form-action": ["'self'"],
        "frame-src": ["'none'"],
        "upgrade-insecure-requests": true,
      },
      // Inopérants en statique (nécessitent un vrai serveur/proxy).
      crossOriginEmbedderPolicy: false,
      strictTransportSecurity: false,
    },
  },

  site: {
    url: "https://pxlc.fr",
    name: "PXLC",
    // B2B-only funnel: the offer flows exclusively through structures
    // Médiathèques et collectivités, centres sociaux et espaces de vie sociale, LAEP, structures médico-sociales (SESSAD, IME, CMPP, CAMSP), dispositifs CLAS.
    description:
      "Andy Zébus, créateur de PXLC, aide les structures en Guadeloupe à accompagner les familles autour des écrans.",
    defaultLocale: "fr_FR",
    // GitHub Pages sert chaque page en `/chemin/index.html` : l'URL avec slash
    // final répond 200, la version sans slash 301-redirige vers elle. On aligne
    // donc canonical + sitemap + OG sur la forme avec slash (sinon Google classe
    // les URL du sitemap en « Page avec redirection » et reçoit un canonical qui
    // se contredit). Les liens internes rendus portent aussi le slash final.
    trailingSlash: true,
    currency: "EUR",
  },

  // `@nuxtjs/robots` est la SEULE source de vérité pour robots.txt.
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
  // @nuxtjs/seo.
  sitemap: {
    zeroRuntime: true,
    // Tamponne chaque URL avec la date du build (lastmod). Sans lui le sitemap
    // ne portait aucun <lastmod> : Google n'avait aucun signal de fraîcheur pour
    // reprioriser le recrawl, d'où la persistance d'entrées d'index périmées
    // (titre « 500 - Internal Server Error » capturé sur un build cassé
    // antérieur, avant failOnError). Build-time, compatible zeroRuntime.
    autoLastmod: true,
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
      // description vient de site.description — @nuxtjs/seo la propage
      // automatiquement vers og:description / twitter:description.
      // Ne pas la dupliquer ici pour éviter la dérive entre les deux sources.
      author: "Andy Zébus",
      // light listed first = preferred when the user has no preference.
      colorScheme: "light dark",
      twitterCreator: "@seyken971",
      twitterSite: "@seyken971",
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
    // ProfessionalService = sous-type LocalBusiness le plus précis pour une
    // prestation de médiation sans point de vente. Renforce le signal local
    // (Google recommande le type LocalBusiness le plus spécifique). Les nœuds
    // #andy (worksFor) et #service (provider) référencent toujours #identity.
    identity: defineLocalBusiness({
      "@type": "ProfessionalService",
      logo: "/logo.svg",
      // Photo réelle de l'activité — recommandée par Google pour LocalBusiness
      // (le logo seul ne suffit pas). Résolue en absolu via site.url par le module.
      image: "/img/photos/andy-event.jpg",
      // Nom = libellé exact de la fiche Google Business Profile (cohérence NAP).
      // Distinct de site.name ("PXLC"), qui reste court pour le suffixe de titre.
      name: "PXLC - Médiation numérique",
      legalName: "Andy Zébus - Entrepreneur Individuel",
      taxID: "813 793 528 00031",
      description:
        "PXLC accompagne les familles dans l’éducation numérique des enfants. Médiation numérique en Guadeloupe, portée par Andy Zébus, auprès des structures qui accompagnent des familles.",
      url: "https://pxlc.fr",
      email: "contact@pxlc.fr",
      telephone: "+590690717618",
      availableLanguage: "fr",
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
      geo: {
        "@type": "GeoCoordinates",
        latitude: 16.1496296,
        longitude: -61.39705,
      },
      // Lien vers la fiche Google Business Profile (Place → carte).
      hasMap: "https://maps.app.goo.gl/4UPhQWdzboD6HnAs8",
      // Prestataire qui se déplace : toute la Guadeloupe est desservie, avec
      // les communes de l'agglomération centrale (où se concentrent les
      // structures accueillant des familles) nommées pour le signal local.
      areaServed: [
        { "@type": "AdministrativeArea", name: "Guadeloupe" },
        { "@type": "City", name: "Les Abymes" },
        { "@type": "City", name: "Pointe-à-Pitre" },
        { "@type": "City", name: "Baie-Mahault" },
        { "@type": "City", name: "Le Gosier" },
      ],
      foundingDate: "2015",
      founder: "Andy Zébus",
      sameAs: [
        // Seul profil propre à PXLC-entité (fiche Google Business Profile vérifiée).
        "https://maps.app.goo.gl/4UPhQWdzboD6HnAs8",
      ],
    }),
  },
});
