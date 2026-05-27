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
import { readFile, writeFile } from "node:fs/promises";

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

// ── Main ───────────────────────────────────────────────────────────────────

const main = async () => {
  const [tokensCss, stylesCss] = await Promise.all([
    readFile(TOKENS, "utf8"),
    readFile(STYLES, "utf8"),
  ]);

  const root = parseRoot(tokensCss);
  const dark = parseDark(tokensCss);
  const sections = parseSections(stylesCss);

  const md = [];

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
        ["--bg", "--bg-soft", "--bg-elev", "--bg-rule", "--bg-glass"].includes(
          k,
        ),
    ],
    ["Texte", (k) => k === "--ink" || k === "--ink-quiet" || k === "--quiet"],
    ["Bordures", (k) => k === "--rule"],
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
  const layout = pick(root, (k) => k.startsWith("--container-"));
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
      "- Voix 1ère personne « je » — jamais « Andy Zébus accompagne » dans le copy page (OK dans meta/OG)",
      "- Pas d'emoji, nulle part",
      "- **Vocabulaire interdit** : addiction, désintoxication, détox numérique, coach, expert, innovant, révolutionnaire",
      "- **Termes naked** (sans guillemets ni traduction) : HCSP, SESSAD, TCND, TND, hyperfocus",
      "- Espaces insécables avant `!`, `?`, `:`, `;`, `»` et entre nombre + unité (`48 h`, `20 min`, `100 €`)",
      "- Chiffres en numéraux sauf en début de phrase",
      "- `Parent-Écran-Enfant` avec majuscules (pas parent-écran-enfant)",
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
      "- Chaque page surcharge via `defineOgImage('PxlcOg', { eyebrow, title, description })`",
    ].join("\n"),
  );

  // ── Écriture ──────────────────────────────────────────────────────────────
  const content = md.join("\n") + "\n";
  await writeFile(OUTPUT, content, "utf8");
  console.log(
    `export-design: ${OUTPUT} écrit (${content.length} chars, ${content.split("\n").length} lignes)`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
