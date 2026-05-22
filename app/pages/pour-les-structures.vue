<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    // 49 chars → 56 with " · PXLC" suffix from titleTemplate.
    title: 'Médiation numérique · SESSAD, IME et associations',
    // Kept under ~160 chars so Google doesn't truncate the HCSP tail.
    description:
      'Dispositif clé en main pour SESSAD, IME, associations et collectivités de Guadeloupe : ateliers parent-enfant, équipe pluridisciplinaire, cadre HCSP.',
  })
}

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · POUR LES STRUCTURES',
  title: 'Un dispositif de médiation numérique fondé sur les rapports HCSP',
  description: 'Ateliers thématiques parent-enfant co-encadrés par votre équipe pluridisciplinaire et le gamer médiateur-numérique. Cadre HCSP, indicateurs d’évaluation, bilan en fin de dispositif.',
})

// FAQPage typing so Google picks up the FAQ block as rich results.
// The Service node lives in the graph as a standalone entity — no mainEntity
// link needed (Questions auto-attach to FAQPage via resolveRootNode).
useSchemaOrg([
  defineWebPage({
    '@type': ['WebPage', 'FAQPage'],
    name: 'Dispositif de médiation numérique pour SESSAD, IME, associations et collectivités',
  }),
  // Schema.org Service — the offer Andy markets to structures.
  {
    '@id': 'https://pxlc.fr/#service',
    '@type': 'Service',
    name: '« Jouons Ensemble! » — Médiation numérique parent-écran-enfant',
    description: 'Dispositif d’ateliers thématiques parent-enfant co-encadrés par l’équipe pluridisciplinaire de la structure porteuse et le gamer médiateur-numérique. Cadre HCSP 2019-2020.',
    serviceType: 'Médiation numérique',
    provider: { '@id': 'https://pxlc.fr/#identity' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Guadeloupe' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'SESSAD, IME, associations, collectivités',
    },
  },
])

const facts: [string, string][] = [
  ['Format', 'Ateliers thématiques parent-enfant'],
  ['Profils', 'TSA · TDAH · TCND · DM · neuropathie'],
  ['Âges', '12 à 17 ans (adaptable)'],
  ['Encadrement', 'Équipe pluridisciplinaire + gamer médiateur'],
  ['Références', 'HCSP 2019 · HCSP 2020'],
  ['Tarif', 'Sur devis'],
]

// Mode opératoire en 4 étapes — source : _plaquette/PROJET PARENTS – ECRAN – ENFANT.md
const steps = [
  { num: '01', title: 'Préparation', detail: 'Entretiens familiaux avec l’équipe (psychologue, psychomotricienne, gamer médiateur, intervenants culturels). Identification du profil ludique des enfants, construction des binômes parent-enfant.' },
  { num: '02', title: 'Ateliers thématiques parent-enfant', detail: 'Coopération · Émotions & récits · Différence & complémentarité. Chaque atelier : temps de jeu partagé (30-45 min) + temps d’échange verbal (45 min - 1 h). Observation et guidance des interactions.' },
  { num: '03', title: 'Groupe de parole familiale', detail: 'Espace d’échange entre familles : régulation, limites, signes d’alerte, posture parentale.' },
  { num: '04', title: 'Bilan', detail: 'Synthèse des acquis parent/enfant, élaboration de pistes de continuité à la maison, transmission écrite à l’équipe pluridisciplinaire.' },
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
  { title: 'Engagement et assiduité aux ateliers', detail: 'Taux de présence, participation active, demandes de prolongation — indicateurs simples mais structurants pour le bilan transmis.' },
]

const { themes } = useProjectThemes()

const team = [
  { role: 'Psychologue', detail: 'porteur du projet, cadrage clinique, entretien initial, bilan' },
  { role: 'Psychomotricienne', detail: 'auto-régulation des affects et des pulsions motrices' },
  { role: 'Intervenants culturels', detail: 'jeux traditionnels et contes en miroir des thèmes numériques' },
  { role: 'Gamer médiateur-numérique', detail: 'choix des jeux, accompagnement en situation, démystification' },
]

// TODO Andy : valider / corriger les workflows par audience. Ce sont des
// hypothèses raisonnables à partir des pratiques courantes du secteur ;
// le porteur, le financement et le public peuvent varier.
const audiences = [
  {
    id: 'sessad-ime',
    label: 'SESSAD · IME',
    porteur: 'Le psychologue de la structure',
    financement: 'Médico-social (ARS, CD)',
    public: 'Jeunes accompagnés par la structure et leurs parents',
  },
  {
    id: 'associations',
    label: 'Associations',
    porteur: 'La personne en charge de la coordination ou de la direction de l’association',
    financement: 'Subvention projet (CAF, ARS, mécénat, fonds européens)',
    public: 'Familles adhérentes ou bénéficiaires d’un programme parentalité',
  },
  {
    id: 'collectivites',
    label: 'Collectivités',
    porteur: 'Le service jeunesse, éducation ou cohésion sociale',
    financement: 'Budget de la collectivité, dispositifs REAAP / parentalité',
    public: 'Familles du territoire dans le cadre d’actions de soutien à la parentalité',
  },
]

// FAQ — answers grounded in the plaquette + existing copy. Doubles as the
// FAQPage rich-result source (defineQuestion in useSchemaOrg below).
const faqs = [
  {
    id: 'duree',
    q: 'Quelle est la durée typique d’un dispositif ?',
    a: 'À calibrer ensemble selon le rythme de votre structure : un cycle complet articule la préparation, plusieurs ateliers thématiques, un groupe de parole familiale et un bilan. À titre indicatif, le projet « Jouons Ensemble! » 2026 au SESSAD Lékoklaya s’étend sur l’année.',
  },
  {
    id: 'porteur',
    q: 'Qui porte le projet côté structure ?',
    a: 'La psychologue de la structure est porteuse du projet — cadrage clinique, entretien initial avec les familles, bilan final. Le gamer médiateur-numérique intervient en partenariat, sur le terrain spécifique de la culture jeu vidéo.',
  },
  {
    id: 'tarif',
    q: 'Quel est le tarif ?',
    a: 'Sur devis, calibré au périmètre (nombre d’ateliers, nombre de familles, durée). Le devis inclut la rémunération du gamer intervenant ; le prêt des consoles et des jeux peut être inclus ou pris en charge par la structure.',
  },
  {
    id: 'nombre-enfants',
    q: 'Combien d’enfants par dispositif ?',
    a: 'Calibré avec votre équipe. Le projet 2026 au SESSAD Lékoklaya accompagne 8 enfants âgés de 12 à 17 ans avec leurs parents, en binômes.',
  },
  {
    id: 'profils',
    q: 'Quels profils d’enfants sont accueillis ?',
    a: 'Adapté aux TSA, TDAH, TCND, DM, neuropathie — et plus largement à tout enfant suivi pour des troubles du neurodéveloppement, du comportement ou du lien social. L’adaptation se fait en concertation avec l’équipe pluridisciplinaire.',
  },
  {
    id: 'bilan',
    q: 'Comment se passe le bilan ?',
    a: 'Synthèse écrite des acquis parent/enfant transmise à l’équipe pluridisciplinaire, citant explicitement les rapports HCSP mobilisés. Plus une restitution orale aux familles avec des pistes concrètes de continuité à la maison.',
  },
]

// Add each FAQ to the schema graph so Google can render the FAQPage
// rich result. defineQuestion auto-attaches the questions to the page
// when the WebPage is typed as FAQPage (done above).
useSchemaOrg(
  faqs.map(f =>
    defineQuestion({
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }),
  ),
)
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
            Un dispositif de médiation numérique fondé sur les rapports HCSP<span class="coral-dot" aria-hidden="true">.</span>
          </h1>
          <p class="hero__lead">
            « Jouons Ensemble! » — ateliers thématiques parent-enfant co-encadrés par votre équipe pluridisciplinaire et le gamer médiateur-numérique. Cadre théorique HCSP, indicateurs d’évaluation qualitatifs, bilan en fin de dispositif.
          </p>
          <div class="hero__actions">
            <NuxtLink to="/contact" class="btn btn--primary btn--lg">Demander un devis</NuxtLink>
            <a href="/files/plaquette-pxlc.pdf" target="_blank" rel="noopener" class="btn btn--ghost btn--lg" aria-label="Plaquette PDF, 12 pages (nouvel onglet)">Plaquette PDF · 12 pages</a>
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

  <section id="processus" class="section" aria-labelledby="processus-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Mode opératoire</span>
        <h2 id="processus-title">Quatre étapes, de la préparation au bilan<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Un parcours stable et lisible — le détail des ateliers se calibre avec votre équipe selon les besoins du public accueilli.
        </p>
      </header>
      <div class="grid grid--2 process-grid">
        <article v-for="s in steps" :key="s.num" class="card card--method">
          <div class="card__pixel"><PixelCorner /></div>
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
        <span class="eyebrow">Jouons Ensemble!</span>
        <h2 id="themes-title">Trois thèmes d’atelier, un protocole<span class="coral-dot" aria-hidden="true">.</span></h2>
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

  <section id="cadre" class="section" aria-labelledby="cadre-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Cadre théorique</span>
        <h2 id="cadre-title">Deux rapports qui structurent la démarche<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">Pas un avis personnel sur les écrans : un cadre construit à partir des rapports du Haut Conseil de la Santé Publique. Chaque rapport est cité explicitement dans les bilans transmis aux équipes.</p>
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
            rel="noopener"
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

  <section id="equipe" class="section" aria-labelledby="equipe-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Équipe pluridisciplinaire</span>
        <h2 id="equipe-title">Le gamer ne remplace personne — il complète<span class="coral-dot" aria-hidden="true">.</span></h2>
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

  <section id="audiences" class="section section--soft" aria-labelledby="audiences-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Adapté à votre structure</span>
        <h2 id="audiences-title">Trois types de portage, un même protocole<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          La méthode reste la même ; le portage et le financement s’adaptent à votre cadre institutionnel.
        </p>
      </header>
      <div class="grid grid--3">
        <article v-for="a in audiences" :id="a.id" :key="a.id" class="card audience-card">
          <span class="kicker">{{ a.label }}</span>
          <dl class="audience-list mt-3">
            <dt>Porteur</dt><dd>{{ a.porteur }}</dd>
            <dt>Financement</dt><dd>{{ a.financement }}</dd>
            <dt>Public</dt><dd>{{ a.public }}</dd>
          </dl>
        </article>
      </div>
    </div>
  </section>

  <section id="reference" class="section" aria-labelledby="reference-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Référence concrète</span>
        <h2 id="reference-title">Projet 2026 — SESSAD Lékoklaya<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">
          Première application du protocole. 8 enfants âgés de 12 à 17 ans (TSA, TDAH, TCND, DM, neuropathie) accompagnés en binômes parent-enfant, co-encadrement complet, suite directe du Café-Parents « Enfants Écrans » de décembre 2023.
        </p>
      </header>
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

  <section class="section">
    <div class="container">
      <div class="structures-final-cta">
        <h2 class="structures-final-cta__title">
          On en parle&nbsp;<span class="coral-dot" aria-hidden="true">?</span>
        </h2>
        <p class="structures-final-cta__lead">
          Vingt minutes pour cadrer le périmètre, le public visé, et voir si le dispositif s’inscrit dans vos objectifs.
        </p>
        <div class="structures-final-cta__actions">
          <NuxtLink to="/contact" class="btn btn--primary btn--lg">Demander un devis</NuxtLink>
          <a href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener" class="btn btn--ghost btn--lg" aria-label="Réserver un échange (nouvel onglet)">Réserver un échange</a>
        </div>
      </div>
    </div>
  </section>
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

.process-grid { align-items: stretch; }

.framework-tag {
  display: inline-flex; align-items: center; gap: var(--space-2);
  background: var(--bg); border: 1px solid var(--rule);
  padding: 6px 12px; border-radius: 6px; margin-bottom: var(--space-3);
}
.framework-tag__dot { width: 8px; height: 8px; background: var(--pxlc-coral); border-radius: 2px; }
.framework-tag__label { color: var(--ink); }
.framework-title { font-size: 20px; margin-bottom: var(--space-2); }
.framework-desc { font-size: 14.5px; line-height: 1.6; }
.framework-meta { display: block; }
.framework-meta--link { color: var(--teal-deep); transition: color var(--dur-fast); }
.framework-meta--link:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .framework-meta--link { color: var(--cyan); }

.indicator-title { font-size: 18px; }
.indicator-detail { font-size: 14.5px; line-height: 1.6; }

.theme-title { font-size: 20px; }
.theme-desc { font-size: 14.5px; line-height: 1.6; }

.team-grid { align-items: stretch; }
.team-role { font-size: 18px; }
.team-detail { font-size: 14.5px; line-height: 1.6; }

.audience-card { scroll-margin-top: 96px; }
.audience-list { display: grid; gap: 8px 16px; grid-template-columns: 1fr; margin: 0; }
@media (min-width: 480px) { .audience-list { grid-template-columns: max-content 1fr; } }
.audience-list dt {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--quiet);
  padding-top: 2px;
}
.audience-list dd { margin: 0; font-size: 14.5px; color: var(--ink); line-height: 1.5; }

.faq { display: grid; gap: 12px; max-width: 820px; margin: 0 auto; }
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
  content: "+"; font-family: var(--font-mono); font-weight: 400;
  color: var(--pxlc-coral); font-size: 22px; transition: transform var(--dur-base);
}
.faq__item[open] .faq__q::after { content: "−"; }
.faq__q::-webkit-details-marker { display: none; }
.faq__a {
  margin-top: 12px; font-size: 14.5px; line-height: 1.6; color: var(--ink-quiet);
}

.structures-final-cta {
  text-align: center; max-width: 720px; margin: 0 auto;
  padding: clamp(40px, 6vw, 64px); border-radius: var(--radius-lg);
  background: var(--bg-soft); border: 1px solid var(--bg-rule);
}
.structures-final-cta__title { font-size: clamp(30px, 4vw, 40px); letter-spacing: -0.025em; }
.structures-final-cta__lead { margin: 16px auto 32px; color: var(--ink-quiet); max-width: 560px; }
.structures-final-cta__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
@media (max-width: 767px) {
  .structures-final-cta__actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .structures-final-cta__actions .btn {
    width: 100%;
    justify-content: center;
    min-height: 56px;
  }
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

  .facts-card,
  .structures-final-cta {
    padding: var(--space-3);
  }
}
</style>
