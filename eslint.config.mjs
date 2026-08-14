// @ts-check
// ESLint v9 flat config — autonome depuis la migration Astro (l'ancienne
// config était générée par @nuxt/eslint). Trois surfaces : .astro (pages et
// composants), .vue (primitives du design system + lib custom-elements),
// .ts/.mjs (config, scripts Node). Les overrides pragmatiques de l'ancienne
// config sont conservés et documentés.
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginAstro from 'eslint-plugin-astro'

export default tseslint.config(
  // Files to ignore — generated output, build artefacts, deps.
  {
    ignores: [
      '.output/**',
      '.nuxt/**',
      '.astro/**',
      'node_modules/**',
      'dist/**',
      'dist-lib/**',
      'dist-ce/**',
      '_plaquette/**',
      'public/**',
      '.remember/**',
      '.agents/**',
      'docs/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...eslintPluginAstro.configs.recommended,
  {
    // Les scripts Node et les <script> de pages coexistent — on expose les
    // deux jeux de globals plutôt que de maintenir des scopes par dossier.
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Vue 3 supports Fragment template roots; the rule below is a
      // Vue 2 holdover that flags valid layouts.
      'vue/no-multiple-template-root': 'off',

      // Les primitives (PxlcMark, PxlcInput…) portent déjà deux mots — la
      // règle reste utile mais ne doit pas casser sur les exceptions
      // documentées du DS.
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

      // Empty catch blocks are intentional silent-fail (localStorage may
      // throw in Safari private mode). Keep them flagged elsewhere.
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
)
