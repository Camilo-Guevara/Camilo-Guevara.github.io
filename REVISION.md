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

## Actualización de credenciales — 23 de octubre de 2026
- Incorporada la microcredencial digital «Entendé Bitcoin: primeros pasos en el mundo cripto», emitida por la Agencia de Habilidades para el Futuro el 3 de julio de 2025.
- La imagen procede de la insignia aportada por el titular. Se convirtió a WebP para un recurso liviano (200 × 200 px), conservando la apariencia de la fuente.
- Se identifica la ONG Bitcoin Argentina como responsable de contenidos y disertaciones, no como emisora de la microcredencial.
- Se informa la vigencia original de un año (ya finalizada en julio de 2026); no se muestra un enlace privado de recepción como verificación pública.
- La validación estática ahora comprueba la referencia HTML y existencia/firma WebP del recurso. Verificar el resultado de GitHub Actions para confirmar el despliegue.
