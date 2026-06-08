<script setup lang="ts">
import type { MethodStep } from '~/components/MethodGrid.vue'

// title must run on both sides so the titleTemplate (%s · %siteName) is
// applied during client-side navigation; description is server-only (SEO only).
useSeoMeta({
  title: 'Médiation numérique pour les structures de Guadeloupe',
})
if (import.meta.server) {
  useSeoMeta({
    description:
      'Programmes parent-enfant pour les structures de Guadeloupe — résoudre les tensions autour des écrans. Cadre HCSP 2019-2020 · HAS 2020.',
    ogDescription:
      'PXLC intervient auprès des structures de Guadeloupe — ateliers parent-enfant pour transformer les tensions autour des écrans, avec votre équipe.',
  })
}

defineOgImage('PxlcOgBrand')

// Le preload du hero est géré nativement par :preload="{ fetchPriority: 'high' }"
// sur <NuxtImg> dans Hero.vue — @nuxt/image calcule automatiquement l'imagesrcset
// et l'imagesizes à partir de l'attribut sizes, ce qui est plus fiable que
// le preload manuel (les descripteurs 1x/2x sans imagesizes étaient ignorés
// par certains navigateurs mobiles).

// Trois temps de la médiation, alignés sur les 4 étapes opérationnelles du
// projet « Jouons Ensemble! » (préparation, ateliers thématiques, groupe de
// parole + bilan) — résumés ici en 3 mouvements pour la page d'accueil.
const methodSteps: MethodStep[] = [
  { num: '01', title: 'Comprendre l’enfant', desc: 'Entretien initial avec l’équipe pluridisciplinaire, identification du profil ludique de chaque enfant, construction des binômes parent-enfant.', tag: 'préparation' },
  { num: '02', title: 'Jouer ensemble',     desc: 'Ateliers thématiques parent-enfant — coopération, émotions, différence — co-encadrés par psychologue, psychomotricienne, intervenants culturels et médiateur numérique.', tag: 'ateliers' },
  { num: '03', title: 'Restaurer le lien',  desc: 'Groupe de parole familiale puis bilan : synthèse des acquis et pistes de continuité à la maison, transmises à l’équipe et aux parents.', tag: 'bilan' },
]

// Props du Hero extraits du template : le macro-parser Vue traite U+2019 comme
// terminateur de string dans les expressions ":prop="{...}"".
// En <script setup>, c'est du JS standard — U+2019 dans le contenu est valide.
const heroCta = { label: 'Voir mes programmes', href: '/structures' }
const heroCtaSecondary = { label: 'Télécharger la plaquette', href: '/files/plaquette-pxlc.pdf', external: true }

const stats = [
  { value: '8',          label: 'familles accompagnées en 2026' },
  { value: '6 ans',      label: 'sur la scène esport guadeloupéenne' },
  { value: '1',          label: 'structure partenaire engagée' },
  { value: 'HCSP · HAS', label: 'cadre de référence (2019–2020)' },
]
</script>

<template>
  <Hero
    title="Médiation numérique"
    :title-dot="true"
    lead="J’interviens auprès des structures de Guadeloupe — SESSAD, IME, associations — pour aider les familles à mieux utiliser les écrans : résoudre les conflits autour du temps d’écran, adopter les bonnes pratiques du numérique."
    :cta-primary="heroCta"
    :cta-secondary="heroCtaSecondary"
    hint="← programmes pour les structures"
    photo-src="/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :photo-width="740"
    :photo-height="740"
  />
  <section class="section section--soft reperes-section" aria-labelledby="reperes-title">
    <div class="container">
      <span id="reperes-title" class="eyebrow">Quelques repères</span>
      <div class="reperes-grid">
        <div v-for="s in stats" :key="s.label" class="repere">
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
  <LazyMarkSeparator hydrate-on-visible />
  <LazySessadCase hydrate-on-visible />
  <LazyCitationBlock
    source="« Jouons Ensemble! » · projet 2026"
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
  font-size: clamp(24px, 3vw, 36px);
  color: var(--pxlc-coral);
  line-height: 1;
}
.repere__label { font-size: 13px; color: var(--ink-quiet); line-height: 1.4; }
</style>
