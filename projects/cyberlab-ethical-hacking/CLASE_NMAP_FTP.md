# Apuntes de clase — Reconocimiento con Kali, Nmap y FTP

**Docente:** Héctor Salico · **Materia:** Redes y Ciberseguridad, IFTS N.º 9

**Fuente:** transcripción oral compartida por el estudiante. Es un registro parcial: termina cuando el profesor comienza a presentar el entorno que permite trabajar con exploits. No se deducen pasos posteriores.

## Secuencia observada en la clase

1. Explica los snapshots de VirtualBox y la recuperación de estados. Al restaurar, los cambios posteriores pueden perderse; debe verificarse el estado de la VM.
2. Revisa IPs y conectividad con `ping`, comprueba que el objetivo responde y señala la ausencia de acceso directo a Internet.
3. Ejecuta `nmap` contra la IP del sistema de práctica, que se oye como `192.168.0.20`. Aparecen FTP, SSH, HTTP, bases de datos MySQL/PostgreSQL y VNC, entre otros servicios.
4. Realiza una conexión FTP al sistema vulnerable, identifica el banner o versión del servidor y prueba credenciales del propio laboratorio; consigue ver archivos ofrecidos por ese servicio.
5. Explica el riesgo de contraseñas débiles, fuerza bruta, software desactualizado y un servicio FTP asociado a una puerta trasera histórica. La transcripción se interrumpe antes de observar una demostración de explotación.

## Precisiones técnicas

- `ping` utiliza ICMP Echo para comprobar una forma de conectividad, no para verificar todos los servicios.
- Nmap detecta estados de puertos; un puerto abierto no implica automáticamente que un producto sea vulnerable. `nmap -sV` intenta identificar servicios/versiones.
- FTP tradicional transmite comandos y credenciales sin cifrado; no debe exponerse para información sensible.
- La conocida puerta trasera de **vsftpd 2.3.4** estuvo relacionada con una distribución comprometida de ese software; el número de versión por sí solo no demuestra su presencia. La transcripción dice «OpenBSD» al referirse al servidor, pero el detalle debe verificarse en el resultado de Nmap/banner, no asumirse.
- La dirección `192.168.0.20` pertenece a la demostración del docente, no a un equipo que ya hayamos instalado en el laboratorio del estudiante.
- **No está demostrado** que Kali o Metasploitable estén ya instalados en el CyberLab del estudiante.

## Práctica segura propuesta (NO ejecutada)

**Laboratorio aislado:** `CyberLab-AttackLab` en modo VirtualBox Internal Network, sin adaptador NAT ni Bridge en el objetivo vulnerable.

| Rol | IPv4 propuesta | Estado |
|---|---|---|
| Kali Linux | `192.168.56.10/24` | Pendiente |
| Metasploitable 2 | `192.168.56.20/24` | Pendiente |

Desde Kali, **únicamente contra la VM de práctica autorizada**, después de verificar sus direcciones:

```bash
ip -br addr
ip route
ping -c 4 192.168.56.20
nmap 192.168.56.20
nmap -sV 192.168.56.20
```

Comprobar que no hay ruta predeterminada, que la VM vulnerable solo tiene NIC de red interna y que no existe conectividad hacia redes ajenas al laboratorio. No realizar escaneos fuera de alcance. Documentar salidas reales y versiones antes de identificar posibles vulnerabilidades.

## Matriz de análisis para el informe

| Evidencia | Pregunta que responde | Riesgo relacionado | Mitigación |
|---|---|---|---|
| Configuración de NICs | ¿Está aislado el objetivo? | Exposición de servicios vulnerables | Red interna sin salida |
| `ping` | ¿Responde el objetivo? | Alcance IP | Segmentación y firewall |
| `nmap` | ¿Qué puertos responden? | Superficie de ataque | Cerrar servicios innecesarios |
| `nmap -sV` | ¿Qué producto/versión se anuncia? | Software antiguo | Inventario y parches |
| Banner FTP | ¿Qué servicio responde? | Autenticación y datos sin cifrar | SFTP/SSH, MFA donde aplique, permisos |
| Snapshots | ¿Existe estado recuperable? | Pérdida de trabajo de laboratorio | Snapshot + respaldo independiente |

## Evidencias para agregar después de la ejecución

- [ ] Configuración de VirtualBox de ambas VM, sin NIC pública en el objetivo.
- [ ] Pantallas de IP/rutas y respuesta al ping.
- [ ] Captura del inventario Nmap y versión del servicio.
- [ ] Captura Wireshark de ARP, ICMP y conexión TCP (sin contraseñas).
- [ ] Cuadro de riesgo/mitigación por servicio.
- [ ] Snapshot inicial y descripción del proceso de recuperación.

**Uso ético:** prácticas exclusivamente sobre equipos propios, vulnerables por diseño y aislados. No recopilar credenciales reales ni atacar terceros.

## Preguntas de examen

1. ¿Qué comprueba realmente `ping` y qué no demuestra?
2. ¿Cuál es la diferencia entre «puerto abierto» y «vulnerabilidad confirmada»?
3. ¿Por qué es peligroso usar FTP tradicional con contraseñas?
4. ¿Qué diferencia existe entre Snapshot y backup?
5. ¿Por qué conviene cerrar servicios innecesarios y actualizar las versiones expuestas?
