"""Smoke test visual del CV digital local en Chromium usando Playwright."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
URL = (ROOT / "index.html").as_uri()
OUT = ROOT / "artifacts" / "cv"
OUT.mkdir(parents=True, exist_ok=True)

def verify(page, mobile=False):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(URL, wait_until="load")
    selectors = page.locator(".project-selector")
    assert selectors.count() == 5, f"Se esperaban cinco proyectos; hay {selectors.count()}"
    assert page.locator(".project-detail h3").inner_text() == "Casino Estadístico"
    assert page.locator(".project-selector[data-project='casino']").get_attribute("aria-pressed") == "true"
    assert page.locator(".project-body a[href='https://casino-estadistico-ubpy8lsfkqbb8yh6teansn.streamlit.app/']").count() == 1
    assert page.locator(".project-body a[href='https://github.com/Camilo-Guevara/Casino-Estadistico']").count() == 1
    page.locator(".project-selector[data-project='titanic']").click()
    assert page.locator(".project-detail h3").inner_text() == "Titanic Survival Analytics"
    page.locator(".project-selector[data-project='casino']").click()
    assert page.locator(".project-detail h3").inner_text() == "Casino Estadístico"
    assert not errors, f"Errores JavaScript: {errors}"
    if mobile:
        width = page.evaluate("document.documentElement.scrollWidth")
        print(f"Móvil: documento {width}px / viewport 390px", flush=True)
        assert width <= 400, f"Desbordamiento horizontal móvil: {width}px"
    page.screenshot(path=str(OUT / ("cv-mobile.png" if mobile else "cv-escritorio.png")), full_page=True)
    print(f"OK: CV {'móvil' if mobile else 'escritorio'}, cinco proyectos, botones y enlaces.", flush=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
    try:
        verify(browser.new_page(viewport={"width": 1440, "height": 900}))
        verify(browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True), mobile=True)
    finally:
        browser.close()
