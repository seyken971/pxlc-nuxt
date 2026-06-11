<script setup lang="ts">
useSeoMeta({ title: 'Andy Zébus, médiateur numérique — Guadeloupe · 971' })
if (import.meta.server) {
  useSeoMeta({
    description:
      'Médiateur numérique en Guadeloupe — 6 ans de scène esport, formation Simplon, conseil institutionnel.',
    ogDescription:
      'Andy Zébus aide les familles à se réconcilier autour des écrans, en binômes parent-enfant, avec votre équipe.',
  })
}

defineOgImage('PxlcOg', {
  eyebrow: 'À PROPOS',
  title: 'Médiateur numérique',
  description:
    "J'aide les familles à mieux utiliser les écrans — en ateliers parent-enfant co-encadrés avec les équipes des SESSAD, IME, associations et collectivités de Guadeloupe.",
}, [
  { key: 'og' },
  { key: 'whatsapp', width: 800, height: 800 },
])

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
  { label: 'Cadre',      value: 'HCSP 2019-2020 · HAS 2020' },
]

const casquettes = [
  {
    num: '01',
    titre: 'Organisateur esport',
    desc: "Plus de six ans sur la scène esport guadeloupéenne — tournois, partenariats grands comptes, 1 mois de CA en 4 jours (Destreland Gaming Cup). Connaît la communauté joueurs de l'intérieur.",
  },
  {
    num: '02',
    titre: 'Médiateur formé',
    desc: "Formateur principal en médiation numérique chez Simplon Outre-Mer (2021–2022). Pratique alignée sur les recommandations HCSP 2019-2020 · HAS 2020.",
  },
  {
    num: '03',
    titre: 'Conseil institutionnel',
    desc: "Affaires européennes et numérique THD à la Région Guadeloupe. Parle le langage des projets de service et des financements publics.",
  },
]

const timeline = [
  { year: '2005',      title: 'Premières compétitions de jeux vidéo',           desc: "Organisation d'événements JV chez Kayanim' (Pointe-à-Pitre)." },
  { year: '2010',      title: 'Community Manager — 100 000 inscrits',       desc: "Lancement du serveur EU-FR d'Atlantica Online (Ndoors Europe)." },
  { year: '2013–2014', title: 'Région Guadeloupe — Affaires Européennes',        desc: "Suivi fonds FEDER · FSE · FEADER · FEAMP et déploiement du Très Haut Débit." },
  { year: '2015–2018', title: 'Activité numérique indépendante',                 desc: "Stratégie digitale Région Guadeloupe Route du Rhum 2018, formation d'élus en anglais." },
  { year: '2019–2025', title: 'Esports Guadeloupe — 6 ans',                 desc: "Scène esport guadeloupéenne — Destreland Gaming Cup, Game Over Challenge. 1 mois de CA en 4 jours pour un partenaire commercial." },
  { year: '2021–2022', title: 'Simplon Outre-Mer — formateur principal',         desc: "Formation de futurs responsables d'espaces de médiation numérique." },
  { year: '2026',      title: 'PXLC — médiateur numérique familial',             desc: "Programme Jouons Ensemble au SESSAD Lékoklaya — 8 familles, 12–17 ans, TSA/TDAH/TND, co-encadrement avec psychologue et psychomotricienne." },
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
            Andy Zébus, médiateur numérique<span class="coral-dot" aria-hidden="true">.</span>
          </h1>
          <p class="about-lead">
            Basé aux Abymes (Guadeloupe), j'ai créé PXLC pour accompagner les familles dans leur parentalité numérique — résoudre les conflits autour du temps d'écran, adopter les bonnes pratiques du numérique — en partenariat avec les structures de Guadeloupe.
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
            src="/img/photos/andy-portrait.jpg"
            alt="Portrait d'Andy Zébus, médiateur numérique"
            width="480"
            height="600"
            format="webp"
            loading="eager"
            fetchpriority="high"
            preload
            sizes="sm:100vw md:480px"
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

  <section class="section section--soft" aria-labelledby="timeline-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Chronologie</span>
        <h2 id="timeline-title">De la compétition JV à la médiation familiale<span class="coral-dot" aria-hidden="true">.</span></h2>
      </header>
      <ul class="timeline">
        <li v-for="step in timeline" :key="step.year" class="timeline__item">
          <span class="timeline__year">{{ step.year }}</span>
          <div class="timeline__body">
            <strong class="timeline__title">{{ step.title }}</strong>
            <p class="timeline__desc">{{ step.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <CitationBlock
    source="Andy Zébus · médiateur numérique"
    quote="Mon travail, ce n'est pas de juger l'usage des écrans. C'est de créer un espace de rencontre — autour du jeu vidéo, des réseaux, du temps d'écran — entre un enfant et son parent, entre une famille et votre équipe."
    attribution="Andy Zébus · médiateur numérique"
  />

  <!-- ── CTA ───────────────────────────────────────────────────── -->
  <section class="section section--soft" aria-labelledby="cta-about-title">
    <div class="container about-cta-section">
      <span class="eyebrow">Prochaine étape</span>
      <h2 id="cta-about-title">Travailler avec PXLC<span class="coral-dot" aria-hidden="true">.</span></h2>
      <p class="lead">
        Pour les structures de Guadeloupe —
        devis sur mesure, plaquette PDF disponible.
      </p>
      <div class="about-cta-actions">
        <NuxtLink to="/structures" class="btn btn--primary btn--lg">Voir mes programmes</NuxtLink>
        <a
          href="/files/plaquette-pxlc.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--ghost btn--lg"
          aria-label="Plaquette PDF, 6 pages (nouvel onglet)"
        >Plaquette PDF · 6 pages</a>
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
  font-family: var(--font-label);
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
.casquette-desc  { font-size: 15px; line-height: 1.6; }

/* ── CTA ─────────────────────────────────────────────────────── */
.about-cta-section { max-width: 720px; margin: 0 auto; }
.about-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

/* ── Timeline ────────────────────────────────────────────────── */
.timeline { list-style: none; padding: 0; margin: 0; display: grid; gap: var(--space-4); max-width: 760px; }
.timeline__item { display: grid; grid-template-columns: 100px 1fr; gap: var(--space-4); align-items: baseline; }
@media (max-width: 600px) { .timeline__item { grid-template-columns: 1fr; gap: var(--space-1); } }
.timeline__year { font-family: var(--font-label); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--eyebrow); padding-top: 3px; }
.timeline__title { font-family: var(--font-display); font-weight: 600; font-size: 16px; color: var(--ink); }
.timeline__desc { font-size: 15px; line-height: 1.6; color: var(--ink-quiet); margin: var(--space-1) 0 0; }
</style>
