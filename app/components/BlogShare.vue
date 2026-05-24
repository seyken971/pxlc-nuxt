<script setup lang="ts">
interface Props {
  url: string
  title: string
}
const props = defineProps<Props>()

const shares = computed(() => {
  const u = encodeURIComponent(props.url)
  const t = encodeURIComponent(props.title)
  return [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: 'simple-icons:linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      key: 'twitter',
      label: 'X / Twitter',
      icon: 'simple-icons:x',
      href: `https://x.com/intent/tweet?url=${u}&text=${t}`,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      icon: 'simple-icons:whatsapp',
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
          rel="noopener noreferrer"
          class="blog-share__link"
          :aria-label="`Partager sur ${s.label} (nouvel onglet)`"
        >
          <Icon :name="s.icon" class="blog-share__icon" aria-hidden="true" />
          <span>{{ s.label }}</span>
        </a>
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
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; font-size: 13px; font-weight: 600;
  color: var(--ink);
  border: 1px solid var(--rule); border-radius: var(--radius-pill);
  background: transparent; transition: color var(--dur-fast), border-color var(--dur-fast), background var(--dur-fast), box-shadow var(--dur-fast);
}
.blog-share__link:focus-visible {
  outline: none;
  border-color: var(--pxlc-teal-deep);
  box-shadow: var(--ring-teal);
}
[data-theme="dark"] .blog-share__link:focus-visible {
  border-color: var(--pxlc-cyan);
  box-shadow: var(--ring-cyan);
}
.blog-share__icon { width: 15px; height: 15px; flex-shrink: 0; }
.blog-share__link:hover {
  color: var(--pxlc-coral); border-color: var(--pxlc-coral);
  background: var(--bg-soft); text-decoration: none;
}
[data-theme="dark"] .blog-share__link:hover { background: var(--pxlc-bg-dark-soft); }
</style>
