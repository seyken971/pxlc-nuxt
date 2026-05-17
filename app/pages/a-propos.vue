<script setup lang="ts">
useSeoMeta({
  title: 'À propos d’Andy Zébus — médiateur numérique en Guadeloupe',
  // Kept under ~160 chars so Google doesn't truncate the HCSP credibility tail.
  description:
    'Andy Zébus, gamer médiateur-numérique aux Abymes (Guadeloupe). Six ans dans l’esport, formé aux rapports HCSP 2019-2020, partenaire des SESSAD et IME.',
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
    description: 'Médiateur numérique en Guadeloupe, organisateur esport, formé aux rapports HCSP 2019-2020.',
    image: 'https://pxlc.fr/assets/img/photos/andy-portrait.jpg',
    url: 'https://pxlc.fr/a-propos',
    worksFor: { '@id': 'https://pxlc.fr/#identity' },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Université des Antilles',
        alternateName: 'Université des Antilles et de la Guyane',
        url: 'https://www.univ-antilles.fr/',
        department: {
          '@type': 'CollegeOrUniversity',
          name: 'Faculté des Lettres et Sciences Humaines',
          location: 'Campus de Schoelcher, Martinique',
        },
      },
      { '@type': 'CollegeOrUniversity', name: 'ISGP – ESA3 – Talis Business School (campus Paris)' },
      { '@type': 'CollegeOrUniversity', name: 'Institut Supérieur Caraïbe (ISCA)' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'Licence',
        name: 'Licence LLCE Anglais — spécialité Médiation Interculturelle Euro-Caribéenne',
        dateCreated: '2012-06',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Université des Antilles et de la Guyane' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'Mastère',
        name: 'Mastère Commerce et Management Opérationnel — Business Unit',
        dateCreated: '2012',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'ISGP – ESA3 – Talis Business School (campus Paris)' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'BTS',
        name: 'BTS Informatique de Gestion — option Administration Réseau Local d’Entreprise',
        dateCreated: '2007',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Institut Supérieur Caraïbe (ISCA)' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'DEUG',
        name: 'DEUG Mathématiques, Informatique, Applications aux Sciences',
        dateCreated: '2005',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Université des Antilles et de la Guyane' },
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/azebus',
      'https://www.github.com/seyken971',
      'https://www.instagram.com/seyken971',
      'https://www.twitter.com/seyken971',
      'https://bsky.app/profile/seyken.pxlc.fr',
    ],
  }),
])

// Formation timeline — single source of truth for the visible list below.
const formations = [
  {
    years: '2003–2005',
    title: 'DEUG Mathématiques, Informatique, Applications aux Sciences',
    spec: '',
    school: 'Université des Antilles et de la Guyane',
  },
  {
    years: '2005–2007',
    title: 'BTS Informatique de Gestion',
    spec: 'option Administration Réseau Local d’Entreprise',
    school: 'Institut Supérieur Caraïbe (ISCA)',
  },
  {
    years: '2008–2012',
    title: 'Licence LLCE Anglais',
    spec: 'spécialité Médiation Interculturelle Euro-Caribéenne',
    school: 'Université des Antilles et de la Guyane — Faculté des Lettres et Sciences Humaines, campus de Schoelcher',
  },
  {
    years: '2012',
    title: 'Mastère Commerce et Management Opérationnel',
    spec: 'Business Unit',
    school: 'ISGP – ESA3 – Talis Business School, campus Paris',
  },
]
</script>

<template>
  <section class="section">
    <div class="container">
      <span class="eyebrow eyebrow--lg">À propos</span>
      <h1 class="about-title">
        Médiateur numérique, six ans dans l’esport guadeloupéen<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead about-lead">
        Basé aux Abymes (Guadeloupe), Andy Zébus accompagne les SESSAD, IME, associations et collectivités pour faire des écrans un langage commun en famille plutôt qu’un point de friction.
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
          <h2 id="parcours" class="about-h2">Parcours</h2>
          <p class="mt-3">
            Première expérience pro dans la communauté gaming dès 2010 : Community Manager EU–FR pour <em>Atlantica Online</em> (lancement du serveur français, +100 000 inscrits). Trajectoire institutionnelle ensuite — Agent territorial Affaires Européennes Outre-Mer à la Région Guadeloupe (antenne Paris, 2013–2014), professeur d’anglais à la Région académique Guadeloupe (2016–2017), formation des élus en anglais avec ma micro-entreprise (2015–2018), com’ digitale de la Région pour la Route du Rhum 2018.
          </p>
          <p class="mt-3">
            Six ans à structurer la scène esport guadeloupéenne avec <strong>Esports Guadeloupe</strong> (2019–2025) — événements communautaires et grands comptes (<em>Game Over Challenge</em>, <em>Destreland Gaming Cup</em>), stratégie B2B. Une compétition a généré <strong>un mois de chiffre d’affaires en quatre jours</strong> pour une enseigne partenaire.
          </p>
          <p class="mt-3">
            Formateur principal en médiation numérique chez Simplon Outre-Mer (nov. 2021 – juin 2022, parcours « Responsable d’espace de médiation numérique »), formé aux référentiels
            <a href="https://www.hcsp.fr/Explore.cgi/AvisRapportsDomaine?clefr=759" target="_blank" rel="noopener">HCSP 2019</a>
            et
            <a href="https://www.hcsp.fr/Explore.cgi/AvisRapportsDomaine?clefr=1074" target="_blank" rel="noopener">HCSP 2020</a>
            — je traduis les recommandations institutionnelles en gestes concrets pour les équipes pluridisciplinaires.
          </p>
          <p class="mt-3">
            Un parcours qui fait du jeu vidéo un objet de travail, pas un cliché à combattre.
          </p>

          <h2 id="formation" class="about-h2 mt-5">Formation</h2>
          <ul class="formations" role="list">
            <li v-for="f in formations" :key="f.title" class="formation">
              <span class="formation__years">{{ f.years }}</span>
              <div class="formation__body">
                <strong class="formation__title">{{ f.title }}</strong>
                <span v-if="f.spec" class="formation__spec"> — {{ f.spec }}</span>
                <span class="formation__school">{{ f.school }}</span>
              </div>
            </li>
          </ul>

          <h2 id="posture" class="about-h2 mt-5">L’aspect social du jeu vidéo</h2>
          <p class="mt-3">
            Le jeu vidéo n’est pas un retrait du monde — c’est un terrain de socialisation à part entière. Coopération, leadership, gestion d’équipe, communication écrite et orale : pour beaucoup d’ados, c’est la première expérience structurée de vie en collectif hors du cercle familial.
          </p>
          <p class="mt-3">
            Ma posture découle de là : prendre le jeu au sérieux comme objet social, pas le réduire à un temps d’écran à compter. Pas de discours moral sur les écrans, pas de procès du numérique — un cadre, des compétences identifiables, et un dialogue rendu possible entre le parent et l’enfant.
          </p>

          <h2 id="role" class="about-h2 mt-5">Mon rôle dans les dispositifs</h2>
          <p class="mt-3">
            J’interviens en <strong>gamer médiateur-numérique partenaire</strong> : le projet est toujours porté par votre structure (psychologue du SESSAD, coordinateur d’association, équipe d’une collectivité). Je n’interviens pas en direct auprès des parents — toute mon activité passe par une structure porteuse.
          </p>
          <p class="mt-3">
            Ma fonction est précise : choix des jeux et adaptabilité aux objectifs psycho-éducatifs, accompagnement en situation de jeu, explication des mécaniques aux parents, démystification de la culture numérique.
          </p>

          <div class="about-actions mt-5">
            <NuxtLink to="/pour-les-structures" class="btn btn--primary">Voir le dispositif</NuxtLink>
            <NuxtLink to="/contact" class="btn btn--ghost">Me contacter</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; max-width: 760px; margin-bottom: 24px; }
.about-lead { max-width: 640px; margin-bottom: 32px; }
.about-grid { align-items: flex-start; }
/* Portrait is natively 1:1 — using aspect-ratio: 1/1 instead of 4/5 to
   stop cropping ~25% of the photo. */
.about-portrait {
  aspect-ratio: 1 / 1; border-radius: 14px; overflow: hidden; max-width: 420px;
}
.about-portrait :deep(img) { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-h2 { font-size: clamp(22px, 2.5vw, 26px); letter-spacing: -0.015em; }
.about-actions { display: flex; flex-wrap: wrap; gap: 12px; }

.formations { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 16px; }
.formation { display: grid; gap: 4px 16px; grid-template-columns: 1fr; padding-bottom: 16px; border-bottom: 1px dashed var(--rule); }
.formation:last-child { border-bottom: 0; padding-bottom: 0; }
@media (min-width: 600px) { .formation { grid-template-columns: 110px 1fr; } }
.formation__years {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--quiet);
  padding-top: 2px;
}
.formation__body { display: flex; flex-direction: column; gap: 2px; }
.formation__title { color: var(--ink); font-weight: 600; }
.formation__spec { color: var(--ink-quiet); font-size: 14.5px; }
.formation__school { color: var(--quiet); font-size: 13.5px; margin-top: 4px; }
</style>
