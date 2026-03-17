#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
PARTIALS = SRC / "partials"

INCLUDE_RE = re.compile(r"<!--\s*@include\s+([a-zA-Z0-9_-]+)\s*-->")


def build() -> None:
    template_path = SRC / "index.template.html"
    template = template_path.read_text(encoding="utf-8")

    def repl(match: re.Match[str]) -> str:
        name = match.group(1)
        partial_path = PARTIALS / f"{name}.html"
        html = partial_path.read_text(encoding="utf-8").rstrip() + "\n"
        return html

    rendered = INCLUDE_RE.sub(repl, template)
    (ROOT / "index.html").write_text(rendered, encoding="utf-8")
    print("Built index.html from src/partials")


if __name__ == "__main__":
    build()

