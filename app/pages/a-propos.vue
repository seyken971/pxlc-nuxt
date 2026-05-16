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
            alt="Portrait Andy Zébus"
          />
        </div>
        <div>
          <h3>Parcours</h3>
          <p class="mt-3">Six ans à organiser la scène esport guadeloupéenne avec Esports Guadeloupe — tournois, communauté, partenariats — avant la médiation numérique en SESSAD. Un parcours qui fait du jeu vidéo un objet de travail, pas un cliché à combattre.</p>
          <p class="mt-3">Formateur principal en médiation numérique chez Simplon Outre-Mer (2021–2022), formé aux référentiels HAS, HCSP et CNAF — je traduis les recommandations institutionnelles en gestes concrets pour les familles et les équipes.</p>
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
