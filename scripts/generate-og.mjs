#!/usr/bin/env node
/**
 * Génère les cartes OG (1200×600 PNG) en post-build via satori + resvg.
 * Deux gabarits :
 *
 *   dist/_og/site.png          carte de marque (toutes les pages)
 *   dist/_og/blog/<slug>.png   carte par article (titre + catégorie)
 *
 * Couleurs : parsées depuis src/lib/brand-colors.ts (source canonique).
 * Géométrie de la marque 3×3 : src/lib/og-mark.ts (dupliquée ici car ce
 * script est du Node pur — garder les deux en phase).
 * Polices : TTF vendorées dans src/assets/og-fonts/ (satori ne lit pas le woff2).
 *
 *   node scripts/generate-og.mjs [buildDir]
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const BUILD_DIR = process.argv[2] || 'dist'
const CONTENT_DIR = 'content/blog'
const F_SANS = 'Plus Jakarta Sans'

// ── Palette — parsée depuis brand-colors.ts (même approche que generate-tokens) ──
const brandSource = await readFile('src/lib/brand-colors.ts', 'utf8')
const hex = (key) => {
  const m = brandSource.match(new RegExp(`${key}:\\s*'(#[0-9A-Fa-f]{6})'`))
  if (!m) throw new Error(`Couleur ${key} introuvable dans src/lib/brand-colors.ts`)
  return m[1]
}
const palette = {
  bg: hex('bgLight'),
  ink: hex('textInk'),
  accent: hex('tealDeep'),
  muted: hex('textOnLight'),
  coral: hex('coral'),
  tealDeep: hex('tealDeep'),
  tealMid: hex('tealMid'),
  cyan: hex('cyan'),
}

// Marque 3×3 (viewBox 0 0 100 100) — cf. src/lib/og-mark.ts.
const MARK_POS = [2, 35.33, 68.67]
const MARK_RECTS = [
  { x: MARK_POS[0], y: MARK_POS[0], fill: palette.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[0], fill: palette.tealMid },
  { x: MARK_POS[2], y: MARK_POS[0], fill: palette.cyan },
  { x: MARK_POS[0], y: MARK_POS[1], fill: palette.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[1], fill: palette.tealMid },
  { x: MARK_POS[2], y: MARK_POS[1], fill: palette.cyan },
  { x: MARK_POS[0], y: MARK_POS[2], fill: palette.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[2], fill: palette.tealMid },
  { x: MARK_POS[2], y: MARK_POS[2], fill: palette.coral },
]

const h = (type, style, children, extra = {}) => ({ type, props: { style, children, ...extra } })

const markSvg = size => ({
  type: 'svg',
  props: {
    width: size,
    height: size,
    viewBox: '0 0 100 100',
    children: MARK_RECTS.map(r => ({
      type: 'rect',
      props: { x: r.x, y: r.y, width: 29.33, height: 29.33, rx: 3.5, fill: r.fill },
    })),
  },
})

// Lockup « PXLC. » — point final coral.
const lockup = fontSize => h('span', {
  fontFamily: F_SANS,
  fontWeight: 700,
  fontSize,
  letterSpacing: '-0.03em',
  color: palette.ink,
  lineHeight: 1,
}, ['PXLC', h('span', { color: palette.coral }, '.')])

// Filigrane : marque pixel en bas à droite, faible opacité, inclinée -8°.
const watermark = (size, offset) => h('div', {
  position: 'absolute',
  right: `${offset}px`,
  bottom: `${offset}px`,
  display: 'flex',
  transform: 'rotate(-8deg)',
  opacity: 0.1,
}, [markSvg(size)])

// ── Gabarit 1 : carte de marque (ex-PxlcOg) ────────────────────────────────
const siteCard = () => h('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: palette.bg,
  fontFamily: F_SANS,
  padding: '64px',
}, [
  watermark(520, -80),
  h('div', { display: 'flex', flexDirection: 'column', alignItems: 'center' }, [
    markSvg(172),
    h('div', { display: 'flex', marginTop: '24px' }, [lockup('88px')]),
    h('span', {
      fontFamily: F_SANS,
      fontSize: '26px',
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: palette.accent,
      marginTop: '28px',
    }, 'Médiation numérique · Guadeloupe'),
  ]),
])

// ── Gabarit 2 : carte article (ex-PxlcOgArticle) ───────────────────────────
// Taille du titre par paliers de longueur — pas de mesure runtime.
const articleCard = (title, category) => {
  const len = title.length
  const titleFontSize = len <= 38 ? '68px' : len <= 66 ? '56px' : len <= 96 ? '46px' : '40px'
  return h('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: palette.bg,
    fontFamily: F_SANS,
    padding: '72px',
  }, [
    watermark(460, -90),
    h('div', { display: 'flex', alignItems: 'center' }, [
      markSvg(60),
      h('div', { display: 'flex', marginLeft: '16px' }, [lockup('34px')]),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', maxWidth: '1000px' }, [
      h('span', {
        fontFamily: F_SANS,
        fontSize: '24px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: palette.accent,
        marginBottom: '24px',
      }, category),
      h('div', {
        display: 'flex',
        fontFamily: F_SANS,
        fontWeight: 700,
        fontSize: titleFontSize,
        letterSpacing: '-0.02em',
        color: palette.ink,
        lineHeight: 1.12,
      }, title),
    ]),
    h('div', { display: 'flex', alignItems: 'center' }, [
      h('span', {
        fontFamily: F_SANS,
        fontSize: '22px',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: palette.muted,
      }, 'Médiation numérique · Guadeloupe'),
    ]),
  ])
}

// ── Frontmatter minimal (title / category / draft) ─────────────────────────
const parseFrontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const out = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    let value = kv[2].trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1)
    }
    out[kv[1]] = value
  }
  return out
}

const main = async () => {
  const fonts = [
    { name: F_SANS, weight: 600, style: 'normal', data: await readFile('src/assets/og-fonts/PlusJakartaSans-SemiBold.ttf') },
    { name: F_SANS, weight: 700, style: 'normal', data: await readFile('src/assets/og-fonts/PlusJakartaSans-Bold.ttf') },
  ]

  const renderPng = async (tree) => {
    const svg = await satori(tree, { width: 1200, height: 600, fonts })
    return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
  }

  await mkdir(join(BUILD_DIR, '_og', 'blog'), { recursive: true })

  await writeFile(join(BUILD_DIR, '_og', 'site.png'), await renderPng(siteCard()))
  let count = 1

  for (const file of await readdir(CONTENT_DIR)) {
    if (!file.endsWith('.md')) continue
    const fm = parseFrontmatter(await readFile(join(CONTENT_DIR, file), 'utf8'))
    if (fm.draft === 'true') continue
    const slug = file.replace(/\.md$/, '')
    const png = await renderPng(articleCard(fm.title || 'Médiation numérique en Guadeloupe', fm.category || 'Blog'))
    await writeFile(join(BUILD_DIR, '_og', 'blog', `${slug}.png`), png)
    count++
  }

  console.log(`OG : ${count} cartes générées dans ${BUILD_DIR}/_og/`)
}

main().catch((err) => { console.error(err); process.exit(2) })
