<script setup lang="ts">
import type { NuxtError } from '#app'

// Page d'erreur de marque. Nuxt rend ce composant À LA PLACE d'app.vue quand une
// erreur fatale survient (5xx serveur, ou createError({ fatal: true }) client, ou
// une 404 de route inexistante). Conséquence : aucun héritage d'app.vue — ni le
// `titleTemplate`, ni le schema.org, ni l'OG par défaut, ni l'anti-flash de thème.
// On redéfinit donc l'essentiel ici, et on garde la page AUTONOME (pas de
// SiteHeader/SiteFooter qui dépendent de composables potentiellement non montés).
const props = defineProps<{ error?: NuxtError }>()

const statusCode = computed(() => props.error?.statusCode ?? 500)
const isNotFound = computed(() => statusCode.value === 404)

// Titre complet (suffixe « · PXLC » écrit en dur — le titleTemplate d'app.vue ne
// s'applique pas ici). Surtout : plus jamais le titre par défaut Nuxt
// « 500 - Failed to fetch dynamically imported module… » indexé par Google.
const pageTitle = computed(() =>
  isNotFound.value
    ? 'Page introuvable · PXLC'
    : 'Page momentanément indisponible · PXLC',
)
const heading = computed(() =>
  isNotFound.value ? 'Page introuvable' : 'Page momentanément indisponible',
)
const message = computed(() =>
  isNotFound.value
    ? "Cette page n'existe pas ou a été déplacée. Le reste du site est bien là."
    : "Un incident temporaire a interrompu le chargement de la page. Recharger suffit généralement à le résoudre.",
)

useHead({
  htmlAttrs: { lang: 'fr-FR' },
  link: [
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
  script: [
    {
      // Anti-flash thème (repris d'app.vue, non hérité ici).
      innerHTML: `(function(){try{var s=localStorage.getItem('pxlc-theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
      tagPosition: 'head',
      tagPriority: 'critical',
    },
  ],
})

useSeoMeta({
  title: () => pageTitle.value,
  // 404 → noindex (hygiène SEO standard pour les vraies pages absentes).
  // 5xx / chunk → JAMAIS noindex : si Googlebot rend transitoirement cette page
  // pour une URL valide (ex. « / »), un noindex risquerait de désindexer la page.
  robots: () => (isNotFound.value ? 'noindex, follow' : 'index, follow'),
})

const goHome = () => clearError({ redirect: '/' })
const reload = () => {
  if (import.meta.client) window.location.reload()
}
</script>

<template>
  <main id="main" class="errpage">
    <div class="container errpage__inner">
      <PxlcLockup size="md" class="errpage__brand" />
      <PxlcPixelStrip class="errpage__strip" />
      <span class="eyebrow eyebrow--lg">Erreur {{ statusCode }}</span>
      <h1 class="errpage__title">
        {{ heading }}<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead errpage__lead">{{ message }}</p>
      <div class="errpage__actions">
        <button type="button" class="btn btn--primary btn--no-arrow" @click="goHome">
          Retour à l'accueil
        </button>
        <button
          v-if="!isNotFound"
          type="button"
          class="btn btn--secondary btn--no-arrow"
          @click="reload"
        >
          Recharger la page
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.errpage {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: var(--bg);
  padding: clamp(48px, 8vw, 96px) 0;
  transition: background var(--dur-base);
}

.errpage__inner { max-width: 560px; }

.errpage__brand { margin-bottom: var(--space-6); }
.errpage__strip { margin-bottom: var(--space-4); }

.errpage__title {
  font-family: var(--font-display);
  font-size: clamp(34px, 5vw, 52px);
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: var(--space-2) 0 var(--space-4);
  color: var(--ink);
}

.errpage__lead {
  max-width: 480px;
  margin-bottom: var(--space-6);
}

.errpage__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
