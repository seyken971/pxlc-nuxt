<script setup lang="ts">
useSeoMeta({
  title: 'Contact — vingt minutes pour faire connaissance',
  description:
    'Un premier échange de 20 minutes, gratuit, sans engagement. WhatsApp ou visio, à votre convenance.',
})

defineOgImage('PxlcOg', {
  eyebrow: 'PXLC · PREMIER PAS',
  title: 'Vingt minutes pour faire connaissance',
  description: 'WhatsApp ou visio, à votre convenance. Aucune obligation à la sortie — vous m’expliquez, je vous dis honnêtement si je peux aider.',
})

const form = reactive({ name: '', email: '', message: '' })
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
      <p class="lead contact-lead">WhatsApp ou visio, à votre convenance. Aucune obligation à la sortie.</p>

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
        </div>
        <div>
          <label for="contact-message" class="form-label">En quelques mots…</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            rows="5"
            placeholder="Mon enfant de 11 ans joue à Fortnite et nous n’arrivons plus à en parler…"
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
.contact-form { display: grid; gap: 16px; }
.contact-submit { align-self: flex-start; }
.contact-submit:disabled { cursor: not-allowed; opacity: 0.7; }
.contact-sent { color: var(--teal-deep); font-weight: 600; }
[data-theme="dark"] .contact-sent { color: var(--cyan); }
</style>
