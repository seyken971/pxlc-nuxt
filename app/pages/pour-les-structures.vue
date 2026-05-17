<script setup lang="ts">
useSeoMeta({
  title: 'Dispositif de médiation numérique pour SESSAD, IME, associations',
  description:
    'Un dispositif clé en main pour SESSAD, IME, associations et collectivités de Guadeloupe : ateliers thématiques parent-enfant, équipe pluridisciplinaire, indicateurs d’évaluation, cadre HAS et HCSP.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · POUR LES STRUCTURES',
  title: 'Un dispositif de médiation numérique fondé sur les repères HAS',
  description: 'Ateliers thématiques parent-enfant co-encadrés par votre équipe pluridisciplinaire et le gamer médiateur-numérique. Cadre HAS / HCSP, indicateurs d’évaluation, bilan en fin de dispositif.',
})

const facts: [string, string][] = [
  ['Format', 'Ateliers thématiques parent-enfant'],
  ['Profils', 'TSA · TDAH · TCND · DM · neuropathie'],
  ['Âges', '12 à 17 ans (adaptable)'],
  ['Encadrement', 'Équipe pluridisciplinaire + gamer médiateur'],
  ['Références', 'HAS 2020 · HCSP 2019 · HCSP 2020'],
  ['Tarif', 'Sur devis'],
]

const frameworks = [
  { key: 'HAS', year: '2020', title: 'Soutien à la parentalité', desc: '« Soutenir la fonction parentale dans la médiation des écrans plutôt que prescrire des interdits ». Axe central du protocole.' },
  { key: 'HCSP', year: '2019', title: 'Effets de l’exposition aux écrans', desc: 'L’accompagnement parental actif est le facteur clé pour limiter les effets négatifs. Cadre familial, pratiques partagées, qualité du contenu.' },
  { key: 'HCSP', year: '2020', title: 'De l’usage excessif à la dépendance', desc: 'Seconde partie du rapport — repères pour identifier et prévenir le basculement vers un usage problématique. Calibration des indicateurs PXLC.' },
]

const { themes } = useProjectThemes()

const team = [
  { role: 'Psychologue', detail: 'porteur du projet, cadrage clinique, entretien initial, bilan' },
  { role: 'Psychomotricienne', detail: 'auto-régulation des affects et des pulsions motrices' },
  { role: 'Intervenants culturels', detail: 'jeux traditionnels et contes en miroir des thèmes numériques' },
  { role: 'Gamer médiateur-numérique', detail: 'choix des jeux, accompagnement en situation, démystification' },
]
</script>

<template>
  <section class="hero hero--soft" aria-labelledby="hero-title">
    <div class="hero__strip"><PixelCorner /></div>
    <div class="container">
      <div class="hero__inner">
        <div>
          <div class="structures-badges">
            <span class="badge badge--audience">Pour les structures</span>
            <span class="badge badge--soft">SESSAD · IME · associations · collectivités</span>
          </div>
          <h1 id="hero-title" class="hero__title">
            Un dispositif de médiation numérique fondé sur les repères HAS<span class="coral-dot" aria-hidden="true">.</span>
          </h1>
          <p class="hero__lead">
            « Jouons Ensemble! » — ateliers thématiques parent-enfant co-encadrés par votre équipe pluridisciplinaire et le gamer médiateur-numérique. Cadre théorique HAS / HCSP, indicateurs d’évaluation qualitatifs, bilan en fin de dispositif.
          </p>
          <div class="hero__actions">
            <NuxtLink to="/contact" class="btn btn--primary btn--lg">Demander un devis</NuxtLink>
            <a href="/files/plaquette-pxlc.pdf" target="_blank" rel="noopener" class="btn btn--ghost btn--lg">Plaquette PDF · 12 pages</a>
          </div>
        </div>

        <aside class="facts-card">
          <span class="eyebrow">En un coup d’œil</span>
          <ul class="facts-list">
            <li v-for="[k, v] in facts" :key="k">
              <span class="kicker">{{ k }}</span>
              <span class="facts-list__value">{{ v }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Jouons Ensemble!</span>
        <h2>Trois thèmes d’atelier, un protocole<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Chaque atelier articule un temps de jeu partagé (30 à 45 min) et un temps d’échange verbal (45 min à 1 h). Liste de thèmes non exhaustive — calibrée avec votre équipe selon les besoins du public accueilli.
        </p>
      </header>
      <div class="grid grid--3">
        <article v-for="t in themes" :key="t.title" class="card">
          <span class="kicker">Thème</span>
          <h3 class="mt-3 theme-title">{{ t.title }}</h3>
          <p class="mt-3 theme-desc">{{ t.long }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Cadre théorique</span>
        <h2>Trois sources qui structurent la démarche<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">Pas un avis personnel sur les écrans : un cadre construit à partir des recommandations institutionnelles françaises. Chaque référence est citée explicitement dans les bilans transmis aux équipes.</p>
      </header>
      <div class="grid grid--3">
        <article v-for="c in frameworks" :key="c.key + c.year" class="card">
          <div class="framework-tag">
            <span class="framework-tag__dot" />
            <span class="kicker framework-tag__label">{{ c.key }} · {{ c.year }}</span>
          </div>
          <h3 class="framework-title">{{ c.title }}</h3>
          <p class="framework-desc">{{ c.desc }}</p>
          <span class="kicker mt-3 framework-meta">↳ référence officielle</span>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Équipe pluridisciplinaire</span>
        <h2>Le gamer ne remplace personne — il complète<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Le projet est porté par la psychologue de votre structure. Le gamer médiateur-numérique intervient en partenariat, sur le terrain spécifique de la culture jeu vidéo.
        </p>
      </header>
      <div class="grid grid--2 team-grid">
        <article v-for="m in team" :key="m.role" class="card">
          <span class="kicker">Rôle</span>
          <h3 class="mt-3 team-role">{{ m.role }}</h3>
          <p class="mt-3 team-detail">{{ m.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.structures-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; align-items: center; }
.facts-card { background: var(--bg-elev); border: 1px solid var(--rule); border-radius: 14px; padding: 24px; }
.facts-list { display: grid; gap: 16px; list-style: none; padding: 0; margin: 0; }
.facts-list li {
  display: flex; justify-content: space-between; gap: 16px;
  padding-bottom: 16px; border-bottom: 1px dashed var(--rule);
}
.facts-list li:last-child { border-bottom: 0; padding-bottom: 0; }
.facts-list__value {
  font-family: var(--font-body); font-weight: 500; font-size: 14px;
  color: var(--ink); text-align: right;
}
.framework-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--bg); border: 1px solid var(--rule);
  padding: 6px 12px; border-radius: 6px; margin-bottom: 16px;
}
.framework-tag__dot { width: 8px; height: 8px; background: var(--pxlc-coral); border-radius: 2px; }
.framework-tag__label { color: var(--ink); }
.framework-title { font-size: 20px; margin-bottom: 8px; }
.framework-desc { font-size: 14.5px; line-height: 1.6; }
.framework-meta { display: block; }
.theme-title { font-size: 20px; }
.theme-desc { font-size: 14.5px; line-height: 1.6; }
.team-grid { align-items: stretch; }
.team-role { font-size: 18px; }
.team-detail { font-size: 14.5px; line-height: 1.6; }
</style>
