#!/usr/bin/env node
/**
 * scripts/build-communes.mjs
 * Génère src/data/communes-971.json : les contours des 32 communes de
 * Guadeloupe, projetés et simplifiés, sous forme de tracés SVG prêts à rendre
 * (composant CommuneMap.astro). Zéro requête réseau et zéro JS côté client :
 * la carte est un SVG inline figé au build.
 *
 * Source : geo.api.gouv.fr (contours Admin Express, IGN — Licence Ouverte 2.0).
 * L'attribution « IGN · geo.api.gouv.fr » est affichée dans la légende de la carte.
 *
 * Lancement manuel, hors chaîne de build (le build n'a pas accès au réseau) :
 *   npm run gen:communes
 *
 * Étapes :
 *   1. téléchargement du GeoJSON (~900 KB) ;
 *   2. projection Mercator ajustée au viewBox 680×420 (marge 22 px) ;
 *   3. topologie partagée (topojson) + simplification Visvalingam en pixels²,
 *      pour que les frontières entre communes voisines restent jointives ;
 *   4. tracés `d` arrondis à 1 décimale + centroïdes, écrits en JSON.
 */
import { geoMercator, geoPath } from 'd3-geo'
import { topology } from 'topojson-server'
import { presimplify, simplify } from 'topojson-simplify'
import { feature, quantize } from 'topojson-client'
import { writeFilePreservingEol } from './write-file-eol.mjs'

const SOURCE = 'https://geo.api.gouv.fr/departements/971/communes?fields=nom,code&format=geojson&geometry=contour'
const OUT = 'src/data/communes-971.json'
const WIDTH = 680
const HEIGHT = 420
const MARGIN = 22
// Aire minimale (px²) du triangle conservé par la simplification : en dessous
// d'un demi-pixel carré, le point ne change rien à l'écran.
const MIN_AREA = 0.5

/** Applique la projection à toutes les positions d'une géométrie GeoJSON. */
const projectGeometry = (geometry, project) => {
  const map = coords => typeof coords[0] === 'number' ? project(coords) : coords.map(map)
  return { ...geometry, coordinates: map(geometry.coordinates) }
}

const main = async () => {
  const res = await fetch(SOURCE)
  if (!res.ok) throw new Error(`geo.api.gouv.fr : HTTP ${res.status}`)
  const raw = await res.json()

  // Projection calée sur l'emprise complète de l'archipel.
  const projection = geoMercator().fitExtent(
    [[MARGIN, MARGIN], [WIDTH - MARGIN, HEIGHT - MARGIN]],
    raw,
  )
  const projected = {
    type: 'FeatureCollection',
    features: raw.features.map(f => ({ ...f, geometry: projectGeometry(f.geometry, projection) })),
  }

  // Simplification topologique en espace pixel, puis retour en GeoJSON.
  const topo = quantize(simplify(presimplify(topology({ communes: projected })), MIN_AREA), 1e4)
  const simplified = feature(topo, topo.objects.communes)

  // Projection nulle : les coordonnées sont déjà en pixels.
  const path = geoPath(null).digits(1)
  const round = n => Math.round(n * 10) / 10

  const communes = simplified.features
    .map(f => ({
      code: f.properties.code,
      nom: f.properties.nom,
      d: path(f),
      centroid: path.centroid(f).map(round),
    }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))

  const out = {
    source: SOURCE,
    licence: 'Contours Admin Express (IGN) via geo.api.gouv.fr — Licence Ouverte 2.0',
    generatedAt: new Date().toISOString().slice(0, 10),
    viewBox: [WIDTH, HEIGHT],
    communes,
  }

  const written = await writeFilePreservingEol(OUT, `${JSON.stringify(out, null, 2)}\n`)
  const size = Math.round(JSON.stringify(out).length / 1024)
  console.log(`build-communes: ${communes.length} communes → ${OUT} (${size} KB)${written ? '' : ' — déjà à jour'}`)
}

main().catch(err => { console.error(err); process.exit(1) })
