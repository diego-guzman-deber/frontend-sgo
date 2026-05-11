export type PedidoEstado = 'Entregado' | 'Terminado' | 'Pendiente' | 'En proceso';

export interface UnidadNegocio {
  nombre: string;
  usado:  number;
  total:  number;
}

export interface Pedido {
  id:             number;
  ejecutivo:      string;
  cliente:        string;
  fecha:          string;
  montoTotal:     number;
  campana:        string;
  paquete:        string;
  unidades:       UnidadNegocio[];
  totalUsado:     number;
  totalDisponible: number;
  estado:         PedidoEstado;
}

export const PEDIDOS_MOCK: Pedido[] = [
  {
    id:         1,
    ejecutivo:  'Juanita Azurdui',
    cliente:    'Banco Ganadero',
    fecha:      '30-04-2026',
    montoTotal: 100000,
    campana:    'Campaña 1',
    paquete:    'Paquete 1',
    unidades: [
      { nombre: 'Web',       usado: 2, total: 10 },
      { nombre: 'Radio',     usado: 2, total: 10 },
      { nombre: 'Streaming', usado: 2, total: 10 },
      { nombre: 'Imprenta',  usado: 2, total: 10 },
      { nombre: 'Web',       usado: 2, total: 10 },
    ],
    totalUsado:      25,
    totalDisponible: 50,
    estado: 'Entregado',
  },
  {
    id:         2,
    ejecutivo:  'Juanita Azurdui',
    cliente:    'Banco Ganadero',
    fecha:      '30-04-2026',
    montoTotal: 100000,
    campana:    'Campaña 1',
    paquete:    'Paquete 1',
    unidades: [
      { nombre: 'Web',       usado: 2, total: 10 },
      { nombre: 'Radio',     usado: 2, total: 10 },
      { nombre: 'Streaming', usado: 2, total: 10 },
      { nombre: 'Imprenta',  usado: 2, total: 10 },
      { nombre: 'Web',       usado: 2, total: 10 },
    ],
    totalUsado:      25,
    totalDisponible: 50,
    estado: 'Entregado',
  },
  {
    id:         3,
    ejecutivo:  'Juanita Azurdui',
    cliente:    'Banco Ganadero',
    fecha:      '30-04-2026',
    montoTotal: 100000,
    campana:    'Campaña 1',
    paquete:    'Paquete 1',
    unidades: [
      { nombre: 'Web',       usado: 2, total: 10 },
      { nombre: 'Radio',     usado: 2, total: 10 },
      { nombre: 'Streaming', usado: 2, total: 10 },
      { nombre: 'Imprenta',  usado: 2, total: 10 },
      { nombre: 'Web',       usado: 2, total: 10 },
    ],
    totalUsado:      25,
    totalDisponible: 50,
    estado: 'Terminado',
  },
  {
    id:         4,
    ejecutivo:  'Roberto Montaño',
    cliente:    'Bianca Flor',
    fecha:      '15-05-2026',
    montoTotal: 80000,
    campana:    'Campaña 2',
    paquete:    'Paquete 2',
    unidades: [
      { nombre: 'Web',       usado: 5, total: 20 },
      { nombre: 'Radio',     usado: 3, total: 10 },
      { nombre: 'Streaming', usado: 1, total: 5  },
      { nombre: 'Imprenta',  usado: 0, total: 5  },
    ],
    totalUsado:      9,
    totalDisponible: 40,
    estado: 'En proceso',
  },
  {
    id:         5,
    ejecutivo:  'Ana Veizaga',
    cliente:    'Banco Sol',
    fecha:      '01-06-2026',
    montoTotal: 250000,
    campana:    'Campaña 3',
    paquete:    'Paquete 3',
    unidades: [
      { nombre: 'Web',       usado: 0, total: 15 },
      { nombre: 'Radio',     usado: 0, total: 10 },
      { nombre: 'Streaming', usado: 0, total: 10 },
    ],
    totalUsado:      0,
    totalDisponible: 35,
    estado: 'Pendiente',
  },
];
