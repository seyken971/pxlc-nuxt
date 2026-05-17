<script setup lang="ts">
// Long-form descriptions live in /pour-les-structures; the home overview
// uses the short pitch from useProjectThemes() to stay in sync.
const { themes } = useProjectThemes()
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
          <p>{{ t.short }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
