<script setup lang="ts">
import type { MethodStep } from '~/components/MethodGrid.vue'

useSeoMeta({
  title: 'Médiation numérique parent-écran-enfant en Guadeloupe',
  description:
    'Andy Zébus, médiateur numérique, accompagne les familles et structures sociales de Guadeloupe avec des ateliers Parent-Écran-Enfant fondés sur les repères HAS et HCSP.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · MÉDIATION NUMÉRIQUE · GUADELOUPE',
  title: 'Les écrans sont le reflet de la relation parent-enfant',
  description: 'Andy Zébus transforme le temps d’écran en levier de compréhension et de lien — avec les familles, les SESSAD et les structures sociales de Guadeloupe.',
})

const methodSteps: MethodStep[] = [
  { num: '01', title: 'Comprendre l’enfant', desc: 'Andy joue avec l’enfant à son jeu favori et identifie ce qu’il y investit émotionnellement — compétence, lien social, refuge, structuration.', tag: 'observation' },
  { num: '02', title: 'Traduire aux parents', desc: 'Le jeu devient un langage commun : Andy restitue ce que l’enfant met dans son écran, sans jugement, sans jargon technique.', tag: 'médiation' },
  { num: '03', title: 'Restaurer le lien',   desc: 'Parents et enfant repartent avec un cadre et des rituels concrets — pas une liste d’interdictions, une nouvelle façon de partager.', tag: 'consolidation' },
]
</script>

<template>
  <Hero
    title="Les écrans sont le reflet de <br/>la relation parent-enfant<span class='coral-dot' aria-hidden='true'>.</span>"
    lead="Andy Zébus, médiateur numérique et ancien joueur professionnel, transforme le temps d’écran des enfants en levier de compréhension et de lien — avec les familles, les SESSAD et les structures sociales de Guadeloupe."
    :cta-primary="{ label: 'Je suis parent', href: '/ateliers' }"
    :cta-secondary="{ label: 'Je représente une structure', href: '/pour-les-structures' }"
    photo-src="/assets/img/photos/andy-event.jpg"
    photo-alt="Andy Zébus en animation lors d’un événement gaming en Guadeloupe"
    :pill="{ eyebrow: 'Repères HAS & HCSP', text: 'Méthode construite à partir du rapport HAS (2020) et de l’avis du HCSP (2019).' }"
  />
  <PartnerStrip />
  <MethodGrid :steps="methodSteps" />
  <BifurcationGrid />
  <SessadCase />
  <CitationBlock
    source="HAS · Recommandation 2020"
    quote="L’enjeu n’est pas de bannir les écrans mais de soutenir la fonction parentale dans leur médiation."
    attribution="Haute Autorité de Santé · 2020 · soutien à la parentalité numérique"
  />
</template>
