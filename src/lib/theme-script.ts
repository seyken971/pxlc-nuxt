/**
 * Script anti-flash du thème — posé avant le premier paint pour que le rendu
 * initial respecte la préférence stockée / système.
 *
 * Source unique : rendu tel quel par BaseLayout et par la 404 (autonome), et
 * haché en SHA-256 dans astro.config.mjs pour la directive `script-src`.
 * Astro ne traite pas les scripts `is:inline`, il ne peut donc pas les hacher
 * lui-même — toute modification de cette chaîne met le hash à jour côté config
 * automatiquement, mais NE PAS la dupliquer ailleurs.
 */
export const THEME_SCRIPT
  = '(function(){try{const s=localStorage.getItem(\'pxlc-theme\');const t=s||(window.matchMedia(\'(prefers-color-scheme: dark)\').matches?\'dark\':\'light\');document.documentElement.setAttribute(\'data-theme\',t);}catch{}})();'
