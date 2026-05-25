<script setup lang="ts">
import type { MethodStep } from '~/components/MethodGrid.vue'

// title must run on both sides so the titleTemplate (%s · %siteName) is
// applied during client-side navigation; description is server-only (SEO only).
useSeoMeta({
  title: 'Transformer le temps d\'écran en lien parent-enfant',
})
// Description kept under ~160 chars so Google doesn't truncate the
// HCSP credibility marker at the tail.
// 157 chars — HCSP years kept at the tail so Google doesn't truncate them.
useServerSeoMeta({
  description:
    'Andy Zébus, médiateur numérique par le jeu en Guadeloupe. Partenaire des SESSAD, IME et associations pour les ateliers parent-écran-enfant — cadre HCSP 2019-2020.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · MÉDIATION NUMÉRIQUE · GUADELOUPE',
  title: 'Transformer le temps d\'écran en lien parent-enfant',
  description: 'Médiateur numérique par le jeu, partenaire des SESSAD, IME, associations et collectivités de Guadeloupe sur leurs programmes parent-écran-enfant.',
})

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
const heroCta = { label: 'Voir le dispositif', href: '/pour-les-structures' }
const heroCtaSecondary = { label: 'Télécharger la plaquette', href: '/files/plaquette-pxlc.pdf', external: true }
const heroPill = {
  eyebrow: 'Repères HCSP',
  text: 'Méthode construite à partir des avis HCSP de 2019 et 2020 sur les effets de l’exposition aux écrans.',
}
</script>

<template>
  <Hero
    title="Transformer le temps d’écran en lien parent-enfant<span class=’coral-dot’ aria-hidden=’true’>.</span>"
    lead="J’accompagne les SESSAD, IME, associations et collectivités de Guadeloupe en médiateur numérique par le jeu — partenaire des programmes parent-écran-enfant fondés sur les rapports HCSP."
    :cta-primary="heroCta"
    :cta-secondary="heroCtaSecondary"
    hint="← à destination des structures"
    photo-src="/assets/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :photo-width="740"
    :photo-height="740"
    :pill="heroPill"
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
