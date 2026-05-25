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

// Hint the browser to start fetching the hero image as early as possible —
// it's the LCP candidate on this page. NuxtImg with format="webp" ships
// the variant at /_ipx/f_webp&s_WxH/...; we preload both DPR variants via
// imagesrcset so the actual <img>'s srcset hits a warm cache (1x for
// standard displays, 2x for retina).
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      type: 'image/webp',
      imagesrcset:
        '/_ipx/f_webp&s_740x740/assets/img/photos/andy-event.jpg 1x, ' +
        '/_ipx/f_webp&s_1480x1480/assets/img/photos/andy-event.jpg 2x',
      fetchpriority: 'high',
    },
  ],
})

// Trois temps de la médiation, alignés sur les 4 étapes opérationnelles du
// projet « Jouons Ensemble! » (préparation, ateliers thématiques, groupe de
// parole + bilan) — résumés ici en 3 mouvements pour la page d'accueil.
const methodSteps: MethodStep[] = [
  { num: '01', title: 'Comprendre l’enfant', desc: 'Entretien initial avec l’équipe pluridisciplinaire, identification du profil ludique de chaque enfant, construction des binômes parent-enfant.', tag: 'préparation' },
  { num: '02', title: 'Jouer ensemble',     desc: 'Ateliers thématiques parent-enfant — coopération, émotions, différence — co-encadrés par psychologue, psychomotricienne, intervenants culturels et médiateur numérique par le jeu.', tag: 'ateliers' },
  { num: '03', title: 'Restaurer le lien',  desc: 'Groupe de parole familiale puis bilan : synthèse des acquis et pistes de continuité à la maison, transmises à l’équipe et aux parents.', tag: 'bilan' },
]
</script>

<template>
  <Hero
    title="Transformer le temps d'écran en lien parent-enfant<span class='coral-dot' aria-hidden='true'>.</span>"
    lead="J'accompagne les SESSAD, IME, associations et collectivités de Guadeloupe en médiateur numérique par le jeu — partenaire des programmes parent-écran-enfant fondés sur les rapports HCSP."
    :cta-primary="{ label: 'Voir le dispositif', href: '/pour-les-structures' }"
    :cta-secondary="{ label: 'Télécharger la plaquette', href: '/files/plaquette-pxlc.pdf', external: true }"
    hint="← à destination des structures"
    photo-src="/assets/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :photo-width="740"
    :photo-height="740"
    :pill="{ eyebrow: 'Repères HCSP', text: 'Méthode construite à partir des avis HCSP de 2019 et 2020 sur les effets de l’exposition aux écrans.' }"
  />
  <PartnerStrip />
  <MethodGrid :steps="methodSteps" />
  <MarkSeparator />
  <SessadCase />
  <CitationBlock
    source="« Jouons Ensemble! » · projet 2026"
    quote="Jouer ensemble, c’est mieux comprendre, mieux se parler, et mieux grandir."
    attribution="Tagline du projet · SESSAD Lékoklaya × PXLC"
  />
</template>
