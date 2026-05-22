<script setup lang="ts">
// Legal / informational page — robots: noindex and no place for a
// marketing CTA. Hide the global <CtaBlock> rendered by the layout.
definePageMeta({ hideGlobalCta: true })

if (import.meta.server) {
  useSeoMeta({
    title: 'Mentions légales',
    description:
      'Mentions légales et coordonnées de PXLC — Pixels Caraïbes — Andy Zébus, Entrepreneur Individuel.',
    robots: 'noindex, follow',
  })
}

// Date de dernière mise à jour du contenu légal — à mettre à jour manuellement
// si les mentions sont modifiées. new Date() était utilisé avant mais donnait
// la date du build SSG, pas celle de la mise à jour réelle du contenu.
const lastUpdated = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  .format(new Date('2026-05-17T12:00:00'))
</script>

<template>
  <section class="section">
    <div class="container legal-container">
      <span class="eyebrow eyebrow--lg">Informations légales</span>
      <h1 class="legal-title">
        Mentions légales<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead legal-lead">
        Conformément à la loi pour la confiance dans l’économie numérique du 21 juin 2004, voici les
        informations relatives à l’éditeur, à l’hébergeur et au traitement des données du site
        <strong>pxlc.fr</strong>.
      </p>

      <article class="prose">
        <h2>Éditeur du site</h2>
        <p>
          <strong>Andy Zébus — Entrepreneur Individuel</strong><br>
          Nom commercial : PXLC (Pixels Caraïbes)<br>
          Adresse : 8 Résidence la familiale, rue Man Manigard Alfred, Dugazon — 97139 Les Abymes, Guadeloupe (FR)<br>
          SIRET : 813 793 528 00023<br>
          Code APE : 70.21Z — Conseil en relations publiques et communication<br>
          Email : <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a><br>
          LinkedIn : <a href="https://www.linkedin.com/in/azebus" target="_blank" rel="noopener">linkedin.com/in/azebus</a>
        </p>

        <h2>Responsable de la publication</h2>
        <p>Andy Zébus, en sa qualité d’entrepreneur individuel.</p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>GitHub, Inc.</strong><br>
          88 Colin P. Kelly Jr. Street<br>
          San Francisco, CA 94107<br>
          États-Unis<br>
          <a href="https://github.com" target="_blank" rel="noopener">github.com</a>
        </p>
        <p>
          Le site est servi via le service <em>GitHub Pages</em>, gratuit, sans publicité ni traceurs additionnels.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus présents sur ce site (textes, marques, logos, photographies, illustrations,
          design) est la propriété exclusive d’Andy Zébus, sauf mention contraire. Toute reproduction,
          représentation, adaptation, traduction ou diffusion, intégrale ou partielle, est interdite sans
          autorisation écrite préalable.
        </p>
        <p>
          Les recommandations institutionnelles citées (HCSP, CNAF) demeurent la propriété de leurs
          auteurs respectifs ; PXLC se contente de les commenter et d’y faire référence dans le cadre de son
          activité de médiation.
        </p>

        <h2 id="rgpd">Protection des données personnelles (RGPD)</h2>
        <p>
          Le site pxlc.fr ne dépose aucun cookie de traçage publicitaire ni d’analytics tiers. Le formulaire
          de contact envoie votre message via la boîte mail <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a> ;
          aucune donnée n’est stockée sur un serveur tiers à cette occasion.
        </p>
        <p>
          Lorsque vous me contactez par email ou via <a href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener">cal.eu/pxlc-gp</a>,
          je conserve vos coordonnées uniquement pour la durée de notre relation, et au plus pendant 3 ans à compter
          du dernier échange. Vous pouvez à tout moment demander la suppression de vos données en écrivant à
          <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>.
        </p>
        <p>
          Conformément au règlement européen 2016/679 (RGPD) et à la loi française « Informatique et libertés »,
          vous disposez des droits d’accès, de rectification, d’effacement, de portabilité et d’opposition sur
          vos données personnelles.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site utilise un seul élément de stockage local (<code>localStorage</code>, clé
          <code>pxlc-theme</code>), uniquement pour mémoriser votre préférence de thème (clair ou sombre).
          Cette information ne quitte jamais votre navigateur, n’est partagée avec aucun tiers, et peut être
          supprimée à tout moment via les paramètres de votre navigateur.
        </p>

        <h2>Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des ressources externes (HCSP, LinkedIn, cal.eu, etc.).
          PXLC n’exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant
          à leur disponibilité, leurs pratiques ou leurs contenus.
        </p>

        <h2>Médiation et règlement des litiges</h2>
        <p>
          En cas de litige, conformément à l’article L.612-1 du Code de la consommation, vous pouvez recourir
          gratuitement au service de médiation que je vous indiquerai sur demande. Vous pouvez également saisir
          la plateforme européenne de règlement en ligne des litiges :
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative aux présentes mentions ou au traitement de vos données :
          <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>.
        </p>

        <p class="kicker legal-updated">
          Dernière mise à jour : {{ lastUpdated }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.legal-container { max-width: 760px; }
/* Sticky header is ~70-80 px tall, so anchored h2s (e.g. #rgpd from the footer)
   would otherwise scroll under it. */
.legal-container :deep(h2[id]) { scroll-margin-top: 96px; }
.legal-title {
  font-size: clamp(38px, 5.5vw, 56px);
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin-bottom: var(--space-4);
}
.legal-lead { margin-bottom: var(--space-6); }
.legal-updated { display: block; margin-top: var(--space-6); }
</style>
