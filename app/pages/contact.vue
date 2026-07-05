<script setup lang="ts">
definePageMeta({ hideGlobalCta: true })

useSeoMeta({ title: 'Contacter Andy Zébus — devis ou premier échange' })
if (import.meta.server) {
  useSeoMeta({
    description:
      'Devis ou premier échange de 20 min — gratuit, sans engagement. Pour les structures qui accompagnent des familles.',
    ogDescription:
      'Réponse sous 2 jours ouvrés — formulaire, WhatsApp ou visio. Premier échange de 20 min gratuit pour cadrer votre projet.',
  })
}

defineOgImage('PxlcOg')

useSchemaOrg([
  defineWebPage({
    '@type': 'ContactPage',
    name: 'Contact PXLC',
    description: 'Page de prise de contact avec PXLC — Andy Zébus, médiateur numérique en Guadeloupe.',
  }),
])

const form = reactive({ name: '', structure: '', email: '', message: '' })
const sent = ref(false)
const sentCard = ref<HTMLDivElement | null>(null)
// Le mailto: construit au submit — réutilisé comme lien de repli si le client
// mail ne s'ouvre pas. Valeur initiale : un mailto nu (avant tout envoi).
const mailtoHref = ref('mailto:contact@pxlc.fr')
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

// GitHub Pages ne traite pas de POST — on construit un mailto: avec les
// champs du formulaire et on ouvre le client mail de l'utilisateur. Le
// formulaire reste affiché et rempli : pas de perte de saisie si rien ne
// s'ouvre, et l'utilisateur peut réessayer ou utiliser le repli.
const submit = () => {
  const lines = [
    `Nom\u00A0: ${form.name}`,
    form.structure ? `Structure\u00A0: ${form.structure}` : null,
    `Email\u00A0: ${form.email}`,
    '',
    'Message\u00A0:',
    form.message || '(vide)',
  ].filter((l): l is string => l !== null)

  const subject = `Contact PXLC — ${form.name}${form.structure ? ` (${form.structure})` : ''}`
  const body = lines.join('\n')
  const href = `mailto:contact@pxlc.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  mailtoHref.value = href

  if (import.meta.client) window.location.href = href
  sent.value = true
  nextTick(() => sentCard.value?.focus())
}

// Repli : copier l'adresse dans le presse-papiers. Silencieux si l'API n'est
// pas disponible — le lien mailto reste la voie de secours visible.
const copyEmail = async () => {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText('contact@pxlc.fr')
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 2000)
  }
  catch {
    // Presse-papiers indisponible — l'utilisateur garde le lien mailto.
  }
}

onBeforeUnmount(() => clearTimeout(copyTimer))
</script>

<template>
  <section class="section section--page">
    <div class="container">

      <!-- Heading — pleine largeur, au-dessus du grid -->
      <SiteBreadcrumb />
      <span class="eyebrow eyebrow--lg">Contact</span>
      <h1 class="contact-title">
        On en parle<span class="coral-dot" aria-hidden="true">&nbsp;?</span>
      </h1>
      <p class="contact-lead">
        Décrivez votre structure, le public accompagné et le projet envisagé — je reviens sous 2&nbsp;jours ouvrés.
      </p>

      <div class="contact-grid">

        <!-- ── Colonne gauche — formulaire ──────────────────── -->
        <div>
          <div
            v-if="sent"
            ref="sentCard"
            tabindex="-1"
            role="status"
            aria-live="polite"
            class="contact-sent"
          >
            <div class="contact-sent__eyebrow">Message préparé</div>
            <p class="contact-sent__text">
              Votre logiciel de messagerie devrait s’ouvrir avec le message pré-rempli. Si rien ne s’ouvre, écrivez-moi directement&nbsp;:
            </p>
            <div class="contact-sent__fallback">
              <a :href="mailtoHref" class="contact-sent__link">contact@pxlc.fr</a>
              <button type="button" class="contact-sent__copy" @click="copyEmail">
                {{ copied ? 'Copié' : 'Copier l’adresse' }}
              </button>
            </div>
          </div>

          <form class="contact-form" @submit.prevent="submit">
            <p class="form-legend">
              <span class="form-legend__req" aria-hidden="true">*</span> Champs requis
            </p>
            <div class="form-row">
              <PxlcInput id="c-nom" v-model="form.name" label="Prénom et Nom" placeholder="Prénom Nom" required autocomplete="name" />
              <PxlcInput id="c-structure" v-model="form.structure" label="Structure" placeholder="Association, école, collectivité…" autocomplete="organization" />
            </div>

            <PxlcInput id="c-email" v-model="form.email" label="Adresse e-mail" type="email" placeholder="contact@structure.fr" required autocomplete="email" />

            <PxlcInput id="c-msg" v-model="form.message" label="Message" :rows="5" placeholder="Décrivez votre projet…" required />

            <button type="submit" class="btn btn--primary contact-submit">
              Envoyer
            </button>
          </form>
          <p class="contact-plaquette">
            Ou <a href="/files/plaquette-pxlc.pdf" target="_blank" rel="noopener noreferrer" class="contact-plaquette__link" aria-label="Télécharger la plaquette PDF, 6 pages (nouvel onglet)">télécharger la plaquette (PDF · 6 pages)</a> pour prendre connaissance du dispositif.
          </p>
        </div>

        <!-- ── Colonne droite — actions rapides + coordonnées ─── -->
        <div class="contact-cards">
          <a
            class="btn btn--secondary btn--block"
            href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener noreferrer"
            aria-label="Prendre rendez-vous (nouvel onglet)"
          >
            <Icon name="lucide:calendar" aria-hidden="true" style="width:18px;height:18px" />
            Prendre rendez-vous
          </a>
          <a
            class="btn btn--ghost btn--block"
            href="https://wa.me/590690717618" target="_blank" rel="noopener noreferrer"
            aria-label="Envoyer un message WhatsApp (nouvel onglet)"
          >
            <Icon name="simple-icons:whatsapp" aria-hidden="true" class="contact-wa-icon" style="width:18px;height:18px" />
            WhatsApp
          </a>

          <!-- NAP visible et indexable — doit correspondre à la fiche Google
               Business Profile et au nœud schema.org #identity (signal local). -->
          <address class="contact-nap">
            <p class="contact-nap__label">Coordonnées</p>
            <p class="contact-nap__name">PXLC - Médiation numérique</p>
            <p class="contact-nap__line">8 Résidence la familiale, rue Man Manigard Alfred, Dugazon</p>
            <p class="contact-nap__line">97139 Les Abymes, Guadeloupe</p>
            <p class="contact-nap__line">
              <a class="contact-nap__link" href="tel:+590690717618">+590 690 717 618</a>
            </p>
            <p class="contact-nap__line">
              <a class="contact-nap__link" href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>
            </p>
            <a
              class="contact-nap__map"
              href="https://maps.app.goo.gl/4UPhQWdzboD6HnAs8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir PXLC sur Google Maps (nouvel onglet)"
            >Voir sur Google Maps →</a>
          </address>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--space-6);
  align-items: start;
}
@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; gap: var(--space-5); }
}

/* ── Heading ─────────────────────────────────────────────────── */
.contact-title {
  font-size: clamp(32px, 4.2vw, 48px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  margin: 0 0 var(--space-3);
  max-width: 640px;
}
.contact-lead {
  font-size: 17px;
  line-height: 1.55;
  color: var(--ink-quiet);
  margin-bottom: var(--space-5);
  max-width: 480px;
}

/* ── Form ────────────────────────────────────────────────────── */
.contact-form { display: grid; gap: var(--space-3); }
.form-row { display: grid; gap: var(--space-3); grid-template-columns: 1fr; }
@media (min-width: 600px) { .form-row { grid-template-columns: 1fr 1fr; } }

.contact-submit { width: fit-content; }

/* ── Status card (au-dessus du formulaire, qui reste affiché) ──── */
.contact-sent {
  background: var(--bg-soft);
  border: 1px solid var(--bg-rule);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
}
.contact-sent:focus-visible { outline: none; box-shadow: var(--ring-coral); }
/* forced-colors (Windows HCM) supprime box-shadow — on restitue un outline système. */
@media (forced-colors: active) {
  .contact-sent:focus-visible { outline: 2px solid ButtonText; outline-offset: 2px; }
}
.contact-sent__eyebrow {
  font-family: var(--font-label);
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--eyebrow);
  margin-bottom: var(--space-2-5);
}
.contact-sent__text { font-size: 15px; color: var(--ink-quiet); margin: 0; }
.contact-sent__fallback {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: var(--space-2-5); margin-top: var(--space-3);
}
.contact-sent__link {
  font-family: var(--font-body); font-weight: 600; font-size: 15px;
  color: var(--eyebrow);
}
.contact-sent__copy {
  font-family: var(--font-label); font-size: 12px; font-weight: 600;
  letter-spacing: 0.04em; color: var(--ink-quiet);
  background: var(--bg-elev);
  border: 1px solid var(--rule); border-radius: var(--radius-pill);
  padding: 0 var(--space-3); min-height: 44px; cursor: pointer;
  transition: color var(--dur-fast), border-color var(--dur-fast);
}
.contact-sent__copy:hover { color: var(--eyebrow); border-color: var(--eyebrow); }
.contact-sent__copy:focus-visible { outline: none; box-shadow: var(--ring-teal); }
[data-theme="dark"] .contact-sent__copy:focus-visible { box-shadow: var(--ring-cyan); }

/* ── Required-fields legend ──────────────────────────────────── */
.form-legend {
  font-family: var(--font-label); font-size: 12px;
  color: var(--quiet); margin: 0;
}
.form-legend__req { color: var(--pxlc-coral); font-weight: 700; }

/* ── Actions rapides + coordonnées ───────────────────────────── */
.contact-cards { display: grid; gap: var(--space-3); }

/* Glyphe de marque WhatsApp : monochrome (--ink = noir en light, ivoire ≈ blanc
   en dark) — la charte interdit de recolorer le logo ; ne suit pas la couleur
   teal du bouton ghost. */
.contact-wa-icon { color: var(--ink); }

/* ── NAP (adresse visible + lien Maps) ───────────────────────── */
.contact-nap {
  font-style: normal;
  padding: var(--space-4);
  border: 1px dashed var(--rule);
  border-radius: var(--radius-lg);
}
.contact-nap__label {
  font-family: var(--font-label);
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--eyebrow);
  margin: 0 0 var(--space-2-5);
}
.contact-nap__name {
  font-family: var(--font-display);
  font-weight: 600; font-size: 15px;
  color: var(--ink);
  margin: 0 0 var(--space-1);
}
.contact-nap__line {
  font-family: var(--font-body);
  font-size: 14px; line-height: 1.5;
  color: var(--ink-quiet);
  margin: 0 0 var(--space-1);
}
.contact-nap__link { color: var(--ink-quiet); }
.contact-nap__link:hover { color: var(--eyebrow); }
.contact-nap__map {
  display: inline-flex; align-items: center; gap: var(--space-2);
  margin-top: var(--space-2-5);
  font-family: var(--font-body);
  font-weight: 600; font-size: 14px;
  color: var(--eyebrow);
}
.contact-nap__map:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .contact-nap__map { color: var(--cyan); }
[data-theme="dark"] .contact-nap__map:hover { color: var(--pxlc-coral); }

/* ── Plaquette fallback link ─────────────────────────────────── */
.contact-plaquette {
  font-size: 13px;
  color: var(--quiet);
  margin: var(--space-3) 0 0;
  line-height: 1.5;
}
.contact-plaquette__link {
  color: var(--ink-quiet);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.contact-plaquette__link:hover { color: var(--eyebrow); }

/* ── Mobile ──────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .contact-submit { width: 100%; justify-content: center; min-height: 56px; }
}
</style>
