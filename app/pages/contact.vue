<script setup lang="ts">
definePageMeta({ hideGlobalCta: true })

useSeoMeta({ title: 'Contacter Andy Zébus — devis ou premier échange de 20 min' })
if (import.meta.server) {
  useSeoMeta({
    description:
      'Devis ou premier échange de 20 min — gratuit, sans engagement. Pour les structures de Guadeloupe qui accompagnent des familles autour des écrans.',
    ogDescription:
      'Réponse sous 48 h — formulaire, WhatsApp ou visio. Premier échange de 20 min gratuit pour savoir si la méthode PXLC correspond à votre projet.',
  })
}

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · PREMIER PAS',
  title: 'Vingt minutes pour faire connaissance',
  description: 'Visio ou WhatsApp, à votre convenance. Réservez directement en ligne ou écrivez via le formulaire — réponse personnelle sous 48 h.',
}, [
  { key: 'og' },
  { key: 'whatsapp', width: 800, height: 800 },
])

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

// GitHub Pages ne traite pas de POST — on construit un mailto: avec les
// champs du formulaire et on ouvre le client mail de l'utilisateur.
const submit = () => {
  const lines = [
    `Nom : ${form.name}`,
    form.structure ? `Structure : ${form.structure}` : null,
    `Email : ${form.email}`,
    '',
    'Message :',
    form.message || '(vide)',
  ].filter((l): l is string => l !== null)

  const subject = `Contact PXLC — ${form.name}${form.structure ? ` (${form.structure})` : ''}`
  const body = lines.join('\n')
  const href = `mailto:contact@pxlc.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  if (import.meta.client) window.location.href = href
  sent.value = true
  nextTick(() => sentCard.value?.focus())
}

const contactCards = [
  {
    key: 'calendar',
    icon: 'lucide:calendar',
    label: 'Réserver un créneau',
    desc: '20 min · visio · gratuit',
    cta: 'Ouvrir cal.eu/pxlc-gp',
    href: 'https://cal.eu/pxlc-gp',
    external: true,
  },
  {
    key: 'whatsapp',
    icon: 'simple-icons:whatsapp',
    label: 'WhatsApp',
    desc: '+590 690 717 618',
    cta: 'Envoyer un message',
    href: 'https://wa.me/590690717618',
    external: true,
  },
  {
    key: 'email',
    icon: 'lucide:mail',
    label: 'E-mail',
    desc: 'contact@pxlc.fr',
    cta: 'Écrire un mail',
    href: 'mailto:contact@pxlc.fr',
    external: false,
  },
  {
    key: 'linkedin',
    icon: 'simple-icons:linkedin',
    label: 'LinkedIn',
    desc: 'linkedin.com/in/azebus',
    cta: 'Voir le profil',
    href: 'https://www.linkedin.com/in/azebus',
    external: true,
  },
]
</script>

<template>
  <section class="section section--page">
    <div class="container">

      <!-- Heading — pleine largeur, au-dessus du grid -->
      <span class="eyebrow eyebrow--lg">Contact</span>
      <h1 class="contact-title">
        On en parle<span class="coral-dot" aria-hidden="true">?</span>
      </h1>
      <p class="contact-lead">
        Décrivez votre structure, le public accompagné et le projet envisagé — je reviens sous 48 h.
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
            <div class="contact-sent__eyebrow">Message envoyé</div>
            <p class="contact-sent__text">Je reviens sous 48 h avec une réponse personnalisée.</p>
          </div>

          <form v-else class="contact-form" @submit.prevent="submit">
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
        </div>

        <!-- ── Colonne droite — cartes de contact ───────────── -->
        <div class="contact-cards">
          <div v-for="c in contactCards" :key="c.key" class="contact-card">
            <div class="contact-card__head">
              <div class="contact-card__icon" aria-hidden="true">
                <Icon :name="c.icon" aria-hidden="true" style="width:18px;height:18px" />
              </div>
              <div>
                <div class="contact-card__label">{{ c.label }}</div>
                <div class="contact-card__desc">{{ c.desc }}</div>
              </div>
            </div>
            <a
              :href="c.href"
              :target="c.external ? '_blank' : undefined"
              :rel="c.external ? 'noopener noreferrer' : undefined"
              :aria-label="c.external ? `${c.cta} (nouvel onglet)` : c.cta"
              class="contact-card__cta"
            >{{ c.cta }} →</a>
          </div>
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

/* ── Success card ────────────────────────────────────────────── */
.contact-sent {
  background: var(--bg-soft);
  border: 1px solid var(--bg-rule);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
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

/* ── Contact cards ───────────────────────────────────────────── */
.contact-cards { display: grid; gap: var(--space-3); }

.contact-card {
  background: var(--bg-elev);
  border: 1px solid var(--rule);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: background var(--dur-base);
}
.contact-card__head {
  display: flex; align-items: center; gap: var(--space-2-5);
  margin-bottom: var(--space-2-5);
}
.contact-card__icon {
  width: 36px; height: 36px; flex-shrink: 0;
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  color: var(--eyebrow);
  display: flex; align-items: center; justify-content: center;
}
.contact-card__label {
  font-family: var(--font-display);
  font-weight: 600; font-size: 15px;
  color: var(--ink);
}
.contact-card__desc {
  font-family: var(--font-label);
  font-size: 11px; letter-spacing: 0.1em;
  color: var(--quiet);
  margin-top: var(--space-1);
}
.contact-card__cta {
  font-family: var(--font-body);
  font-weight: 600; font-size: 14px;
  color: var(--eyebrow);
  display: inline-flex; align-items: center; gap: var(--space-2);
}
.contact-card__cta:hover { color: var(--pxlc-coral); text-decoration: none; }
[data-theme="dark"] .contact-card__cta { color: var(--cyan); }
[data-theme="dark"] .contact-card__cta:hover { color: var(--pxlc-coral); }

/* ── Mobile ──────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .contact-submit { width: 100%; justify-content: center; min-height: 56px; }
}
</style>
