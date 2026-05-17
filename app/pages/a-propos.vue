<script setup lang="ts">
useSeoMeta({
  title: 'À propos d’Andy Zébus — médiateur numérique en Guadeloupe',
  description:
    'Six ans à organiser la scène esport guadeloupéenne, formé à la médiation numérique chez Simplon, Andy Zébus traduit les repères HAS, HCSP et CNAF en gestes concrets pour les familles et les équipes.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · À PROPOS',
  title: 'Médiateur numérique, organisateur esport guadeloupéen',
  description: 'Six ans à monter la scène esport guadeloupéenne avant la médiation numérique en SESSAD : un parcours qui fait du jeu vidéo un objet de travail, pas un cliché à combattre.',
})

// Type this page as AboutPage and surface Andy as a Person entity with
// his credentials. The LocalBusiness identity in nuxt.config.ts is the
// publisher; here Andy is the *mainEntity* of the page.
useSchemaOrg([
  defineWebPage({
    '@type': 'AboutPage',
    name: 'À propos d’Andy Zébus',
    about: { '@id': 'https://pxlc.fr/#andy' },
  }),
  definePerson({
    '@id': 'https://pxlc.fr/#andy',
    name: 'Andy Zébus',
    jobTitle: 'Gamer médiateur-numérique',
    description: 'Médiateur numérique en Guadeloupe, organisateur esport, formé aux référentiels HAS 2020 et HCSP 2019-2020.',
    image: 'https://pxlc.fr/assets/img/photos/andy-portrait.jpg',
    url: 'https://pxlc.fr/a-propos',
    worksFor: { '@id': 'https://pxlc.fr/#identity' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Université des Antilles',
      alternateName: 'Université des Antilles et de la Guyane',
      url: 'https://www.univ-antilles.fr/',
    },
    sameAs: [
      'https://www.linkedin.com/in/azebus',
      'https://www.github.com/seyken971',
      'https://www.instagram.com/seyken971',
      'https://www.twitter.com/seyken971',
      'https://bsky.app/profile/seyken.pxlc.fr',
    ],
  }),
])
</script>

<template>
  <section class="section">
    <div class="container">
      <span class="eyebrow eyebrow--lg">À propos</span>
      <h1 class="about-title">
        Médiateur numérique, six ans dans l’esport guadeloupéen<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead about-lead">
        Andy Zébus accompagne depuis la Guadeloupe les familles, SESSAD, IME et associations pour faire des écrans un langage commun plutôt qu’un point de friction.
      </p>
      <div class="grid grid--asym mt-5 about-grid">
        <div class="full-bleed-img about-portrait">
          <NuxtImg
            src="/assets/img/photos/andy-portrait.jpg"
            alt="Portrait d’Andy Zébus, gamer médiateur-numérique en Guadeloupe"
            width="738"
            height="738"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        <div>
          <h3>Parcours</h3>
          <p class="mt-3">Six ans à organiser la scène esport guadeloupéenne avec Esports Guadeloupe — tournois, communauté, partenariats grands comptes — avant la médiation numérique en SESSAD. Un parcours qui fait du jeu vidéo un objet de travail, pas un cliché à combattre.</p>
          <p class="mt-3">Formateur principal en médiation numérique chez Simplon Outre-Mer (2021–2022), formé aux référentiels HAS 2020 et HCSP 2019-2020 — je traduis les recommandations institutionnelles en gestes concrets pour les équipes pluridisciplinaires.</p>

          <h3 class="mt-5">Mon rôle dans les dispositifs</h3>
          <p class="mt-3">J’interviens en <strong>gamer médiateur-numérique partenaire</strong> : le projet est toujours porté par votre structure (psychologue du SESSAD, coordinateur d’association, équipe d’une collectivité). Je n’interviens pas en direct auprès des parents — toute mon activité passe par une structure porteuse.</p>
          <p class="mt-3">Ma fonction est précise : choix des jeux et adaptabilité aux objectifs psycho-éducatifs, accompagnement en situation de jeu, explication des mécaniques aux parents, démystification de la culture numérique.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; max-width: 760px; margin-bottom: 24px; }
.about-lead { max-width: 640px; margin-bottom: 32px; }
.about-grid { align-items: flex-start; }
.about-portrait {
  aspect-ratio: 4 / 5; border-radius: 14px; overflow: hidden; max-width: 420px;
}
.about-portrait :deep(img) { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>
