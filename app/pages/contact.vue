<script setup lang="ts">
useSeoMeta({
  title: 'Contact — vingt minutes pour faire connaissance',
  // Kept under ~160 chars so the meta is not truncated in search results.
  description:
    'Premier échange de 20 min, gratuit, sans engagement. Visio, WhatsApp ou mail — réservez sur cal.eu/pxlc-gp ou écrivez via le formulaire.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · PREMIER PAS',
  title: 'Vingt minutes pour faire connaissance',
  description: 'Visio ou WhatsApp, à votre convenance. Réservez directement en ligne ou écrivez via le formulaire — réponse personnelle sous 48 h.',
})

// Type this page as a ContactPage in JSON-LD. The LocalBusiness identity
// (email, phone, address, contactPoint) is already declared globally in
// nuxt.config.ts → schemaOrg.identity, so no need to repeat it here.
useSchemaOrg([
  defineWebPage({
    '@type': 'ContactPage',
    name: 'Contact PXLC',
    description: 'Page de prise de contact avec PXLC — Andy Zébus, gamer médiateur-numérique en Guadeloupe.',
  }),
])

const form = reactive({ name: '', structure: '', email: '', message: '' })
const sent = ref(false)
const sentMessage = ref<HTMLParagraphElement | null>(null)

// GitHub Pages ne traite pas de POST — on construit un mailto: avec
// les champs du formulaire et on ouvre le client mail de l'utilisateur.
// Avantage : zéro service tiers, illimité, traçable côté Andy.
// Inconvénient : nécessite un client mail configuré côté visiteur.
// Le raccourci cal.eu au-dessus reste la voie principale ; ce form est
// le fallback pour les structures qui préfèrent l'écrit.
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

  // window.location pour ne pas garder un onglet vide ouvert
  if (import.meta.client) window.location.href = href
  sent.value = true
  // Move focus to the success message so screen readers and keyboard users
  // notice the state change; aria-live="polite" announces it for AT users
  // who didn't move focus.
  nextTick(() => sentMessage.value?.focus())
}

// Prefilled WhatsApp message — encodeURIComponent so accents survive the
// URL hop on every WhatsApp client (mobile, web, desktop).
const whatsappHref = `https://wa.me/590690717618?text=${encodeURIComponent('Bonjour Andy, je souhaite échanger au sujet de PXLC.')}`
</script>

<template>
  <section class="section">
    <div class="container contact-container">
      <span class="eyebrow eyebrow--lg">Premier pas</span>
      <h1 class="contact-title">
        Vingt minutes pour faire connaissance<span class="coral-dot" aria-hidden="true">.</span>
      </h1>
      <p class="lead contact-lead">
        Visio ou WhatsApp, à votre convenance. Vingt minutes pour cadrer le périmètre, le public visé, et voir si la médiation s’inscrit dans vos objectifs ARS / DRJSCS.
      </p>

      <!-- Raccourci direct : cal.eu pour la visio, WhatsApp pour l'instant.
           La majorité des échanges initiaux passent par l'un de ces deux
           canaux plutôt que par le formulaire mailto plus bas. -->
      <aside class="contact-quick" aria-labelledby="contact-quick-title">
        <div class="contact-quick__head">
          <div class="contact-quick__eyebrow" id="contact-quick-title">Le plus rapide</div>
          <p class="contact-quick__text">
            Choisissez un créneau sur l’agenda ou écrivez sur WhatsApp — réponse personnelle sous 48 h.
          </p>
        </div>
        <div class="contact-quick__actions">
          <a
            href="https://cal.eu/pxlc-gp"
            target="_blank"
            rel="noopener"
            class="btn btn--primary btn--lg"
            aria-label="Réserver un créneau sur cal.eu (nouvel onglet)"
          >
            Réserver · 20 min
          </a>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener"
            class="btn btn--ghost btn--lg btn--no-arrow"
            aria-label="Démarrer une conversation WhatsApp (nouvel onglet)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.9-1.4-1.4-3-1.4-4.6 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.6-8.8 8.6z"/></svg>
            WhatsApp
          </a>
        </div>
      </aside>

      <h2 id="form-title" class="contact-divider">
        <span>ou écrivez-moi</span>
      </h2>

      <form class="card contact-form" aria-labelledby="form-title" @submit.prevent="submit">
        <p class="contact-form__required-note">
          Les champs marqués <span class="contact-required" aria-hidden="true">*</span> sont obligatoires.
        </p>

        <div class="form-row">
          <div>
            <label for="contact-name" class="form-label">
              Votre nom <span class="contact-required" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Marie Lemoine"
              class="form-input"
              autocomplete="name"
            >
          </div>
          <div>
            <label for="contact-structure" class="form-label">Structure</label>
            <input
              id="contact-structure"
              v-model="form.structure"
              type="text"
              placeholder="SESSAD Lékoklaya"
              class="form-input"
              autocomplete="organization"
            >
          </div>
        </div>
        <div>
          <label for="contact-email" class="form-label">
            Email <span class="contact-required" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            placeholder="marie@example.com"
            class="form-input"
            autocomplete="email"
          >
        </div>
        <div>
          <label for="contact-message" class="form-label">En quelques mots…</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            rows="5"
            placeholder="Nous accompagnons 12 enfants TSA/TDAH au SESSAD, les jeux vidéo sont un point de friction récurrent avec les familles — comment cadrer un dispositif ?"
            class="form-textarea"
          />
        </div>
        <button type="submit" class="btn btn--primary btn--lg contact-submit">
          Ouvrir mon client mail
        </button>
        <p class="contact-rgpd">
          En cliquant sur « Ouvrir mon client mail », aucune donnée n’est envoyée à ce site —
          le message part directement depuis votre client mail vers
          <a href="mailto:contact@pxlc.fr">contact@pxlc.fr</a>.
          <NuxtLink to="/mentions-legales#rgpd">En savoir plus sur le traitement des données</NuxtLink>.
        </p>
        <p
          v-if="sent"
          ref="sentMessage"
          tabindex="-1"
          role="status"
          aria-live="polite"
          class="contact-sent"
        >
          Votre client mail s’est ouvert avec le message pré-rempli — il ne vous reste plus qu’à appuyer sur « envoyer ». Je réponds en personne sous 48 h.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-container { max-width: 820px; }
.contact-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; margin-bottom: var(--space-4); }
.contact-lead { margin-bottom: var(--space-5); }

.contact-quick {
  display: grid; gap: var(--space-4);
  grid-template-columns: 1fr;
  align-items: center;
  background: var(--bg-soft);
  border: 1px solid var(--bg-rule);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin-bottom: var(--space-5);
}
@media (min-width: 720px) { .contact-quick { grid-template-columns: 1fr auto; } }
.contact-quick__head { display: flex; flex-direction: column; gap: 6px; }
.contact-quick__eyebrow {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--eyebrow);
}
.contact-quick__text { font-size: 14px; color: var(--quiet); margin: 0; }
.contact-quick__actions { display: flex; flex-wrap: wrap; gap: 12px; }

/* Visual divider that doubles as the form's accessible name. Styled like
   the previous .contact-divider but it's now an actual <h2>, so screen
   readers and keyboard users land on it instead of an unlabelled chunk. */
.contact-divider {
  display: flex; align-items: center; gap: var(--space-3);
  margin: 32px 0;
  color: var(--quiet);
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
}
.contact-divider span { flex: none; }
.contact-divider::before, .contact-divider::after {
  content: ""; flex: 1; height: 1px; background: var(--rule);
}

.contact-form { display: grid; gap: var(--space-3); }
.contact-form__required-note {
  font-size: 13px;
  color: var(--quiet);
  margin: 0 0 4px;
}
.contact-required { color: var(--pxlc-coral); font-weight: 700; }
.contact-submit { align-self: flex-start; }
.contact-submit:disabled { cursor: not-allowed; opacity: 0.7; }

.contact-rgpd {
  font-size: 12.5px;
  color: var(--quiet);
  line-height: 1.5;
  margin: 0;
}
.contact-rgpd a { color: var(--teal-deep); border-bottom: 1px solid currentColor; }
[data-theme="dark"] .contact-rgpd a { color: var(--cyan); }

.contact-sent {
  color: var(--teal-deep);
  font-weight: 600;
  padding: var(--space-3);
  background: var(--bg-soft);
  border-left: 3px solid var(--pxlc-coral);
  border-radius: var(--radius-sm);
  margin: 0;
}
.contact-sent:focus-visible { outline: 3px solid var(--pxlc-coral); outline-offset: 2px; }
[data-theme="dark"] .contact-sent { color: var(--cyan); }
</style>
