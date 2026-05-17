#!/usr/bin/env node
/**
 * Post-build cleanup of files copied to .output/public/ that aren't
 * actually served at runtime. Runs after `nuxt build` and `nuxt generate`
 * via npm lifecycle scripts (postbuild / postgenerate).
 *
 *  - _og-static-fonts/: TTF + WOFF used by nuxt-og-image at build to
 *    rasterize the OG cards. With `ogImage.zeroRuntime: true` the PNGs
 *    are baked at build time and the fonts are never needed in prod,
 *    so we save ~460 KB on every deploy.
 */
import { rm, stat } from 'node:fs/promises'
import { join } from 'node:path'

const PUBLIC_DIR = '.output/public'
const PATHS_TO_PRUNE = ['_og-static-fonts']

for (const rel of PATHS_TO_PRUNE) {
  const abs = join(PUBLIC_DIR, rel)
  try {
    const s = await stat(abs)
    if (!s.isDirectory()) continue
    await rm(abs, { recursive: true, force: true })
    console.log(`prune-public: removed ${abs}`)
  } catch (err) {
    if (err.code !== 'ENOENT') console.warn(`prune-public: ${abs} — ${err.message}`)
  }
}
