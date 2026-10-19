# Revisión del CV digital — 19 de octubre de 2026

## Integración de Casino Estadístico
- Agregado como primer proyecto del selector de portafolio: cinco tarjetas en total.
- Descripción académica, propósito, tecnologías, limitaciones, demo y repositorio enlazados.
- Se mantiene Titanic Survival Analytics y los proyectos Frugi, CyberLab y E-commerce.
- Aptitudes de Ciencia de Datos y asistente local actualizados, sin atribuir experiencia profesional todavía en formación.
- Estilo Cyber-Dark preservado y selector de proyectos adaptado para pantallas pequeñas.
- Metadatos del CV y README actualizados.

## Verificaciones automáticas
El workflow `Validación CV digital` ejecuta:
1. `node --check js/app.js` para sintaxis JavaScript.
2. `python tests/validate_cv.py` para verificar los cinco proyectos, selección inicial, enlaces a la demo y al código, IDs únicos, anclas, enlaces externos protegidos y alt de imágenes.

La aplicación externa Casino Estadístico fue validada previamente en su propio repositorio con Playwright: carga pública, simulación de un lote y calibración con datos reales, así como renderizado móvil a 390 px.

## Límites
Las pruebas estáticas de este portafolio no sustituyen la comprobación visual de GitHub Pages en un navegador. Aún conviene verificar a 1440, 1024, 768, 390 y 320 px; navegación con teclado; contraste y Lighthouse. La disponibilidad de Streamlit puede variar si la aplicación está inactiva.

## Publicación
El sitio se publica desde la rama `main` mediante GitHub Pages una vez integrados los cambios:
- https://camilo-guevara.github.io/#proyectos
- https://github.com/Camilo-Guevara/Camilo-Guevara.github.io

## Revisión histórica
La revisión del 16 de octubre de 2026 cubría los primeros proyectos, sintaxis JS, DOM simulado y estructura HTML. Esta revisión actualiza el alcance para Casino Estadístico y sustituye las referencias históricas a publicación pendiente.
