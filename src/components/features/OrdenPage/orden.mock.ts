export type OrdenEstado = 'Entregado' | 'Terminado' | 'Pendiente' | 'En proceso';

export interface Orden {
  id:                 number;
  unidadNegocio:      string;
  ubicacion:          string;
  cliente:            string;
  fecha:              string;
  monto:              number;
  material:           string;
  origen:             string;
  estadoOperativo:    OrdenEstado;
  estadoProgramacion: OrdenEstado;
  acuerdo:            'Si' | 'No';
  descripcion:        string;
}

export const ORDENES_MOCK: Orden[] = [
  {
    id: 1, unidadNegocio: 'Imprenta', ubicacion: 'Comercial',
    cliente: 'Banco Ganadero', fecha: '30-04-2026', monto: 100000,
    material: 'Material', origen: 'Sirius',
    estadoOperativo: 'Entregado', estadoProgramacion: 'Entregado', acuerdo: 'Si',
    descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown',
  },
  {
    id: 2, unidadNegocio: 'Imprenta', ubicacion: 'Comercial',
    cliente: 'Banco Ganadero', fecha: '30-04-2026', monto: 100000,
    material: 'Material', origen: 'Sirius',
    estadoOperativo: 'Entregado', estadoProgramacion: 'Entregado', acuerdo: 'Si',
    descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown',
  },
  {
    id: 3, unidadNegocio: 'Imprenta', ubicacion: 'Comercial',
    cliente: 'Banco Ganadero', fecha: '30-04-2026', monto: 100000,
    material: 'Material', origen: 'Sirius',
    estadoOperativo: 'Entregado', estadoProgramacion: 'Entregado', acuerdo: 'Si',
    descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown',
  },
  {
    id: 4, unidadNegocio: 'Radio', ubicacion: 'Nacional',
    cliente: 'Bianca Flor', fecha: '15-05-2026', monto: 80000,
    material: 'Audio', origen: 'Interno',
    estadoOperativo: 'En proceso', estadoProgramacion: 'Pendiente', acuerdo: 'Si',
    descripcion: 'Cuña radial de 30 segundos para campaña de temporada. Producción local con locución nacional.',
  },
  {
    id: 5, unidadNegocio: 'Web', ubicacion: 'Digital',
    cliente: 'Banco Sol', fecha: '01-06-2026', monto: 50000,
    material: 'Banner', origen: 'Agencia',
    estadoOperativo: 'Pendiente', estadoProgramacion: 'Pendiente', acuerdo: 'No',
    descripcion: 'Banner digital 970x250 para portada web. Animación HTML5 con enlace a landing page del cliente.',
  },
];
