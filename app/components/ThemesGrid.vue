<script setup lang="ts">
// Les 3 thèmes d'atelier du projet « Jouons Ensemble! » (SESSAD Lékoklaya, 2026)
// — source : _plaquette/PROJET PARENTS – ECRAN – ENFANT.md
const themes = [
  {
    num: '01',
    title: 'Coopération',
    desc: 'Jeux choisis avec le médiateur numérique pour valoriser l’entraide et la stratégie partagée. Les intervenants culturels proposent en parallèle un jeu traditionnel et un conte sur la coopération.',
  },
  {
    num: '02',
    title: 'Émotions & récits',
    desc: 'Travail sur les fonctions exécutives (planification, inhibition, prise de décision) à travers des jeux narratifs. Le temps d’échange verbal explore ce que l’enfant a ressenti, nommé, partagé pendant la séance.',
  },
  {
    num: '03',
    title: 'Différence & complémentarité',
    desc: 'Comprendre comment chaque membre du binôme parent-enfant joue, observe, contribue — et faire de cette différence un levier d’alliance plutôt qu’une source de tension.',
  },
]
</script>

<template>
  <section class="section section--soft" aria-labelledby="themes-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Jouons Ensemble!</span>
        <h2 id="themes-title">Trois thèmes, trois façons de jouer ensemble<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Chaque atelier parent-enfant articule un temps de jeu partagé (30 à 45 min) et un temps d’échange verbal (45 min à 1 h), encadré par l’équipe pluridisciplinaire de la structure et le gamer médiateur-numérique.
        </p>
      </header>
      <div class="grid grid--3">
        <article v-for="t in themes" :key="t.num" class="card card--method">
          <div class="card__pixel"><PixelCorner /></div>
          <div class="card__step-num">THÈME {{ t.num }}</div>
          <h3>{{ t.title }}</h3>
          <p>{{ t.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
