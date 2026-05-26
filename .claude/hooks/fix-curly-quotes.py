"""
PostToolUse hook — remplace les guillemets typographiques par des apostrophes droites.

L'outil Edit peut introduire des guillemets typographiques comme délimiteurs
de string JS, ce qui casse ESLint ("Parsing error: Invalid character").

Remplacements globaux (toujours sûrs) :
  U+2018 ' LEFT SINGLE QUOTATION MARK  → U+0027 ' (apostrophe droite)
  U+201C " LEFT DOUBLE QUOTATION MARK  → U+0022 " (guillemet droit)

Remplacement intelligent dans les blocs <script> des .vue (et dans .ts/.js/.mjs) :
  U+2019 ' RIGHT SINGLE QUOTATION MARK → U+0027 '
    SEULEMENT si U+2019 est en position de délimiteur, c'est-à-dire
    NON flanqué de deux word chars Unicode.

  Heuristique : un U+2019 entre deux word chars (ex: d'évaluation, l'équipe)
  est une apostrophe de contenu — valide en JS dans une string, conservée.
  Un U+2019 suivi d'une virgule, parenthèse, fin de ligne, etc. est un
  délimiteur fermant invalide — remplacé par U+0027.

  Exemples :
    'duree'          (U+2018 + U+2019)  →  'duree'           ✓
    'indicateurs d'évaluation'           →  'indicateurs d'évaluation'
      ^U+2018                ^U+2019(×2)   ^U+0027        ^U+2019 conservé  ^U+0027

Remplacement ciblé (contextes v-bind Vue uniquement) :
  U+2019 dans les valeurs d'attributs Vue dynamiques (:prop="...",
  @event="...", v-bind:prop="...", v-on:event="..."). Même logique
  d'heuristique word-char appliquée.

Remplacement ciblé (props statiques contenant du HTML) :
  U+2019 → U+0027 dans les valeurs de props statiques dont le contenu
  contient une balise HTML (signal : présence de < ou > dans la valeur).

U+201D " RIGHT DOUBLE QUOTATION MARK n'est pas remplacé.
"""
import json
import re
import sys

# ---------------------------------------------------------------------------
# Patterns compilés
# ---------------------------------------------------------------------------

# Blocs <script> dans les .vue (y compris <script setup lang="ts">).
_SCRIPT_BLOCK_RE = re.compile(r'(<script[^>]*>)(.*?)(</script>)', re.DOTALL)

# U+2019 délimiteur : NON flanqué de deux word chars Unicode.
# Exemple conservé  : d'évaluation  (d=\w, é=\w → pas de match)
# Exemple remplacé  : 'test',       (` après U+2019 = non-\w → match)
#
# Le pattern "(?<!\w)’ | ’(?!\w)" signifie :
#   U+2019 non précédé d'un word char  OU  U+2019 non suivi d'un word char
#   → on ne touche que les U+2019 qui ne sont pas entre deux lettres/chiffres.
_U2019_DELIMITER_RE = re.compile(r'(?<!\w)’|’(?!\w)', re.UNICODE)

# Attributs Vue dynamiques : :prop="...", @event="...", v-bind:prop="...", v-on:event="..."
_VBIND_RE = re.compile(r'(?:v-bind:|v-on:|:|@)[\w.-]+="([^"]*)"')

# Props statiques dont la valeur contient du HTML embarqué (signal : < ou >).
_STATIC_HTML_PROP_RE = re.compile(
    r'(?<![=:\w])(?:[\w-]+)="([^"]*(?:<|>)[^"]*)"'
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _fix_js_quotes(text: str) -> str:
    """Corrige les guillemets typographiques dans du JS/TS.

    - U+2018 ' → ' (toujours délimiteur ouvrant, jamais apostrophe de contenu)
    - U+2019 ' → ' seulement si délimiteur (non flanqué de deux word chars)
    - U+2019 entre deux word chars (d'évaluation, l'équipe, s'étend…) → conservé
    """
    text = text.replace('‘', "'")
    text = _U2019_DELIMITER_RE.sub("'", text)
    return text


def _fix_script_block_quotes(content: str) -> str:
    """Applique _fix_js_quotes dans tous les blocs <script>."""
    def _replace(m: re.Match) -> str:
        return m.group(1) + _fix_js_quotes(m.group(2)) + m.group(3)
    return _SCRIPT_BLOCK_RE.sub(_replace, content)


def _fix_vbind_quotes(content: str) -> str:
    """Corrige les guillemets dans les valeurs d'attributs Vue dynamiques."""
    def _fix_match(m: re.Match) -> str:
        return _fix_js_quotes(m.group(0))
    return _VBIND_RE.sub(_fix_match, content)


def _fix_static_html_prop_quotes(content: str) -> str:
    """Corrige les guillemets dans les props statiques contenant du HTML embarqué."""
    def _fix_match(m: re.Match) -> str:
        return _fix_js_quotes(m.group(0))
    return _STATIC_HTML_PROP_RE.sub(_fix_match, content)


# ---------------------------------------------------------------------------
# Tests inline
# ---------------------------------------------------------------------------
# Cas couverts :
#   1. Paire simple U+2018/U+2019 sans apostrophe interne
#   2. U+2019 apostrophe de contenu conservée (entre deux word chars)
#   3. Cas mixte : ouverture U+2018 + apostrophe U+2019 interne + fermeture U+2019
#   4. U+2019 suivi d'une virgule → délimiteur fermant
#   5. U+2019 en fin de ligne → délimiteur fermant
#   6. U+2019 entre lettre et lettre accentuée (ex : d'évaluation)
#   7. U+2018 en milieu de phrase → toujours remplacé
# ---------------------------------------------------------------------------
_TESTS = [
    # (input, expected_output, description)

    # Cas 1 — paire simple
    ("‘duree’",
     "'duree'",
     "U+2018+U+2019 paire simple"),

    # Cas 2 — apostrophe de contenu conservée (straight-quoted string)
    ("a = 'indicateurs d’évaluation'",
     "a = 'indicateurs d’évaluation'",
     "apostrophe contenu entre d et é conservée"),

    # Cas 3 — U+2018 ouvrant + apostrophe interne U+2019 + U+2019 fermant
    ("‘Quelle durée d’un dispositif’",
     "'Quelle durée d’un dispositif'",
     "U+2018 open + apostrophe d’un + U+2019 close"),

    # Cas 3b — string avec plusieurs apostrophes internes
    ("‘l’équipe s’engage’",
     "'l’équipe s’engage'",
     "deux apostrophes internes, U+2019 close final"),

    # Cas 4 — U+2019 suivi d'une virgule
    ("q: ‘test’,",
     "q: 'test',",
     "U+2019 close avant virgule"),

    # Cas 5 — U+2019 en fin de ligne
    ("q: ‘test’\n",
     "q: 'test'\n",
     "U+2019 close en fin de ligne"),

    # Cas 6 — apostrophe accentuée : d'évaluation (d + U+2019 + é)
    ("d’évaluation",
     "d’évaluation",
     "apostrophe d’évaluation conservée"),

    # Cas 7 — U+2018 isolé → toujours remplacé
    ("title: ‘Mon titre’",
     "title: 'Mon titre'",
     "U+2018 remplacé globalement"),

    # Cas 8 — U+2019 après '?' (non-word) → remplacé (délimiteur)
    ("{ q: ‘test ?’, a: 'foo' }",
     "{ q: 'test ?', a: 'foo' }",
     "U+2019 après ? → délimiteur"),
]


def _run_tests() -> None:
    errors = []
    for inp, expected, desc in _TESTS:
        result = _fix_js_quotes(inp)
        if result != expected:
            errors.append(
                f"FAIL [{desc}]\n"
                f"  input:    {repr(inp)}\n"
                f"  got:      {repr(result)}\n"
                f"  expected: {repr(expected)}"
            )
    if errors:
        print("[hook] fix-curly-quotes: TESTS ÉCHOUÉS", file=sys.stderr)
        for e in errors:
            print(e, file=sys.stderr)
        sys.exit(1)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
d = json.load(sys.stdin)
f = d.get("tool_input", {}).get("file_path", "")

if not f or not any(f.endswith(e) for e in (".vue", ".ts", ".js", ".mjs")):
    sys.exit(0)

_run_tests()

try:
    with open(f, encoding="utf-8") as fh:
        content = fh.read()

    # 1. Remplacements globaux (guillemets ouvrants + doubles)
    fixed = (
        content
        .replace(chr(0x2018), "'")   # ' → '  (avant _fix_js_quotes, idempotent)
        .replace(chr(0x201C), '"')   # " → "
    )

    # 2. U+2019 délimiteurs dans le JS
    if f.endswith(".vue"):
        fixed = _fix_script_block_quotes(fixed)
        fixed = _fix_vbind_quotes(fixed)
        fixed = _fix_static_html_prop_quotes(fixed)
    else:
        # Fichiers JS/TS purs — pas de template, appliquer partout
        fixed = _fix_js_quotes(fixed)

    if fixed != content:
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(fixed)
        print(f"[hook] guillemets typographiques corrigés dans {f}")
except Exception as e:
    print(f"[hook] fix-curly-quotes ignoré : {e}", file=sys.stderr)
