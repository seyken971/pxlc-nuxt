// PXLC brand mark — 3×3 pixel grid (teal/cyan left columns, coral accent bottom-right)
// Uses Vue custom element <pxlc-mark> — _ds_bundle.js registers it on load.
// Sizes: 36 (default/nav), 40 (medium/card), 56 (large/hero)

export const Small = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
    <pxlc-mark size="36" />
    <span style={{ fontFamily: 'system-ui', fontSize: '14px', color: 'var(--quiet, #5A6B70)' }}>36 px — navigation</span>
  </div>
)

export const Medium = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
    <pxlc-mark size="40" />
    <span style={{ fontFamily: 'system-ui', fontSize: '14px', color: 'var(--quiet, #5A6B70)' }}>40 px — carte</span>
  </div>
)

export const Large = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
    <pxlc-mark size="56" />
    <span style={{ fontFamily: 'system-ui', fontSize: '14px', color: 'var(--quiet, #5A6B70)' }}>56 px — hero</span>
  </div>
)

export const XLarge = () => (
  <div style={{ padding: '24px' }}>
    <pxlc-mark size="96" />
  </div>
)
