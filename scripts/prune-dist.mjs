#!/usr/bin/env node
/**
 * Nettoyage post-build : supprime de dist/_astro le chunk client Vue émis
 * par @astrojs/vue (client.*.js). Aucune île n'est hydratée (rendu serveur
 * uniquement, zéro directive client:) — le chunk n'est référencé par aucune
 * page ; on vérifie avant de supprimer, et on échoue si une référence
 * apparaît un jour (île ajoutée par erreur → décision consciente requise).
 */
import { readFile, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const BUILD_DIR = process.argv[2] || 'dist'
const ASTRO_DIR = join(BUILD_DIR, '_astro')

const findHtml = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...await findHtml(p))
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(p)
  }
  return out
}

const main = async () => {
  let clients
  try {
    clients = (await readdir(ASTRO_DIR)).filter(f => /^client\..+\.js$/.test(f))
  }
  catch (err) {
    if (err.code !== 'ENOENT') throw err
    return
  }
  if (!clients.length) {
    console.log('prune-dist: aucun chunk client Vue à supprimer')
    return
  }

  const htmlFiles = await findHtml(BUILD_DIR)
  for (const name of clients) {
    for (const path of htmlFiles) {
      if ((await readFile(path, 'utf8')).includes(name)) {
        console.error(`prune-dist: ${name} est référencé par ${path} — une île Vue est hydratée ?`)
        console.error('  → si c\'est voulu, retirer ce script du postbuild ; sinon, supprimer la directive client:*.')
        process.exit(1)
      }
    }
    await rm(join(ASTRO_DIR, name))
    console.log(`prune-dist: removed ${ASTRO_DIR}/${name}`)
  }
}

main().catch((err) => { console.error(err); process.exit(2) })
