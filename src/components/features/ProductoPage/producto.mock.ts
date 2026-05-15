export type ProductoEstado = 'Active' | 'Inactive' | 'Draft';

export interface Producto {
  id:              number;
  titulo:          string;
  imagen:          string; // url o placeholder
  especificaciones: string[];
  requerimiento:   string;
  precioLista:     number;
  ubicaciones:     string;
  estado:          ProductoEstado;
  descripcion:     string;
}

export const PRODUCTOS_MOCK: Producto[] = [
  {
    id: 1,
    titulo: 'Espacio CPM premium',
    imagen: '',
    especificaciones: [
      'Top 970 × 90',
      'Lateral Izquierdo 120 × 600',
      'Lateral derecho 120 × 600',
    ],
    requerimiento:
      '1.000.000 CPM\npeso max 250 kb\nenviar link de redireccionamiento\nmedidas expresada en px',
    precioLista: 21000,
    ubicaciones: 'Diaz',
    estado: 'Active',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
  },
  {
    id: 2,
    titulo: 'Espacio CPM premium',
    imagen: '',
    especificaciones: [
      'Top 970 × 90',
      'Lateral Izquierdo 120 × 600',
      'Lateral derecho 120 × 600',
    ],
    requerimiento:
      '1.000.000 CPM\npeso max 250 kb\nenviar link de redireccionamiento\nmedidas expresada en px',
    precioLista: 21000,
    ubicaciones: 'Disc',
    estado: 'Active',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
  },
  {
    id: 3,
    titulo: 'Espacio CPM premium',
    imagen: '',
    especificaciones: [
      'Top 970 × 90',
      'Lateral Izquierdo 120 × 600',
      'Lateral derecho 120 × 600',
    ],
    requerimiento:
      '1.000.000 CPM\npeso max 250 kb\nenviar link de redireccionamiento\nmedidas expresada en px',
    precioLista: 21000,
    ubicaciones: 'Diaz',
    estado: 'Active',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
  },
  {
    id: 4,
    titulo: 'Banner Lateral Premium',
    imagen: '',
    especificaciones: [
      'Lateral 300 × 250',
      'Lateral Grande 300 × 600',
    ],
    requerimiento:
      '500.000 CPM\npeso max 150 kb\nenviar link de redireccionamiento\nmedidas expresada en px',
    precioLista: 14500,
    ubicaciones: 'Disc',
    estado: 'Draft',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
  },
  {
    id: 5,
    titulo: 'Video Pre-Roll HD',
    imagen: '',
    especificaciones: [
      'Formato MP4',
      'Duración máx. 30s',
      'Resolución 1920 × 1080',
    ],
    requerimiento:
      '250.000 impresiones\npeso max 50 mb\nformato MP4 o MOV\nbitrate mínimo 5 Mbps',
    precioLista: 35000,
    ubicaciones: 'Diaz',
    estado: 'Inactive',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been th',
  },
];
