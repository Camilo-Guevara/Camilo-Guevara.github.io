# Camilo Guevara — CV creativo

Portafolio en español, desarrollado con HTML, CSS y JavaScript sin dependencias ni backend.

## Abrir
Extraer el ZIP completo y abrir `index.html`. Mantener `css/`, `js/` y `assets/` junto al HTML. `VISTA_PREVIA.html` es una copia autónoma de revisión que también puede abrirse sin carpetas auxiliares; no es necesaria para el despliegue.

## Contenido
- Presentación con la fotografía original aportada, integrada mediante CSS sin alterar el rostro.
- Terminal con información personal, estudios, intereses e idiomas.
- Áreas de habilidades seleccionables; sin porcentajes ni nivel senior.
- E-commerce académico enlazado a GitHub; Frugi y CyberLab descritos como prácticas académicas.
- Formación en curso: IFTS N.º 9 y UTN. Ingeniería Topográfica figura como estudios previos no finalizados.
- Asistente local de preguntas predefinidas, identificado como tal.
- Contacto por `mailto:`: prepara un correo; no envía ni almacena datos.
- La página constituye el CV creativo; no ofrece un PDF inexistente.

Los gráficos de proyectos son diagramas conceptuales originales, no capturas de aplicaciones. Frugi y CyberLab tienen documentación pública pendiente. No se presentan certificados completados ni proyectos de ciencia de datos inexistentes.

## Estructura
- `index.html`: contenido, metadatos y estructura semántica.
- `css/styles.css`: diseño, adaptación a pantalla, movimiento reducido e impresión.
- `js/app.js`: navegación, terminal, habilidades, proyectos, FAQ y contacto.
- `assets/images/camilo.jpeg`: foto suministrada por el titular.
- `assets/favicon.svg`: marca CG original.
- `.nojekyll`: publicación estática sin procesamiento Jekyll.

## Preparación para GitHub Pages
Destino propuesto: `Camilo-Guevara/Camilo-Guevara.github.io`.

1. Crear ese repositorio en GitHub e inicializarlo con README para disponer de `main`.
2. Crear una rama `portfolio/es-cv-creativo` desde `main`.
3. Subir `index.html`, `css/`, `js/`, `assets/`, `.nojekyll`, `.gitignore` y este README a la raíz de esa rama. No hace falta subir `VISTA_PREVIA.html` ni `REVISION.md`.
4. Abrir un pull request hacia `main`, revisar y aprobar. No fusionar sin autorización del titular.
5. Tras la aprobación y fusión, configurar Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
6. Comprobar la URL que indique GitHub. Los metadatos presuponen `https://camilo-guevara.github.io/`; ajustarlos si se utiliza otro repositorio o dominio.

Estado de esta entrega: repositorio creado; propuesta preparada en la rama `portfolio/es-cv-creativo`. Pendiente de revisión y fusión autorizada antes de publicar.

## Edición
La biografía y formación están en HTML; los datos de habilidades, proyectos y respuestas están en `app.js`. Las URLs externas usan `noopener noreferrer`. No incluir credenciales, claves API ni información privada en el repositorio público.

## Validación
Consultar `REVISION.md` para el alcance real de las comprobaciones y lo pendiente antes de publicar.
