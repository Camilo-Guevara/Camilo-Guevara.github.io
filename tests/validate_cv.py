"""Comprobaciones estáticas del CV digital sin dependencias de terceros."""
from html.parser import HTMLParser
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
JS = (ROOT / "js/app.js").read_text(encoding="utf-8")
CSS = (ROOT / "css/styles.css").read_text(encoding="utf-8")
DEMO = "https://casino-estadistico-ubpy8lsfkqbb8yh6teansn.streamlit.app/"
REPO = "https://github.com/Camilo-Guevara/Casino-Estadistico"


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.projects = []
        self.images = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "a":
            self.links.append(a)
        if tag == "img":
            self.images.append(a)
        if tag == "button" and "project-selector" in a.get("class", "").split():
            self.projects.append(a)


parser = SiteParser()
parser.feed(HTML)
expected = ["casino", "titanic", "frugi", "cyberlab", "ecommerce"]
actual = [project.get("data-project") for project in parser.projects]
assert actual == expected, f"Selector de proyectos inconsistente: {actual}"
assert [p.get("data-project") for p in parser.projects if p.get("aria-pressed") == "true"] == ["casino"]
assert len(parser.ids) == len(set(parser.ids)), "ID duplicado en HTML"
ids = set(parser.ids)
for link in parser.links:
    href = link.get("href", "")
    if href.startswith("#") and len(href) > 1:
        assert href[1:] in ids, f"Ancla inexistente: {href}"
    if link.get("target") == "_blank":
        assert "noopener" in link.get("rel", ""), f"Falta protección noopener: {href}"
for image in parser.images:
    assert image.get("alt"), f"Imagen sin alt: {image.get('src')}"
assert DEMO in HTML and REPO in HTML, "Faltan enlaces externos a la demo y al código"
assert DEMO in JS and REPO in JS, "Faltan enlaces en el panel dinámico de proyectos"
start = JS.index("const projects = {")
end = JS.index("function showProject(", start)
project_source = JS[start:end]
keys = re.findall(r"(?m)^  ([a-z]+): \{title:", project_source)
assert sorted(keys) == sorted(expected), f"Objetos de proyectos incompletos: {keys}"
assert "showProject('casino')" in JS, "Casino debe aparecer seleccionado inicialmente"
assert "repeat(2,minmax(0,1fr))" in CSS, "Falta diseño adaptable del selector móvil"
assert (ROOT / "css/styles.css").is_file()
assert (ROOT / "js/app.js").is_file()
badge_path = ROOT / "assets/certificates/insignia-entende-bitcoin-2025.webp"
assert badge_path.is_file(), "Falta imagen de insignia Bitcoin"
assert badge_path.read_bytes()[:4] == b"RIFF" and badge_path.read_bytes()[8:12] == b"WEBP", "Insignia Bitcoin corrupta o formato incorrecto"
assert "Entendé Bitcoin: Primeros pasos en el mundo cripto" in HTML, "Falta microcredencial de Bitcoin"
assert any(image.get("src") == "assets/certificates/insignia-entende-bitcoin-2025.webp" for image in parser.images), "No se muestra insignia real de Bitcoin"
print("Validado: 5 proyectos, Casino destacado, enlaces, IDs, accesibilidad básica y CSS móvil.")
