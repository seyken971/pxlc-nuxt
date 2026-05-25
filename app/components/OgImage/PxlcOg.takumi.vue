<script setup lang="ts">
import { BRAND_HEX } from '~/utils/brand-colors'

interface Props {
  eyebrow?: string
  title?: string
  description?: string
  site?: string
}
withDefaults(defineProps<Props>(), {
  eyebrow: 'PXLC · MÉDIATION NUMÉRIQUE · GUADELOUPE',
  title: 'Les écrans sont le reflet de la relation parent-enfant',
  description: 'Gamer médiateur-numérique, partenaire des SESSAD, IME, associations et collectivités de Guadeloupe — ateliers parent-écran-enfant fondés sur les rapports HCSP.',
  site: 'pxlc.fr',
})

// Single light surface — the colorMode prop was carrying dark-mode
// fallback values that nothing consumed. Dropped per design call:
// social-app previews aren't aware of system theme anyway, and the
// ivory ground reads distinctively on dark social UIs (X/LinkedIn/Slack).
const palette = {
  bg: BRAND_HEX.bgLight,
  ink: BRAND_HEX.textInk,
  inkQuiet: BRAND_HEX.textOnLight,
  eyebrow: BRAND_HEX.tealDeep,
  meta: BRAND_HEX.textSecondary,
  rule: BRAND_HEX.border,
} as const

const teals = [BRAND_HEX.tealDeep, BRAND_HEX.tealMid, BRAND_HEX.cyan]
const coral = BRAND_HEX.coral

// 3×3 brand mark coords, shared between the decorative 520-px instance
// and the 48-px lockup. nuxt-og-image enforces a renderer suffix on
// every .vue under app/components/OgImage/, so an in-folder <OgMark>
// sub-component isn't possible — the v-for keeps the data DRY instead.
const MARK_POS = [2, 35.33, 68.67] as const
const MARK_RECTS = [
  { x: MARK_POS[0], y: MARK_POS[0], fill: BRAND_HEX.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[0], fill: BRAND_HEX.tealMid },
  { x: MARK_POS[2], y: MARK_POS[0], fill: BRAND_HEX.cyan },
  { x: MARK_POS[0], y: MARK_POS[1], fill: BRAND_HEX.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[1], fill: BRAND_HEX.tealMid },
  { x: MARK_POS[2], y: MARK_POS[1], fill: BRAND_HEX.cyan },
  { x: MARK_POS[0], y: MARK_POS[2], fill: BRAND_HEX.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[2], fill: BRAND_HEX.tealMid },
  { x: MARK_POS[2], y: MARK_POS[2], fill: BRAND_HEX.coral },
]
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: palette.bg,
      color: palette.ink,
      fontFamily: 'DM Sans, system-ui, sans-serif',
      padding: '64px 72px',
    }"
  >
    <!-- Decorative brand mark (bottom-right, low-opacity, tilted -8deg).
         Inlined SVG instead of a sub-component because nuxt-og-image
         only accepts files with renderer suffixes in this folder. The
         shared MARK_RECTS const keeps the data un-duplicated; only the
         <svg> wrapper differs between the 520 px decorative and the
         48 px lockup instances. -->
    <div
      :style="{
        position: 'absolute',
        right: '-80px',
        bottom: '-80px',
        display: 'flex',
        transform: 'rotate(-8deg)',
        opacity: 0.1,
      }"
    >
      <svg width="520" height="520" viewBox="0 0 100 100">
        <rect
          v-for="(r, i) in MARK_RECTS"
          :key="i"
          :x="r.x"
          :y="r.y"
          width="29.33"
          height="29.33"
          rx="3.5"
          :fill="r.fill"
        />
      </svg>
    </div>

    <!-- Top row: lockup + pixel strip -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 1,
      }"
    >
      <div :style="{ display: 'flex', alignItems: 'center', gap: '16px' }">
        <svg width="48" height="48" viewBox="0 0 100 100">
          <rect
            v-for="(r, i) in MARK_RECTS"
            :key="i"
            :x="r.x"
            :y="r.y"
            width="29.33"
            height="29.33"
            rx="3.5"
            :fill="r.fill"
          />
        </svg>
        <div :style="{ display: 'flex', flexDirection: 'column' }">
          <span
            :style="{
              fontFamily: 'Sora, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '28px',
              letterSpacing: '-0.025em',
              color: palette.ink,
              lineHeight: 1,
            }"
          >
            PXLC<span :style="{ color: coral }">.</span>
          </span>
          <span
            :style="{
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
              fontSize: '12px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: palette.meta,
              marginTop: '6px',
            }"
          >
            Guadeloupe · 971
          </span>
        </div>
      </div>

      <!-- Pixel strip: 14 cells, premium 3-colour teal cycle, coral accent at i=10 -->
      <div :style="{ display: 'flex', alignItems: 'center', gap: '6px' }">
        <div
          v-for="i in 14"
          :key="i"
          :style="{
            width: '10px',
            height: '10px',
            borderRadius: '2px',
            backgroundColor: i === 10 ? coral : teals[i % 3],
          }"
        />
      </div>
    </div>

    <!-- Spacer pushes content to bottom -->
    <div :style="{ flex: '1', display: 'flex' }" />

    <!-- Content -->
    <div :style="{ display: 'flex', flexDirection: 'column', maxWidth: '900px', zIndex: 1 }">
      <span
        :style="{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: palette.eyebrow,
          marginBottom: '20px',
        }"
      >
        {{ eyebrow }}
      </span>
      <span
        :style="{
          fontFamily: 'Sora, system-ui, sans-serif',
          fontSize: '60px',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: palette.ink,
          marginBottom: '20px',
        }"
      >
        {{ title }}<span :style="{ color: coral }">.</span>
      </span>
      <span
        v-if="description"
        :style="{
          fontFamily: 'DM Sans, system-ui, sans-serif',
          fontSize: '22px',
          fontWeight: 400,
          lineHeight: 1.45,
          color: palette.inkQuiet,
          maxWidth: '880px',
        }"
      >
        {{ description }}
      </span>
    </div>

    <!-- Footer: hairline + site -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginTop: '36px',
        paddingTop: '20px',
        borderTop: `1px solid ${palette.rule}`,
        zIndex: 1,
      }"
    >
      <div :style="{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: coral }" />
      <span
        :style="{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: palette.eyebrow,
        }"
      >
        {{ site }}
      </span>
      <span
        :style="{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: '14px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: palette.meta,
        }"
      >
        · médiation numérique · Guadeloupe
      </span>
    </div>
  </div>
</template>
