// Horizontal row of pixel cells with one coral accent cell.
// Default: 14 cells, accent at position 11. Used as a visual bar at top/bottom of hero sections.

export const Default = () => (
  <div style={{ padding: '16px 0', background: 'var(--bg, #EAF6F4)', width: '320px' }}>
    <pxlc-pixel-strip />
  </div>
)

export const Short = () => (
  <div style={{ padding: '16px 0', background: 'var(--bg, #EAF6F4)', width: '200px' }}>
    <pxlc-pixel-strip count="8" accent-at="5" />
  </div>
)

export const Long = () => (
  <div style={{ padding: '16px 0', background: 'var(--bg, #EAF6F4)', width: '480px' }}>
    <pxlc-pixel-strip count="20" accent-at="17" />
  </div>
)
