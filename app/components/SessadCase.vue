<template>
  <section class="section" aria-labelledby="sessad-title">
    <div class="container">
      <div class="grid grid--asym">
        <div class="image-with-badge">
          <div class="full-bleed-img">
            <NuxtImg
              src="/assets/img/photos/duo-gaming.jpg"
              alt="Duo gaming, vue de dos — atelier parent-enfant"
              width="1600"
              height="1064"
              format="webp"
              loading="lazy"
              sizes="100vw lg:50vw"
            />
          </div>
          <span class="badge badge--audience image-with-badge__tag">Jouons Ensemble!</span>
        </div>
        <div>
          <span class="eyebrow">Programme Parents-Écran-Enfant · SESSAD Lékoklaya · 2026</span>
          <h2 id="sessad-title">Un dispositif pensé avec l’équipe pluridisciplinaire<span class="coral-dot" aria-hidden="true">.</span></h2>
          <p class="lead mt-4">
            « Jouons Ensemble! » accompagne huit enfants âgés de 12 à 17 ans (TSA, TDAH, TCND, DM, neuropathie) en binômes parent-enfant, sur des ateliers thématiques co-encadrés par la psychologue du SESSAD, la psychomotricienne, les intervenants culturels — et moi en médiateur numérique.
          </p>
          <p class="mt-4">
            Le projet s’inscrit dans la continuité du Café-Parents du 14 décembre 2023 « Enfants Écrans » et dans le cadre des rapports HCSP 2019-2020. L’objectif : faire du jeu vidéo un outil d’alliance entre parents et enfants, pas un terrain de conflit.
          </p>
          <div class="mt-5">
            <PxlcLinkout to="/structures">Voir le programme</PxlcLinkout>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.image-with-badge { position: relative; }
.image-with-badge .full-bleed-img { width: 100%; aspect-ratio: 16 / 10; border-radius: var(--radius-lg); overflow: hidden; }
/* :deep() because <NuxtImg> renders the <img> outside the component's own
   scope token, but the wrapper .full-bleed-img is scoped. */
.image-with-badge .full-bleed-img :deep(img) { width: 100%; height: 100%; object-fit: cover; display: block; }
.image-with-badge__tag { position: absolute; top: 16px; left: 16px; }
</style>
