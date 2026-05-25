<script setup lang="ts">
definePageMeta({ hideGlobalCta: true })

useSeoMeta({ title: 'Contact — vingt minutes pour faire connaissance' })
useServerSeoMeta({
  description:
    'Premier échange de 20 min, gratuit, sans engagement. Visio, WhatsApp ou mail — réservez sur cal.eu/pxlc-gp ou écrivez via le formulaire.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · PREMIER PAS',
  title: 'Vingt minutes pour faire connaissance',
  description: 'Visio ou WhatsApp, à votre convenance. Réservez directement en ligne ou écrivez via le formulaire — réponse personnelle sous 48 h.',
})

useSchemaOrg([
  defineWebPage({
    '@type': 'ContactPage',
    name: 'Contact PXLC',
    description: 'Page de prise de contact avec PXLC — Andy Zébus, gamer médiateur-numérique en Guadeloupe.',
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
            <p class="contact-sent__text">Je reviens sous 48 h avec une réponse personnelle.</p>
          </div>

          <form v-else class="contact-form" @submit.prevent="submit">
            <div class="form-row">
              <div>
                <label for="c-nom" class="form-label">Prénom et Nom</label>
                <input
                  id="c-nom"
                  v-model="form.name"
                  type="text"
                  placeholder="Prénom Nom"
                  class="form-input"
                >
              </div>
              <div>
                <label for="c-structure" class="form-label">Structure</label>
                <input
                  id="c-structure"
                  v-model="form.structure"
                  type="text"
                  placeholder="Association, école, collectivité…"
                  class="form-input"
                >
              </div>
            </div>

            <div>
              <label for="c-email" class="form-label">Adresse e-mail</label>
              <input
                id="c-email"
                v-model="form.email"
                type="email"
                placeholder="contact@structure.fr"
                class="form-input"
              >
            </div>

            <div>
              <label for="c-msg" class="form-label">Message</label>
              <textarea
                id="c-msg"
                v-model="form.message"
                rows="5"
                placeholder="Décrivez votre projet…"
                class="form-textarea"
              />
            </div>

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

.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--eyebrow);
  margin-bottom: var(--space-2);
}
.form-input, .form-textarea {
  width: 100%; padding: var(--space-2-5) var(--space-3); border-radius: var(--radius-md);
  border: 1px solid var(--rule); background: var(--bg-elev); color: var(--ink);
  font-family: var(--font-body); font-size: 15px;
  transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
}
.form-input:hover, .form-textarea:hover { border-color: var(--pxlc-teal-mid); }
.form-input:focus-visible, .form-textarea:focus-visible {
  outline: none;
  border-color: var(--pxlc-teal-deep);
  box-shadow: var(--ring-teal);
}
[data-theme="dark"] .form-input:focus-visible,
[data-theme="dark"] .form-textarea:focus-visible {
  border-color: var(--pxlc-cyan);
  box-shadow: var(--ring-cyan);
}
.form-textarea { resize: vertical; min-height: 120px; }
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
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
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
