/* ── Datos mock reutilizables para el Dashboard ── */

export interface DonutSlice {
  label:  string;
  value:  number;
  color:  string;
}

export interface BarDataPoint {
  day:     string;
  online:  number;
  offline: number;
}

export interface DetailRow {
  id:         number;
  name:       string;
  color:      string;
  popularity: number; // 0-100
  percent:    number;
}

export interface SectionData {
  id:      string;
  title:   string;
  total:   string;
  donut:   DonutSlice[];
  bars:    BarDataPoint[];
  details: DetailRow[];
}

/* ── Mock de Radio ── */
const RADIO_SECTION: SectionData = {
  id:    'radio',
  title: 'Radio',
  total: '$85k',
  donut: [
    { label: 'Menciones', value: 55, color: '#4A90D9' },
    { label: 'Jingles',   value: 12, color: '#F5A623' },
    { label: 'Otros',     value: 17, color: '#7ED321' },
    { label: 'Restante',  value: 16, color: '#E0E7EF' },
  ],
  bars: [
    { day: 'Lun', online: 18000, offline: 9000  },
    { day: 'Mar', online: 15000, offline: 11000 },
    { day: 'Mié', online: 22000, offline: 8000  },
    { day: 'Jue', online: 12000, offline: 13000 },
    { day: 'Vie', online: 19000, offline: 7000  },
    { day: 'Sáb', online: 10000, offline: 5000  },
    { day: 'Dom', online: 16000, offline: 14000 },
  ],
  details: [
    { id: 0, name: 'Inv. consumido',   color: '#4A90D9', popularity: 80, percent: 4 },
    { id: 1, name: 'Inv. disponible',  color: '#7ED321', popularity: 40, percent: 2 },
    { id: 2, name: 'Detalle 1',        color: '#9B59B6', popularity: 20, percent: 1 },
    { id: 3, name: 'Detalle 2',        color: '#F5A623', popularity: 40, percent: 2 },
  ],
};

/* ── Mock de Imprenta ── */
const IMPRENTA_SECTION: SectionData = {
  id:    'imprenta',
  title: 'Imprenta',
  total: '$85k',
  donut: [
    { label: 'Menciones', value: 55, color: '#4A90D9' },
    { label: 'Jingles',   value: 12, color: '#F5A623' },
    { label: 'Otros',     value: 17, color: '#7ED321' },
    { label: 'Restante',  value: 16, color: '#E0E7EF' },
  ],
  bars: [
    { day: 'Lun', online: 14000, offline: 7000  },
    { day: 'Mar', online: 20000, offline: 9000  },
    { day: 'Mié', online: 17000, offline: 12000 },
    { day: 'Jue', online: 11000, offline: 8000  },
    { day: 'Vie', online: 24000, offline: 6000  },
    { day: 'Sáb', online:  8000, offline: 4000  },
    { day: 'Dom', online: 13000, offline: 10000 },
  ],
  details: [
    { id: 0, name: 'Inv. consumido',   color: '#4A90D9', popularity: 80, percent: 4 },
    { id: 1, name: 'Inv. disponible',  color: '#7ED321', popularity: 40, percent: 2 },
    { id: 2, name: 'Detalle 1',        color: '#9B59B6', popularity: 20, percent: 1 },
    { id: 3, name: 'Detalle 2',        color: '#F5A623', popularity: 40, percent: 2 },
  ],
};

export const DASHBOARD_SECTIONS: SectionData[] = [RADIO_SECTION, IMPRENTA_SECTION];
