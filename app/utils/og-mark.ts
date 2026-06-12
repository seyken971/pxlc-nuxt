/**
 * Shared constants for the OG image renderer (PxlcOg).
 *
 * nuxt-og-image requires every .vue file under app/components/OgImage/
 * to carry a renderer suffix, so the 3×3 brand-mark data can't live in a
 * sub-component — the renderer imports it from here instead.
 */
import { BRAND_HEX } from '~/utils/brand-colors'

export const OG_F_SANS = 'Plus Jakarta Sans, system-ui, sans-serif'

// 3×3 brand mark cell coordinates (viewBox 0 0 100 100).
export const MARK_POS = [2, 35.33, 68.67] as const

export const MARK_RECTS = [
  { x: MARK_POS[0], y: MARK_POS[0], fill: BRAND_HEX.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[0], fill: BRAND_HEX.tealMid },
  { x: MARK_POS[2], y: MARK_POS[0], fill: BRAND_HEX.cyan },
  { x: MARK_POS[0], y: MARK_POS[1], fill: BRAND_HEX.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[1], fill: BRAND_HEX.tealMid },
  { x: MARK_POS[2], y: MARK_POS[1], fill: BRAND_HEX.cyan },
  { x: MARK_POS[0], y: MARK_POS[2], fill: BRAND_HEX.tealDeep },
  { x: MARK_POS[1], y: MARK_POS[2], fill: BRAND_HEX.tealMid },
  { x: MARK_POS[2], y: MARK_POS[2], fill: BRAND_HEX.coral },
] as const
