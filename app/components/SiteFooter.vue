<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__inner">
        <div>
          <Lockup />
          <p class="site-footer__brand-text">
            Médiation numérique en Guadeloupe — pour transformer le temps d’écran en lien parent-enfant.
          </p>
          <ul class="site-footer__social" role="list">
            <li>
              <a
                class="site-footer__social-btn"
                href="https://www.linkedin.com/in/azebus"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn d’Andy Zébus"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v15.5H.22V8zm7.91 0h4.36v2.12h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.48 3.04 5.48 7v8.75h-4.56v-7.76c0-1.85-.03-4.23-2.58-4.23-2.58 0-2.98 2.02-2.98 4.1v7.89H8.13V8z"/></svg>
              </a>
            </li>
            <li>
              <a
                class="site-footer__social-btn"
                href="mailto:contact@pxlc.fr"
                aria-label="Écrire à contact@pxlc.fr"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
              </a>
            </li>
            <li>
              <a
                class="site-footer__social-btn"
                href="https://cal.eu/pxlc-gp"
                target="_blank"
                rel="noopener"
                aria-label="Réserver un échange de 20 minutes"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Le dispositif</h3>
          <ul class="site-footer__col-list" role="list">
            <li><NuxtLink class="site-footer__col-link" to="/pour-les-structures">Pour les structures</NuxtLink></li>
            <li><a class="site-footer__col-link" href="/files/plaquette-pxlc.pdf" target="_blank" rel="noopener">Plaquette PDF · 12 p.</a></li>
            <li><NuxtLink class="site-footer__col-link" to="/a-propos">À propos d’Andy</NuxtLink></li>
            <li><NuxtLink class="site-footer__col-link" to="/blog">Blog</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Contact</h3>
          <ul class="site-footer__col-list" role="list">
            <li><NuxtLink class="site-footer__col-link" to="/contact">Formulaire de contact</NuxtLink></li>
            <li><a class="site-footer__col-link" href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener">Réserver · 20 min</a></li>
            <li><a class="site-footer__col-link" href="https://wa.me/590690717618" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a class="site-footer__col-link" href="mailto:contact@pxlc.fr">contact@pxlc.fr</a></li>
          </ul>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>PXLC · Guadeloupe · SIRET 813 793 528 00023 · APE 70.21Z · © {{ year }}</p>
        <ul class="site-footer__legal-links" role="list">
          <li><NuxtLink to="/mentions-legales">Mentions légales</NuxtLink></li>
          <li><NuxtLink to="/mentions-legales#rgpd">Confidentialité</NuxtLink></li>
        </ul>
        <PixelStrip :count="11" :accent-at="5" />
      </div>
    </div>
  </footer>
</template>
