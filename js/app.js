'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const menuButton = $('.menu-toggle');
menuButton.addEventListener('click', () => {
  const opened = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opened));
  $('#navegacion').classList.toggle('open', opened);
});
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); $('#navegacion').classList.remove('open'); }
$$('nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
const commands = {
  perfil: ['Estudiante de Análisis de Sistemas', 'Estudiante de Ciencia de Datos', 'Desarrollo académico con Python', 'Aprendizaje práctico de ciberseguridad'],
  formacion: ['IFTS N.º 9 — Análisis de Sistemas · En curso', 'UTN — Ciencia de Datos y Análisis Avanzado · En curso', 'Universidad Distrital — Ingeniería Topográfica · 7 semestres cursados'],
  intereses: ['Análisis y arquitectura de sistemas', 'Ciencia de datos e inteligencia artificial', 'Ciberseguridad y redes', 'Cloud computing y calidad de software'],
  idiomas: ['Español: nativo', 'Inglés: avanzado', 'Nivel declarado; sin certificación publicada.']
};
$$('[data-command]').forEach(button => button.addEventListener('click', () => {
  $$('[data-command]').forEach(b => {b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button));});
  $('#command').textContent = button.textContent;
  $('#terminal-output').replaceChildren(...commands[button.dataset.command].map(text => {const p = document.createElement('p'); p.textContent = text; return p;}));
}));
const skills = {
  sistemas: {title:'Analizar antes de construir.', text:'Del problema a los requisitos y los modelos. Práctica académica vinculada al proyecto Frugi.', tags:['Análisis de requisitos','UML','Modelado de sistemas','Diseño de soluciones'], context:'EXPERIENCIA ACADÉMICA · Frugi / IFTS N.º 9'},
  datos: {title:'Aprender a hacer buenas preguntas.', text:'Formación en Python, estadística y análisis de datos. La ciencia de datos y la IA son áreas de aprendizaje en desarrollo.', tags:['Python','Jupyter','Estadística','Análisis de datos'], context:'EN FORMACIÓN · Diplomatura UTN'},
  seguridad: {title:'Entender la red desde dentro.', text:'Práctica en un laboratorio local con Windows y Ubuntu: conectividad, servicios y observación del tráfico.', tags:['Linux','VirtualBox','TCP/IP','SSH','Apache / HTTP','UFW','Wireshark'], context:'PRÁCTICA ACADÉMICA · CyberLab'},
  desarrollo: {title:'Convertir una idea en software.', text:'Aplicación de Python, Flask y MySQL en un e-commerce académico. HTML, CSS y JavaScript en este portafolio.', tags:['Python','Flask','MySQL / SQL','HTML','CSS','JavaScript'], context:'APLICADO EN PROYECTOS · E-commerce / Portafolio'},
  herramientas: {title:'Un entorno para experimentar.', text:'Herramientas de apoyo para escribir código, organizar versiones, explorar datos y practicar con máquinas virtuales.', tags:['Git','GitHub','VS Code','Jupyter','VirtualBox'], context:'USO ACADÉMICO Y PERSONAL'}
};
function showSkill(key) {
  const s = skills[key]; $('#skill-detail').innerHTML = `<h3>${s.title}</h3><p>${s.text}</p><div class="tags">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div><p class="context">${s.context}</p>`;
}
$$('[data-skill]').forEach(button => button.addEventListener('click', () => {$$('[data-skill]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));}); showSkill(button.dataset.skill);}));
showSkill('sistemas');
const projects = {
  ecommerce: {title:'E-commerce académico', type:'ARQUITECTURA SIMPLIFICADA · NO ES UNA CAPTURA DE LA APP', nodes:[['Catálogo','HTML / CSS'],['Aplicación','Python / Flask'],['Datos','MySQL']], description:'Una práctica de desarrollo web que conecta productos, usuarios y pedidos.',role:'Desarrollo académico.',problem:'Organizar un catálogo y el flujo de pedidos con validación de existencias.',solution:'Catálogo con búsqueda, inicio de sesión, selección de productos y resumen de pedidos.',tags:['Python','Flask','MySQL','HTML / CSS'],note:'Proyecto de aprendizaje. No se presenta como tienda en producción ni como pasarela de pagos.',url:'https://github.com/Camilo-Guevara/e-commerce-flash-ifts9'},
  frugi: {title:'Frugi App',type:'MAPA CONCEPTUAL · PROYECTO ACADÉMICO',nodes:[['Necesidad','Planificar comidas'],['Análisis','Requisitos / UML'],['Propuesta','Comparar opciones']],description:'Propuesta de aplicación para comparar productos y recetas considerando precio, calorías y ubicación.',role:'Analista de sistemas dentro del equipo académico.',problem:'Transformar una idea de producto en requisitos claros y una propuesta de solución.',solution:'Análisis de requisitos, modelos UML y colaboración en el diseño y la planificación del proyecto.',tags:['Requisitos','UML','Análisis de sistemas','Planificación'],note:'Descripción basada en el trabajo académico compartido. Documentación pública: [INFORMACIÓN PENDIENTE]. No hay una demo pública verificada.'},
  cyberlab: {title:'CyberLab',type:'TOPOLOGÍA CONCEPTUAL · ENTORNO LOCAL DE PRÁCTICA',nodes:[['Windows','Cliente'],['Red local','VirtualBox'],['Ubuntu','SSH / HTTP']],description:'Laboratorio de redes para conectar máquinas virtuales y estudiar servicios y controles básicos de seguridad.',role:'Estudiante · Práctica individual guiada.',problem:'Comprender cómo se comunican los equipos y cómo observar y controlar sus conexiones.',solution:'Prácticas de conectividad entre Windows y Ubuntu, servicios SSH y HTTP, firewall UFW y análisis con Wireshark.',tags:['VirtualBox','Linux','Redes','UFW','Wireshark'],note:'Experiencia académica en entorno local. Evidencias públicas del laboratorio: [INFORMACIÓN PENDIENTE].'}
};
function showProject(key) {const p = projects[key]; $('#project-detail').innerHTML = `<div class="project-art"><small>${p.type}</small><div class="project-flow">${p.nodes.map((n,i) => `${i ? '<i aria-hidden="true">→</i>' : ''}<span>${n[0]}<small>${n[1]}</small></span>`).join('')}</div></div><div class="project-body"><h3>${p.title}</h3><p>${p.description}</p><div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div><dl><dt>Mi rol</dt><dd>${p.role}</dd><dt>Problema</dt><dd>${p.problem}</dd><dt>Solución</dt><dd>${p.solution}</dd></dl><p class="project-note">${p.note}</p><div class="actions">${p.url ? `<a class="button primary" href="${p.url}" target="_blank" rel="noopener noreferrer">Ver código y proyecto ↗</a>` : '<a class="button" href="#contacto">Conversemos sobre el proyecto ↗</a>'}</div></div>`;}
$$('[data-project]').forEach(button => button.addEventListener('click', () => {$$('[data-project]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));}); showProject(button.dataset.project);}));
showProject('ecommerce');
const answers = {
  skills:'Camilo combina análisis de requisitos y modelado con desarrollo académico en Python, Flask y SQL. Se está formando en ciencia de datos y practica redes y seguridad en un laboratorio local.',
  projects:'Su proyecto verificable en GitHub es un e-commerce académico con Flask y MySQL. También trabaja en Frugi, un proyecto de análisis de sistemas, y en CyberLab, un laboratorio local de redes. Este portafolio es su CV creativo.',
  cyber:'Su experiencia es académica: máquinas virtuales Windows y Ubuntu, redes, SSH, HTTP, Apache, UFW y Wireshark. Está aprendiendo; no se presenta como especialista profesional en seguridad.',
  studies:'Cursa la Tecnicatura Superior en Análisis de Sistemas en IFTS N.º 9 y la formación en Ciencia de Datos y Análisis Avanzado de UTN. Ambas están en proceso. También cursó siete semestres de Ingeniería Topográfica.',
  interview:'Puede aportar curiosidad técnica, una mirada de sistemas y disposición a aprender. Sus proyectos permiten conversar sobre cómo analiza problemas, modela soluciones y lleva conceptos a la práctica. Busca sus primeras oportunidades tecnológicas.'
};
$$('[data-question]').forEach(button => button.addEventListener('click', () => {$('#chat-answer').textContent = answers[button.dataset.question];}));
$('#contact-form').addEventListener('submit', e => {e.preventDefault();const name=$('#name').value.trim(), email=$('#email').value.trim(), message=$('#message').value.trim();if(!name||!email||!message){$('#form-status').textContent='Completa los campos con tu nombre, correo y mensaje.';return;}const body=`Hola, Camilo:\n\n${message}\n\n${name}\n${email}`;window.location.href=`mailto:kmiloguevara2022@gmail.com?subject=${encodeURIComponent('Contacto desde el portafolio — '+name)}&body=${encodeURIComponent(body)}`;$('#form-status').textContent='Correo preparado. Si se abre tu aplicación, revisa el mensaje y envíalo desde allí. También puedes usar el enlace de correo directo.';});
$('#year').textContent=String(new Date().getFullYear());
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches){const terms=['Análisis de sistemas','Desarrollo con Python','Ciencia de datos en formación','Redes y ciberseguridad'];let term=0;setInterval(()=>{if(!document.hidden&&!reduced.matches){term=(term+1)%terms.length;$('#typing').textContent=terms[term];}},3800);if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}});},{threshold:.08});$$('.section-heading,.education').forEach(el=>observer.observe(el));}}
