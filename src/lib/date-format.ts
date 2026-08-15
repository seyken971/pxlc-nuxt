// Les dates du frontmatter sont parsées en Date UTC minuit — le formatage
// est épinglé sur UTC pour que le rendu ne dépende pas du fuseau de la
// machine de build (un build local UTC-4 affichait J-1).
export const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d)

/** Forme machine YYYY-MM-DD (attributs datetime, JSON-LD, sitemap). */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10)
