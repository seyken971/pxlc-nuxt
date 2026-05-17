<script setup lang="ts">
interface Props {
  size?: number
  decorative?: boolean
}
const props = withDefaults(defineProps<Props>(), { size: 36, decorative: false })

/**
 * 3×3 brand mark: three teal columns left → mid → cyan, with a coral
 * "period" in the bottom-right cell mirroring the wordmark "PXLC.".
 *
 * Tiles are 29.33 sq, spaced on 2 / 35.33 / 68.67 with rx 3.5 for the
 * corner radius — these values are inherited from the original
 * pxlc-design-system spec and stay literal so the SVG renders pixel-
 * identical to the brand source.
 *
 * NB: this mark is also inlined as raw <rect>s with hex fills in
 * app/components/OgImage/PxlcOg.takumi.vue because the OG image renderer
 * runs at build time outside any CSS context and can't resolve
 * var(--pxlc-*) custom properties. Keep the two copies in sync when the
 * mark evolves.
 */
const POS = [2, 35.33, 68.67] as const
const TEAL  = 'var(--pxlc-teal-deep)'
const MID   = 'var(--pxlc-teal-mid)'
const CYAN  = 'var(--pxlc-cyan)'
const CORAL = 'var(--pxlc-coral)'
const rects = [
  { x: POS[0], y: POS[0], fill: TEAL  },
  { x: POS[1], y: POS[0], fill: MID   },
  { x: POS[2], y: POS[0], fill: CYAN  },
  { x: POS[0], y: POS[1], fill: TEAL  },
  { x: POS[1], y: POS[1], fill: MID   },
  { x: POS[2], y: POS[1], fill: CYAN  },
  { x: POS[0], y: POS[2], fill: TEAL  },
  { x: POS[1], y: POS[2], fill: MID   },
  { x: POS[2], y: POS[2], fill: CORAL },
]
</script>

<template>
  <svg
    class="mark-svg lockup__mark"
    viewBox="0 0 100 100"
    :width="props.size"
    :height="props.size"
    :role="props.decorative ? undefined : 'img'"
    :aria-label="props.decorative ? undefined : 'Logo PXLC'"
    :aria-hidden="props.decorative ? 'true' : undefined"
  >
    <rect
      v-for="(r, i) in rects"
      :key="i"
      :x="r.x"
      :y="r.y"
      width="29.33"
      height="29.33"
      rx="3.5"
      :fill="r.fill"
    />
  </svg>
</template>
