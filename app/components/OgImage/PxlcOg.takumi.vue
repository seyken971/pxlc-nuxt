<script setup lang="ts">
interface Props {
  colorMode?: 'light' | 'dark'
  eyebrow?: string
  title?: string
  description?: string
  site?: string
}
const props = withDefaults(defineProps<Props>(), {
  colorMode: 'dark',
  eyebrow: 'PXLC · MÉDIATION NUMÉRIQUE · GUADELOUPE',
  title: 'Les écrans sont le reflet de la relation parent-enfant',
  description: 'Andy Zébus accompagne les familles, SESSAD et structures sociales de Guadeloupe — ateliers Parent-Écran-Enfant fondés sur les repères HAS et HCSP.',
  site: 'pxlc.fr',
})

// Brand tokens — keep in sync with app/assets/css/tokens.css.
const palette = computed(() => {
  if (props.colorMode === 'light') {
    return {
      bg: '#EAF6F4',
      bgMark: 'rgba(8, 43, 54, 0.08)',
      ink: '#082B36',
      inkQuiet: '#2C4751',
      eyebrow: '#036E73',
      meta: '#5A6B70',
      rule: '#C4D1D2',
    }
  }
  return {
    bg: '#082B36',
    bgMark: 'rgba(255, 255, 255, 0.06)',
    ink: '#F4F1EA',
    inkQuiet: '#A9C8D0',
    eyebrow: '#00D2C8',
    meta: '#A9C8D0',
    rule: '#1F4A59',
  }
})

const teals = ['#036E73', '#01A09D', '#00D2C8']
const coral = '#FF5E3A'
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
    <!-- Decorative PxlcMark (bottom-right, low-opacity, tilted -8deg) -->
    <div
      :style="{
        position: 'absolute',
        right: '-80px',
        bottom: '-80px',
        display: 'flex',
        transform: 'rotate(-8deg)',
        opacity: colorMode === 'light' ? 0.1 : 0.18,
      }"
    >
      <svg width="520" height="520" viewBox="0 0 100 100">
        <rect x="2"     y="2"     width="29.33" height="29.33" rx="3.5" fill="#036E73" />
        <rect x="35.33" y="2"     width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
        <rect x="68.67" y="2"     width="29.33" height="29.33" rx="3.5" fill="#00D2C8" />
        <rect x="2"     y="35.33" width="29.33" height="29.33" rx="3.5" fill="#036E73" />
        <rect x="35.33" y="35.33" width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
        <rect x="68.67" y="35.33" width="29.33" height="29.33" rx="3.5" fill="#00D2C8" />
        <rect x="2"     y="68.67" width="29.33" height="29.33" rx="3.5" fill="#036E73" />
        <rect x="35.33" y="68.67" width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
        <rect x="68.67" y="68.67" width="29.33" height="29.33" rx="3.5" fill="#FF5E3A" />
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
          <rect x="2"     y="2"     width="29.33" height="29.33" rx="3.5" fill="#036E73" />
          <rect x="35.33" y="2"     width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
          <rect x="68.67" y="2"     width="29.33" height="29.33" rx="3.5" fill="#00D2C8" />
          <rect x="2"     y="35.33" width="29.33" height="29.33" rx="3.5" fill="#036E73" />
          <rect x="35.33" y="35.33" width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
          <rect x="68.67" y="35.33" width="29.33" height="29.33" rx="3.5" fill="#00D2C8" />
          <rect x="2"     y="68.67" width="29.33" height="29.33" rx="3.5" fill="#036E73" />
          <rect x="35.33" y="68.67" width="29.33" height="29.33" rx="3.5" fill="#01A09D" />
          <rect x="68.67" y="68.67" width="29.33" height="29.33" rx="3.5" fill="#FF5E3A" />
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
            Pixels Caraïbes
          </span>
        </div>
      </div>

      <!-- Pixel strip: 14 teal cells + 1 coral accent -->
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
