# Plaquette PXLC — génération PDF

Source HTML : `plaquette.html` (12 pages A4, design system PXLC v2 — aligné sur `app/assets/css/tokens.css`).
Sortie : `../public/files/plaquette-pxlc.pdf`, servi par Nuxt à `https://pxlc.fr/files/plaquette-pxlc.pdf`.

## Pourquoi pas wkhtmltopdf ?

`wkhtmltopdf` utilise un fork WebKit ancien qui ne respecte pas correctement :
- `overflow: hidden` sur les conteneurs `.page` à hauteur fixe ;
- les Google Fonts modernes ;
- certains comportements `position: absolute` en print.

Résultat : les photos débordent, les footers se superposent, le rendu diffère
de ce qu'on voit dans Chrome. **On utilise Chromium headless** (via Puppeteer)
qui rend exactement comme un Chrome normal en « Imprimer en PDF ».

## Méthode 1 — Puppeteer (recommandée)

```bash
cd _plaquette
npm install                 # première fois uniquement
npm run build
```

Puppeteer télécharge automatiquement une version de Chromium (~170 Mo)
isolée du Chrome système. C'est reproductible, fonctionne en CI, et garantit
le même rendu sur n'importe quelle machine.

## Méthode 2 — Chrome système (plus rapide si Chrome est installé)

Une seule ligne, sans dépendance Node :

```bash
# Windows (PowerShell)
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless `
  --disable-gpu `
  --no-pdf-header-footer `
  --print-to-pdf="..\public\files\plaquette-pxlc.pdf" `
  "file:///$(Resolve-Path plaquette.html)"

# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=../public/files/plaquette-pxlc.pdf \
  "file://$(pwd)/plaquette.html"

# Linux
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=../public/files/plaquette-pxlc.pdf \
  "file://$(pwd)/plaquette.html"
```

Inconvénient : pas de contrôle fin sur les options PDF (pas de
`preferCSSPageSize`, pas d'attente explicite des fonts). Les Google Fonts
peuvent ne pas s'être chargées au moment du print → polices fallback.
Pour un livrable client, préférez la méthode 1.

## Méthode 3 — Manuelle dans Chrome

1. Ouvrir `plaquette.html` dans Chrome.
2. `Cmd/Ctrl + P`.
3. Destination : « Enregistrer au format PDF ».
4. Plus de paramètres → Marges : **Aucune**.
5. Cocher « Graphiques d'arrière-plan ».
6. Enregistrer dans `../public/files/plaquette-pxlc.pdf`.

Bon pour vérifier visuellement avant de commiter une nouvelle version.

## Workflow recommandé

À chaque modification du contenu de la plaquette :
1. Éditer `plaquette.html`.
2. Ouvrir dans Chrome pour vérifier visuellement.
3. Lancer `npm run build` pour regénérer le PDF.
4. Vérifier le PDF de sortie.
5. Commiter le `.html` ET le `.pdf` ensemble.

Le PDF est servi par Nuxt depuis `public/files/` à
`https://pxlc.fr/files/plaquette-pxlc.pdf` (lien direct, pas de redirection).

## Aligné avec le design system

La plaquette utilise les **mêmes tokens** que le site Nuxt (voir
`app/assets/css/tokens.css`) :
- couleurs `--pxlc-teal-deep / --pxlc-teal-mid / --pxlc-cyan / --pxlc-coral`,
- typographie `Sora / DM Sans / JetBrains Mono`,
- eyebrows en mono `0.22em` tracking,
- `.coral-dot` avec `aria-hidden="true"` (parité a11y avec le site),
- pixel-strip 14 cellules, accent coral à l'index 10 (signature de marque),
- mark 3×3 avec coin coral en bas-droite, présent en watermark sur la couverture.

Si les tokens évoluent côté Nuxt, mettre à jour le bloc `:root { ... }` en
tête de `plaquette.html` pour rester cohérent.
