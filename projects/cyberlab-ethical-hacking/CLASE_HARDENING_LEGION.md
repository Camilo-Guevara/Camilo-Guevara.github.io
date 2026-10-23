# Cierre de clase: Hardening, puertos filtrados, Legion y continuidad operativa

**Materia:** Redes y Ciberseguridad · IFTS N.º 9  
**Docente:** Héctor Salico  
**Fuente:** transcripción oral proporcionada por el estudiante (cierre de la demostración).  
**Estado:** apunte teórico, sin pruebas nuevas ejecutadas en CyberLab.

## Lo que el docente explicó

El docente concluye el ejercicio de Kali Linux contra la máquina deliberadamente vulnerable: tras revisar los servicios expuestos y hablar de su desactivación, vuelve a analizar el puerto 21 (FTP) con Nmap y comenta que el resultado aparece «filtrado». Presenta también Legion como otra herramienta para reconocer sistemas, servicios, puertos y versiones. El objetivo no es practicar ataques contra terceros, sino entender los riesgos de sistemas desactualizados y servicios innecesarios. Cierra recomendando aplicar parches, hacer hardening, vigilar logs y mantener un sistema de respaldos que se haya probado.

## Conceptos esenciales

- **Hardening:** reducir la superficie de ataque mediante configuración, actualización y supresión controlada de funcionalidades que no aportan al negocio.
- **`21/tcp open`:** el puerto acepta conexiones, según la respuesta al sondeo.
- **`21/tcp closed`:** no se detecta un servicio que escuche en ese puerto, aunque el host responda.
- **`21/tcp filtered`:** la exploración no puede determinar si el puerto está abierto o cerrado, por ejemplo debido a un filtrado. **No** demuestra por sí solo que se haya eliminado FTP.
- **Nmap:** descubrimiento y enumeración de puertos/servicios. Una versión identificada es una pista para investigar, no evidencia definitiva de que exista una vulnerabilidad.
- **Legion:** interfaz de reconocimiento y enumeración que integra herramientas de exploración. La herramienta visualiza información pero no reemplaza la validación manual del analista.
- **Logging y monitoreo:** reunir eventos relevantes y detectar patrones; no todo escaneo corresponde a un ataque.
- **Backup:** para considerarlo funcional deben verificarse no solo las copias, sino también las pruebas de restauración. Los snapshots de VirtualBox no sustituyen respaldos independientes.

## Comprobación didáctica: antes y después

**Exclusivamente en una VM propia, vulnerable por diseño, sin conexión externa**. La IP es **propuesta para el nuevo laboratorio**, NO la IP del equipo mostrado por el docente.

```bash
# Desde Kali, con Metasploitable en una Internal Network aislada:
nmap -p 21 192.168.56.20
nmap -sV -p 21,22,80 192.168.56.20
```

**Evidencia antes:** captura de puertos y versiones identificadas.  
**Medida defensiva:** en un servidor administrado legítimamente, detener/deshabilitar de forma controlada los servicios FTP que no se necesitan, revisar dependencias y aplicar parches compatibles. Metasploitable 2 es un entorno antiguo; sus comandos de servicio no deben confundirse con los de Ubuntu moderno.  
**Evidencia después:** volver a consultar el puerto y explicar correctamente si Nmap indica `closed` o `filtered`. Complementar con inspección local de los servicios y reglas de firewall cuando sea posible.

## Recomendaciones del profesor — matriz de aplicación

| Recomendación | Riesgo reducido | Evidencia solicitada |
|---|---|---|
| Parches de seguridad | Explotación de fallas conocidas | Inventario de versiones y actualizaciones |
| Servicios necesarios únicamente | Puertos y funcionalidades expuestas | Lista antes/después de servicios |
| Hardening | Configuraciones inseguras y permisos excesivos | Lista de verificación con cambios autorizados |
| Monitoreo de logs | Detección tardía de incidentes | Registros relevantes, sin datos sensibles |
| Backup probado | Imposibilidad de restaurar tras una falla | Evidencia de prueba de recuperación |

## Relación con la tríada CIA

- **Confidencialidad:** credenciales, archivos y comunicaciones expuestas.
- **Integridad:** modificaciones no autorizadas de archivos/configuración.
- **Disponibilidad:** interrupciones de servicios y capacidad de recuperarlos.

## Preguntas de parcial

1. ¿Por qué `filtered` no equivale a «FTP eliminado»?
2. ¿Cuál es la diferencia entre desactivar un servicio, bloquear un puerto y actualizar un paquete?
3. ¿Por qué identificar la versión de un servicio ayuda a priorizar una auditoría pero no confirma una CVE?
4. ¿Qué evidencias servirían para probar que un control de hardening realmente funcionó?
5. ¿Por qué un snapshot no reemplaza una copia de seguridad independiente?

**Límite de la evidencia:** el audio está parcialmente transcrito y no aporta capturas ni salidas completas. No atribuir a nuestro CyberLab resultados no ejecutados.
