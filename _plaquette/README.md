# Plaquette PXLC — génération PDF

Ce dossier génère la plaquette PXLC en deux étapes, toujours dans cet ordre :

1. `plaquette.template.html` + les données projet → `plaquette.html`
2. `plaquette.html` → `../public/files/plaquette-pxlc.pdf`

## Sources

- `plaquette.template.html` : structure HTML et tokens `{{section.cle}}`.
- `data.json` : valeurs de repli.
- une fiche `.md` optionnelle : données projet spécifiques via frontmatter JSON.
- `../nuxt.config.ts` et `../design.md` : identité, contact, légal et tokens de marque.
- `plaquette.html` : fichier généré, à ne pas éditer à la main.

## Commandes

Installer les dépendances la première fois :

```bash
npm install
```

Générer uniquement le HTML :

```bash
npm run generate
```

Générer le HTML puis le PDF :

```bash
npm run build
```

Choisir une fiche précise :

```bash
npm run build -- --fiche "./ma-fiche.md"
```

Générer les aperçus PNG de chaque page :

```bash
npm run preview
```

## Sorties

- HTML : `plaquette.html`
- PDF : `../public/files/plaquette-pxlc.pdf`
- Aperçus : `.previews/page-*.png`

Le PDF est servi par Nuxt à l'URL `/files/plaquette-pxlc.pdf`.
