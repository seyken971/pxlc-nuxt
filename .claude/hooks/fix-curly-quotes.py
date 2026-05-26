"""
PostToolUse hook — remplace les guillemets typographiques par des apostrophes droites.

L'outil Edit peut introduire des guillemets typographiques comme délimiteurs
de string JS, ce qui casse ESLint ("Parsing error: Invalid character").

Remplacements globaux (toujours sûrs) :
  U+2018 ' LEFT SINGLE QUOTATION MARK  → U+0027 ' (apostrophe droite)
  U+201C " LEFT DOUBLE QUOTATION MARK  → U+0022 " (guillemet droit)

Remplacement dans les blocs <script> des .vue (et dans .ts/.js/.mjs) :
  U+2019 ' RIGHT SINGLE QUOTATION MARK → U+0027 '
    Dans les blocs <script>, U+2019 est invalide comme délimiteur JS
    quelle que soit sa position. Les apostrophes françaises en contenu
    de string (d'un, l'équipe) sont tout aussi valides avec U+0027.
    Dans le <template>, U+2019 reste intact (apostrophes typographiques
    dans le HTML visible : l'esport, d'Andy...).

Remplacement ciblé (contextes v-bind Vue uniquement) :
  U+2019 dans les valeurs d'attributs Vue dynamiques (:prop="...",
  @event="...", v-bind:prop="...", v-on:event="..."). Ces valeurs sont
  du JS pur — U+2019 y est invalide comme délimiteur.

Remplacement ciblé (props statiques contenant du HTML) :
  U+2019 → U+0027 dans les valeurs de props statiques dont le contenu
  contient une balise HTML (ex: title="...<span class='x'>...").
  Signal : présence de `<` ou `>` dans la valeur de l'attribut.
  Ces valeurs sont destinées à v-html — U+2019 y est invalide comme
  délimiteur d'attribut HTML.

U+201D " RIGHT DOUBLE QUOTATION MARK n'est pas remplacé.
"""
import json
import re
import sys

# Attributs Vue dynamiques : :prop="...", @event="...", v-bind:prop="...", v-on:event="..."
# [\w.-]+ couvre aria-label, data-foo, etc.
_VBIND_RE = re.compile(r'(?:v-bind:|v-on:|:|@)[\w.-]+="([^"]*)"')

# Props statiques dont la valeur contient du HTML embarqué (signal : < ou >).
# Capture les attributs non-dynamiques (pas précédés de : @ v-bind: v-on:).
# Lookbehind négatif vérifie que ce n'est pas un attribut dynamique.
_STATIC_HTML_PROP_RE = re.compile(
    r'(?<![=:\w])(?:[\w-]+)="([^"]*(?:<|>)[^"]*)"'
)

# Blocs <script> dans les .vue (y compris <script setup lang="ts">).
_SCRIPT_BLOCK_RE = re.compile(r'(<script[^>]*>)(.*?)(</script>)', re.DOTALL)


def _fix_vbind_quotes(content: str) -> str:
    """Remplace U+2019 par U+0027 uniquement dans les valeurs d'attributs Vue dynamiques."""
    def _fix_match(m: re.Match) -> str:
        return m.group(0).replace('’', "'")
    return _VBIND_RE.sub(_fix_match, content)


def _fix_static_html_prop_quotes(content: str) -> str:
    """Remplace U+2019 par U+0027 dans les props statiques contenant du HTML embarqué."""
    def _fix_match(m: re.Match) -> str:
        return m.group(0).replace('’', "'")
    return _STATIC_HTML_PROP_RE.sub(_fix_match, content)


def _fix_script_block_quotes(content: str) -> str:
    """Remplace U+2019 par U+0027 dans tous les blocs <script>.

    En dehors du <template>, U+2019 n'est jamais une apostrophe typographique
    légitime — c'est toujours soit un délimiteur JS invalide, soit du contenu
    de string où U+0027 est équivalent.
    """
    def _replace(m: re.Match) -> str:
        return m.group(1) + m.group(2).replace('’', "'") + m.group(3)
    return _SCRIPT_BLOCK_RE.sub(_replace, content)


d = json.load(sys.stdin)
f = d.get("tool_input", {}).get("file_path", "")

if not f or not any(f.endswith(e) for e in (".vue", ".ts", ".js", ".mjs")):
    sys.exit(0)

try:
    with open(f, encoding="utf-8") as fh:
        content = fh.read()

    # 1. Remplacements globaux (guillemets ouvrants)
    fixed = (
        content
        .replace(chr(0x2018), "'")   # ' → '
        .replace(chr(0x201C), '"')   # " → "
    )

    # 2. U+2019 dans les blocs <script> des .vue, et globalement dans .ts/.js/.mjs
    if f.endswith(".vue"):
        fixed = _fix_script_block_quotes(fixed)
        fixed = _fix_vbind_quotes(fixed)
        fixed = _fix_static_html_prop_quotes(fixed)
    else:
        # Fichiers JS purs — aucun template, U+2019 invalide partout
        fixed = fixed.replace(chr(0x2019), "'")

    if fixed != content:
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(fixed)
        print(f"[hook] guillemets typographiques corrigés dans {f}")
except Exception as e:
    print(f"[hook] fix-curly-quotes ignoré : {e}", file=sys.stderr)
