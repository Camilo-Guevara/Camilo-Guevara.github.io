# Intersecciones y topografía · Pulso Vial

Edición 2026-11-11. Se conservan los 696 hechos y 717 víctimas de 2016–2021, filtros, gráficos, CSV y explorador 3D.

## Evidencia de intersección

Se enlaza HECHOS del [archivo oficial](https://cdn.buenosaires.gob.ar/datosabiertos/datasets/transporte-y-obras-publicas/victimas-siniestros-viales/homicidios.xlsx) por ID; se comprueba el número de hechos y N_VICTIMAS. Su diccionario define Cruce como «cruce en caso de que sea una encrucijada». Calle/Cruce válidos documentan el cruce en el registro; no prueban geometría a nivel ni constituyen auditoría de campo. Texto con dos partes unidas por y/e/esquina/intersección, sin par oficial utilizable: indicio heurístico separado. Ausencia de ambos: sin confirmar, nunca automáticamente fuera de intersección.

Normalización conservadora: mayúsculas, acentos, puntuación, espacios, Avenida/AV, General/GRAL y orden del par. Sin fusiones difusas, geocodificación inventada ni centroides. Las variantes originales quedan visibles. Rankings por hechos y víctimas, sin tasas de exposición ni inferencias causales. Las coordenadas originales se conservan, incluso si puntos de un mismo grupo no coinciden. Enlaces y cruces a distinto nivel requieren validación adicional.

## MDT real derivado de curvas oficiales

Fuente: GCBA, [Elevación terreno](https://data.buenosaires.gob.ar/dataset/elevacion-terreno), recurso [CSV](https://cdn.buenosaires.gob.ar/datosabiertos/datasets/secretaria-de-desarrollo-urbano/elevacion-terreno/curvas-de-nivel.csv), CC-BY-2.5-AR. Descargado 2026-11-11. No se usa Mapzen ni la exageración del explorador para calcular pendientes. No se presenta el resultado como un raster MDT oficial: es un modelo de terreno derivado reproducible de curvas reales.

Se toman vértices WGS84 de GEOMETRY y elevación COTA; coordenadas transformadas a UTM 21S (EPSG:32721), metros. Se excluyen vértices repetidos con cotas contradictorias. Triangulación Delaunay e interpolación lineal TIN de 82.975 vértices. Se rechazan muestras fuera de la envolvente, triángulos con arista máxima >400 m y puntos a >150 m del vértice más cercano. Son reglas de cobertura exploratorias, no certificación de exactitud.

Cota: TIN en la coordenada del hecho. Pendiente porcentual: `100 × sqrt(((zE-zO)/100)^2 + ((zN-zS)/100)^2)`, muestras a ±50 m, todas sujetas a las mismas reglas. No se extrapolan faltantes. 563 hechos con cota; 526 con pendiente y 170 sin pendiente. El resultado describe gradiente del terreno a escala aproximada de 100 m, no pendiente de calzada. Puentes, túneles y rampas no se resuelven. Sin orientación de circulación no se identifica subida o bajada.

Las cotas enteras y LINEAS-NIVEL-1M son atributos del recurso. Datum vertical, fecha de adquisición y exactitud vertical no están documentados en lo consultado. Un TIN puede crear triángulos planos y artefactos, y el gradiente depende de interpolación y escala. No hay validación contra puntos de control. No se interpreta el porcentaje por clases como porcentaje comprobado de accidentes en calles inclinadas. Se muestra cobertura y denominador; faltantes pueden sesgar resultados. Cortes 2 % y 5 % son exploratorios, sin significado normativo. No se establece causalidad, riesgo relativo ni geología.

## Reproducir

Instalar numpy, scipy, pyproj y openpyxl. Descargar las dos fuentes en una carpeta con nombres `curvas.csv` y `homicidios.xlsx`. Ejecutar `python preparar-analisis.py <carpeta>`. Se genera `analisis-datos.json` con resultados por ID y SHA-256 de cada fuente. Versiones usadas: numpy 2.5.4, scipy 1.18.1, pyproj 3.8.0, openpyxl 3.1.5. Los insumos pueden cambiar; comparar las huellas antes de reproducir. Las fuentes originales no se alteran.

## Hipótesis de intervención

Por punto: recuentos, víctimas peatonales, franja 20–05:59 y tipo avenida motivan hipótesis, no diagnósticos. Cada propuesta incluye comprobaciones de campo y aforos necesarios. El horario no prueba oscuridad; una avenida no prueba falta de semáforos. Las referencias generales son [FHWA, Proven Safety Countermeasures](https://highways.dot.gov/safety/proven-safety-countermeasures) y [OMS, Save LIVES](https://www.who.int/publications/i/item/save-lives-a-road-safety-technical-package). No se asignan beneficios numéricos ni prioridades de obra sin auditoría local.
