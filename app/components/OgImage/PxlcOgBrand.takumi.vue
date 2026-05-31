<script setup lang="ts">
import { BRAND_HEX } from '~/utils/brand-colors'

const coral = BRAND_HEX.coral

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
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: BRAND_HEX.bgLight,
    }"
  >
    <!-- Decorative mark: bottom-right, low-opacity, tilted -->
    <div
      :style="{
        position: 'absolute',
        right: '-80px',
        bottom: '-80px',
        display: 'flex',
        transform: 'rotate(-8deg)',
        opacity: 0.08,
      }"
    >
      <svg width="480" height="480" viewBox="0 0 100 100">
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

    <!-- Brand mark, 220px -->
    <svg width="220" height="220" viewBox="0 0 100 100">
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

    <!-- PXLC. -->
    <div
      :style="{
        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: '100px',
        letterSpacing: '-3px',
        color: BRAND_HEX.textInk,
        lineHeight: 1,
        display: 'flex',
        marginTop: '4px',
      }"
    >
      PXLC<span :style="{ color: coral }">.</span>
    </div>

    <!-- Tagline -->
    <div
      :style="{
        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
        fontSize: '19px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: BRAND_HEX.tealDeep,
      }"
    >
      Médiation numérique · Guadeloupe
    </div>
  </div>
</template>
