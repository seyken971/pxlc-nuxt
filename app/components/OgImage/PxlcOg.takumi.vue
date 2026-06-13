<script setup lang="ts">
import { BRAND_HEX } from '~/utils/brand-colors'
import { MARK_RECTS, OG_F_SANS } from '~/utils/og-mark'

interface Props {
  eyebrow?: string
  title?: string
  description?: string
  site?: string
}
const props = withDefaults(defineProps<Props>(), {
  eyebrow: 'ATELIERS PARENT-ENFANT · GUADELOUPE',
  title: 'PXLC accompagne les familles dans l\'éducation numérique des enfants',
  description: 'Andy Zébus aide les structures de Guadeloupe — SESSAD, IME, associations et collectivités — à accompagner les familles.',
  site: 'pxlc.fr',
})

const F_SANS = OG_F_SANS
const F_SERIF = 'Lora, Georgia, serif'

// Garde-fous longueur : le cadre 1200×600 n'a ni overflow visible ni reflow —
// on tronque au mot et on réduit le corps du titre par paliers plutôt que de
// mesurer les glyphes (rendu au build, vérifié visuellement).
const truncateAtWord = (text: string, max: number): string => {
  if (text.length <= max) return text
  const cut = text.lastIndexOf(' ', max)
  return `${text.slice(0, cut > 0 ? cut : max)}…`
}

const displayTitle = computed(() => truncateAtWord(props.title, 110))
const displayDescription = computed(() => truncateAtWord(props.description, 180))
const titleSize = computed(() => {
  const len = displayTitle.value.length
  if (len <= 45) return '60px'
  if (len <= 75) return '52px'
  return '44px'
})

// Single light surface — ivory ground reads distinctively on dark social UIs.
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
      fontFamily: F_SERIF,
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
        <span
          :style="{
            fontFamily: F_SANS,
            fontWeight: 600,
            fontSize: '28px',
            letterSpacing: '-0.025em',
            color: palette.ink,
            lineHeight: 1,
          }"
        >
          PXLC<span :style="{ color: coral }">.</span>
        </span>
      </div>

      <!-- Pixel strip: 14 cells, premium 3-colour teal cycle, coral accent at i=12 -->
      <div :style="{ display: 'flex', alignItems: 'center', gap: '6px' }">
        <div
          v-for="i in 14"
          :key="i"
          :style="{
            width: '10px',
            height: '10px',
            borderRadius: '2px',
            backgroundColor: i === 12 ? coral : teals[i % 3],
          }"
        />
      </div>
    </div>

    <!-- Spacer pushes content to bottom -->
    <div :style="{ flex: '1', display: 'flex' }" />

    <!-- Content. maxWidth keeps the text block from spanning the full
         1200px frame. -->
    <div :style="{ display: 'flex', flexDirection: 'column', maxWidth: '900px', zIndex: 1 }">
      <span
        :style="{
          fontFamily: F_SANS,
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
          fontFamily: F_SANS,
          fontSize: titleSize,
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: palette.ink,
          marginBottom: '20px',
        }"
      >
        {{ displayTitle }}<span :style="{ color: coral }">.</span>
      </span>
      <span
        v-if="description"
        :style="{
          fontFamily: F_SERIF,
          fontSize: '22px',
          fontWeight: 400,
          lineHeight: 1.45,
          color: palette.inkQuiet,
        }"
      >
        {{ displayDescription }}
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
          fontFamily: F_SANS,
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
          fontFamily: F_SANS,
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
