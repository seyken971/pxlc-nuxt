"""
PostToolUse hook — vérifications après chaque Edit/Write.

Deux branches selon le fichier édité :

  content/**/*.md
    → node scripts/validate-content.mjs (frontmatter requis + limites SEO
      partagées dans scripts/seo-limits.mjs). Échec = exit 2 : le détail
      est renvoyé à Claude pour correction immédiate, au lieu d'attendre
      le prebuild.

  *.vue / *.ts / *.js / *.mjs
    → 1. fix-curly-quotes.py (même payload stdin) — séquencé ici plutôt
         qu'enregistré en parallèle pour éviter une écriture concurrente
         du même fichier.
      2. eslint --fix sur le fichier. Erreurs restantes = exit 2.

Convention Claude Code : exit 0 = ok, exit 2 = feedback bloquant renvoyé
au modèle (stderr).
"""
import json
import os
import subprocess
import sys

# Sortie UTF-8 quel que soit l'encodage console Windows (cp1252 par défaut).
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

payload = json.load(sys.stdin)
file_path = payload.get("tool_input", {}).get("file_path", "")
if not file_path:
    sys.exit(0)

norm = file_path.replace("\\", "/")
if any(seg in norm for seg in ("/node_modules/", "/.nuxt/", "/.output/", "/dist/")):
    sys.exit(0)

# Les hooks sont lancés depuis la racine du projet (ou du worktree).
ROOT = os.getcwd()
HOOKS_DIR = os.path.dirname(os.path.abspath(__file__))

# Ne traiter que les fichiers du projet courant.
if not os.path.abspath(file_path).lower().startswith(ROOT.lower()):
    sys.exit(0)


def run(cmd, **kwargs):
    return subprocess.run(
        cmd, capture_output=True, text=True,
        encoding="utf-8", errors="replace", **kwargs,
    )


# ---------------------------------------------------------------------------
# Articles @nuxt/content — frontmatter + limites SEO
# ---------------------------------------------------------------------------
if norm.endswith(".md") and "/content/" in norm:
    script = os.path.join(ROOT, "scripts", "validate-content.mjs")
    if not os.path.exists(script):
        sys.exit(0)
    r = run(["node", script])
    if r.returncode != 0:
        print(
            "[hook] validate-content a échoué après édition de "
            f"{file_path} :\n{r.stdout}{r.stderr}",
            file=sys.stderr,
        )
        sys.exit(2)
    print(f"[hook] validate-content OK ({file_path})")
    sys.exit(0)

# ---------------------------------------------------------------------------
# Code — guillemets typographiques puis ESLint --fix
# ---------------------------------------------------------------------------
if norm.endswith((".vue", ".ts", ".js", ".mjs")):
    curly = os.path.join(HOOKS_DIR, "fix-curly-quotes.py")
    if os.path.exists(curly):
        r = run([sys.executable, curly], input=json.dumps(payload))
        if r.stdout.strip():
            print(r.stdout.strip())

    eslint = os.path.join(ROOT, "node_modules", "eslint", "bin", "eslint.js")
    if not os.path.exists(eslint):
        sys.exit(0)
    r = run(["node", eslint, "--fix", file_path])
    if r.returncode != 0:
        print(
            f"[hook] ESLint signale des erreurs dans {file_path} "
            f"(après --fix) :\n{r.stdout}{r.stderr}",
            file=sys.stderr,
        )
        sys.exit(2)

sys.exit(0)
