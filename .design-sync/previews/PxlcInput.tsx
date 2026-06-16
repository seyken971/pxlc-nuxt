// Form field: renders <input> or <textarea> depending on whether rows prop is set.
// v-model equivalent in custom element: set the `model-value` attribute.

export const TextInput = () => (
  <div style={{ padding: '24px', maxWidth: '360px' }}>
    <pxlc-input id="prenom" label="Prénom" type="text" placeholder="Andy" />
  </div>
)

export const EmailInput = () => (
  <div style={{ padding: '24px', maxWidth: '360px' }}>
    <pxlc-input id="email" label="Adresse e-mail" type="email" placeholder="andy@pxlc.fr" autocomplete="email" />
  </div>
)

export const RequiredField = () => (
  <div style={{ padding: '24px', maxWidth: '360px' }}>
    <pxlc-input id="nom-structure" label="Nom de votre structure" type="text" required="" placeholder="Médiathèque Basse-Terre" />
  </div>
)

export const Textarea = () => (
  <div style={{ padding: '24px', maxWidth: '360px' }}>
    <pxlc-input id="message" label="Votre message" rows="4" placeholder="Dites-moi en quelques mots votre projet…" />
  </div>
)
