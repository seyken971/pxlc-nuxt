export interface ProjectTheme {
  num: string
  title: string
  /** Short pitch — used on the home overview grid. */
  short: string
  /** Detailed description — used on the /pour-les-structures page. */
  long: string
}

/**
 * The 3 atelier themes of the « Jouons Ensemble! » project (SESSAD Lékoklaya,
 * 2026). Single source of truth so the home overview and the /pour-les-structures
 * detail page can't drift out of sync.
 *
 * Source: _plaquette/PROJET PARENTS – ECRAN – ENFANT.md
 */
export const useProjectThemes = () => {
  const themes: ProjectTheme[] = [
    {
      num: '01',
      title: 'Coopération',
      short: 'Jeux choisis pour valoriser l’entraide et la stratégie partagée. Pont avec un jeu traditionnel + un conte sur le même thème.',
      long: 'Jeux choisis avec le médiateur numérique pour valoriser l’entraide et la stratégie partagée. Les intervenants culturels proposent en parallèle un jeu traditionnel et un conte sur la coopération.',
    },
    {
      num: '02',
      title: 'Émotions & récits',
      short: 'Renforcement des fonctions exécutives (planification, inhibition, prise de décision) via des jeux narratifs.',
      long: 'Travail sur les fonctions exécutives (planification, inhibition, prise de décision) à travers des jeux narratifs. Le temps d’échange verbal explore ce que l’enfant a ressenti, nommé, partagé pendant la séance.',
    },
    {
      num: '03',
      title: 'Différence & complémentarité',
      short: 'Faire de la différence parent-enfant un levier d’alliance plutôt qu’une source de tension.',
      long: 'Comprendre comment chaque membre du binôme parent-enfant joue, observe, contribue — et faire de cette différence un levier d’alliance plutôt qu’une source de tension.',
    },
  ]
  return { themes }
}
