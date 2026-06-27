<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <!-- data-nosnippet : le footer est du boilerplate sitewide ; sans cet
         attribut Google composait le snippet de l'accueil à partir de la
         mission + CTA + titres de colonnes d'ici (extrait haché). div/section/
         span sont les seuls éléments où Google honore data-nosnippet. -->
    <div class="container" data-nosnippet>
      <div class="site-footer__top">
        <PxlcPixelStrip :count="7" :accent-at="2" />
        <p class="site-footer__mission">
          PXLC accompagne les familles dans l’éducation numérique des enfants.
        </p>
        <a class="site-footer__mission-link" href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener noreferrer">
          Prendre rendez-vous | 20&nbsp;min
        </a>
      </div>

      <div class="site-footer__inner">
        <div>
          <PxlcLockup />
          <p class="site-footer__brand-text">
            Médiation numérique<br />en Guadeloupe.
          </p>
          <ul class="site-footer__social" role="list">
            <li>
              <a
                class="site-footer__social-btn" href="https://www.linkedin.com/in/azebus" target="_blank"
                rel="noopener noreferrer" aria-label="LinkedIn d’Andy Zébus">
                <Icon name="simple-icons:linkedin" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a class="site-footer__social-btn" href="mailto:contact@pxlc.fr" aria-label="Écrire à contact@pxlc.fr">
                <Icon name="lucide:mail" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                class="site-footer__social-btn" href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener noreferrer"
                aria-label="Prendre rendez-vous de 20 minutes">
                <Icon name="lucide:calendar" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="site-footer__col-title">Le dispositif</p>
          <ul class="site-footer__col-list" role="list">
            <li>
              <NuxtLink class="site-footer__col-link" to="/structures">Pour les structures</NuxtLink>
            </li>
            <li><a
                class="site-footer__col-link" href="/files/plaquette-pxlc.pdf" target="_blank"
                rel="noopener noreferrer"
                aria-label="Télécharger la plaquette (PDF, 6 pages, nouvel onglet)">Télécharger la plaquette</a></li>
            <li>
              <NuxtLink class="site-footer__col-link" to="/a-propos">À propos d’Andy Zébus</NuxtLink>
            </li>
            <li>
              <NuxtLink class="site-footer__col-link" to="/blog">Blog</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="site-footer__col-title">Contact</p>
          <ul class="site-footer__col-list site-footer__col-list--icons" role="list">
            <li>
              <NuxtLink class="site-footer__col-link site-footer__col-link--icon" to="/contact">
                <Icon name="lucide:message-square" aria-hidden="true" class="site-footer__contact-icon" />
                Formulaire | 5&nbsp;min
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>© 2015–{{ year }} | Andy Zébus EI | PXLC | Guadeloupe</p>
        <ul class="site-footer__legal-links" role="list">
          <li>
            <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/mentions-legales#rgpd">Confidentialité</NuxtLink>
          </li>
        </ul>
        <PxlcPixelStrip :count="7" :accent-at="4" />
      </div>
    </div>
  </footer>
</template>
