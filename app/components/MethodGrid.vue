<script setup lang="ts">
export interface MethodStep { num: string, title: string, desc: string, tag?: string }
interface Props { steps: MethodStep[] }
defineProps<Props>()
</script>

<template>
  <section class="section" aria-labelledby="methode-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Méthode</span>
        <h2 id="methode-title">Ma méthode en trois temps<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Un protocole en trois temps, conçu pour s’intégrer dans le projet thérapeutique de la structure. Pas de discours moral, pas d’écrans diabolisés — un cadre que l’équipe pluridisciplinaire peut s’approprier.
        </p>
      </header>
      <div class="grid grid--3">
        <article v-for="s in steps" :key="s.num" class="card card--method">
          <div class="card__pixel"><PixelCorner /></div>
          <div class="card__step-num">ÉTAPE {{ s.num }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <div v-if="s.tag" class="card__tag">· {{ s.tag }}</div>
        </article>
      </div>
    </div>
  </section>
</template>
