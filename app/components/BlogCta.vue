<script setup lang="ts">
// In-article CTA placed below the body, before the related-posts strip.
// Specific to blog reading context — distinct from the global CtaBlock at
// the bottom of the layout, which is more generic ("20 minutes pour…").
</script>

<template>
  <aside class="blog-cta" aria-label="Pour les structures">
    <div class="blog-cta__head">
      <span class="eyebrow">PXLC · POUR LES STRUCTURES</span>
      <h2 class="blog-cta__title">
        Vous êtes une structure&nbsp;? On en parle<span class="coral-dot" aria-hidden="true">.</span>
      </h2>
      <p class="blog-cta__lead">
        Votre structure accueille des familles en Guadeloupe — 20 minutes pour cadrer le périmètre, voir si la médiation s’inscrit dans vos objectifs.
      </p>
    </div>
    <div class="blog-cta__actions">
      <NuxtLink to="/structures" class="btn btn--primary">Voir le dispositif</NuxtLink>
      <NuxtLink to="/contact" class="btn btn--ghost">Me contacter</NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.blog-cta {
  margin-top: var(--space-6);
  padding: clamp(24px, 4vw, 40px);
  background: var(--bg-soft);
  border: 1px solid var(--bg-rule);
  border-radius: var(--radius-lg);
  display: grid; gap: var(--space-4);
  grid-template-columns: 1fr;
}
@media (min-width: 720px) { .blog-cta { grid-template-columns: 1.6fr 1fr; align-items: center; } }
.blog-cta__head { display: flex; flex-direction: column; gap: var(--space-2); }
.blog-cta__title { font-size: clamp(22px, 2.6vw, 28px); letter-spacing: -0.015em; }
.blog-cta__lead { color: var(--ink-quiet); font-size: 15px; line-height: 1.55; margin: 0; }
.blog-cta__actions {
  display: flex; flex-wrap: wrap; gap: var(--space-2-5);
  justify-content: flex-start;
}
@media (min-width: 720px) { .blog-cta__actions { justify-content: flex-end; } }
</style>
