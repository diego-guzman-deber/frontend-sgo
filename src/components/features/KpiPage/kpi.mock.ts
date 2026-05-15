export interface Kpi {
  id:            number;
  producto:      string;
  unidadNegocio: string;
  ubicaciones:   string[];
  maximo:        number;
  unidadMedida:  string[];
}

export const KPIS_MOCK: Kpi[] = [
  {
    id: 1,
    producto:      'Espacio CPM premium',
    unidadNegocio: 'Streaming',
    ubicaciones:   ['Diaz', 'noticiero', 'otros'],
    maximo:        5,
    unidadMedida:  ['cpm', 'modulo', 'salidas'],
  },
  {
    id: 2,
    producto:      'Banner Lateral Premium',
    unidadNegocio: 'Digital',
    ubicaciones:   ['Diaz', 'online'],
    maximo:        10,
    unidadMedida:  ['impresiones', 'clicks'],
  },
  {
    id: 3,
    producto:      'Video Pre-Roll HD',
    unidadNegocio: 'Video',
    ubicaciones:   ['YouTube', 'Streaming', 'App'],
    maximo:        3,
    unidadMedida:  ['reproducciones', 'vistas'],
  },
  {
    id: 4,
    producto:      'Nota Patrocinada',
    unidadNegocio: 'Editorial',
    ubicaciones:   ['Web', 'App'],
    maximo:        8,
    unidadMedida:  ['publicaciones', 'notas'],
  },
  {
    id: 5,
    producto:      'Newsletter Semanal',
    unidadNegocio: 'Email Marketing',
    ubicaciones:   ['correo', 'base clientes'],
    maximo:        4,
    unidadMedida:  ['envíos', 'aperturas'],
  },
];
