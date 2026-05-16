<script setup lang="ts">
useSeoMeta({
  title: 'Le journal — décryptages et cas pratiques PXLC',
  description:
    'Décryptages, repères et retours de terrain : ce que les écrans des enfants nous apprennent, en Guadeloupe et ailleurs.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · LE JOURNAL',
  title: 'Décryptages, repères, retours de terrain',
  description: 'Ce que les écrans des enfants nous apprennent — sur eux, sur nous, sur le lien.',
})

const posts = [
  { date: '2026-03-05', title: 'Quand votre enfant joue à Fortnite, qu’est-ce qu’il vous dit ?', read: '8 min', cat: 'Décryptage' },
  { date: '2026-02-10', title: 'Trois mois de médiation au SESSAD Lékoklaya', read: '12 min', cat: 'Cas pratique' },
  { date: '2026-01-15', title: 'Pourquoi mon enfant rejoue toujours au même jeu ?', read: '6 min', cat: 'Parents' },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <span class="eyebrow eyebrow--lg">Le journal</span>
      <h1 class="blog-title">
        Décryptages, repères, retours de terrain<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <div class="grid grid--3 mt-6">
        <article v-for="p in posts" :key="p.title" class="card card--hover blog-card">
          <div class="blog-card__thumb" aria-hidden="true" />
          <div class="blog-card__body">
            <span class="badge">{{ p.cat }}</span>
            <h3 class="blog-card__title">{{ p.title }}</h3>
            <div class="blog-card__meta">
              <span>{{ p.date }}</span>
              <span>· {{ p.read }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; margin-bottom: 24px; }

.blog-card { padding: 0; overflow: hidden; display: flex; flex-direction: column; min-height: 360px; }
.blog-card__thumb {
  aspect-ratio: 16 / 9;
  background-image: repeating-linear-gradient(135deg, #d6cebd 0 6px, #cdc4b0 6px 12px);
}
[data-theme="dark"] .blog-card__thumb {
  background-image: repeating-linear-gradient(135deg, #103847 0 6px, #1F4A59 6px 12px);
}
.blog-card__body { padding: 24px 24px 32px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.blog-card__title { font-size: 18px; line-height: 1.25; letter-spacing: -0.01em; }
.blog-card__meta {
  margin-top: auto; display: flex; justify-content: space-between;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em;
  color: var(--quiet); text-transform: uppercase;
}
.badge { align-self: flex-start; }
</style>
