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
          Une démarche en trois temps, pensée pour s’intégrer dans le projet d’un lieu qui accueille déjà des familles. Pas de discours moral, pas d’écran diabolisé — un cadre que votre équipe peut s’approprier.
        </p>
      </header>
      <div class="grid grid--3">
        <article
          v-for="(s, i) in steps"
          :key="s.num"
          class="card card--method"
          :data-num="s.num"
          :style="`--anim-delay: ${i * 0.09}s`"
        >
          <div class="card__pixel"><PxlcPixelCorner /></div>
          <div class="card__step-num">ÉTAPE {{ s.num }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <div v-if="s.tag" class="card__tag">· {{ s.tag }}</div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ghost step number — large decorative figure behind the card content.
   Uses attr(data-num) so it matches the actual step without duplication. */
.card--method::before {
  content: attr(data-num);
  position: absolute;
  bottom: 20px;
  right: 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(72px, 9vw, 100px);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--pxlc-teal-deep);
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
}
[data-theme="dark"] .card--method {
  border-top: 2px solid var(--rule-accent);
}
[data-theme="dark"] .card--method::before {
  opacity: 0.09;
  color: var(--pxlc-teal-mid);
}
</style>
