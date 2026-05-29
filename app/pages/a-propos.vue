<script setup lang="ts">
useSeoMeta({ title: 'Andy Zébus — médiateur numérique · Guadeloupe' })
if (import.meta.server) {
  useSeoMeta({
    description:
      "Andy Zébus a fondé PXLC, entreprise de médiation numérique par le jeu en Guadeloupe. Ancien organisateur esport, médiateur formé, ancré dans les recommandations HCSP 2019-2020.",
  })
}

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · À PROPOS',
  title: 'Médiateur numérique par le jeu',
  description:
    "J'ai fondé PXLC pour concevoir des programmes de médiation numérique par le jeu avec les SESSAD, IME, associations et collectivités de Guadeloupe.",
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
  { label: 'Entreprise', value: 'PXLC — Entrepreneur Individuel' },
  { label: 'Territoire', value: 'Guadeloupe · 971' },
  { label: 'SIRET',      value: '813 793 528 00031' },
  { label: 'Cadre',      value: 'HCSP 2019-2020' },
]

const casquettes = [
  {
    num: '01',
    titre: 'Organisateur esport',
    desc: "Six ans à monter la scène esport guadeloupéenne avec Esports Guadeloupe — tournois, communauté, partenariats grands comptes. Connaît de l'intérieur la communauté joueurs, l'économie d'un tournoi et le langage Discord d'équipe.",
  },
  {
    num: '02',
    titre: 'Médiateur formé',
    desc: "Formateur principal en médiation numérique chez Simplon Outre-Mer (2021–2022). Lecture rigoureuse des recommandations HAS et HCSP. Pratique en cohérence avec les standards du soutien à la parentalité.",
  },
  {
    num: '03',
    titre: 'Conseil institutionnel',
    desc: "Affaires européennes et numérique THD à la Région Guadeloupe, formation aux élus et accompagnement des collectivités. Connaît le langage des projets de service et des bilans d'activité.",
  },
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
            Basé aux Abymes (Guadeloupe), j'ai fondé PXLC pour concevoir et animer des programmes de médiation numérique par le jeu avec les structures du secteur médico-social et associatif.
          </p>
          <div class="about-facts">
            <div v-for="f in facts" :key="f.label" class="about-fact">
              <div class="about-fact__label">{{ f.label }}</div>
              <div class="about-fact__value">{{ f.value }}</div>
            </div>
          </div>
        </div>

        <div class="about-portrait">
          <NuxtImg
            src="/assets/img/photos/andy-portrait.jpg"
            alt="Portrait d'Andy Zébus, médiateur numérique par le jeu"
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

  <!-- ── Parcours ──────────────────────────────────────────────── -->
  <section class="section" aria-labelledby="parcours-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Parcours</span>
        <h2 id="parcours-title">Trois casquettes, une cohérence<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Trois expériences professionnelles distinctes — et une seule cohérence : mettre le jeu au service du lien.
        </p>
      </header>
      <div class="grid grid--3">
        <article v-for="c in casquettes" :key="c.num" class="card">
          <span class="kicker">Casquette {{ c.num }}</span>
          <h3 class="casquette-title">{{ c.titre }}</h3>
          <p class="casquette-desc">{{ c.desc }}</p>
        </article>
      </div>
    </div>
  </section>

  <CitationBlock
    source="Andy Zébus · médiateur numérique"
    quote="Mon travail, ce n'est pas de juger l'usage des écrans. C'est de faire du jeu vidéo un espace de rencontre — entre un enfant et son parent, entre une famille et votre équipe."
    attribution="Andy Zébus · médiateur numérique"
  />

  <!-- ── CTA ───────────────────────────────────────────────────── -->
  <section class="section section--soft" aria-labelledby="cta-about-title">
    <div class="container about-cta-section">
      <span class="eyebrow">Prochaine étape</span>
      <h2 id="cta-about-title">Travailler avec PXLC<span class="coral-dot" aria-hidden="true">.</span></h2>
      <p class="lead">
        Pour les structures médico-sociales et associatives de Guadeloupe —
        devis sur mesure, plaquette PDF disponible.
      </p>
      <div class="about-cta-actions">
        <NuxtLink to="/pour-les-structures" class="btn btn--primary btn--lg">Voir mes programmes</NuxtLink>
        <a
          href="/files/plaquette-pxlc.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--ghost btn--lg"
          aria-label="Plaquette PDF, 12 pages (nouvel onglet)"
        >Plaquette PDF · 12 pages</a>
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
  gap: var(--space-3);
  margin-top: var(--space-3);
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

/* ── Casquettes ──────────────────────────────────────────────── */
.casquette-title { font-size: 18px; margin: var(--space-2) 0; }
.casquette-desc  { font-size: 14.5px; line-height: 1.6; }

/* ── CTA ─────────────────────────────────────────────────────── */
.about-cta-section { max-width: 720px; }
.about-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}
</style>
