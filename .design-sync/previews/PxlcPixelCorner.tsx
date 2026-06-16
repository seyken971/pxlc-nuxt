// L-shaped pixel decoration: 3×3 grid with a coral accent in the bottom-right cell,
// mirroring the brand mark's identity. Used at card corners and section edges.

export const Default = () => (
  <div style={{ padding: '24px', background: 'var(--bg-elev, #FFFFFF)', display: 'inline-block', position: 'relative' }}>
    <pxlc-pixel-corner />
  </div>
)

export const InContext = () => (
  <div style={{
    padding: '24px',
    width: '240px',
    background: 'var(--bg-elev, #FFFFFF)',
    borderRadius: '8px',
    border: '1px solid var(--rule, #C4D1D2)',
    position: 'relative',
  }}>
    <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
      <pxlc-pixel-corner />
    </div>
    <p style={{ fontFamily: 'system-ui', fontSize: '14px', color: 'var(--ink-quiet, #2C4751)', margin: 0 }}>
      Médiathèque Basse-Terre
    </p>
  </div>
)
