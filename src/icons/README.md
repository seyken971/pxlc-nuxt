# Icônes vendorées

Neuf icônes utilisées par le site, importées comme composants Astro natifs
(`import Mail from '../icons/mail.svg'`) — plus d'intégration `astro-icon` ni
de paquets Iconify en dépendance.

Chaque fichier est le corps du glyphe encapsulé dans
`<svg width="1em" height="1em" viewBox="0 0 24 24">` : la taille suit la
`font-size` du parent, et les règles CSS existantes (`.theme-toggle svg`,
`.site-footer__social-btn svg`…) continuent de piloter les dimensions.

| Fichier | Source | Licence |
| --- | --- | --- |
| `calendar.svg`, `clock.svg`, `mail.svg`, `message-square.svg`, `moon.svg`, `sun.svg` | Lucide (via `@iconify-json/lucide` 1.2.123) | ISC |
| `linkedin.svg`, `whatsapp.svg`, `x.svg` | Simple Icons (via `@iconify-json/simple-icons` 1.2.93) | CC0 1.0 |

Les marques figurant dans Simple Icons restent la propriété de leurs
détenteurs ; elles ne sont utilisées ici que pour identifier les liens de
contact et de partage.
