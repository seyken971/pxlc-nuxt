<script setup lang="ts">
interface Cta { label: string, href: string, external?: boolean }
interface Pill { eyebrow: string, text: string }

interface Props {
  eyebrow?: string
  title: string
  lead?: string
  ctaPrimary?: Cta | null
  ctaSecondary?: Cta | null
  hint?: string | null
  photoSrc?: string
  photoAlt?: string
  pill?: Pill | null
  showBgMark?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  eyebrow: 'PXLC · Pointe-à-Pitre · Guadeloupe',
  ctaPrimary: () => ({ label: 'Je suis parent', href: '/ateliers' }),
  ctaSecondary: () => ({ label: 'Je représente une structure', href: '/pour-les-structures' }),
  hint: '↘ choisissez votre parcours',
  showBgMark: true,
  pill: null,
  lead: '',
  photoSrc: '',
  photoAlt: '',
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__strip"><PixelStrip :count="16" :accent-at="11" /></div>
    <div v-if="props.showBgMark" class="hero__bg-mark" aria-hidden="true">
      <PxlcMark :size="420" decorative />
    </div>
    <div class="container">
      <div class="hero__inner">
        <div>
          <span class="eyebrow">{{ props.eyebrow }}</span>
          <h1 id="hero-title" class="hero__title" v-html="props.title" />
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
              rel="noopener"
              class="btn btn--primary btn--lg"
            >{{ props.ctaPrimary.label }}</a>

            <NuxtLink
              v-if="props.ctaSecondary && !props.ctaSecondary.external"
              :to="props.ctaSecondary.href"
              class="btn btn--secondary btn--lg btn--no-arrow"
            >{{ props.ctaSecondary.label }}</NuxtLink>
            <a
              v-else-if="props.ctaSecondary"
              :href="props.ctaSecondary.href"
              target="_blank"
              rel="noopener"
              class="btn btn--secondary btn--lg btn--no-arrow"
            >{{ props.ctaSecondary.label }}</a>

            <span v-if="props.hint" class="hero__hint">{{ props.hint }}</span>
          </div>
        </div>

        <div v-if="props.photoSrc" class="hero__media">
          <div class="hero__media-img">
            <NuxtImg :src="props.photoSrc" :alt="props.photoAlt || ''" loading="lazy" />
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
