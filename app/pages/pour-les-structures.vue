<script setup lang="ts">
useSeoMeta({
  title: 'Dispositif de médiation numérique pour SESSAD, IME, associations',
  description:
    'Un dispositif clé en main pour SESSAD, IME, associations et collectivités de Guadeloupe : cadre HAS, indicateurs, médiateur formé, restitution écrite à chaque séance.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · POUR LES STRUCTURES',
  title: 'Un dispositif de médiation numérique fondé sur les repères HAS',
  description: 'Cadre théorique, indicateurs, médiateur formé, restitution écrite — prêt à intégrer à vos projets de service.',
})

const facts: [string, string][] = [
  ['Format', '6 à 12 ateliers · individuels'],
  ['Profils', 'TSA · TDAH · TCND · Dys-'],
  ['Âges', '8 à 17 ans'],
  ['Restitution', 'Écrite · à chaque séance'],
  ['Références', 'HAS 2020 · HCSP 2019 · CNAF'],
  ['Tarif', 'Sur devis'],
]

const frameworks = [
  { key: 'HAS', year: '2020', title: 'Soutien à la parentalité', desc: '« Soutenir la fonction parentale dans la médiation des écrans plutôt que prescrire des interdits ».' },
  { key: 'HCSP', year: '2019', title: 'Avis sur les écrans', desc: 'Rappel des risques et des leviers — le cadre familial, les pratiques partagées, la qualité du contenu.' },
  { key: 'CNAF', year: '2022', title: 'Soutien à la parentalité', desc: 'Référentiel des actions de soutien à la parentalité — la médiation numérique s’inscrit dans cette catégorie.' },
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
            <span class="badge badge--soft">SESSAD · IME · associations</span>
          </div>
          <h1 id="hero-title" class="hero__title">
            Un dispositif de médiation numérique fondé sur les repères HAS<span class="coral-dot" aria-hidden="true">.</span>
          </h1>
          <p class="hero__lead">
            Cadre théorique, indicateurs d’évaluation, médiateur formé, restitution écrite à chaque séance. Un protocole prêt à intégrer à vos projets de service.
          </p>
          <div class="hero__actions">
            <NuxtLink to="/contact" class="btn btn--primary btn--lg">Demander un devis</NuxtLink>
            <a href="#plaquette" class="btn btn--ghost btn--lg">Plaquette PDF · 12 pages</a>
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

  <section class="section section--soft">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Cadre théorique</span>
        <h2>Trois sources qui structurent la démarche<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">Pas un avis personnel sur les écrans : un cadre construit à partir des recommandations institutionnelles françaises.</p>
      </header>
      <div class="grid grid--3">
        <article v-for="c in frameworks" :key="c.key" class="card">
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
</style>
