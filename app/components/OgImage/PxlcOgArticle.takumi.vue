<script setup lang="ts">
import { BRAND_HEX } from '~/utils/brand-colors'
import { MARK_RECTS, OG_F_SANS } from '~/utils/og-mark'

// Carte OG spécifique aux articles de blog : reprend l'univers de PxlcOg
// (fond clair, filigrane marque, lockup « PXLC. ») mais met en avant le
// TITRE de l'article et sa catégorie. Chaque article obtient ainsi une
// vignette sociale distincte (meilleur CTR Discover / partages) au lieu de
// la carte de marque générique.
//
// Contrairement à PxlcOg, ce composant LIT des props passées par
// defineOgImage('PxlcOgArticle', { title, category }). inheritAttrs reste
// désactivé pour éviter que d'éventuels attributs ne retombent sur le <div>.
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    title?: string
    category?: string
  }>(),
  {
    title: 'Médiation numérique en Guadeloupe',
    category: 'Blog',
  },
)

const F_SANS = OG_F_SANS

const palette = {
  bg: BRAND_HEX.bgLight,
  ink: BRAND_HEX.textInk,
  accent: BRAND_HEX.tealDeep,
  muted: BRAND_HEX.textOnLight,
} as const
const coral = BRAND_HEX.coral

// Taille de police du titre adaptée à sa longueur — Takumi rend l'image au
// build (pas de mesure runtime), donc on choisit un palier par nombre de
// caractères pour éviter la troncature/débordement dans la zone de 1056px.
const titleLen = props.title.length
const titleFontSize
  = titleLen <= 38 ? '68px'
    : titleLen <= 66 ? '56px'
      : titleLen <= 96 ? '46px'
        : '40px'
</script>

<template>
  <div
    :style="{
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
    }"
  >
    <!-- Filigrane décoratif : marque pixel en bas à droite, faible opacité,
         inclinée -8° (identique à PxlcOg). -->
    <div
      :style="{
        position: 'absolute',
        right: '-90px',
        bottom: '-90px',
        display: 'flex',
        transform: 'rotate(-8deg)',
        opacity: 0.1,
      }"
    >
      <svg width="460" height="460" viewBox="0 0 100 100">
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

    <!-- En-tête : petite marque + lockup PXLC. -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
      }"
    >
      <svg width="60" height="60" viewBox="0 0 100 100">
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
          fontSize: '34px',
          letterSpacing: '-0.03em',
          color: palette.ink,
          lineHeight: 1,
          marginLeft: '16px',
        }"
      >
        PXLC<span :style="{ color: coral }">.</span>
      </span>
    </div>

    <!-- Bloc central : catégorie + titre de l'article -->
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        maxWidth: '1000px',
      }"
    >
      <span
        :style="{
          fontFamily: F_SANS,
          fontSize: '24px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: palette.accent,
          marginBottom: '24px',
        }"
      >
        {{ category }}
      </span>
      <div
        :style="{
          display: 'flex',
          fontFamily: F_SANS,
          fontWeight: 700,
          fontSize: titleFontSize,
          letterSpacing: '-0.02em',
          color: palette.ink,
          lineHeight: 1.12,
        }"
      >
        {{ title }}
      </div>
    </div>

    <!-- Pied : tagline -->
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
      }"
    >
      <span
        :style="{
          fontFamily: F_SANS,
          fontSize: '22px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: palette.muted,
        }"
      >
        Médiation numérique · Guadeloupe
      </span>
    </div>
  </div>
</template>
