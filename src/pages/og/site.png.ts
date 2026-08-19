import type { APIRoute } from 'astro'
import { renderOgPng, siteCard } from '../../lib/og-templates'

// Carte OG de marque — image par défaut de toutes les pages statiques.
export const GET: APIRoute = async () => new Response(
  new Uint8Array(await renderOgPng(siteCard())),
  { headers: { 'Content-Type': 'image/png' } },
)
