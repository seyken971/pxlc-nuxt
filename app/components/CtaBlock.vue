<script setup lang="ts">
interface Props {
  eyebrow?: string
  title?: string
  lead?: string
}
withDefaults(defineProps<Props>(), {
  eyebrow: 'Prochain pas',
  title: '20 minutes pour échanger, sans engagement',
  lead: 'Vous m’expliquez le périmètre, le public visé et le portage envisagé, je vous dis honnêtement si la médiation s’inscrit dans vos objectifs — et comment.',
})
</script>

<template>
  <section class="cta-block" aria-labelledby="cta-final-title">
    <div class="cta-block__strip"><PixelStrip :count="8" :accent-at="5" /></div>
    <div class="cta-block__bg-mark"><PxlcMark :size="340" decorative /></div>

    <div class="container">
      <div class="cta-block__inner">
        <div>
          <span class="eyebrow">{{ eyebrow }}</span>
          <h2 id="cta-final-title" class="cta-block__title">
            {{ title }}<span class="coral-dot" aria-hidden="true">.</span>
          </h2>
          <p class="cta-block__lead">{{ lead }}</p>
          <div class="cta-block__actions">
            <a
              href="https://cal.eu/pxlc-gp"
              target="_blank"
              rel="noopener"
              class="btn btn--primary btn--lg"
              aria-label="Réserver un échange (nouvel onglet)"
            >Réserver un échange</a>
            <a
              href="/files/plaquette-pxlc.pdf"
              target="_blank"
              rel="noopener"
              class="btn btn--ghost btn--lg"
              aria-label="Plaquette PDF, 12 pages (nouvel onglet)"
            >Plaquette PDF</a>
          </div>
        </div>

        <!-- div + aria-label instead of <aside>: this card is part of the
             CTA section, not tangentially related content, so an aside
             landmark nested inside the cta-block section trips axe-core
             "landmark-complementary-is-top-level". -->
        <div class="cta-block__sidecard" role="group" aria-label="Réservation">
          <div class="cta-block__sidecard-eyebrow">Réservation</div>
          <p class="cta-block__sidecard-lead">
            Agenda mis à jour en temps réel sur <a href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener" class="cta-block__sidecard-link">cal.eu/pxlc-gp</a>. Les créneaux libres sont visibles immédiatement.
          </p>
          <ul role="list">
            <li><span>Premier échange</span><span class="meta">20 min · gratuit</span></li>
            <li><span>WhatsApp ou visio</span><span class="meta">à votre choix</span></li>
            <li><span>Réponse directe</span><span class="meta">sous 48 h</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@media (max-width: 767px) {
  .cta-block__actions {
    display: grid;
    gap: 12px;
  }

  .cta-block__actions .btn {
    width: 100%;
    justify-content: center;
    min-height: 56px;
  }
}
</style>
