// PXLC brand lockup — pixel mark + "PXLC." wordmark as a linked block
// Three sizes: sm (nav default), md, lg (hero/footer)
// Uses Vue custom element <pxlc-lockup>.

export const Small = () => (
  <div style={{ padding: '24px', background: 'var(--bg, #EAF6F4)' }}>
    <pxlc-lockup size="sm" to="/" />
  </div>
)

export const Medium = () => (
  <div style={{ padding: '24px', background: 'var(--bg, #EAF6F4)' }}>
    <pxlc-lockup size="md" to="/" />
  </div>
)

export const Large = () => (
  <div style={{ padding: '32px', background: 'var(--bg, #EAF6F4)' }}>
    <pxlc-lockup size="lg" to="/" />
  </div>
)

export const OnDark = () => (
  <div style={{ padding: '32px', background: 'var(--pxlc-bg-dark, #082B36)' }} data-theme="dark">
    <pxlc-lockup size="lg" to="/" />
  </div>
)
