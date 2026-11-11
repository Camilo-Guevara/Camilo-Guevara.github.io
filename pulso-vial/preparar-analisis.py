"""Rebuild with Python + numpy scipy pyproj openpyxl. Sources downloaded to argument directory.
python preparar-analisis.py <sources-directory>
"""
import csv, hashlib, json, re, sys
from pathlib import Path
import numpy as np
from scipy.spatial import Delaunay, cKDTree
from scipy.interpolate import LinearNDInterpolator
from pyproj import Transformer
from openpyxl import load_workbook

ROOT = Path(__file__).parent
SRC = Path(sys.argv[1])
URL = 'https://cdn.buenosaires.gob.ar/datosabiertos/datasets/secretaria-de-desarrollo-urbano/elevacion-terreno/curvas-de-nivel.csv'
XLS = 'https://cdn.buenosaires.gob.ar/datosabiertos/datasets/transporte-y-obras-publicas/victimas-siniestros-viales/homicidios.xlsx'
html = (ROOT / 'index.html').read_text(encoding='utf-8')
rows = json.JSONDecoder().raw_decode(html.split('const S=', 1)[1])[0]['rows']
wb = load_workbook(SRC / 'homicidios.xlsx', read_only=True, data_only=True)
sheet = wb['HECHOS'].values
headers = next(sheet)
official = {r[0]: dict(zip(headers, r)) for r in sheet if r[0]}
print('Official columns:', headers)
assert len(rows) == 696 and len(official) == 696
tx = Transformer.from_crs('EPSG:4326', 'EPSG:32721', always_xy=True)
points = {}
with (SRC / 'curvas.csv').open(encoding='utf-8-sig') as f:
    for r in csv.DictReader(f, delimiter=';'):
        z = float(r['COTA'])
        for a,b in re.findall(r'(-?\d+\.\d+)\s+(-?\d+\.\d+)', r['GEOMETRY']):
            lon, lat = float(a), float(b)
            if -58.56 < lon < -58.31 and -34.74 < lat < -34.50:
                x,y = tx.transform(lon,lat)
                points.setdefault((round(x,2),round(y,2)), set()).add(z)
# Conflicting contour elevations at identical coordinates are excluded.
data = [(x,y,next(iter(z))) for (x,y),z in points.items() if len(z)==1]
xyz = np.array(data)
tri = Delaunay(xyz[:,:2])
interp = LinearNDInterpolator(tri, xyz[:,2])
tree = cKDTree(xyz[:,:2])
vertices = xyz[tri.simplices,:2]
edges = np.max(np.linalg.norm(vertices-np.roll(vertices,1,axis=1),axis=2),axis=1)
def sample(p):
    idx = tri.find_simplex(p)
    if idx < 0 or edges[idx] > 400 or tree.query(p)[0] > 150:
        return None
    v = float(interp(np.array([p]))[0])
    return v if np.isfinite(v) else None
out = {}
for r in rows:
    o = official[r['id']]
    assert int(o['N_VICTIMAS']) == r['n']
    assert o['FECHA'].strftime('%Y-%m-%d') == r['date']
    if r['lon'] is not None and r['lat'] is not None:
        assert abs(float(o['pos x'])-r['lon']) < 1e-7
        assert abs(float(o['pos y'])-r['lat']) < 1e-7
    item = {'calle':o.get('Calle'), 'cruce':o.get('Cruce'), 'altura':o.get('Altura')}
    if r['lon'] is not None and r['lat'] is not None:
        x,y = tx.transform(r['lon'],r['lat'])
        z = sample((x,y))
        item['z'] = round(z,2) if z is not None else None
        v = [sample(p) for p in [(x-50,y),(x+50,y),(x,y-50),(x,y+50)]]
        item['slope'] = round(100*np.hypot((v[1]-v[0])/100,(v[3]-v[2])/100),2) if all(a is not None for a in v) else None
    out[r['id']] = item
metadata = {'source': URL, 'accidentsSource':XLS, 'retrieved':'2026-11-11',
 'sha256': {name:hashlib.sha256((SRC/name).read_bytes()).hexdigest() for name in ['curvas.csv','homicidios.xlsx']},
 'method':'MDT derivado por TIN lineal de vértices de curvas COTA; EPSG:32721. Diferencias centrales E/O y N/S a ±50 m. No extrapolación; aristas ≤400 m y distancia a vértice ≤150 m en cada muestra.',
 'vertices':len(data), 'horizontalCRS':'EPSG:32721', 'verticalDatum':'No documentado en el recurso consultado; cotas en metros según COTA.',
 'license':'GCBA, CC-BY-2.5-AR', 'rows':out}
(ROOT/'analisis-datos.json').write_text(json.dumps(metadata,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print('Vertices',len(data),'hechos con altura',sum(v.get('z') is not None for v in out.values()),'pendiente',sum(v.get('slope') is not None for v in out.values()))
print('Cruces documentados',sum(bool(v['cruce']) and str(v['cruce']).strip().upper() not in ['SD','S/D','NAN'] for v in out.values()))

