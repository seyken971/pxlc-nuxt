<template>
  <section class="section section--soft" aria-labelledby="bifurcation-title">
    <div class="container">
      <header class="section__head">
        <span class="eyebrow">Pour qui</span>
        <h2 id="bifurcation-title">Deux portes d’entrée<span class="coral-dot" aria-hidden="true">.</span></h2>
      </header>
      <div class="grid grid--2">
        <article class="card card--bifurcation card--hover">
          <div class="card__bg" aria-hidden="true"><PxlcMark :size="220" decorative /></div>
          <span class="badge badge--audience">Parents</span>
          <h3>Ateliers familiaux<span class="dot--coral" aria-hidden="true">.</span></h3>
          <p>
            Sessions individuelles ou en duo parent-enfant. Pour comprendre ce que votre enfant met dans son jeu — et reprendre le dialogue sereinement.
          </p>
          <NuxtLink class="linkout" to="/ateliers">Voir les ateliers</NuxtLink>
        </article>
        <article class="card card--bifurcation card--hover">
          <div class="card__bg" aria-hidden="true"><PxlcMark :size="220" decorative /></div>
          <span class="badge badge--audience">Structures</span>
          <h3>Dispositif SESSAD / asso<span class="dot--teal" aria-hidden="true">.</span></h3>
          <p>
            Un cadre clé en main pour SESSAD, IME, associations et collectivités. Repères HAS, indicateurs, médiateur formé, restitution écrite.
          </p>
          <NuxtLink class="linkout" to="/pour-les-structures">Voir le dispositif</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
