#!/usr/bin/env node
/**
 * Génère design.md depuis app/assets/css/tokens.css + styles.css.
 *
 * Usage :
 *   node scripts/export-design.mjs
 *   npm run design
 *
 * Le fichier est écrit à la racine du repo. Relancer après toute
 * modification de tokens.css ou styles.css.
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { writeFilePreservingEol } from "./write-file-eol.mjs";

const TOKENS = "app/assets/css/tokens.css";
const STYLES = "app/assets/css/styles.css";
const OUTPUT = "design.md";

// ── Parsers ────────────────────────────────────────────────────────────────

/** Extrait toutes les custom properties d'un bloc CSS donné. */
function parseVars(block) {
  const vars = {};
  for (const m of block.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    vars[`--${m[1]}`] = m[2].trim();
  }
  return vars;
}

/** Extrait les vars du bloc :root { … }. */
function parseRoot(css) {
  const m = css.match(/:root\s*\{([^}]+)\}/s);
  return m ? parseVars(m[1]) : {};
}

/** Extrait les vars de tous les [data-theme="dark"] { … } (peut être multiple). */
function parseDark(css) {
  const vars = {};
  for (const m of css.matchAll(/\[data-theme="dark"\]\s*\{([^}]+)\}/gs)) {
    Object.assign(vars, parseVars(m[1]));
  }
  return vars;
}

/**
 * Découpe styles.css par les commentaires de section « ── Titre ── »
 * et retourne un tableau { title, classes[] }.
 */
function parseSections(css) {
  // Les commentaires de section utilisent ─ (U+2500 BOX DRAWINGS LIGHT HORIZONTAL)
  // Ex: /* ── Layout ──────────────────────────────────────────────── */
  const SECTION_RE = /\/\*\s*[─-]{2,}\s+(.+?)\s+[─-]+\s*\*\//g;
  const sections = [];
  let last = { title: "Global", start: 0 };
  let m;

  while ((m = SECTION_RE.exec(css)) !== null) {
    last.end = m.index;
    sections.push(last);
    last = { title: m[1].trim(), start: m.index + m[0].length };
  }
  last.end = css.length;
  sections.push(last);

  return sections
    .map(({ title, start, end }) => {
      const block = css.slice(start, end);
      const classes = [
        ...new Set([...block.matchAll(/^\.([\w-]+)[\s{,]/gm)].map((x) => x[1])),
      ];
      return { title, classes };
    })
    .filter((s) => s.classes.length > 0);
}

/**
 * Liste les noms de composants Vue depuis app/components/ (récursif),
 * suffixes .takumi/.vue retirés — la doc de nommage est dérivée du
 * filesystem pour ne jamais dériver de la réalité.
 */
async function listComponents(dir = "app/components") {
  const names = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory())
      names.push(...(await listComponents(join(dir, e.name))));
    else if (e.name.endsWith(".vue"))
      names.push(e.name.replace(/(\.takumi)?\.vue$/, ""));
  }
  return names.sort();
}

// ── Helpers Markdown ───────────────────────────────────────────────────────

function table(headers, rows) {
  const sep = headers.map(() => "---");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${sep.join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");
}

function pick(vars, fn) {
  return Object.entries(vars).filter(([k]) => fn(k));
}

// ── YAML Frontmatter (google-labs-code/design.md standard) ────────────────

function yamlKey(cssVar) {
  return cssVar.replace(/^--/, "");
}

function yamlVal(v) {
  return `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function buildFrontmatter(root, dark) {
  const lines = ["---", "name: PXLC Design System"];

  const palette = pick(root, (k) => k.startsWith("--pxlc-"));
  lines.push("colors:");
  lines.push("  palette:");
  for (const [k, v] of palette) {
    lines.push(`    ${yamlKey(k)}: ${yamlVal(v)}`);
  }

  const semanticColors = pick(
    root,
    (k) =>
      !k.startsWith("--pxlc-") &&
      !k.startsWith("--font-") &&
      !k.startsWith("--space-") &&
      !k.startsWith("--radius-") &&
      !k.startsWith("--dur-") &&
      !k.startsWith("--ease-") &&
      !k.startsWith("--container-") &&
      !k.startsWith("--z-"),
  );
  if (semanticColors.length) {
    lines.push("  semantic:");
    for (const [k, v] of semanticColors) {
      const d = dark[k];
      if (d) {
        lines.push(`    ${yamlKey(k)}:`);
        lines.push(`      light: ${yamlVal(v)}`);
        lines.push(`      dark: ${yamlVal(d)}`);
      } else {
        lines.push(`    ${yamlKey(k)}: ${yamlVal(v)}`);
      }
    }
  }

  const fonts = pick(root, (k) => k.startsWith("--font-"));
  if (fonts.length) {
    lines.push("typography:");
    for (const [k, v] of fonts) {
      lines.push(`  ${yamlKey(k)}: ${yamlVal(v)}`);
    }
  }

  const spaces = pick(root, (k) => k.startsWith("--space-"));
  if (spaces.length) {
    lines.push("spacing:");
    lines.push('  base: "8px"');
    for (const [k, v] of spaces) {
      lines.push(`  ${yamlKey(k)}: ${yamlVal(v)}`);
    }
  }

  const radii = pick(root, (k) => k.startsWith("--radius-"));
  if (radii.length) {
    lines.push("radius:");
    for (const [k, v] of radii) {
      lines.push(`  ${yamlKey(k)}: ${yamlVal(v)}`);
    }
  }

  const motion = pick(
    root,
    (k) => k.startsWith("--dur-") || k.startsWith("--ease-"),
  );
  if (motion.length) {
    lines.push("motion:");
    for (const [k, v] of motion) {
      lines.push(`  ${yamlKey(k)}: ${yamlVal(v)}`);
    }
  }

  const layout = pick(
    root,
    (k) => k.startsWith("--container-") || k.startsWith("--z-"),
  );
  if (layout.length) {
    lines.push("layout:");
    for (const [k, v] of layout) {
      lines.push(`  ${yamlKey(k)}: ${yamlVal(v)}`);
    }
  }

  lines.push("---");
  return lines.join("\n") + "\n";
}

// ── Main ───────────────────────────────────────────────────────────────────

const main = async () => {
  const [tokensCss, stylesCss, components] = await Promise.all([
    readFile(TOKENS, "utf8"),
    readFile(STYLES, "utf8"),
    listComponents(),
  ]);

  const root = parseRoot(tokensCss);
  const dark = parseDark(tokensCss);
  const sections = parseSections(stylesCss);

  const md = [];

  md.push(buildFrontmatter(root, dark));

  // ── En-tête ──────────────────────────────────────────────────────────────
  md.push("# PXLC — Design System\n");
  md.push("> Généré automatiquement par `scripts/export-design.mjs`.");
  md.push("> Source : `app/assets/css/tokens.css` + `styles.css`.");
  md.push(
    "> Relancer `npm run design` après toute modification des sources CSS.\n",
  );

  // ── Palette ───────────────────────────────────────────────────────────────
  md.push("## Palette\n");
  const palette = pick(root, (k) => k.startsWith("--pxlc-"));
  md.push(
    table(
      ["Token", "Hex / valeur"],
      palette.map(([k, v]) => [`\`${k}\``, `\`${v}\``]),
    ),
  );

  // ── Tokens sémantiques ────────────────────────────────────────────────────
  md.push("\n## Tokens sémantiques\n");
  md.push(
    "Ces tokens résolvent vers la palette et basculent automatiquement en dark mode.\n",
  );

  const semanticGroups = [
    [
      "Surfaces",
      (k) =>
        [
          "--bg",
          "--bg-soft",
          "--bg-elev",
          "--bg-rule",
          "--bg-glass",
          "--dot-grid",
          "--halo-cyan",
          "--badge-soft-bg",
          "--hover-on-dark",
        ].includes(k),
    ],
    ["Texte", (k) => k === "--ink" || k === "--ink-quiet" || k === "--quiet"],
    ["Bordures", (k) => k.startsWith("--rule")],
    [
      "Couleurs accent",
      (k) => ["--teal-deep", "--teal-mid", "--cyan", "--eyebrow"].includes(k),
    ],
    [
      "Ombres & rings",
      (k) => k.startsWith("--shadow-") || k.startsWith("--ring-"),
    ],
  ];

  for (const [label, fn] of semanticGroups) {
    const rows = pick(root, fn);
    if (!rows.length) continue;
    md.push(`### ${label}\n`);
    md.push(
      table(
        ["Token", "Light", "Dark"],
        rows.map(([k, v]) => [
          `\`${k}\``,
          `\`${v}\``,
          dark[k] ? `\`${dark[k]}\`` : "—",
        ]),
      ),
    );
    md.push("");
  }

  // ── Typographie ───────────────────────────────────────────────────────────
  md.push("## Typographie\n");
  const fonts = pick(root, (k) => k.startsWith("--font-"));
  md.push(
    table(
      ["Token", "Stack"],
      fonts.map(([k, v]) => [`\`${k}\``, `\`${v}\``]),
    ),
  );
  md.push(
    "\n> Les tailles de titre utilisent `clamp()` défini localement dans chaque composant — pas de token `--fs-h1` global.",
  );

  // ── Espacement ────────────────────────────────────────────────────────────
  md.push("\n## Espacement\n");
  md.push("Rythme 8 px.\n");
  const spaces = pick(root, (k) => k.startsWith("--space-"));
  md.push(
    table(
      ["Token", "Valeur"],
      spaces.map(([k, v]) => [`\`${k}\``, `\`${v}\``]),
    ),
  );

  // ── Radius ────────────────────────────────────────────────────────────────
  md.push("\n## Radius\n");
  const radii = pick(root, (k) => k.startsWith("--radius-"));
  md.push(
    table(
      ["Token", "Valeur"],
      radii.map(([k, v]) => [`\`${k}\``, `\`${v}\``]),
    ),
  );

  // ── Motion ────────────────────────────────────────────────────────────────
  md.push("\n## Motion\n");
  const motion = pick(
    root,
    (k) => k.startsWith("--dur-") || k.startsWith("--ease-"),
  );
  md.push(
    table(
      ["Token", "Valeur"],
      motion.map(([k, v]) => [`\`${k}\``, `\`${v}\``]),
    ),
  );

  // ── Layout ────────────────────────────────────────────────────────────────
  md.push("\n## Layout\n");
  const layout = pick(
    root,
    (k) => k.startsWith("--container-") || k.startsWith("--z-"),
  );
  md.push(
    table(
      ["Token", "Valeur"],
      layout.map(([k, v]) => [`\`${k}\``, `\`${v}\``]),
    ),
  );

  // ── Composants CSS globaux ────────────────────────────────────────────────
  md.push("\n## Composants CSS globaux\n");
  md.push(
    "Classes issues de `styles.css`. Les styles scoped des composants Vue ne sont pas listés ici.\n",
  );

  const skipTitles = new Set(["Global", "Reset & globals"]);
  for (const { title, classes } of sections) {
    if (skipTitles.has(title)) continue;
    // Skip sections that are only utility/import lines
    const filtered = classes.filter(
      (c) => !["root", "body", "where"].includes(c),
    );
    if (!filtered.length) continue;
    md.push(`### ${title}\n`);
    md.push(filtered.map((c) => `- \`.${c}\``).join("\n"));
    md.push("");
  }

  // ── Règles brand ──────────────────────────────────────────────────────────
  md.push("## Règles brand\n");

  md.push("### Copy\n");
  md.push(
    [
      "- Voix 1ère personne « je » — « je » porte les verbes d'action (j'anime, j'accompagne) ; « PXLC » est un nom de marque, jamais sujet d'un verbe d'action dans le copy page (exception : la mission verbatim)",
      "- 3e personne (« Andy Zébus, créateur de PXLC, accompagne… ») réservée aux meta/OG, mentions légales et documents qui engagent l'entité (devis, conventions, factures, dossiers de subvention)",
      "- Pas d'emoji, nulle part",
      "- **Vocabulaire interdit** : addiction, désintoxication, détox numérique, coach, expert, innovant, révolutionnaire — fondement : avis HCSP du 08/03/2021, la MILDECA préfère « usage problématique des écrans » ; utiliser ce terme",
      "- **Termes naked** (sans guillemets ni traduction) : HCSP, SESSAD, TCND, TND, hyperfocus",
      "- Espaces insécables avant `!`, `?`, `:`, `;`, `»` et entre nombre + unité (`48 h`, `20 min`, `100 €`)",
      "- Chiffres en numéraux sauf en début de phrase",
      "- `Parent-Écran-Enfant` avec majuscules",
      "- Ne jamais écrire « fondateur » — écrire « créateur de PXLC »",
      "- Nommer les clients : terme générique « les lieux d'accueil des familles » (court « les lieux ») ; en adresse directe, nommer le lieu (« votre médiathèque ») ou « votre structure »",
      "- Mission en une phrase : « PXLC accompagne les familles dans l'éducation numérique des enfants. »",
      "- Cadre réglementaire : toujours citer HCSP 2019-2020 · HAS 2020 ensemble",
      "- Toute affirmation santé/usage des écrans doit être sourcée depuis docs/references/ (document + section) — ne jamais inventer un chiffre ou une recommandation",
    ].join("\n"),
  );

  md.push("\n### Positionnement B2B\n");
  md.push(
    [
      "- **Principe** : intervenir dans les lieux qui accueillent déjà des familles — le lieu apporte le public, j'apporte l'atelier et le cadre",
      "- **Clients** = les lieux d'accueil des familles : médiathèques et collectivités, centres sociaux et espaces de vie sociale, LAEP, structures médico-sociales (SESSAD, IME, CMPP, CAMSP), dispositifs CLAS — les familles sont bénéficiaires, pas clients directs",
      "- **Levier de financement** : appels à projets parentalité de la CAF (FNP, ex-REAAP) — le lieu porte le dossier, PXLC intervient comme prestataire externe",
      "- **Posture** : partenaire institutionnel — jamais coach, expert ou gadget",
      "- **Jeu vidéo** = outil de médiation légitime — jamais un problème à résoudre",
      "- **Différenciateur** : seul pont entre 3 mondes — culture joueur / cadre du soin / langage institutionnel",
    ].join("\n"),
  );

  md.push("\n### Les 3 casquettes (ancres de légitimité)\n");
  md.push(
    [
      "1. **Organisateur esport** — Plus de 6 ans sur la scène esport guadeloupéenne, Destreland Gaming Cup. Connaissance de la communauté joueurs de l'intérieur.",
      "2. **Médiateur formé** — Formateur Simplon Outre-Mer 2021-2022. Travail dans le cadre HCSP · HAS.",
      "3. **Conseil institutionnel** — Affaires européennes et numérique THD, Région Guadeloupe. Parle le langage des projets de service et des financements publics.",
    ].join("\n"),
  );

  md.push("\n### Nommage des composants Vue\n");
  // Les listes d'exemples sont dérivées de app/components/ — seule la règle
  // (l'attribution d'un préfixe) est de la prose.
  const ticks = (arr) => arr.map((n) => `\`${n}\``).join(", ");
  const pxlcNames = components.filter((n) => n.startsWith("Pxlc"));
  const siteNames = components.filter((n) => n.startsWith("Site"));
  const blogNames = components.filter((n) => n.startsWith("Blog"));
  const plainNames = components.filter(
    (n) =>
      !pxlcNames.includes(n) &&
      !siteNames.includes(n) &&
      !blogNames.includes(n),
  );
  md.push(
    [
      `- **\`Pxlc*\`** — primitives de marque réutilisables partout : ${ticks(pxlcNames)}`,
      `- **\`Site*\`** — chrome du site (présent sur toutes les pages) : ${ticks(siteNames)}`,
      `- **\`Blog*\`** — composants propres au contexte blog : ${ticks(blogNames)}`,
      `- **Sans préfixe** — sections de page, blocs de contenu et utilitaires autonomes : ${ticks(plainNames)}`,
      "- Deux mots minimum par nom (style guide Vue — évite les collisions avec de futurs éléments HTML natifs)",
    ].join("\n"),
  );

  md.push("\n### Visuel\n");
  md.push(
    [
      "- Coral max **5 %** des pixels par page ou image",
      "- Un seul CTA primaire par section",
      "- Jamais de texte blanc sur fond coral — utiliser `--pxlc-text-ink`",
      "- Pas de gradients, pas d'emoji en iconographie",
    ].join("\n"),
  );

  md.push("\n### OG Images\n");
  md.push(
    [
      "- Composant : `app/components/OgImage/PxlcOg.takumi.vue`",
      "- Générées au build (`ogImage.zeroRuntime: true`) — non disponibles en dev",
      "- Carte de marque statique (logo + tagline), identique sur toutes les pages",
      "- Chaque page l'active via `defineOgImage('PxlcOg')` (le composant n'accepte pas de props)",
    ].join("\n"),
  );

  // ── Écriture ──────────────────────────────────────────────────────────────
  const contentLF = md.join("\n") + "\n";
  const wrote = await writeFilePreservingEol(OUTPUT, contentLF);
  console.log(
    wrote
      ? `export-design: ${OUTPUT} écrit (${contentLF.length} chars, ${contentLF.split("\n").length} lignes)`
      : `export-design: ${OUTPUT} déjà à jour`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
