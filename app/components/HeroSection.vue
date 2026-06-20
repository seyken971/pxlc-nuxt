<script setup lang="ts">
interface Cta { label: string, href: string, external?: boolean }
interface Pill { eyebrow: string, text: string }

interface Props {
  eyebrow?: string
  title: string
  /** Ajoute un point final stylé (coral-dot) après le titre. */
  titleDot?: boolean
  lead?: string
  ctaPrimary?: Cta | null
  ctaSecondary?: Cta | null
  hint?: string | null
  photoSrc?: string
  photoAlt?: string
  /** Natural width of the photo, in px. Required when photoSrc is set so
   *  the browser reserves layout space and avoids CLS. */
  photoWidth?: number
  /** Natural height of the photo, in px. Same rationale as photoWidth. */
  photoHeight?: number
  pill?: Pill | null
  showBgMark?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  eyebrow: 'PXLC · Guadeloupe · 971',
  lead: '',
  ctaPrimary: null,
  titleDot: false,
  ctaSecondary: null,
  hint: null,
  photoSrc: '',
  photoAlt: '',
  photoWidth: undefined,
  photoHeight: undefined,
  pill: null,
  showBgMark: true,
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__strip"><PxlcPixelStrip :count="8" :accent-at="5" /></div>
    <div v-if="props.showBgMark" class="hero__bg-mark" aria-hidden="true">
      <PxlcMark :size="420" decorative />
    </div>
    <div class="container">
      <div class="hero__inner">
        <div>
          <span class="eyebrow">{{ props.eyebrow }}</span>
          <h1
            id="hero-title"
            class="hero__title"
            :class="{ 'hero__title--dot': props.titleDot }"
          >{{ props.title }}</h1>
          <p v-if="props.lead" class="hero__lead">{{ props.lead }}</p>
          <div class="hero__actions">
            <NuxtLink
              v-if="props.ctaPrimary && !props.ctaPrimary.external"
              :to="props.ctaPrimary.href"
              class="btn btn--primary btn--lg"
            >{{ props.ctaPrimary.label }}</NuxtLink>
            <a
              v-else-if="props.ctaPrimary"
              :href="props.ctaPrimary.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--primary btn--lg"
              :aria-label="`${props.ctaPrimary.label} (nouvel onglet)`"
            >{{ props.ctaPrimary.label }}</a>

            <NuxtLink
              v-if="props.ctaSecondary && !props.ctaSecondary.external"
              :to="props.ctaSecondary.href"
              class="btn btn--ghost btn--lg btn--no-arrow"
            >{{ props.ctaSecondary.label }}</NuxtLink>
            <a
              v-else-if="props.ctaSecondary"
              :href="props.ctaSecondary.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--ghost btn--lg btn--no-arrow"
              :aria-label="`${props.ctaSecondary.label} (nouvel onglet)`"
            >{{ props.ctaSecondary.label }}</a>

            <span v-if="props.hint" class="hero__hint">{{ props.hint }}</span>
          </div>
        </div>

        <div v-if="props.photoSrc" class="hero__media">
          <div class="hero__media-img">
            <NuxtImg
              :src="props.photoSrc"
              :alt="props.photoAlt || ''"
              :width="props.photoWidth"
              :height="props.photoHeight"
              format="webp"
              loading="eager"
              sizes="100vw md:740px"
              :preload="{ fetchPriority: 'high' }"
            />
          </div>
          <div v-if="props.pill" class="hero__pill">
            <div class="hero__pill-eyebrow">{{ props.pill.eyebrow }}</div>
            <div class="hero__pill-text">{{ props.pill.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Let the browser balance line breaks responsively instead of relying on
   hard <br/>s in the title prop. balance is the right call for short
   marketing headings; pretty would be for paragraphs. */
.hero__title { text-wrap: balance; }
/* Coral-dot period rendered via CSS — immune to source-whitespace sensitivity. */
.hero__title--dot::after { content: '.'; color: var(--pxlc-coral); }
</style>
