# Design Sync — PXLC Notes

## Repo shape

- Vue 3 Nuxt 4 SSG app, NOT a React component library.
- The design-sync converter is React-only, so we use **Vue custom elements** as the bridge:
  `lib/custom-elements.ts` wraps each Pxlc* Vue SFC in `defineCustomElement({ shadowRoot: false })`
  and auto-registers them (`pxlc-mark`, `pxlc-input`, etc.) as a side-effect on bundle load.
- The CE build entry is `dist-ce/pxlc-ds.js` (ESM, Vue runtime bundled in, ~168KB).
- CSS entry is `dist-ce/pxlc-ds.css` (combined tokens + styles, ~30KB).

## Preview authoring rule (CRITICAL)

The `_ds_bundle.js` exposes CustomElementConstructor classes (e.g. `window.PxlcDS.PxlcMark`),
NOT React components. Auto-generated floor-card previews that try to render
`<window.PxlcDS.PxlcMark />` in React will fail with "Element type is invalid".

All authored `.design-sync/previews/<Name>.tsx` MUST use the kebab-case tag names:

```tsx
// CORRECT — custom element tag after _ds_bundle.js has registered it
export const Default = () => <pxlc-mark size="36" />

// WRONG — CustomElementConstructor is not a React component
const { PxlcMark } = window.PxlcDS
export const Default = () => <PxlcMark size={36} />
```

## Fonts

Plus Jakarta Sans and Lora are served by @nuxt/fonts at runtime (Google Fonts). They are
NOT bundled as @font-face in the CSS. `runtimeFontPrefixes` suppresses [FONT_MISSING] for both.
In design previews, fallback fonts (system-ui, Georgia) are used — acceptable since the tokens
and layout are what matter for design fidelity.

## NuxtLink stubs

`PxlcLinkout` and `PxlcLockup` use `<NuxtLink>` in the Nuxt app. The lib-specific versions
at `lib/PxlcLinkout.vue` and `lib/PxlcLockup.vue` replace NuxtLink with `<a href="...">`.
These stubs are what gets bundled into `dist-ce/`.

## Re-sync risks

- If `app/assets/css/tokens.css` or `styles.css` change, run `npm run build:ce` before re-syncing.
- If any Pxlc* component's props change, update `dtsPropsFor` in config.json.
- Fonts won't appear in previews (runtime-only) — this is expected and recorded in runtimeFontPrefixes.
- Vue custom elements with `shadowRoot: false` inherit CSS from the page; if token resolution
  fails in a preview, check that `styles.css` @imports `_ds_bundle.css`.

## Known render warns

None — all 7 components rendered cleanly on the first validate pass (7/7, no bad/thin/variantsIdentical).
