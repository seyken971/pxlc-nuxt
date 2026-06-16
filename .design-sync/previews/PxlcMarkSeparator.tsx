// Horizontal decorative separator: two lines flanking the pixel mark.
// Max-width 320px, auto-centered. Used between article sections.

export const Default = () => (
  <div style={{ padding: '32px 24px', background: 'var(--bg, #EAF6F4)', maxWidth: '480px' }}>
    <p style={{ fontFamily: 'serif', fontSize: '15px', marginBottom: '0', color: 'var(--ink, #082B36)' }}>
      Accompagner les familles dans l'éducation numérique des enfants.
    </p>
    <pxlc-mark-separator />
    <p style={{ fontFamily: 'serif', fontSize: '15px', marginTop: '0', color: 'var(--ink, #082B36)' }}>
      Les ateliers PXLC s'adressent aux structures qui accueillent déjà des familles.
    </p>
  </div>
)

export const Standalone = () => (
  <div style={{ padding: '24px', width: '360px' }}>
    <pxlc-mark-separator />
  </div>
)
