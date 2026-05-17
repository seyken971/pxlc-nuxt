<script setup lang="ts">
interface Props {
  /** Absolute URL of the article being shared. */
  url: string
  /** Article title — prefilled in tweet/post body. */
  title: string
}
const props = defineProps<Props>()

// Build all share URLs once. encodeURIComponent everywhere so accents and
// "« »" survive the round-trip. Twitter via the X intent endpoint (works
// for both x.com and twitter.com clients).
const shares = computed(() => {
  const u = encodeURIComponent(props.url)
  const t = encodeURIComponent(props.title)
  return [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      key: 'twitter',
      label: 'X / Twitter',
      href: `https://x.com/intent/tweet?url=${u}&text=${t}`,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${t}%20${u}`,
    },
  ]
})
</script>

<template>
  <div class="blog-share" role="group" aria-label="Partager cet article">
    <span class="blog-share__label">Partager</span>
    <ul class="blog-share__list" role="list">
      <li v-for="s in shares" :key="s.key">
        <a
          :href="s.href"
          target="_blank"
          rel="noopener"
          class="blog-share__link"
          :aria-label="`Partager sur ${s.label} (nouvel onglet)`"
        >{{ s.label }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-share { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.blog-share__label {
  font-family: var(--font-mono); font-size: 11px; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase; color: var(--quiet);
}
.blog-share__list { display: flex; flex-wrap: wrap; gap: var(--space-2); list-style: none; padding: 0; margin: 0; }
.blog-share__link {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 8px 14px; font-size: 13px; font-weight: 600;
  color: var(--ink);
  border: 1px solid var(--rule); border-radius: var(--radius-pill);
  background: transparent; transition: color var(--dur-fast), border-color var(--dur-fast), background var(--dur-fast);
}
.blog-share__link:hover {
  color: var(--pxlc-coral); border-color: var(--pxlc-coral);
  background: var(--bg-soft); text-decoration: none;
}
[data-theme="dark"] .blog-share__link:hover { background: var(--pxlc-bg-dark-soft); }
</style>
