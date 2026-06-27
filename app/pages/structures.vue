<script setup lang="ts">
useSeoMeta({ title: 'Programmes parent-enfant — structures en Guadeloupe' })
if (import.meta.server) {
  useSeoMeta({
    description:
      'Programmes parent-enfant — HCSP 2019-2020 · HAS 2020, indicateurs qualitatifs, bilan transmis à vos tutelles.',
    ogDescription:
      'Andy Zébus, créateur de PXLC, intervient avec votre équipe — ateliers parent-enfant, cadre HCSP 2019-2020 · HAS 2020.',
  })
}

defineOgImage('PxlcOg')


// FAQ — answers grounded in the plaquette + existing copy. Doubles as the
// FAQPage rich-result source (defineQuestion below).
// Défini ici (avant useSchemaOrg) pour être spreadé dans le même appel.
const faqs = [
  {
    id: 'duree',
    q: 'Quelle est la durée typique d’un dispositif ?',
    a: 'À calibrer ensemble selon le rythme de votre structure : un cycle complet articule la préparation, plusieurs ateliers thématiques, un groupe de parole familiale et un bilan. À titre indicatif, le projet « Jouons Ensemble ! » 2026 au SESSAD Lékoklaya s’étend sur l’année.',
  },
  {
    id: 'tarif',
    q: 'Quel est le tarif ?',
    a: 'Sur devis, calibré au périmètre (nombre d’ateliers, nombre de familles, durée). Le devis inclut la rémunération du médiateur intervenant ; le prêt des consoles et des jeux peut être inclus ou pris en charge par la structure.',
  },
  {
    id: 'nombre-enfants',
    q: 'Combien d’enfants par dispositif ?',
    a: 'Calibré avec votre équipe. Le projet 2026 au SESSAD Lékoklaya accompagne 8 enfants âgés de 12 à 17 ans avec leurs parents, en binômes.',
  },
  {
    id: 'profils',
    q: 'Quels profils d’enfants sont accueillis ?',
    a: 'À toutes les familles accompagnées par la structure qui vivent des tensions autour des écrans. Le programme s’adapte en concertation avec votre équipe — y compris pour des profils spécifiques (TND, troubles du comportement, du lien social).',
  },
]

// Un seul appel : WebPage (FAQPage) + toutes les questions.
// Service #service est déclaré globalement dans app.vue — la WebPage le
// référence via `about` pour le rattacher au graphe.
useSchemaOrg([
  defineWebPage({
    '@type': ['WebPage', 'FAQPage'],
    name: 'Programmes de médiation numérique pour SESSAD, IME, associations et collectivités',
    about: { '@id': 'https://pxlc.fr/#service' },
  }),
  ...faqs.map(f =>
    defineQuestion({
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }),
  ),
])

const facts: [string, string][] = [
  ['Format', 'Ateliers thématiques parent-enfant'],
  ['Public', 'Familles accompagnées par votre structure'],
  ['Âges', '12 à 17 ans (adaptable)'],
  ['Encadrement', 'Équipe pluridisciplinaire + médiateur numérique'],
  ['Références', 'HCSP 2019-2020 · HAS 2020'],
  ['Tarif', 'Sur devis'],
]

// Méthode en 4 étapes (déroulé opérationnel) — activités : plaquette ; ancrage HCSP/HAS éditorial, cf. docs/references/CITATIONS.md
const steps = [
  { num: '01', title: 'Préparation', detail: 'Entretiens familiaux avec votre équipe et le médiateur numérique : profil ludique de chaque enfant, usages et attentes des parents, construction des binômes parent-enfant. Le diagnostic partagé qui conditionne la suite.' },
  { num: '02', title: 'Ateliers thématiques parent-enfant', detail: 'Coopération · Émotions & récits · Différence & complémentarité — travaillés par le jeu vidéo comme support de médiation, jamais comme problème.' },
  { num: '03', title: 'Groupe de parole familiale', detail: 'Régulation, limites pour un usage régulé, repères d’usage problématique, posture parentale : l’accompagnement parental que le cadre HCSP désigne comme le facteur clé.' },
  { num: '04', title: 'Bilan', detail: 'Synthèse des acquis parent/enfant, pistes de continuité à la maison, transmission écrite à votre équipe — avec les recommandations HCSP mobilisées, utile pour vos rapports d’activité.' },
]

const frameworks = [
  { key: 'HCSP', year: '2019', title: 'Effets de l’exposition aux écrans', desc: 'L’accompagnement parental actif est le facteur clé pour limiter les effets négatifs. Cadre familial, pratiques partagées, qualité du contenu.', url: 'https://www.hcsp.fr/Explore.cgi/AvisRapportsDomaine?clefr=759' },
  { key: 'HCSP', year: '2020', title: 'De l’usage excessif à la dépendance', desc: 'Seconde partie du rapport — repères pour identifier et prévenir le basculement vers un usage problématique. Calibration des indicateurs PXLC.', url: 'https://www.hcsp.fr/Explore.cgi/AvisRapportsDomaine?clefr=1074' },
]

// Indicateurs d'évaluation — source : plaquette §"Indicateurs d'évaluation".
const indicators = [
  { title: 'Questionnaires de satisfaction', detail: 'Recueillis en fin de chaque cycle auprès des parents et des enfants. Items standardisés + champ libre.' },
  { title: 'Grilles d’observation des compétences', detail: 'Coopération, communication, gestion des émotions — observées pendant les ateliers et restituées dans le bilan.' },
  { title: 'Diminution rapportée des conflits familiaux liés aux écrans', detail: 'Auto-évaluation parents, complétée par le suivi de l’équipe pluridisciplinaire entre les ateliers.' },
  { title: 'Engagement et assiduité aux ateliers', detail: 'Taux de présence, participation active, demandes de prolongation.' },
]

const { themes } = useProjectThemes()
</script>

<template>
  <section class="hero hero--soft" aria-labelledby="hero-title">
    <div class="hero__strip"><PxlcPixelCorner /></div>
    <div class="container">
      <div class="hero__inner">
        <div>
          <SiteBreadcrumb />
          <div class="structures-badges">
            <span class="badge badge--soft">SESSAD · IME · associations · collectivités</span>
          </div>
          <h1 id="hero-title" class="hero__title">
            Médiation numérique pour votre structure<span class="coral-dot" aria-hidden="true">.</span>
          </h1>
          <p class="hero__lead">
            Programme phare&nbsp;: Parent-Écran-Enfant, une démarche de parentalité numérique ancrée dans les recommandations HCSP&nbsp;2019-2020 · HAS&nbsp;2020 — indicateurs qualitatifs, bilan transmis à vos tutelles en fin de dispositif.
          </p>
          <div class="hero__actions">
            <a href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg" aria-label="Prendre rendez-vous (nouvel onglet)">Prendre rendez-vous</a>
            <a href="/files/plaquette-pxlc.pdf" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--lg btn--no-arrow" aria-label="Plaquette PDF, 6 pages (nouvel onglet)">Plaquette PDF · 6 pages</a>
          </div>
        </div>

        <!-- div instead of <aside>: this card is part of the hero, not
             tangentially related content, so an aside landmark nested
             inside the hero section trips axe-core
             "landmark-complementary-is-top-level". -->
        <div class="facts-card" role="group" aria-label="Le dispositif en un coup d’œil">
          <span class="eyebrow">En un coup d’œil</span>
          <ul class="facts-list">
            <li v-for="[k, v] in facts" :key="k">
              <span class="kicker">{{ k }}</span>
              <span class="facts-list__value">{{ v }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <PartnerStrip />

  <!-- Sommaire de page (non collant) — repères sur une page longue. Le saut
       d'ancre respecte le header collant via html{scroll-padding-top} global. -->
  <nav class="onpage-nav" aria-label="Sur cette page">
    <div class="container onpage-nav__inner">
      <span class="onpage-nav__label">Sur cette page</span>
      <ul class="onpage-nav__list" role="list">
        <li><a class="onpage-nav__link" href="#methode">Méthode</a></li>
        <li><a class="onpage-nav__link" href="#themes">Ateliers</a></li>
        <li><a class="onpage-nav__link" href="#cadre">Cadre</a></li>
        <li><a class="onpage-nav__link" href="#indicateurs">Indicateurs</a></li>
        <li><a class="onpage-nav__link" href="#lekoklaya">Projet pilote</a></li>
        <li><a class="onpage-nav__link" href="#faq">FAQ</a></li>
      </ul>
    </div>
  </nav>

  <section id="methode" class="section" aria-labelledby="methode-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Méthode</span>
        <h2 id="methode-title">Quatre étapes, de la préparation au bilan<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">Une démarche ancrée dans le cadre HCSP&nbsp;2019-2020 · HAS&nbsp;2020&nbsp;: partir des usages réels de la famille, travailler par le jeu, outiller les parents, transmettre un bilan écrit à votre équipe.</p>
      </header>
      <div class="grid grid--2 process-grid">
        <article v-for="s in steps" :key="s.num" class="card card--method">
          <div class="card__pixel"><PxlcPixelCorner /></div>
          <div class="card__step-num">ÉTAPE {{ s.num }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.detail }}</p>
        </article>
      </div>
    </div>
  </section>

  <section id="themes" class="section section--soft" aria-labelledby="themes-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Ateliers thématiques</span>
        <h2 id="themes-title">Trois thèmes d’atelier, un protocole<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Chaque atelier articule un temps de jeu partagé (30 à 45&nbsp;min) et un temps d’échange verbal (45&nbsp;min à 1&nbsp;h).
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

  <section id="cadre" class="section" aria-labelledby="cadre-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Cadre théorique</span>
        <h2 id="cadre-title">Deux rapports qui structurent la démarche<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">Pas un avis personnel sur les écrans&nbsp;: un cadre construit à partir des rapports du Haut Conseil de la Santé Publique. Chaque rapport est cité explicitement dans les bilans transmis aux équipes.</p>
      </header>
      <div class="grid grid--2">
        <article v-for="c in frameworks" :key="c.key + c.year" class="card">
          <div class="framework-tag">
            <span class="framework-tag__dot" />
            <span class="kicker framework-tag__label">{{ c.key }} · {{ c.year }}</span>
          </div>
          <h3 class="framework-title">{{ c.title }}</h3>
          <p class="framework-desc">{{ c.desc }}</p>
          <a
            v-if="c.url"
            :href="c.url"
            target="_blank"
            rel="noopener noreferrer"
            class="kicker mt-3 framework-meta framework-meta--link"
            :aria-label="`${c.key} ${c.year}, rapport officiel (nouvel onglet)`"
          >↳ rapport officiel ↗</a>
          <span v-else class="kicker mt-3 framework-meta">↳ référence officielle</span>
        </article>
      </div>
    </div>
  </section>

  <section id="indicateurs" class="section section--soft" aria-labelledby="indicateurs-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Évaluation</span>
        <h2 id="indicateurs-title">Indicateurs qualitatifs, restitution écrite<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Quatre indicateurs simples mais structurants pour les bilans à transmettre à vos tutelles (ARS, CAF, financeurs).
        </p>
      </header>
      <div class="grid grid--2">
        <article v-for="i in indicators" :key="i.title" class="card">
          <h3 class="indicator-title">{{ i.title }}</h3>
          <p class="indicator-detail mt-3">{{ i.detail }}</p>
        </article>
      </div>
    </div>
  </section>

  <section id="lekoklaya" class="leko-section" aria-labelledby="lekoklaya-title">
    <PxlcPixelStrip class="leko-section__strip" :count="7" :accent-at="5" />
    <div class="container">
      <header class="section__head">
        <span class="eyebrow leko-eyebrow">Projet pilote — SESSAD Lékoklaya · 2026</span>
        <h2 id="lekoklaya-title" class="leko-title">Ce qu'un dispositif produit concrètement<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead leko-lead">Programme «&nbsp;Jouons Ensemble&nbsp;!&nbsp;» — porté par le psychologue du SESSAD, co-construit avec PXLC.</p>
      </header>
      <div class="grid grid--2 leko-grid">
        <div>
          <ul class="leko-list">
            <li><span class="leko-val">8</span><span class="leko-label">enfants accompagnés en binôme avec un parent</span></li>
            <li><span class="leko-val">12–17</span><span class="leko-label">ans · TSA, TDAH, TND, dystrophie musculaire</span></li>
            <li><span class="leko-val">3</span><span class="leko-label">thèmes · coopération, émotions, différence</span></li>
            <li><span class="leko-val">4</span><span class="leko-label">intervenants · psychologue, psychomotricienne, médiateur culturel, médiateur numérique</span></li>
          </ul>
        </div>
        <div>
          <p class="lekoklaya-desc">Le point de départ&nbsp;: le jeu vidéo revenait systématiquement dans les entretiens familiaux comme source de conflit. Le dispositif a transformé ces tensions en matériau de travail pour l'équipe pluridisciplinaire.</p>
          <p class="lekoklaya-desc mt-3">Les parents qui ne comprenaient pas pourquoi leur enfant jouait ont pu rejouer avec lui. Les profils ludiques ont été transmis à l'équipe dans le bilan final.</p>
          <NuxtLink to="/blog/jouons-ensemble-sessad-lekoklaya" class="leko-link mt-3">Lire le projet en détail</NuxtLink>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="section section--soft" aria-labelledby="faq-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">FAQ</span>
        <h2 id="faq-title">Questions fréquentes<span class="coral-dot" aria-hidden="true">.</span></h2>
      </header>
      <div class="faq">
        <details v-for="f in faqs" :key="f.id" class="faq__item">
          <summary class="faq__q">{{ f.q }}</summary>
          <div class="faq__a">{{ f.a }}</div>
        </details>
      </div>
    </div>
  </section>

  <RelatedReading
    eyebrow="À lire"
    title="Pour approfondir le dispositif"
    :paths="[
      '/blog/mediation-numerique-parent-enfant-sessad-ime',
      '/blog/jouons-ensemble-sessad-lekoklaya',
      '/blog/programme-parent-ecran-enfant',
    ]"
  />

</template>

<style scoped>
.structures-badges { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4); align-items: center; }
.facts-card { background: var(--bg-elev); border: 1px solid var(--rule); border-radius: var(--radius-lg); padding: var(--space-4); }
.facts-list { display: grid; gap: var(--space-3); list-style: none; padding: 0; margin: 0; }
.facts-list li {
  display: flex; justify-content: space-between; gap: var(--space-3);
  padding-bottom: var(--space-3); border-bottom: 1px dashed var(--rule);
}
.facts-list li:last-child { border-bottom: 0; padding-bottom: 0; }
.facts-list__value {
  font-family: var(--font-body); font-weight: 500; font-size: 14px;
  color: var(--ink); text-align: right;
}

/* ── Sommaire de page (inline, non collant) ──────────────────── */
.onpage-nav { border-bottom: 1px solid var(--bg-rule); background: var(--bg); }
.onpage-nav__inner {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: var(--space-2) var(--space-4); padding-block: var(--space-2);
}
.onpage-nav__label {
  font-family: var(--font-label); font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--quiet);
}
.onpage-nav__list {
  display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-4);
  list-style: none; padding: 0; margin: 0;
}
.onpage-nav__link {
  font-family: var(--font-label); font-size: 13px; font-weight: 600;
  color: var(--teal-deep);
  display: inline-flex; align-items: center; min-height: 44px;
}
.onpage-nav__link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .onpage-nav__link { color: var(--cyan); }

.hero__title { font-size: clamp(36px, 5.4vw, 64px); }

.process-grid { align-items: stretch; }

.framework-tag {
  display: inline-flex; align-items: center; gap: var(--space-2);
  background: var(--bg); border: 1px solid var(--rule);
  padding: 6px 12px; border-radius: var(--radius-sm); margin-bottom: var(--space-3);
}
.framework-tag__dot { width: 8px; height: 8px; background: var(--pxlc-coral); border-radius: 2px; }
.framework-tag__label { color: var(--ink); }
.framework-title { font-size: 20px; margin-bottom: var(--space-2); }
/* .pxlc-body-sm (global) — 15px / 1.6 avec font-body et ink-quiet. */
.framework-desc,
.indicator-detail,
.theme-desc { font-size: 15px; line-height: 1.6; }

.framework-meta { display: block; }
.framework-meta--link { color: var(--teal-deep); transition: color var(--dur-fast); }
.framework-meta--link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .framework-meta--link { color: var(--cyan); }

.indicator-title { font-size: 18px; }

.theme-title { font-size: 20px; }

.faq { display: grid; gap: var(--space-2-5); max-width: 820px; margin: 0 auto; }
.faq__item {
  border: 1px solid var(--rule); border-radius: var(--radius-md);
  background: var(--bg-elev); padding: 16px 20px;
  transition: border-color var(--dur-fast);
}
.faq__item[open] { border-color: var(--pxlc-coral); }
.faq__q {
  font-family: var(--font-display); font-weight: 600; font-size: 16px;
  color: var(--ink); cursor: pointer; list-style: none;
  display: flex; align-items: center; justify-content: space-between; gap: var(--space-3);
}
.faq__q::after {
  content: "+"; font-family: var(--font-label); font-weight: 400;
  color: var(--pxlc-coral); font-size: 22px; transition: transform var(--dur-base);
}
.faq__item[open] .faq__q::after { content: "−"; }
.faq__q::-webkit-details-marker { display: none; }
.faq__a {
  margin-top: var(--space-2-5); font-size: 15px; line-height: 1.6; color: var(--ink-quiet);
}

@media (max-width: 479px) {
  .structures-badges {
    align-items: stretch;
  }

  .structures-badges .badge {
    width: 100%;
    justify-content: center;
    text-align: center;
    white-space: normal;
  }

  .facts-card {
    padding: var(--space-3);
  }
}

/* Lekoklaya dark section — casse la monotonie des sections standard */
.leko-section {
  background: var(--pxlc-bg-dark); color: var(--pxlc-ivory);
  padding: clamp(var(--space-6), 8vw, var(--space-9)) 0;
  position: relative; overflow: hidden;
}
.leko-section__strip { position: absolute; top: 32px; right: clamp(20px, 4vw, 56px); }
.leko-eyebrow { color: var(--pxlc-cyan); }
.leko-title { color: var(--pxlc-ivory); }
.leko-lead { color: var(--pxlc-text-on-dark-soft); }
.leko-grid { align-items: start; }

.leko-list { list-style: none; padding: 0; margin: 0; display: grid; gap: var(--space-4); }
.leko-list li { display: grid; grid-template-columns: 72px 1fr; gap: var(--space-3); align-items: center; }
.leko-val { font-family: var(--font-display); font-weight: 700; font-size: 28px; color: var(--pxlc-coral); }
.leko-label { font-size: 14px; line-height: 1.4; color: var(--pxlc-text-on-dark-soft); }
.lekoklaya-desc { font-size: 15px; line-height: 1.6; color: var(--pxlc-text-on-dark-soft); }
/* Lien vers l'étude de cas — section toujours sombre, couleur cyan forcée
   (le teal-deep par défaut manquerait de contraste sur ce fond). */
.leko-link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  min-height: 44px;
  font-family: var(--font-label); font-size: 13px; font-weight: 600;
  letter-spacing: 0.04em; color: var(--pxlc-cyan);
}
.leko-link::after { content: "→"; }
.leko-link:hover { color: var(--pxlc-ivory); text-decoration: none; }
.leko-link:focus-visible { outline: none; box-shadow: var(--ring-cyan); border-radius: var(--radius-xs); }
</style>
