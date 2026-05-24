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
            Transformer le temps d'écran<br />en lien parent-enfant.
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
                <Icon name="simple-icons:linkedin" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                class="site-footer__social-btn"
                href="mailto:contact@pxlc.fr"
                aria-label="Écrire à contact@pxlc.fr"
              >
                <Icon name="lucide:mail" aria-hidden="true" />
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
                <Icon name="lucide:calendar" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Le dispositif</h3>
          <ul class="site-footer__col-list" role="list">
            <li><NuxtLink class="site-footer__col-link" to="/pour-les-structures">Pour les structures</NuxtLink></li>
            <li><a class="site-footer__col-link" href="/files/plaquette-pxlc.pdf" target="_blank" rel="noopener">Télécharger la plaquette</a></li>
            <li><NuxtLink class="site-footer__col-link" to="/a-propos">À propos d’Andy Zébus</NuxtLink></li>
            <li><NuxtLink class="site-footer__col-link" to="/blog">Blog</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__col-title">Contact</h3>
          <ul class="site-footer__col-list site-footer__col-list--icons" role="list">
            <li>
              <NuxtLink class="site-footer__col-link site-footer__col-link--icon" to="/contact">
                <Icon name="lucide:message-square" aria-hidden="true" class="site-footer__contact-icon" />
                Formulaire · 5&nbsp;min
              </NuxtLink>
            </li>
            <li>
              <a class="site-footer__col-link site-footer__col-link--icon" href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener">
                <Icon name="lucide:calendar" aria-hidden="true" class="site-footer__contact-icon" />
                Réserver · 20&nbsp;min
              </a>
            </li>
            <li>
              <a class="site-footer__col-link site-footer__col-link--icon" href="https://wa.me/590690717618" target="_blank" rel="noopener">
                <Icon name="simple-icons:whatsapp" aria-hidden="true" class="site-footer__contact-icon" />
                WhatsApp
              </a>
            </li>
            <li>
              <a class="site-footer__col-link site-footer__col-link--icon" href="mailto:contact@pxlc.fr">
                <Icon name="lucide:mail" aria-hidden="true" class="site-footer__contact-icon" />
                contact@pxlc.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>PXLC · Guadeloupe · SIRET 813 793 528 00023 · APE 70.21Z · © {{ year }}</p>
        <ul class="site-footer__legal-links" role="list">
          <li><NuxtLink to="/mentions-legales">Mentions légales</NuxtLink></li>
          <li><NuxtLink to="/mentions-legales#rgpd">Confidentialité</NuxtLink></li>
        </ul>
        <PixelStrip :count="7" :accent-at="4" />
      </div>
    </div>
  </footer>
</template>
