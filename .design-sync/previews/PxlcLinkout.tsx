// External link styled with a right-arrow indicator.
// Rendered as <a class="linkout" href="...">. Used for outgoing references.

export const Default = () => (
  <div style={{ padding: '24px', fontFamily: 'system-ui', fontSize: '15px' }}>
    <pxlc-linkout to="https://www.has-sante.fr">Recommandations HAS 2020</pxlc-linkout>
  </div>
)

export const InProse = () => (
  <div style={{ padding: '24px', maxWidth: '480px' }}>
    <p style={{ fontFamily: 'serif', fontSize: '15px', lineHeight: '1.7', color: 'var(--ink, #082B36)' }}>
      Les ateliers s'appuient sur les recommandations{' '}
      <pxlc-linkout to="https://www.hcsp.fr">HCSP 2019-2020</pxlc-linkout>{' '}
      et le cadre{' '}
      <pxlc-linkout to="https://www.has-sante.fr">HAS 2020</pxlc-linkout>.
    </p>
  </div>
)
