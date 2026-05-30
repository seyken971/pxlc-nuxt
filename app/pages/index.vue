<script setup lang="ts">
import type { MethodStep } from '~/components/MethodGrid.vue'

// title must run on both sides so the titleTemplate (%s · %siteName) is
// applied during client-side navigation; description is server-only (SEO only).
useSeoMeta({
  title: 'Médiation numérique par le jeu — Guadeloupe',
})
if (import.meta.server) {
  useSeoMeta({
    description:
      'Andy Zébus · PXLC — programmes de médiation numérique par le jeu pour les structures médico-sociales et associatives de Guadeloupe. Programme phare : Parents-Écran-Enfant (cadre HCSP 2019-2020).',
    // og:description shown in social previews — capped at ~155 chars to avoid truncation.
    // meta description above is longer (keyword-rich for Google snippets).
    ogDescription:
      'Programmes de médiation numérique par le jeu pour SESSAD, IME et associations de Guadeloupe — Parents-Écran-Enfant, cadre HCSP 2019-2020.',
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
  { num: '02', title: 'Jouer ensemble',     desc: 'Ateliers thématiques parent-enfant — coopération, émotions, différence — co-encadrés par psychologue, psychomotricienne, intervenants culturels et médiateur numérique par le jeu.', tag: 'ateliers' },
  { num: '03', title: 'Restaurer le lien',  desc: 'Groupe de parole familiale puis bilan : synthèse des acquis et pistes de continuité à la maison, transmises à l’équipe et aux parents.', tag: 'bilan' },
]

// Props du Hero extraits du template : le macro-parser Vue traite U+2019 comme
// terminateur de string dans les expressions ":prop="{...}"".
// En <script setup>, c'est du JS standard — U+2019 dans le contenu est valide.
const heroCta = { label: 'Voir mes programmes', href: '/pour-les-structures' }
const heroCtaSecondary = { label: 'Télécharger la plaquette', href: '/files/plaquette-pxlc.pdf', external: true }
</script>

<template>
  <Hero
    title="Médiation numérique par le jeu"
    :title-dot="true"
    lead="Je conçois et anime des programmes sur mesure pour les SESSAD, IME, associations et collectivités de Guadeloupe. Programme phare : Parents-Écran-Enfant, qui transforme le temps d’écran en lien entre parents et enfants — fondé sur les avis HCSP 2019-2020."
    :cta-primary="heroCta"
    :cta-secondary="heroCtaSecondary"
    hint="← programmes pour les structures"
    photo-src="/assets/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :photo-width="740"
    :photo-height="740"
  />
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
