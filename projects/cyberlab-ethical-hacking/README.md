# CyberLab · Ethical Hacking y Gestión de Vulnerabilidades

**Proyecto académico planificado · Redes y Ciberseguridad · IFTS N.º 9**

> **Estado:** Documentación inicial. Las máquinas Kali Linux y Metasploitable 2 **no están aún instaladas ni auditadas** en este proyecto. Los resultados, capturas y métricas están pendientes de obtenerse.

## Objetivo

Construir un laboratorio de seguridad **aislado y autorizado**, con Kali Linux como estación de auditoría y Metasploitable 2 como objetivo intencionalmente vulnerable. Observar inventario de red, exposición de servicios, tráfico Ethernet/IP, registros y medidas defensivas; comprender por qué actualizar y endurecer sistemas reduce riesgos. Comparar los hallazgos con prácticas de gestión de vulnerabilidades y defensa en profundidad.

## Alcance y límites

- Solo VMs propias, con autorización académica. No escanear ni atacar IPs externas.
- **Nunca** conectar Metasploitable a NAT, NAT Network, Bridged, Host-Only ni Internet. Usar exclusivamente **Internal Network** con nombre único `CyberLab-AttackLab`.
- Deshabilitar carpetas compartidas, portapapeles bidireccional, arrastrar/soltar y reenvíos de puertos en las VMs vulnerables.
- Las herramientas ofensivas se utilizarán solamente en pruebas controladas dentro del laboratorio.
- La red propuesta `192.168.56.0/24` no debe confundirse con la red histórica de CyberLab `10.10.10.0/24`. Revisar posibles solapamientos antes de asignar direcciones.
- Hacer snapshots iniciales; no publicar imágenes de discos, contraseñas privadas o capturas con datos personales.

## Arquitectura propuesta

| VM | Función | Red VirtualBox | IPv4 propuesta | Gateway |
|---|---|---|---|---|
| `CyberLab-Kali` | Auditoría autorizada | Internal Network: `CyberLab-AttackLab` | `192.168.56.10/24` | Ninguno |
| `CyberLab-Metasploitable2` | Sistema deliberadamente vulnerable | Internal Network: `CyberLab-AttackLab` | `192.168.56.20/24` | Ninguno |

**No crear un adaptador externo para la VM vulnerable.** Para actualizar Kali de forma independiente, apagar Metasploitable, desconectar la red de ataque y usar NAT solo temporalmente en Kali; volver al modo de red interna antes del experimento.

## Recursos oficiales

1. Kali Linux (imagen preconfigurada para VirtualBox): https://www.kali.org/get-kali/#kali-virtual-machines
2. Verificación de descargas Kali: https://www.kali.org/docs/introduction/download-official-kali-linux-images/
3. Metasploitable 2, Rapid7: https://docs.rapid7.com/metasploit/metasploitable-2/
4. Archivo de descarga de Metasploitable 2: https://sourceforge.net/projects/metasploitable/files/Metasploitable2/
5. VirtualBox y modos de red: https://www.virtualbox.org/manual/topics/networkingdetails.html

Metasploitable 2 es una VM deliberadamente insegura que suele distribuirse en ZIP con discos y archivos de configuración de VMware; no es obligatorio convertirla a OVA para ejecutarla en VirtualBox. Puede crearse una VM Linux y **adjuntar el disco virtual existente** (`.vmdk`) sin ejecutar una instalación de sistema.

## Herramientas de análisis

- **Nmap:** inventario y detección autorizada de servicios en el objetivo aislado.
- **Wireshark:** observar ARP, ICMP, TCP y protocolos en las capturas del segmento aislado.
- **Metasploit Framework:** marco de evaluación para actividades supervisadas. No es necesario realizar explotación para documentar exposición y riesgo.
- **PowerShell, VBoxManage, ip, ip route, ss y journalctl:** evidencia de configuración y registros.

## Fases y evidencias

| Fase | Trabajo | Evidencia requerida |
|---|---|---|
| 0. Preauditoría | Inventariar host Windows, almacenamiento, VirtualBox y VMs existentes | Capturas/registro de inventario |
| 1. Adquisición | Descargar desde fuentes oficiales, comprobar SHA-256 de Kali | Nombres, versiones y checksums |
| 2. Aislamiento | Crear red interna exclusiva y verificar ausencia de NIC externa en Metasploitable | Configuración de adaptadores de ambas VM |
| 3. Importación | Importar Kali; crear VM Linux para el disco VMware `.vmdk` de Metasploitable si procede | Información de VM, almacenamiento y estado |
| 4. Direccionamiento | Configurar IPv4 en `192.168.56.0/24`, sin gateway | `ip -br addr`, `ip route` |
| 5. Conectividad | Probar comunicación dentro de la red aislada | ICMP y observación ARP |
| 6. Inventario | Identificar servicios publicados, sin exceder el alcance | Tabla de servicios, puertos, protocolos y riesgos |
| 7. Análisis | Capturar paquetes y explicar handshake TCP, ARP y servicio | Capturas de Wireshark comentadas |
| 8. Controles | Proponer mitigaciones y plan de parches aplicable a sistemas reales | Matriz CIA + riesgo + control |
| 9. Recuperación | Comprobar snapshots y documentación de rollback | Lista de snapshots, sin restaurar datos ajenos |

## Plan de documentación

- `evidencias/01-inventario/`: hosts, redes, discos y VMs
- `evidencias/02-aislamiento/`: capturas de NIC y redes
- `evidencias/03-conectividad/`: direcciones y pruebas
- `evidencias/04-analisis/`: Wireshark, inventario y hallazgos
- `informes/`: informe de auditoría, matriz de riesgos y conclusiones

Las carpetas y capturas son estructura **propuesta** y se crearán solamente cuando se obtengan evidencias reales. No atribuir pruebas, detecciones, hallazgos ni mitigaciones todavía no realizadas.

## Criterios de aceptación

1. Kali y Metasploitable se ejecutan en la **misma red interna aislada**.
2. Metasploitable no tiene camino de red hacia el host, LAN física o Internet.
3. Las dos VMs tienen direccionamiento verificado; hay conectividad interna.
4. Se documentan servicios y riesgos con pruebas reproducibles y sin generar daño externo.
5. Las capturas y hashes son verificables.
6. Existen snapshots o respaldos adecuados.
7. El README y el CV describen con precisión el estado real del proyecto.

## Relación con el material de clase

La presentación `redes Virtualbox.pptx` desarrolla NAT, NAT Network, Internal Network y Bridged Adapter. La diapositiva 9 representa un laboratorio con Kali, Windows vulnerable, Wazuh y un firewall virtual. **Esta propuesta inicial es deliberadamente más pequeña**, con dos VMs y sin acceso exterior, para reducir complejidad y superficie de riesgo. Se puede ampliar con un firewall y SIEM posteriormente, conservando siempre un aislamiento verificable.

## Perfil profesional (texto sugerido, no publicado en LinkedIn)

**CyberLab — Ethical Hacking & Vulnerability Management (en desarrollo):** laboratorio educativo basado en VirtualBox, Kali Linux y Metasploitable 2 para documentar gestión de vulnerabilidades, análisis de tráfico, inventario de servicios, segmentación y estrategias de hardening en un entorno estrictamente aislado. Tecnologías: VirtualBox, Linux, Nmap, Wireshark, PowerShell y GitHub. No implica certificaciones ni experiencia laboral.
