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
| `--ring-cyan` | `0 0 0 3px rgba(0,210,200,.25)` | — |
| `--ring-teal` | `0 0 0 3px rgba(3,110,115,.3)` | — |
| `--ring-teal-soft` | `0 0 0 3px rgba(3,110,115,.2)` | — |

## Typographie

| Token | Stack |
| --- | --- |
| `--font-display` | `"Sora", system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-body` | `"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace` |

> Les tailles de titre utilisent `clamp()` défini localement dans chaque composant — pas de token `--fs-h1` global.

## Espacement

Rythme 8 px.

| Token | Valeur |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `16px` |
| `--space-4` | `24px` |
| `--space-5` | `32px` |
| `--space-6` | `48px` |

## Radius

| Token | Valeur |
| --- | --- |
| `--radius-sm` | `4px` |
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

## Composants CSS globaux

Classes issues de `styles.css`. Les styles scoped des composants Vue ne sont pas listés ici.

### Layout

- `.container`
- `.section`
- `.section--soft`
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

### Header

- `.site-header`
- `.site-header__inner`
- `.site-header__right`
- `.site-header__cta`
- `.site-header__cta--hidden`
- `.lockup`
- `.lockup__mark`
- `.lockup__text`
- `.lockup__name`
- `.lockup__tag`
- `.site-nav`
- `.site-nav__link`
- `.theme-toggle`
- `.burger`

### Mobile menu

- `.mobile-menu`
- `.mobile-menu__head`
- `.mobile-menu__head-actions`
- `.mobile-menu__close`
- `.mobile-menu__nav`
- `.mobile-menu__link`
- `.mobile-menu__cta`
- `.mobile-menu__cta-secondary`

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

### Footer

- `.site-footer`
- `.site-footer__inner`
- `.site-footer__col-title`
- `.site-footer__col-list`
- `.site-footer__col-link`
- `.site-footer__brand-text`
- `.site-footer__social`
- `.site-footer__social-btn`
- `.site-footer__legal`
- `.site-footer__legal-links`

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

- Voix 1ère personne « je » — jamais « Andy Zébus accompagne » dans le copy page (OK dans meta/OG)
- Pas d'emoji, nulle part
- **Vocabulaire interdit** : addiction, désintoxication, détox numérique, coach, expert, innovant, révolutionnaire
- **Termes naked** (sans guillemets ni traduction) : HCSP, SESSAD, TCND, TND, hyperfocus
- Espaces insécables avant `!`, `?`, `:`, `;`, `»` et entre nombre + unité (`48 h`, `20 min`, `100 €`)
- Chiffres en numéraux sauf en début de phrase
- `parent-écran-enfant` en minuscules (pas Parent-Écran-Enfant)

### Visuel

- Coral max **5 %** des pixels par page ou image
- Un seul CTA primaire par section
- Jamais de texte blanc sur fond coral — utiliser `--pxlc-text-ink`
- Pas de gradients, pas d'emoji en iconographie

### OG Images

- Composant : `app/components/OgImage/PxlcOg.takumi.vue`
- Générées au build (`ogImage.zeroRuntime: true`) — non disponibles en dev
- Chaque page surcharge via `defineOgImage('PxlcOg', { eyebrow, title, description })`
