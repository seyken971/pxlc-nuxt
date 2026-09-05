# Plaquette PXLC — génération PDF

Ce dossier génère la plaquette PXLC (6 pages A4) en deux étapes, toujours dans
cet ordre :

1. `plaquette.template.html` + les données → `plaquette.html`
2. `plaquette.html` → `../public/files/plaquette-pxlc.pdf`

Le PDF est un binaire committé, servi tel quel par GitHub Pages à
`/files/plaquette-pxlc.pdf` : la CI ne le régénère pas. Toute modification de
copy ou de template doit donc être suivie d'un `npm run build` ici, et le PDF
committé avec la source qui l'a motivé.

## Sources

- `plaquette.template.html` : structure HTML, CSS et tokens `{{section.cle}}`.
- `data.json` : la copy (mission, méthode, casquettes, cas pratique).
- `../src/config/identity.ts` et `../src/config/site.ts` : NAP, SIRET, RCS, APE,
  adresse, e-mail, téléphone, URL. Chargés directement par Node (≥ 22.12, type
  stripping natif) et prioritaires sur `data.json` : une donnée d'identité ne se
  tape jamais ici.
- une fiche `.md` optionnelle : données projet spécifiques via frontmatter JSON.
- `../public/fonts/` : les polices auto-hébergées du site (Plus Jakarta Sans,
  Lora), pour un rendu identique au site et un build hors ligne.
- `plaquette.html` : fichier généré, ignoré par git, à ne pas éditer à la main.

## Garde-fous

- `generate-html.js` échoue sur tout token non résolu.
- `export-pdf.mjs` échoue si un texte a la couleur de son fond (CTA invisible).
- `scripts/ds-lint.mjs` (racine, joué par `npm run build` du site) applique au
  template et à `data.json` : vocabulaire interdit, emoji, espaces insécables,
  hex brut hors palette, phrases interdites.

## Commandes

Installer les dépendances la première fois :

```bash
npm install
```

Depuis la racine du dépôt, générer le HTML puis le PDF :

```bash
npm run plaquette
```

Dans ce dossier :

```bash
npm run generate                    # HTML seul
npm run build                       # HTML + PDF
npm run build -- --fiche "./x.md"   # avec une fiche projet
npm run preview                     # aperçus PNG dans .previews/ (locaux)
```

## Sorties

- HTML : `plaquette.html` (ignoré)
- PDF : `../public/files/plaquette-pxlc.pdf` (committé)
- Aperçus : `.previews/page-*.png` (ignorés)
