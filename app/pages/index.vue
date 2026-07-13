<script setup lang="ts">
import type { MethodStep } from '~/components/MethodGrid.vue'

// title must run on both sides so the titleTemplate (%s · %siteName) is
// applied during client-side navigation; description is server-only (SEO only).
useSeoMeta({
  title: 'Médiation numérique en Guadeloupe',
})
if (import.meta.server) {
  useSeoMeta({
    description:
      'Médiation numérique en Guadeloupe : Andy Zébus outille les structures pour apaiser les conflits autour des écrans.',
    ogDescription:
      'Andy Zébus, créateur de PXLC, aide les structures en Guadeloupe à apaiser les conflits familiaux autour des écrans.',
  })
}

// WebPage d'accueil rattachée au nœud #website — alignée sur les autres pages
// (a-propos, structures, contact, blog) qui appellent toutes defineWebPage.
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: 'Médiation numérique en Guadeloupe',
    isPartOf: { '@id': 'https://pxlc.fr/#website' },
  }),
])

defineOgImage('PxlcOg')

// Le preload du hero est géré nativement par :preload="{ fetchPriority: 'high' }"
// sur <NuxtImg> dans HeroSection.vue — @nuxt/image calcule automatiquement l'imagesrcset
// et l'imagesizes à partir de l'attribut sizes, ce qui est plus fiable que
// le preload manuel (les descripteurs 1x/2x sans imagesizes étaient ignorés
// par certains navigateurs mobiles).

// Méthode PXLC en trois temps — démarche comportementale alignée sur le rapport
// DITP/MILDECA 2022 (diagnostic → stratégie partagée → dialogue) et sur la
// méthode de médiation canonique (« comprendre l’usage pour mieux accompagner
// la limite », cf. blog methode-mediation-jeu-video-parent-enfant). Générique à
// tout lieu d’accueil — le programme opérationnel détaillé (4 étapes
// Parent-Écran-Enfant) vit sur /structures.
const methodSteps: MethodStep[] = [
  { num: '01', title: 'Faire le point',        desc: 'Je pars des usages réels de la famille — à quoi l’enfant joue, ce que l’écran représente. Observer avant de cadrer : la prise de conscience est déjà un levier.', tag: 'diagnostic' },
  { num: '02', title: 'Choisir une stratégie', desc: 'La famille co-construit ses repères d’usage. L’enfant participe au choix des règles, ce qui désamorce les conflits plutôt que de les déplacer.', tag: 'stratégie' },
  { num: '03', title: 'Dialogue continu',      desc: 'Le cadre devient une clé d’explication impartiale : il ouvre la discussion parent-enfant au lieu de la fermer, et tient dans la durée.', tag: 'suivi' },
]

// Props du Hero extraits du template : le macro-parser Vue traite U+2019 comme
// terminateur de string dans les expressions ":prop="{...}"".
// En <script setup>, c'est du JS standard — U+2019 dans le contenu est valide.
const heroCta = { label: 'Voir mes programmes', href: '/structures/' }
const heroCtaSecondary = { label: 'Plaquette PDF · 6 pages', href: '/files/plaquette-pxlc.pdf', external: true }

const stats = [
  { value: '8',          label: 'familles accompagnées en 2026' },
  { value: '6 ans',      label: 'sur la scène esport guadeloupéenne' },
  { value: '1',          label: 'structure partenaire engagée' },
  { value: 'HCSP · HAS', label: 'cadre de référence (2019–2020)' },
]
</script>

<template>
  <HeroSection
    title="Médiation numérique en Guadeloupe"
    :title-dot="true"
    lead="J’aide les structures en Guadeloupe à accompagner les familles autour des écrans. Concrètement&nbsp;: résolution des conflits autour du temps d’écran, bonnes pratiques du numérique."
    :cta-primary="heroCta"
    :cta-secondary="heroCtaSecondary"
    photo-src="/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :photo-width="740"
    :photo-height="740"
  />
  <section class="section reperes-section" aria-labelledby="reperes-title">
    <div class="container">
      <span id="reperes-title" class="eyebrow">Quelques repères</span>
      <div class="reperes-grid">
        <div v-for="(s, i) in stats" :key="s.label" class="repere" :style="`--anim-delay: ${i * 0.07}s`">
          <span class="repere__value">{{ s.value }}</span>
          <span class="repere__label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
  <!-- hydrate-on-visible : JS des composants below-fold parsé/exécuté seulement
       quand ils entrent dans le viewport → réduit le TBT au chargement initial. -->
  <LazyPartnerStrip hydrate-on-visible />
  <LazyMethodGrid :steps="methodSteps" hydrate-on-visible />
  <LazyPxlcMarkSeparator hydrate-on-visible />
  <LazySessadCase hydrate-on-visible />
  <LazyCitationBlock
    source="«&nbsp;Jouons Ensemble&nbsp;!&nbsp;» · projet 2026"
    quote="Jouer ensemble, c’est mieux comprendre, mieux se parler, et mieux grandir."
    attribution="Tagline du projet · SESSAD Lékoklaya × PXLC"
    hydrate-on-visible
  />
</template>

<style scoped>
.reperes-section { padding-block: var(--space-6); }
.reperes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-4);
}
@media (max-width: 768px) { .reperes-grid { grid-template-columns: repeat(2, 1fr); } }
.repere { display: flex; flex-direction: column; gap: var(--space-1); }
.repere__value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(40px, 5vw, 56px);
  color: var(--ink);
  line-height: 1;
  letter-spacing: -0.04em;
  border-top: 2px solid var(--pxlc-coral);
  padding-top: var(--space-2);
  display: block;
}
.repere__label { font-family: var(--font-label); font-size: 12px; letter-spacing: 0.04em; color: var(--ink-quiet); line-height: 1.4; }
</style>
