/* Analysis shares the dashboard's filtered rows; original records remain untouched. */
const PulsoAnalysis = (() => {
  let data, current = [], selectedKey = '', pendingFocus;
  const el = id => document.getElementById(id);
  const safe = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const known = v => v != null && !['','SD','S/D','NAN','0'].includes(String(v).trim().toUpperCase());
  function street(s) {
    return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase()
      .replace(/\bAVENIDA\b/g,'AV').replace(/\bGENERAL\b/g,'GRAL')
      .replace(/[.,]/g,' ').replace(/\s+/g,' ').trim();
  }
  function classify(r) {
    const d = data?.rows[r.id];
    if (d && known(d.calle) && known(d.cruce)) {
      const parts = [street(d.calle), street(d.cruce)].sort();
      if (parts[0] !== parts[1]) return {status:'documentado', key:parts.join(' × ')};
    }
    const parts = street(r.lugar).split(/\s+(?:Y|E|ESQUINA(?: DE)?|INTERSECCION(?: CON)?)\s+/);
    if (parts.length === 2 && parts.every(known)) return {status:'heurístico',key:parts.sort().join(' × ')};
    return {status:'sin confirmar',key:null};
  }
  const coords = r => Number.isFinite(r.lon) && Number.isFinite(r.lat) && r.lon > -58.55 && r.lon < -58.32 && r.lat > -34.73 && r.lat < -34.51;
  const pct = (n,d) => d ? (100*n/d).toFixed(1).replace('.',',')+' %' : 'Sin datos';
  function focus3D() {
    if(pendingFocus) el('geo3dframe').contentWindow.postMessage(pendingFocus,location.origin);
  }
  window.addEventListener('message', e=>{
    if(e.origin===location.origin && e.source===el('geo3dframe').contentWindow && e.data?.type==='pulso-vial-ready') focus3D();
  });
  function groups(rows) {
    const map = new Map();
    for (const r of rows) {
      const c = classify(r);
      if (!c.key) continue;
      // Keep documented and heuristic evidence separate, even when the labels match.
      const id = c.status+'|'+c.key;
      if (!map.has(id)) map.set(id,{id,...c,rows:[]});
      map.get(id).rows.push(r);
    }
    return [...map.values()].sort((a,b)=>b.rows.length-a.rows.length || a.key.localeCompare(b.key));
  }
  function select(g) {
    selectedKey = g.id;
    const rows = g.rows, victims = rows.reduce((n,r)=>n+r.n,0);
    const pedestrians = rows.reduce((n,r)=>n+(r.modes.Peaton || r.modes['Peatón'] || 0),0);
    const nights = rows.filter(r=>r.hour != null && (r.hour<6 || r.hour>=20)).length;
    const avenues = rows.filter(r=>r.via==='Avenida').length;
    const recommendations = [
      ['Concentración de '+rows.length+' hechos y '+victims+' víctimas fatales.',
       'Auditar velocidades, visibilidad, maniobras y conflictos en el cruce; evaluar gestión de velocidad y rediseño de radios de giro.',
       'Medir flujos por modo, velocidades y trayectorias; relevar geometría y control existente antes de elegir una obra.'],
      ...(pedestrians ? [[pedestrians+' víctimas registradas como peatones.',
       'Evaluar cruces accesibles, refugios, distancias de cruce y tiempos peatonales.',
       'Observar demanda peatonal, accesibilidad y fases semafóricas; verificar conflictos de giro.']] : []),
      ...(nights ? [[nights+' hechos entre 20:00 y 05:59 (proxy horario, no medición de oscuridad).',
       'Evaluar iluminación y legibilidad de señales y demarcación.',
       'Medir iluminancia y revisar obstáculos; el horario por sí solo no demuestra iluminación insuficiente.']] : []),
      ...(avenues ? [[avenues+' hechos clasificados en avenida.',
       'Evaluar coordinación semafórica, fases protegidas y gestión de giros.',
       'Relevar semáforos existentes, aforos, colas y conflictos; no se presume ausencia de semáforos.']] : [])
    ];
    el('critical-detail').innerHTML = '<h3>'+safe(g.key)+'</h3><p>'+safe(g.status)+' · '+rows.length+' hechos · '+victims+' víctimas. '+rows.filter(coords).length+' hechos con coordenadas.</p>'+
      '<p class="note">Hipótesis de intervención sujetas a auditoría vial. Estos registros no prueban causas, fallas de infraestructura ni eficacia de una medida.</p>'+
      '<div class="wrap"><table><thead><tr><th>Evidencia observada</th><th>Intervención a evaluar</th><th>Validación necesaria</th></tr></thead><tbody>'+recommendations.map(a=>'<tr>'+a.map(t=>'<td>'+safe(t)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'+
      '<p class="hint">Hechos: '+rows.map(r=>safe(r.id)).join(', ')+'</p><p class="hint">Nombres originales: '+[...new Set(rows.map(r=>r.lugar))].map(safe).join(' · ')+'</p>'+
      '<p><a href="https://highways.dot.gov/safety/proven-safety-countermeasures">FHWA: medidas de seguridad vial</a> · <a href="https://www.who.int/publications/i/item/save-lives-a-road-safety-technical-package">OMS: Save LIVES</a>. Marcos generales; su aplicabilidad local requiere evaluación.</p>';
    const r = rows.find(coords);
    el('critical-3d').disabled = !r;
    el('critical-3d').onclick = () => {
      pendingFocus = {type:'pulso-vial-focus',lon:r.lon,lat:r.lat};
      document.querySelector('[data-tab="geo3d"]').click();
      focus3D();
    };
  }
  function render(rows) {
    current = rows;
    if (!data) return;
    const gs = groups(rows);
    const documented = rows.filter(r=>classify(r).status==='documentado').length;
    const heuristic = rows.filter(r=>classify(r).status==='heurístico').length;
    el('cross-summary').textContent = documented+' cruces documentados en Calle/Cruce ('+pct(documented,rows.length)+' de '+rows.length+' hechos); '+heuristic+' con indicios textuales adicionales; '+(rows.length-documented-heuristic)+' sin confirmar. Documentado no implica cruce a nivel ni validación de campo.';
    el('critical-ranking').innerHTML = gs.map((g,i)=>'<tr><td><button data-critical="'+i+'">'+safe(g.key)+'</button></td><td>'+safe(g.status)+'</td><td>'+g.rows.length+'</td><td>'+g.rows.reduce((n,r)=>n+r.n,0)+'</td></tr>').join('') || '<tr><td colspan="4">Sin cruces para esta selección.</td></tr>';
    el('critical-ranking').querySelectorAll('button').forEach(b=>b.onclick=()=>select(gs[+b.dataset.critical]));
    const base = document.getElementById('map').innerHTML.replace(/<circle[\s\S]*$/,'');
    const dots = gs.flatMap((g,i)=>g.rows.filter(coords).map(r=>'<circle class="pt" tabindex="0" role="button" aria-label="'+safe(g.key)+'" data-critical="'+i+'" cx="'+((r.lon+58.54)*1920+30)+'" cy="'+((-34.525-r.lat)*2300+10)+'" r="'+Math.min(9,3+g.rows.length)+'" style="fill:'+(g.status==='documentado'?'#65ecd3':'#ffbe79')+'"><title>'+safe(g.key)+' · '+g.rows.length+' hechos · '+g.status+'</title></circle>')).join('');
    el('critical-map').innerHTML = base+dots;
    const choose = e=>{const i=e.target.dataset.critical;if(i!=null)select(gs[+i]);};
    el('critical-map').onclick = choose;
    el('critical-map').onkeydown = e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(e);}};
    el('critical-map-note').textContent = gs.reduce((n,g)=>n+g.rows.filter(coords).length,0)+' hechos representados en su coordenada original; puntos superpuestos posibles. Verde: documentados; naranja: heurísticos. No se promedian ubicaciones.';
    if(gs.length) select(gs.find(g=>g.id===selectedKey)||gs[0]);
    else { el('critical-detail').textContent='Sin puntos críticos con estos filtros.';el('critical-3d').disabled=true; }
    const measured = rows.filter(r=>Number.isFinite(data.rows[r.id]?.slope));
    const elevated = rows.filter(r=>Number.isFinite(data.rows[r.id]?.z));
    const counts = [0,0,0];
    for(const r of measured){const s=data.rows[r.id].slope;counts[s<2?0:s<5?1:2]++;}
    el('topo-summary').textContent = measured.length+' de '+rows.length+' hechos con pendiente estimable ('+pct(measured.length,rows.length)+' de cobertura); '+(rows.length-measured.length)+' sin estimación. '+elevated.length+' con cota estimada.';
    el('topo-bins').innerHTML = ['Menos de 2 %','2 a menos de 5 %','5 % o más'].map((t,i)=>'<tr><td>'+t+'</td><td>'+counts[i]+'</td><td>'+pct(counts[i],measured.length)+'</td></tr>').join('');
    el('topo-rows').innerHTML = rows.map(r=>{const d=data.rows[r.id];return '<tr>'+[r.id,r.lugar,Number.isFinite(d?.z)?d.z.toFixed(1)+' m':'Sin estimación',Number.isFinite(d?.slope)?d.slope.toFixed(1)+' %':'Sin estimación'].map(v=>'<td>'+safe(v)+'</td>').join('')+'</tr>';}).join('') || '<tr><td colspan="4">Sin hechos para esta selección.</td></tr>';
  }
  fetch('analisis-datos.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json();}).then(d=>{
    if(!d.rows || Object.keys(d.rows).length!==696)throw Error('Datos incompletos');
    data=d;render(current);
    el('topo-source').textContent = d.method+' Vértices: '+d.vertices+'. Descarga: '+d.retrieved+'. Datum vertical: '+d.verticalDatum;
  }).catch(()=>{el('cross-summary').textContent=el('topo-summary').textContent='No se pudieron cargar los datos del análisis. Recargá la página. Los indicadores originales siguen disponibles.';});
  return {render,street};
})();

