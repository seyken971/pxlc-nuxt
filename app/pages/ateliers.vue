<script setup lang="ts">
useSeoMeta({
  title: 'Ateliers Parent-Écran-Enfant en Guadeloupe',
  description:
    'Ateliers individuels ou en duo parent-enfant à Pointe-à-Pitre. Un format en 1h30 pour rouvrir le dialogue autour des écrans, sans dramatiser ni minimiser.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · POUR LES PARENTS',
  title: 'Vos écrans, votre famille — on en parle ensemble',
  description: 'Sessions individuelles ou en duo parent-enfant à Pointe-à-Pitre. Pas de discours moral, pas de questionnaires — on commence par jouer.',
})
</script>

<template>
  <Hero
    eyebrow="Pour les parents"
    title="Vos écrans, votre famille — on en parle ensemble<span class='coral-dot' aria-hidden='true'>.</span>"
    lead="Vous êtes parent d’un enfant qui joue beaucoup, qui s’enferme, ou que vous ne comprenez plus dès qu’il a une manette en main. Vous n’êtes pas seul. Et il n’est pas trop tard pour rouvrir le dialogue."
    :cta-primary="{ label: 'Réserver un échange', href: 'https://cal.eu/pxlc-gp', external: true }"
    :cta-secondary="null"
    :hint="null"
    photo-src="/assets/img/photos/gaming-event.jpg"
    photo-alt="Convivialité autour du jeu en Guadeloupe"
    :show-bg-mark="false"
  />

  <section class="section section--soft">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Déroulé</span>
        <h2>À quoi ressemble un atelier<span class="coral-dot" aria-hidden="true">.</span></h2>
        <p class="lead">Pas de salle d’attente, pas de questionnaire de 4 pages. On commence par jouer.</p>
      </header>
      <div class="grid grid--3">
        <article class="card">
          <span class="kicker">Format</span>
          <h3 class="mt-3">1h30 environ</h3>
          <p class="mt-3">Trente minutes avec votre enfant autour de son jeu. Trente minutes en famille. Trente minutes seuls avec vous, parents.</p>
        </article>
        <article class="card">
          <span class="kicker">Lieu</span>
          <h3 class="mt-3">Chez vous, ou chez moi</h3>
          <p class="mt-3">À Pointe-à-Pitre et alentours. Le cadre familial est plus parlant — votre enfant joue dans son contexte, pas dans un cabinet.</p>
        </article>
        <article class="card">
          <span class="kicker">Qui vient</span>
          <h3 class="mt-3">Parent + enfant</h3>
          <p class="mt-3">Idéalement les deux parents. Frères et sœurs bienvenus si la fratrie partage les mêmes écrans.</p>
        </article>
      </div>
    </div>
  </section>

  <CitationBlock
    source="Témoignage · Maman · Pointe-à-Pitre"
    quote="Andy ne juge pas. Il commence par jouer avec ma fille, puis on parle. C’est la première fois qu’on se dispute moins le soir."
    attribution="Marie L."
    :soft="false"
  />
</template>
