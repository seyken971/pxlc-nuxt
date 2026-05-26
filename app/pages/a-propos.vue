<script setup lang="ts">
useSeoMeta({ title: 'Andy Zébus — médiateur numérique en Guadeloupe' })
if (import.meta.server) {
  useSeoMeta({
    description:
      "Andy Zébus, gamer médiateur-numérique aux Abymes (Guadeloupe). Six ans dans l'esport, formé aux rapports HCSP 2019-2020, partenaire des SESSAD et IME.",
  })
}

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · À PROPOS',
  title: 'Médiateur numérique par le jeu',
  description:
    'Basé aux Abymes, je construis des ateliers de médiation numérique ancrés dans le jeu vidéo avec les SESSAD, IME et associations de Guadeloupe.',
})

// Person #andy est déclaré globalement dans app.vue — disponible sur toutes les pages.
useSchemaOrg([
  defineWebPage({
    '@type': 'AboutPage',
    name: "À propos d'Andy Zébus",
    about: { '@id': 'https://pxlc.fr/#andy' },
  }),
])

const facts = [
  { label: 'Territoire', value: 'Guadeloupe · 971' },
  { label: 'Statut',     value: 'Micro-entreprise · APE 70.21Z' },
  { label: 'SIRET',      value: '813 793 528 00031' },
  { label: 'Cadre',      value: 'HCSP 2019-2020' },
]
</script>

<template>
  <!-- ── Hero ──────────────────────────────────────────────── -->
  <section class="about-hero">
    <div class="container">
      <div class="about-grid">
        <div>
          <span class="eyebrow eyebrow--lg">À propos</span>
          <h1 class="about-title">
            Andy Zébus, médiateur numérique par le jeu<span class="coral-dot" aria-hidden="true">.</span>
          </h1>
          <p class="about-lead">
            Basé aux Abymes (Guadeloupe), je travaille avec les structures du secteur médico-social et associatif pour construire des ateliers de médiation numérique ancrés dans le jeu vidéo.
          </p>
          <p class="about-sub">
            Mon point de départ : les rapports HCSP 2019-2020. Mon terrain : les ateliers parent-enfant où le jeu vidéo devient un outil de lien plutôt qu'un sujet de conflit.
          </p>
        </div>

        <div class="about-portrait">
          <NuxtImg
            src="/assets/img/photos/andy-portrait.jpg"
            alt="Portrait d'Andy Zébus, gamer médiateur-numérique en Guadeloupe"
            width="480"
            height="600"
            format="webp"
            loading="eager"
            fetchpriority="high"
            preload
          />
        </div>
      </div>
    </div>
  </section>

  <!-- ── Facts ─────────────────────────────────────────────── -->
  <section class="section">
    <div class="container">
      <div class="about-facts">
        <div v-for="f in facts" :key="f.label" class="about-fact">
          <div class="about-fact__label">{{ f.label }}</div>
          <div class="about-fact__value">{{ f.value }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Hero ────────────────────────────────────────────────────── */
.about-hero {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--bg-rule);
  padding: clamp(40px, 5vw, 64px) 0;
  transition: background var(--dur-base);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(32px, 5vw, 56px);
  align-items: start;
}
@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
}

.about-title {
  font-size: clamp(32px, 4.8vw, 52px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  margin: 0 0 20px;
  text-wrap: balance;
}
.about-lead {
  font-size: 17px;
  line-height: 1.55;
  color: var(--ink-quiet);
  margin-bottom: var(--space-3);
}
.about-sub {
  font-size: 15px;
  line-height: 1.6;
  color: var(--quiet);
  margin: 0;
}

.about-portrait {
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4 / 5;
}
@media (max-width: 900px) {
  .about-portrait { max-height: 50vh; }
}
.about-portrait :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Facts ───────────────────────────────────────────────────── */
.about-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  max-width: 820px;
}
@media (max-width: 600px) {
  .about-facts { grid-template-columns: 1fr; }
}

.about-fact {
  background: var(--bg-elev);
  border: 1px solid var(--rule);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: background var(--dur-base);
}
.about-fact__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--quiet);
  margin-bottom: var(--space-2);
}
.about-fact__value {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  color: var(--ink);
}
</style>
