<script setup lang="ts">
useSeoMeta({
  title: 'Contact — vingt minutes pour faire connaissance',
  description:
    'Un premier échange de 20 minutes, gratuit, sans engagement. Visio ou WhatsApp — réservez directement sur cal.eu/pxlc-gp ou écrivez via le formulaire.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · PREMIER PAS',
  title: 'Vingt minutes pour faire connaissance',
  description: 'Visio ou WhatsApp, à votre convenance. Réservez directement en ligne ou écrivez via le formulaire — réponse personnelle sous 48 h.',
})

const form = reactive({ name: '', structure: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const submit = async (event: Event) => {
  event.preventDefault()
  sending.value = true
  // Démo · à câbler avec un endpoint réel (Netlify Forms, Formspree, etc.).
  await new Promise(r => setTimeout(r, 600))
  sending.value = false
  sent.value = true
}
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

      <!-- Raccourci cal.eu : la majorité des échanges initiaux se réservent
           ici directement plutôt que via le formulaire. -->
      <aside class="contact-quick">
        <div>
          <div class="contact-quick__eyebrow">Le plus rapide</div>
          <div class="contact-quick__text">
            <strong>Choisir un créneau sur cal.eu/pxlc-gp</strong>
            <span>20 min · gratuit · visio ou WhatsApp</span>
          </div>
        </div>
        <a href="https://cal.eu/pxlc-gp" target="_blank" rel="noopener" class="btn btn--primary btn--lg">
          Réserver un créneau
        </a>
      </aside>

      <div class="contact-divider"><span>ou écrivez-moi</span></div>

      <form class="card contact-form" @submit="submit">
        <div class="form-row">
          <div>
            <label for="contact-name" class="form-label">Votre nom *</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Marie Lemoine"
              class="form-input"
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
            >
          </div>
        </div>
        <div>
          <label for="contact-email" class="form-label">Email *</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            placeholder="marie@example.com"
            class="form-input"
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
        <button type="submit" class="btn btn--primary btn--lg contact-submit" :disabled="sending || sent">
          {{ sent ? 'Message envoyé' : sending ? 'Envoi…' : 'Envoyer le message' }}
        </button>
        <p v-if="sent" class="contact-sent">Merci — je réponds en personne sous 48 h.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-container { max-width: 820px; }
.contact-title { font-size: clamp(38px, 6vw, 64px); letter-spacing: -0.025em; line-height: 1.05; margin-bottom: 24px; }
.contact-lead { margin-bottom: 32px; }

.contact-quick {
  display: grid; gap: 16px;
  grid-template-columns: 1fr;
  align-items: center;
  background: var(--bg-soft);
  border: 1px solid var(--bg-rule);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 32px;
}
@media (min-width: 600px) { .contact-quick { grid-template-columns: 1fr auto; } }
.contact-quick__eyebrow {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--eyebrow);
  margin-bottom: 6px;
}
.contact-quick__text { display: flex; flex-direction: column; gap: 4px; }
.contact-quick__text strong {
  font-family: var(--font-display); font-weight: 600; font-size: 17px;
  color: var(--ink); letter-spacing: -0.015em;
}
.contact-quick__text span { font-size: 14px; color: var(--quiet); }

.contact-divider {
  display: flex; align-items: center; gap: 16px;
  margin: 32px 0;
  color: var(--quiet);
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.22em; text-transform: uppercase;
}
.contact-divider::before, .contact-divider::after {
  content: ""; flex: 1; height: 1px; background: var(--rule);
}

.contact-form { display: grid; gap: 16px; }
.contact-submit { align-self: flex-start; }
.contact-submit:disabled { cursor: not-allowed; opacity: 0.7; }
.contact-sent { color: var(--teal-deep); font-weight: 600; }
[data-theme="dark"] .contact-sent { color: var(--cyan); }
</style>
