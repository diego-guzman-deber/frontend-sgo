/* ── Mock de datos de Contratos ── */

export type ContratoEstado = 'Activo' | 'Vencido' | 'Pendiente';

export interface Contrato {
  id:             number;
  empresa:        string;
  email:          string;
  fechaInicio:    string;
  fechaFin:       string;
  contacto:       string;
  clienteId:      string;
  importeAcuerdo: number;
  montoFacturado: number;
  consumido:      number;
  saldoConsumir:  number;
  tiempoPercent:  number; // 0-100 consumido
  estado:         ContratoEstado;
  cantidadOrdenes: number;
}

export const CONTRATOS_MOCK: Contrato[] = [
  {
    id:             1,
    empresa:        'Banco Ganadero',
    email:          'contacto@bancoganadero.com.bo',
    fechaInicio:    '01-01-2026',
    fechaFin:       '30-04-2026',
    contacto:       'Juanita Azurdui',
    clienteId:      '5435',
    importeAcuerdo: 100000,
    montoFacturado: 45000,
    consumido:      45000,
    saldoConsumir:  55000,
    tiempoPercent:  80,
    estado:         'Activo',
    cantidadOrdenes: 21,
  },
  {
    id:             2,
    empresa:        'Bianca Flor',
    email:          'info@biancaflor.com',
    fechaInicio:    '01-01-2026',
    fechaFin:       '01-01-2027',
    contacto:       '',
    clienteId:      '4422',
    importeAcuerdo: 200000,
    montoFacturado: 50000,
    consumido:      50000,
    saldoConsumir:  150000,
    tiempoPercent:  80,
    estado:         'Activo',
    cantidadOrdenes: 15,
  },
  {
    id:             3,
    empresa:        'Banco Sol',
    email:          'gerencia@bancosol.bo',
    fechaInicio:    '01-01-2026',
    fechaFin:       '01-01-2027',
    contacto:       '',
    clienteId:      '8665',
    importeAcuerdo: 500000,
    montoFacturado: 400000,
    consumido:      400000,
    saldoConsumir:  100000,
    tiempoPercent:  20,
    estado:         'Activo',
    cantidadOrdenes: 40,
  },
  {
    id:             4,
    empresa:        'Editorial El Norte',
    email:          'ventas@elnorte.bo',
    fechaInicio:    '15-03-2026',
    fechaFin:       '15-03-2027',
    contacto:       'Roberto Montaño',
    clienteId:      '3301',
    importeAcuerdo: 80000,
    montoFacturado: 20000,
    consumido:      20000,
    saldoConsumir:  60000,
    tiempoPercent:  55,
    estado:         'Activo',
    cantidadOrdenes: 8,
  },
  {
    id:             5,
    empresa:        'Cervecería Boliviana',
    email:          'mktg@cbN.com.bo',
    fechaInicio:    '01-06-2025',
    fechaFin:       '31-12-2025',
    contacto:       'Ana Veizaga',
    clienteId:      '9910',
    importeAcuerdo: 350000,
    montoFacturado: 350000,
    consumido:      350000,
    saldoConsumir:  0,
    tiempoPercent:  100,
    estado:         'Vencido',
    cantidadOrdenes: 62,
  },
];
