// @ts-check
// ESLint v9 flat config. Imports the auto-generated Nuxt config produced
// by `@nuxt/eslint` (rules tuned for the actual project: Vue 3, Nuxt
// auto-imports, TypeScript, our composables surface). We override a
// handful of rules below — keep additions documented.
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Files to ignore — generated output, build artefacts, deps.
  {
    ignores: [
      '.output/**',
      '.nuxt/**',
      'node_modules/**',
      'dist/**',
      '_plaquette/**',
      'public/**',
      '.remember/**',
    ],
  },
  {
    rules: {
      // The codebase relies heavily on Nuxt auto-imports (useRoute,
      // useState, etc.) so disable the "must explicitly import" rule.
      // Nuxt's eslint preset already loosens this but leave it in scope.
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Vue 3 supports Fragment template roots; the rule below is a
      // Vue 2 holdover that flags valid layouts.
      'vue/no-multiple-template-root': 'off',

      // Hero, Lockup, Breadcrumb, ThemeToggle are intentional single-
      // word names that match their brand role. We don't ship to a host
      // that defines colliding native elements, so the lint warning is
      // noise.
      'vue/multi-word-component-names': 'off',

      // We document optional props via TypeScript (`prop?: T`) — the
      // runtime default is handled by withDefaults. Forcing a default
      // entry for every optional prop is duplication.
      'vue/require-default-prop': 'off',

      // <template> formatting: don't fight the existing handwritten
      // style. Self-closing, attribute wrapping and inline content
      // newlines are kept as authored.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-quotes': 'off',

      // The OG image template intentionally uses :style inline for
      // takumi (no class context). Don't flag it.
      'vue/no-static-inline-styles': 'off',

      // Empty catch blocks are intentional silent-fail in two places
      // in useTheme (localStorage may throw in Safari private mode).
      // Keep them flagged elsewhere.
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    // Per-file override: the Hero component renders a sanitised brand
    // title via v-html so it can include the coral-dot accent span.
    // Content is hard-coded in pages, never user-supplied.
    files: ['app/components/Hero.vue'],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
)
