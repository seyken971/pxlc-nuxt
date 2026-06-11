---
name: PXLC Design System
colors:
  palette:
    pxlc-teal-deep: "#036E73"
    pxlc-teal-mid: "#01A09D"
    pxlc-cyan: "#00D2C8"
    pxlc-coral: "#FF5E3A"
    pxlc-coral-deep: "#E8492A"
    pxlc-bg-light: "#EAF6F4"
    pxlc-bg-dark: "#082B36"
    pxlc-bg-dark-soft: "#0C3340"
    pxlc-bg-dark-deep: "#06212A"
    pxlc-ivory: "#F4F1EA"
    pxlc-ivory-soft: "#EBE6DA"
    pxlc-text-ink: "#082B36"
    pxlc-text-on-light: "#2C4751"
    pxlc-text-secondary: "#5A6B70"
    pxlc-text-on-dark-soft: "#A9C8D0"
    pxlc-text-quiet-dark: "#8A9DA3"
    pxlc-border: "#C4D1D2"
    pxlc-border-soft: "#D9D2BF"
    pxlc-border-dark: "#103847"
    pxlc-border-dark-2: "#1F4A59"
    pxlc-white: "#FFFFFF"
    pxlc-pattern-warm: "#D6CEBD"
    pxlc-pattern-warm-deep: "#CDC4B0"
  semantic:
    bg:
      light: "var(--pxlc-bg-light)"
      dark: "var(--pxlc-bg-dark)"
    bg-soft:
      light: "var(--pxlc-ivory)"
      dark: "var(--pxlc-bg-dark-deep)"
    bg-elev:
      light: "var(--pxlc-white)"
      dark: "var(--pxlc-bg-dark-soft)"
    bg-rule:
      light: "var(--pxlc-border-soft)"
      dark: "var(--pxlc-border-dark)"
    bg-glass:
      light: "rgba(234, 246, 244, 0.92)"
      dark: "rgba(8, 43, 54, 0.92)"
    dot-grid:
      light: "rgba(8, 43, 54, 0.09)"
      dark: "rgba(255, 255, 255, 0.06)"
    halo-cyan:
      light: "rgba(0, 210, 200, 0.14)"
      dark: "rgba(0, 210, 200, 0.08)"
    badge-soft-bg:
      light: "rgba(0, 210, 200, 0.12)"
      dark: "rgba(0, 210, 200, 0.18)"
    hover-on-dark: "rgba(255, 255, 255, 0.06)"
    ink:
      light: "var(--pxlc-text-ink)"
      dark: "var(--pxlc-ivory)"
    ink-quiet:
      light: "var(--pxlc-text-on-light)"
      dark: "var(--pxlc-text-on-dark-soft)"
    quiet:
      light: "var(--pxlc-text-secondary)"
      dark: "var(--pxlc-text-quiet-dark)"
    rule:
      light: "var(--pxlc-border)"
      dark: "var(--pxlc-border-dark-2)"
    rule-accent: "rgba(1, 160, 157, 0.25)"
    teal-deep: "var(--pxlc-teal-deep)"
    teal-mid: "var(--pxlc-teal-mid)"
    cyan: "var(--pxlc-cyan)"
    eyebrow:
      light: "var(--pxlc-teal-deep)"
      dark: "var(--pxlc-cyan)"
    shadow-card-hover:
      light: "0 8px 24px -12px rgba(8,43,54,.18)"
      dark: "0 8px 24px -12px rgba(0,0,0,.45)"
    shadow-header:
      light: "0 2px 14px -6px rgba(8,43,54,.14)"
      dark: "0 2px 14px -6px rgba(0,0,0,.45)"
    shadow-btn-rest: "0 1px 0 rgba(8,43,54,.06)"
    shadow-btn-coral: "0 8px 24px -12px rgba(255,94,58,.6)"
    shadow-btn-teal: "0 8px 24px -12px rgba(3,110,115,.5)"
    shadow-btn-cyan: "0 8px 24px -12px rgba(0,210,200,.4)"
    ring-cyan: "0 0 0 3px rgba(0,210,200,.25)"
    ring-teal: "0 0 0 3px rgba(3,110,115,.3)"
    ring-teal-soft: "0 0 0 3px rgba(3,110,115,.2)"
    ring-coral: "0 0 0 3px rgba(255,94,58,.3)"
typography:
  font-display: "\"Plus Jakarta Sans\", \"Plus Jakarta Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", sans-serif"
  font-body: "\"Lora\", \"Lora Fallback\", Georgia, \"Times New Roman\", serif"
  font-label: "\"Plus Jakarta Sans\", \"Plus Jakarta Sans Fallback\", system-ui, sans-serif"
  font-code: "ui-monospace, \"SFMono-Regular\", Menlo, \"Courier New\", monospace"
spacing:
  base: "8px"
  space-1: "4px"
  space-1-5: "6px"
  space-2: "8px"
  space-2-5: "12px"
  space-3: "16px"
  space-4: "24px"
  space-5: "32px"
  space-6: "48px"
  space-7: "64px"
  space-8: "80px"
  space-9: "96px"
radius:
  radius-xs: "4px"
  radius-sm: "6px"
  radius-md: "8px"
  radius-lg: "14px"
  radius-pill: "999px"
motion:
  ease-step: "cubic-bezier(.6, 0, .2, 1)"
  dur-fast: "120ms"
  dur-base: "200ms"
  dur-slow: "320ms"
layout:
  container-max: "1200px"
  container-pad: "clamp(20px, 4vw, 56px)"
  z-header: "50"
  z-menu: "100"
  z-progress: "200"
  z-skip: "1000"
---

# PXLC — Design System

> Généré automatiquement par `scripts/export-design.mjs`.
> Source : `app/assets/css/tokens.css` + `styles.css`.
> Relancer `npm run design` après toute modification des sources CSS.

## Palette

| Token | Hex / valeur |
| --- | --- |
| `--pxlc-teal-deep` | `#036E73` |
| `--pxlc-teal-mid` | `#01A09D` |
| `--pxlc-cyan` | `#00D2C8` |
| `--pxlc-coral` | `#FF5E3A` |
| `--pxlc-coral-deep` | `#E8492A` |
| `--pxlc-bg-light` | `#EAF6F4` |
| `--pxlc-bg-dark` | `#082B36` |
| `--pxlc-bg-dark-soft` | `#0C3340` |
| `--pxlc-bg-dark-deep` | `#06212A` |
| `--pxlc-ivory` | `#F4F1EA` |
| `--pxlc-ivory-soft` | `#EBE6DA` |
| `--pxlc-text-ink` | `#082B36` |
| `--pxlc-text-on-light` | `#2C4751` |
| `--pxlc-text-secondary` | `#5A6B70` |
| `--pxlc-text-on-dark-soft` | `#A9C8D0` |
| `--pxlc-text-quiet-dark` | `#8A9DA3` |
| `--pxlc-border` | `#C4D1D2` |
| `--pxlc-border-soft` | `#D9D2BF` |
| `--pxlc-border-dark` | `#103847` |
| `--pxlc-border-dark-2` | `#1F4A59` |
| `--pxlc-white` | `#FFFFFF` |
| `--pxlc-pattern-warm` | `#D6CEBD` |
| `--pxlc-pattern-warm-deep` | `#CDC4B0` |

## Tokens sémantiques

Ces tokens résolvent vers la palette et basculent automatiquement en dark mode.

### Surfaces

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `var(--pxlc-bg-light)` | `var(--pxlc-bg-dark)` |
| `--bg-soft` | `var(--pxlc-ivory)` | `var(--pxlc-bg-dark-deep)` |
| `--bg-elev` | `var(--pxlc-white)` | `var(--pxlc-bg-dark-soft)` |
| `--bg-rule` | `var(--pxlc-border-soft)` | `var(--pxlc-border-dark)` |
| `--bg-glass` | `rgba(234, 246, 244, 0.92)` | `rgba(8, 43, 54, 0.92)` |
| `--dot-grid` | `rgba(8, 43, 54, 0.09)` | `rgba(255, 255, 255, 0.06)` |
| `--halo-cyan` | `rgba(0, 210, 200, 0.14)` | `rgba(0, 210, 200, 0.08)` |
| `--badge-soft-bg` | `rgba(0, 210, 200, 0.12)` | `rgba(0, 210, 200, 0.18)` |
| `--hover-on-dark` | `rgba(255, 255, 255, 0.06)` | — |

### Texte

| Token | Light | Dark |
| --- | --- | --- |
| `--ink` | `var(--pxlc-text-ink)` | `var(--pxlc-ivory)` |
| `--ink-quiet` | `var(--pxlc-text-on-light)` | `var(--pxlc-text-on-dark-soft)` |
| `--quiet` | `var(--pxlc-text-secondary)` | `var(--pxlc-text-quiet-dark)` |

### Bordures

| Token | Light | Dark |
| --- | --- | --- |
| `--rule` | `var(--pxlc-border)` | `var(--pxlc-border-dark-2)` |
| `--rule-accent` | `rgba(1, 160, 157, 0.25)` | — |

### Couleurs accent

| Token | Light | Dark |
| --- | --- | --- |
| `--teal-deep` | `var(--pxlc-teal-deep)` | — |
| `--teal-mid` | `var(--pxlc-teal-mid)` | — |
| `--cyan` | `var(--pxlc-cyan)` | — |
| `--eyebrow` | `var(--pxlc-teal-deep)` | `var(--pxlc-cyan)` |

### Ombres & rings

| Token | Light | Dark |
| --- | --- | --- |
| `--shadow-card-hover` | `0 8px 24px -12px rgba(8,43,54,.18)` | `0 8px 24px -12px rgba(0,0,0,.45)` |
| `--shadow-header` | `0 2px 14px -6px rgba(8,43,54,.14)` | `0 2px 14px -6px rgba(0,0,0,.45)` |
| `--shadow-btn-rest` | `0 1px 0 rgba(8,43,54,.06)` | — |
| `--shadow-btn-coral` | `0 8px 24px -12px rgba(255,94,58,.6)` | — |
| `--shadow-btn-teal` | `0 8px 24px -12px rgba(3,110,115,.5)` | — |
| `--shadow-btn-cyan` | `0 8px 24px -12px rgba(0,210,200,.4)` | — |
| `--ring-cyan` | `0 0 0 3px rgba(0,210,200,.25)` | — |
| `--ring-teal` | `0 0 0 3px rgba(3,110,115,.3)` | — |
| `--ring-teal-soft` | `0 0 0 3px rgba(3,110,115,.2)` | — |
| `--ring-coral` | `0 0 0 3px rgba(255,94,58,.3)` | — |

## Typographie

| Token | Stack |
| --- | --- |
| `--font-display` | `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-body` | `"Lora", "Lora Fallback", Georgia, "Times New Roman", serif` |
| `--font-label` | `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif` |
| `--font-code` | `ui-monospace, "SFMono-Regular", Menlo, "Courier New", monospace` |

> Les tailles de titre utilisent `clamp()` défini localement dans chaque composant — pas de token `--fs-h1` global.

## Espacement

Rythme 8 px.

| Token | Valeur |
| --- | --- |
| `--space-1` | `4px` |
| `--space-1-5` | `6px` |
| `--space-2` | `8px` |
| `--space-2-5` | `12px` |
| `--space-3` | `16px` |
| `--space-4` | `24px` |
| `--space-5` | `32px` |
| `--space-6` | `48px` |
| `--space-7` | `64px` |
| `--space-8` | `80px` |
| `--space-9` | `96px` |

## Radius

| Token | Valeur |
| --- | --- |
| `--radius-xs` | `4px` |
| `--radius-sm` | `6px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `14px` |
| `--radius-pill` | `999px` |

## Motion

| Token | Valeur |
| --- | --- |
| `--ease-step` | `cubic-bezier(.6, 0, .2, 1)` |
| `--dur-fast` | `120ms` |
| `--dur-base` | `200ms` |
| `--dur-slow` | `320ms` |

## Layout

| Token | Valeur |
| --- | --- |
| `--container-max` | `1200px` |
| `--container-pad` | `clamp(20px, 4vw, 56px)` |
| `--z-header` | `50` |
| `--z-menu` | `100` |
| `--z-progress` | `200` |
| `--z-skip` | `1000` |

## Composants CSS globaux

Classes issues de `styles.css`. Les styles scoped des composants Vue ne sont pas listés ici.

### Page root guards

- `.skip-link`

### Layout

- `.container`
- `.section`
- `.section--soft`
- `.section--page`
- `.section__head`
- `.grid`
- `.grid--2`
- `.grid--3`
- `.grid--asym`
- `.lead`
- `.eyebrow`
- `.kicker`
- `.coral-dot`

### Buttons

- `.btn`
- `.btn--lg`
- `.btn--block`
- `.btn--primary`
- `.btn--secondary`
- `.btn--ghost`
- `.linkout`

### Form fields

- `.form-label`
- `.form-input`
- `.form-textarea`

### Header

- `.site-header`
- `.site-header__inner`
- `.site-header__right`
- `.site-header__cta`
- `.lockup`
- `.lockup__mark`
- `.lockup__name`
- `.site-nav`
- `.site-nav__link`
- `.theme-toggle`
- `.burger`

### Mobile menu (dark, slides from right)

- `.mobile-menu`
- `.mobile-menu__watermark`
- `.mobile-menu__strip`
- `.mobile-menu__head`
- `.mobile-menu__close`
- `.mobile-menu__nav`
- `.mobile-menu__link`
- `.mobile-menu__arrow`
- `.mobile-menu__bottom`
- `.mobile-menu__cta-btn`

### Hero

- `.hero`
- `.hero--soft`
- `.hero__strip`
- `.hero__bg-mark`
- `.hero__inner`
- `.hero__title`
- `.hero__lead`
- `.hero__actions`
- `.hero__hint`
- `.hero__media`
- `.hero__media-img`
- `.hero__pill`
- `.hero__pill-eyebrow`
- `.hero__pill-text`

### Pixel decorations

- `.pixel-strip`
- `.pixel-corner`

### Cards

- `.card`
- `.card--method`
- `.card__pixel`
- `.card__tag`

### Badges

- `.badge`
- `.badge--audience`
- `.badge--soft`

### CTA block

- `.cta-block`
- `.cta-block__bg-mark`
- `.cta-block__strip`
- `.cta-block__inner`
- `.cta-block__title`
- `.cta-block__lead`
- `.cta-block__actions`
- `.cta-block__sidecard`
- `.cta-block__sidecard-eyebrow`
- `.cta-block__sidecard-lead`
- `.cta-block__sidecard-link`

### Footer

- `.site-footer`
- `.site-footer__inner`
- `.site-footer__col-title`
- `.site-footer__col-list`
- `.site-footer__col-link`
- `.site-footer__col-list--icons`
- `.site-footer__col-link--icon`
- `.site-footer__contact-icon`
- `.site-footer__brand-text`
- `.site-footer__social`
- `.site-footer__social-btn`
- `.site-footer__legal`
- `.site-footer__legal-links`

### Typographic utility classes (semantic aliases)

- `.pxlc-h1`
- `.pxlc-h2`
- `.pxlc-h3`
- `.pxlc-lead`
- `.pxlc-body`
- `.pxlc-body-sm`
- `.pxlc-eyebrow`
- `.pxlc-kicker`
- `.pxlc-tag`
- `.pxlc-mono`
- `.pxlc-coral-dot`

### Utility helpers

- `.mt-3`
- `.mt-4`
- `.mt-5`
- `.mt-6`
- `.prose`
- `.eyebrow--lg`

### Long-form prose (mentions légales, blog post body, etc.)

- `.prose`

## Règles brand

### Copy

- Voix 1ère personne « je » — « je » porte les verbes d'action (j'anime, j'accompagne) ; « PXLC » est un nom de marque, jamais sujet d'un verbe d'action dans le copy page (exception : la mission verbatim)
- 3e personne (« Andy Zébus, créateur de PXLC, accompagne… ») réservée aux meta/OG, mentions légales, bios auteur du blog et documents qui engagent l'entité (devis, conventions, factures, dossiers de subvention)
- Pas d'emoji, nulle part
- **Vocabulaire interdit** : addiction, désintoxication, détox numérique, coach, expert, innovant, révolutionnaire — fondement : avis HCSP du 08/03/2021, la MILDECA préfère « usage problématique des écrans » ; utiliser ce terme
- **Termes naked** (sans guillemets ni traduction) : HCSP, SESSAD, TCND, TND, hyperfocus
- Espaces insécables avant `!`, `?`, `:`, `;`, `»` et entre nombre + unité (`48 h`, `20 min`, `100 €`)
- Chiffres en numéraux sauf en début de phrase
- `Parents-Écran-Enfant` avec majuscules
- Ne jamais écrire « fondateur » — écrire « créateur de PXLC »
- Écrire « structures » (jamais « structures médico-sociales et associatives »)
- Mission en une phrase : « PXLC aide les familles à mieux utiliser les écrans — pour s'en servir sans subir. »
- Cadre réglementaire : toujours citer HCSP 2019-2020 · HAS 2020 ensemble
- Toute affirmation santé/usage des écrans doit être sourcée depuis docs/references/ (document + section) — ne jamais inventer un chiffre ou une recommandation

### Positionnement B2B

- **Principe** : intervenir dans les lieux qui accueillent déjà des familles — le lieu apporte le public, j'apporte l'atelier et le cadre
- **Clients** = les lieux et leurs gestionnaires : médiathèques et collectivités, centres sociaux et espaces de vie sociale, LAEP, structures médico-sociales (SESSAD, IME, CMPP, CAMSP), dispositifs CLAS — les familles sont bénéficiaires, pas clients directs
- **Levier de financement** : appels à projets parentalité de la CAF (FNP, ex-REAAP) — le lieu porte le dossier, PXLC intervient comme prestataire externe
- **Posture** : partenaire institutionnel — jamais coach, expert ou gadget
- **Jeu vidéo** = outil de médiation légitime — jamais un problème à résoudre
- **Différenciateur** : seul pont entre 3 mondes — culture joueur / cadre du soin / langage institutionnel

### Les 3 casquettes (ancres de légitimité)

1. **Organisateur esport** — Plus de 6 ans sur la scène esport guadeloupéenne, Destreland Gaming Cup. Connaissance de la communauté joueurs de l'intérieur.
2. **Médiateur formé** — Formateur Simplon Outre-Mer 2021-2022. Travail dans le cadre HCSP · HAS.
3. **Conseil institutionnel** — Affaires européennes et numérique THD, Région Guadeloupe. Parle le langage des projets de service et des financements publics.

### Nommage des composants Vue

- **`Pxlc*`** — primitives de marque réutilisables partout : `PxlcInput`, `PxlcLinkout`, `PxlcLockup`, `PxlcMark`, `PxlcMarkSeparator`, `PxlcOg`, `PxlcOgBrand`, `PxlcPixelCorner`, `PxlcPixelStrip`
- **`Site*`** — chrome du site (présent sur toutes les pages) : `SiteBreadcrumb`, `SiteFooter`, `SiteHeader`, `SiteMobileMenu`
- **`Blog*`** — composants propres au contexte blog : `BlogCta`, `BlogRelated`, `BlogShare`, `BlogToc`
- **Sans préfixe** — sections de page, blocs de contenu et utilitaires autonomes : `CitationBlock`, `CtaBlock`, `HeroSection`, `MethodGrid`, `PartnerStrip`, `SessadCase`, `ThemeToggle`
- Deux mots minimum par nom (style guide Vue — évite les collisions avec de futurs éléments HTML natifs)

### Visuel

- Coral max **5 %** des pixels par page ou image
- Un seul CTA primaire par section
- Jamais de texte blanc sur fond coral — utiliser `--pxlc-text-ink`
- Pas de gradients, pas d'emoji en iconographie

### OG Images

- Composant : `app/components/OgImage/PxlcOg.takumi.vue`
- Générées au build (`ogImage.zeroRuntime: true`) — non disponibles en dev
- Chaque page surcharge via `defineOgImage('PxlcOg', { eyebrow, title, description })`
