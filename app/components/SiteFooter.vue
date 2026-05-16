<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="site-footer__inner">
        <div>
          <Lockup />
          <p class="site-footer__brand-text">
            Médiation numérique en Guadeloupe — pour transformer le temps d’écran en lien parent-enfant.
          </p>
          <ul class="site-footer__social" role="list">
            <li>
              <a class="site-footer__social-btn" href="https://www.linkedin.com/in/azebus" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
            </li>
            <li>
              <a class="site-footer__social-btn" href="mailto:contact@pxlc.fr" aria-label="Email">@</a>
            </li>
            <li>
              <a class="site-footer__social-btn" href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener" aria-label="Réserver un échange">→</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Pour qui</h3>
          <ul class="site-footer__col-list" role="list">
            <li><NuxtLink class="site-footer__col-link" to="/pour-les-structures">SESSAD &amp; IME</NuxtLink></li>
            <li><NuxtLink class="site-footer__col-link" to="/pour-les-structures">Associations</NuxtLink></li>
            <li><NuxtLink class="site-footer__col-link" to="/pour-les-structures">Collectivités</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Ressources</h3>
          <ul class="site-footer__col-list" role="list">
            <li><NuxtLink class="site-footer__col-link" to="/blog">Blog</NuxtLink></li>
            <li><a class="site-footer__col-link" href="#plaquette">Plaquette PDF (12 p.)</a></li>
            <li><NuxtLink class="site-footer__col-link" to="/a-propos">À propos</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Contact</h3>
          <ul class="site-footer__col-list" role="list">
            <li><a class="site-footer__col-link" href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener">Réserver · 20 min</a></li>
            <li><a class="site-footer__col-link" href="mailto:contact@pxlc.fr">contact@pxlc.fr</a></li>
            <li><a class="site-footer__col-link" href="https://wa.me/590690717618" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a class="site-footer__col-link" href="https://www.linkedin.com/in/azebus" target="_blank" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>PXLC · SIRET 813 793 528 00023 · APE 70.21Z · © {{ year }}</p>
        <ul class="site-footer__legal-links" role="list">
          <li><NuxtLink to="/mentions-legales">Mentions légales</NuxtLink></li>
        </ul>
        <PixelStrip :count="11" :accent-at="5" />
      </div>
    </div>
  </footer>
</template>
