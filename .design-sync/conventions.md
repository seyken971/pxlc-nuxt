# PXLC — Conventions pour le design agent

PXLC est un service de médiation numérique en Guadeloupe. Andy Zébus anime des ateliers
**Parent-Écran-Enfant** dans les lieux qui accueillent des familles (médiathèques, centres
sociaux, SESSAD, LAEP…). Le site est en français.

## Tokens à utiliser

Toutes les valeurs visuelles viennent des custom properties `--pxlc-*` et des tokens
sémantiques (`--bg`, `--ink`, `--rule`, `--eyebrow`, etc.). **Ne jamais coder de couleur
ou d'espacement en dur.**

```css
/* Surfaces */
--bg            /* fond principal */
--bg-soft       /* fond alterné doux */
--bg-elev       /* cartes, modales */

/* Texte */
--ink           /* texte principal */
--ink-quiet     /* texte secondaire */
--quiet         /* texte tertiaire/meta */
--eyebrow       /* surtitre coloré (teal-deep en clair, cyan en sombre) */

/* Accentuation */
--teal-deep     /* #036E73 — liens, focus, CTA secondaire */
--teal-mid      /* #01A09D — hover states */
--cyan          /* #00D2C8 — badges, highlights */
--pxlc-coral    /* #FF5E3A — CTA primaire UNIQUEMENT */
```

## Typographie

| Rôle | Variable | Famille |
|---|---|---|
| Titres | `--font-display` | Plus Jakarta Sans |
| Corps | `--font-body` | Lora (serif) |
| Labels, boutons | `--font-label` | Plus Jakarta Sans |

## Contraintes visuelles non négociables

- **Coral ≤ 5 %** des pixels par page — accent, jamais remplissage dominant.
- **Jamais de texte blanc sur fond coral** — utiliser `--pxlc-text-ink` (#082B36).
- **Pas de dégradés** (pas de `linear-gradient`, pas de `radial-gradient`).
- **Un seul CTA primaire (`.btn--primary` / coral) par section.**
- Dark mode via `[data-theme="dark"]` — utiliser uniquement les tokens sémantiques.

## Composants disponibles

| Élément | Tag custom | Quand l'utiliser |
|---|---|---|
| `PxlcMark` | `<pxlc-mark>` | Logo seul (favicon, icône) — `size` en px |
| `PxlcLockup` | `<pxlc-lockup>` | Logo + nom PXLC — `size="sm\|md\|lg"` |
| `PxlcInput` | `<pxlc-input>` | Champ de formulaire (texte, email, textarea) |
| `PxlcLinkout` | `<pxlc-linkout>` | Lien externe avec flèche |
| `PxlcMarkSeparator` | `<pxlc-mark-separator>` | Séparateur de section avec le logo |
| `PxlcPixelCorner` | `<pxlc-pixel-corner>` | Décoration pixel en coin de carte |
| `PxlcPixelStrip` | `<pxlc-pixel-strip>` | Bande de pixels décorative |

> Ces composants sont des **web custom elements** (Light DOM). Ils héritent du CSS de la
> page. Dans les previews React, utiliser les noms kebab-case (`<pxlc-mark>`) et non les
> classes (`PxlcDS.PxlcMark`).

## Voix et copy

- Verbes d'action à la **1re personne** : « j'anime », « j'accompagne », « j'interviens ».
- **Mots interdits** : addiction, désintoxication, détox numérique, coach, expert, innovant,
  révolutionnaire. Préférer « usage problématique des écrans ».
- Pas d'emoji, nulle part.
- Typographie française : espace insécable avant `!` `?` `:` `;` `»` et entre nombre + unité.
- **PXLC** = nom de marque, jamais sujet d'un verbe d'action (sauf la phrase de mission).
- Mission : « PXLC accompagne les familles dans l'éducation numérique des enfants. »

## Classes CSS globales utiles

```
.btn --primary | --secondary | --ghost | --lg | --block
.card   .card--method   .card__tag
.badge  .badge--audience  .badge--soft
.eyebrow  .kicker  .coral-dot
.section  .section--soft  .container
.pxlc-h1 … .pxlc-h3  .pxlc-lead  .pxlc-body  .pxlc-eyebrow
```
