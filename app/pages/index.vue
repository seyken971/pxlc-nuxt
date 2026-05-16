<script setup lang="ts">
import type { MethodStep } from '~/components/MethodGrid.vue'

useSeoMeta({
  title: 'Médiation numérique parent-écran-enfant en Guadeloupe',
  description:
    'Andy Zébus accompagne les SESSAD, IME, associations et collectivités de Guadeloupe en gamer médiateur-numérique, partenaire de programmes parent-écran-enfant fondés sur les repères HAS et HCSP.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · MÉDIATION NUMÉRIQUE · GUADELOUPE',
  title: 'Les écrans sont le reflet de la relation parent-enfant',
  description: 'Gamer médiateur-numérique, partenaire des SESSAD, IME, associations et collectivités de Guadeloupe sur leurs programmes parent-écran-enfant.',
})

// Trois temps de la médiation, alignés sur les 4 étapes opérationnelles du
// projet « Jouons Ensemble! » (préparation, ateliers thématiques, groupe de
// parole + bilan) — résumés ici en 3 mouvements pour la page d'accueil.
const methodSteps: MethodStep[] = [
  { num: '01', title: 'Comprendre l’enfant', desc: 'Entretien initial avec l’équipe pluridisciplinaire, identification du profil ludique de chaque enfant, construction des binômes parent-enfant.', tag: 'préparation' },
  { num: '02', title: 'Jouer ensemble',     desc: 'Ateliers thématiques parent-enfant — coopération, émotions, différence — co-encadrés par psychologue, psychomotricienne, intervenants culturels et gamer médiateur-numérique.', tag: 'ateliers' },
  { num: '03', title: 'Restaurer le lien',  desc: 'Groupe de parole familiale puis bilan : synthèse des acquis et pistes de continuité à la maison, transmises à l’équipe et aux parents.', tag: 'bilan' },
]
</script>

<template>
  <Hero
    title="Les écrans sont le reflet de <br/>la relation parent-enfant<span class='coral-dot' aria-hidden='true'>.</span>"
    lead="Andy Zébus accompagne les SESSAD, IME, associations et collectivités de Guadeloupe en gamer médiateur-numérique — partenaire des programmes parent-écran-enfant fondés sur les repères HAS et HCSP."
    :cta-primary="{ label: 'Voir le dispositif', href: '/pour-les-structures' }"
    :cta-secondary="{ label: 'Plaquette PDF · 12 p.', href: '/files/plaquette-pxlc.pdf', external: true }"
    hint="↘ pour les structures porteuses"
    photo-src="/assets/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :pill="{ eyebrow: 'Repères HAS & HCSP', text: 'Méthode construite à partir du rapport HAS (2020) et des avis HCSP (2019, 2020).' }"
  />
  <PartnerStrip />
  <MethodGrid :steps="methodSteps" />
  <ThemesGrid />
  <SessadCase />
  <CitationBlock
    source="« Jouons Ensemble! » · projet 2026"
    quote="Jouer ensemble, c’est mieux comprendre, mieux se parler, et mieux grandir."
    attribution="Tagline du projet · SESSAD Lékoklaya × PXLC"
  />
</template>
