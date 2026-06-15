<script setup lang="ts">
// Legal / informational page — robots: noindex and no place for a
// marketing CTA. Hide the global <CtaBlock> rendered by the layout.
definePageMeta({ hideGlobalCta: true })

useSeoMeta({ title: 'Mentions légales', robots: 'noindex, follow' })
if (import.meta.server) {
  useSeoMeta({
    description:
      'Mentions légales et coordonnées de PXLC — Andy Zébus, Entrepreneur Individuel.',
  })
}

// Date de dernière mise à jour du contenu légal — à mettre à jour manuellement
// si les mentions sont modifiées. new Date() était utilisé avant mais donnait
// la date du build SSG, pas celle de la mise à jour réelle du contenu.
const lastUpdated = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  .format(new Date('2026-05-29T12:00:00'))
</script>

<template>
  <!-- ── Hero ──────────────────────────────────────────────── -->
  <section class="legal-hero">
    <div class="container">
      <PxlcPixelStrip class="legal-hero__strip" />
      <span class="eyebrow eyebrow--lg">Informations légales</span>
      <h1 class="legal-title">
        Mentions légales<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead legal-lead">
        Conformément à la loi pour la confiance dans l'économie numérique du 21 juin 2004, voici les
        informations relatives à l'éditeur, à l'hébergeur et au traitement des données du site
        <strong>pxlc.fr</strong>.
      </p>
    </div>
  </section>

  <!-- ── Content ───────────────────────────────────────────── -->
  <section class="section">
    <div class="container legal-container">

      <!-- Éditeur — carte branded -->
      <div class="legal-card">
        <PxlcPixelCorner class="card__pixel legal-card__corner" />
        <h2 class="legal-card__label">Éditeur du site</h2>
        <div class="legal-card__name">Andy Zébus — Entrepreneur Individuel</div>
        <dl class="legal-dl">
          <div class="legal-dl__row">
            <dt>Nom commercial</dt>
            <dd>PXLC</dd>
          </div>
          <div class="legal-dl__row">
            <dt>Adresse</dt>
            <dd>8 Résidence la familiale, rue Man Manigard Alfred, Dugazon — 97139 Les Abymes, Guadeloupe (FR)</dd>
          </div>
          <div class="legal-dl__row">
            <dt>SIRET</dt>
            <dd><code>813 793 528 00031</code></dd>
          </div>
          <div class="legal-dl__row">
            <dt>Code APE</dt>
            <dd><code>70.21Z</code> — Conseil en relations publiques et communication</dd>
          </div>
          <div class="legal-dl__row">
            <dt>Email</dt>
            <dd><a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a></dd>
          </div>
          <div class="legal-dl__row">
            <dt>LinkedIn</dt>
            <dd>
              <a href="https://www.linkedin.com/in/azebus" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/azebus
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <PxlcMarkSeparator />

      <article class="prose">
        <h2>Responsable de la publication</h2>
        <p>Andy Zébus, en sa qualité d'entrepreneur individuel.</p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>GitHub, Inc.</strong><br>
          88 Colin P. Kelly Jr. Street<br>
          San Francisco, CA 94107<br>
          États-Unis<br>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a>
        </p>
        <p>
          Le site est servi via le service <em>GitHub Pages</em>, gratuit, sans publicité ni traceurs additionnels.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, marques, logos, photographies, illustrations,
          design) est la propriété exclusive d'Andy Zébus, sauf mention contraire. Toute reproduction,
          représentation, adaptation, traduction ou diffusion, intégrale ou partielle, est interdite sans
          autorisation écrite préalable.
        </p>
        <p>
          Les recommandations institutionnelles citées (HCSP, CNAF) demeurent la propriété de leurs
          auteurs respectifs&nbsp;; PXLC se contente de les commenter et d'y faire référence dans le cadre de son
          activité de médiation.
        </p>

        <h2 id="rgpd">Protection des données personnelles (RGPD)</h2>
        <p>
          Le site pxlc.fr ne dépose aucun cookie de traçage publicitaire ni d'analytics tiers. Le formulaire
          de contact envoie votre message via la boîte mail <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>&nbsp;;
          aucune donnée n'est stockée sur un serveur tiers à cette occasion.
        </p>
        <p>
          Lorsque vous me contactez par email ou via <a href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener noreferrer">cal.eu/pxlc-gp</a>,
          je conserve vos coordonnées uniquement pour la durée de notre relation, et au plus pendant 3 ans à compter
          du dernier échange. Vous pouvez à tout moment demander la suppression de vos données en écrivant à
          <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>.
        </p>
        <p>
          Conformément au règlement européen 2016/679 (RGPD) et à la loi française «&nbsp;Informatique et libertés&nbsp;»,
          vous disposez des droits d'accès, de rectification, d'effacement, de portabilité et d'opposition sur
          vos données personnelles.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site utilise un seul élément de stockage local (<code>localStorage</code>, clé
          <code>pxlc-theme</code>), uniquement pour mémoriser votre préférence de thème (clair ou sombre).
          Cette information ne quitte jamais votre navigateur, n'est partagée avec aucun tiers, et peut être
          supprimée à tout moment via les paramètres de votre navigateur.
        </p>

        <h2>Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des ressources externes (HCSP, LinkedIn, cal.eu, etc.).
          PXLC n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant
          à leur disponibilité, leurs pratiques ou leurs contenus.
        </p>

        <h2>Médiation et règlement des litiges</h2>
        <p>
          En cas de litige, conformément à l'article L.612-1 du Code de la consommation, vous pouvez recourir
          gratuitement au service de médiation que je vous indiquerai sur demande. Vous pouvez également saisir
          la plateforme européenne de règlement en ligne des litiges&nbsp;:
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question relative aux présentes mentions ou au traitement de vos données&nbsp;:
          <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>.
        </p>

        <p class="kicker legal-updated">
          Dernière mise à jour&nbsp;: {{ lastUpdated }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* ── Hero ─────────────────────────────────────────────────────── */
.legal-hero {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--bg-rule);
  padding: clamp(40px, 5vw, 64px) 0;
  transition: background var(--dur-base);
}

.legal-hero__strip {
  margin-bottom: var(--space-4);
}

.legal-title {
  font-size: clamp(38px, 5.5vw, 56px);
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: var(--space-2) 0 var(--space-4);
}

.legal-lead {
  max-width: 640px;
  margin-bottom: 0;
}

/* ── Content container ────────────────────────────────────────── */
.legal-container { max-width: 760px; }

/* Sticky header offset géré globalement par html { scroll-padding-top: 96px } dans styles.css. */
.legal-container :deep(h2[id]) { scroll-margin-top: 0; }

/* ── Éditeur card ─────────────────────────────────────────────── */
.legal-card {
  position: relative;
  background: var(--bg-elev);
  border: 1px solid var(--rule);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: background var(--dur-base);
}

/* Surcharge de positionnement pour .card__pixel (opacity héritée globalement). */
.legal-card__corner {
  top: var(--space-4);
  right: var(--space-4);
}

.legal-card__label {
  font-family: var(--font-label);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--eyebrow);
  margin: 0 0 var(--space-2);
}

.legal-card__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  color: var(--ink);
  margin-bottom: var(--space-4);
}

/* ── DL tableau ───────────────────────────────────────────────── */
.legal-dl {
  display: grid;
  gap: var(--space-2-5);
  margin: 0;
}

.legal-dl__row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--space-3);
  align-items: baseline;
}
@media (max-width: 520px) {
  .legal-dl__row {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
}

.legal-dl dt {
  font-family: var(--font-label);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--quiet);
}

.legal-dl dd {
  font-size: 14px;
  color: var(--ink-quiet);
  margin: 0;
}

.legal-dl dd code {
  font-family: var(--font-label);
  font-size: 13px;
  color: var(--eyebrow);
  background: var(--bg-soft);
  padding: 1px 6px;
  border-radius: var(--radius-xs);
}

/* ── Updated kicker ───────────────────────────────────────────── */
.legal-updated { display: block; margin-top: var(--space-6); }
</style>
