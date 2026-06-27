<script setup lang="ts">
import { BRAND_HEX } from '~/utils/brand-colors'
import { MARK_RECTS, OG_F_SANS } from '~/utils/og-mark'

// Carte de marque : marque pixel maximisée + lockup « PXLC. » + tagline,
// le tout en clair et centré. Pas de titre ni de description par page —
// chaque partage affiche la même carte, lisible jusqu'à la taille d'une
// vignette sur smartphone.
// Aucune prop : le rendu est entièrement statique. inheritAttrs: false évite
// que les options passées par defineOgImage (eyebrow/title/description) ne
// retombent en attributs sur le <div> racine.
defineOptions({ inheritAttrs: false })

const F_SANS = OG_F_SANS

const palette = {
  bg: BRAND_HEX.bgLight,
  ink: BRAND_HEX.textInk,
  accent: BRAND_HEX.tealDeep,
} as const
const coral = BRAND_HEX.coral
</script>

<template>
  <div
    :style="{
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
    }"
  >
    <!-- Filigrane décoratif : marque pixel en bas à droite, faible opacité,
         inclinée -8°. Réutilise MARK_RECTS ; seul le wrapper svg diffère. -->
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

    <!-- Groupe logo centré -->
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
      }"
    >
      <svg width="172" height="172" viewBox="0 0 100 100">
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
          fontWeight: 700,
          fontSize: '88px',
          letterSpacing: '-0.03em',
          color: palette.ink,
          lineHeight: 1,
          marginTop: '24px',
        }"
      >
        PXLC<span :style="{ color: coral }">.</span>
      </span>
      <span
        :style="{
          fontFamily: F_SANS,
          fontSize: '26px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: palette.accent,
          marginTop: '28px',
        }"
      >
        Médiation numérique | Guadeloupe
      </span>
    </div>
  </div>
</template>
