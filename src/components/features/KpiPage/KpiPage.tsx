import { useState } from 'react';
import { KPIS_MOCK, type Kpi } from './kpi.mock';
import styles from './KpiPage.module.css';

/* ── Íconos SVG ── */
function IconPlus()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M8 3v10M3 8h10"/></svg>; }
function IconView()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>; }
function IconEdit()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>; }
function IconDelete()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8L13 4"/></svg>; }
function IconDots()      { return <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>; }
function IconChevLeft()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M10 4L6 8l4 4"/></svg>; }
function IconChevRight() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M6 4l4 4-4 4"/></svg>; }

const PAGE_SIZE = 5;

export function KpiPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(KPIS_MOCK.length / PAGE_SIZE);
  const rows: Kpi[] = KPIS_MOCK.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.page}>
      {/* Cabecera */}
      <header className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>Control KPI</h1>
            <button id="btn-crear-kpi" type="button" className={styles.btnCrear}>
              <IconPlus /> Crear
            </button>
          </div>
          <p className={styles.pageSubtitle}>Informe kpi</p>
        </div>
      </header>

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nro.</th>
              <th className={styles.th}>Producto</th>
              <th className={styles.th}>unidad negocio</th>
              <th className={styles.th}>Ubicaciones</th>
              <th className={[styles.th, styles.thRight].join(' ')}>Maximo</th>
              <th className={styles.th}>Unidad Medida</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((k) => (
              <tr key={k.id} className={styles.tr}>
                <td className={styles.td}>{k.id}</td>
                <td className={styles.td}>{k.producto}</td>
                <td className={styles.td}>{k.unidadNegocio}</td>
                <td className={styles.td}>
                  <div className={styles.tagList}>
                    {k.ubicaciones.map((u, i) => (
                      <span key={i} className={styles.tag}>{u}</span>
                    ))}
                  </div>
                </td>
                <td className={[styles.td, styles.tdRight].join(' ')}>
                  <span className={styles.maximo}>{k.maximo}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.umList}>
                    {k.unidadMedida.map((u, i) => (
                      <span key={i} className={styles.umTag}>{u}</span>
                    ))}
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button type="button" className={styles.actionBtn} title="Ver"      id={`btn-ver-kpi-${k.id}`}><IconView /></button>
                    <button type="button" className={styles.actionBtn} title="Editar"   id={`btn-edit-kpi-${k.id}`}><IconEdit /></button>
                    <button type="button" className={[styles.actionBtn, styles.actionDelete].join(' ')} title="Eliminar" id={`btn-del-kpi-${k.id}`}><IconDelete /></button>
                    <button type="button" className={styles.actionBtn} title="Más"      id={`btn-more-kpi-${k.id}`}><IconDots /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing 1 to {Math.min(page * PAGE_SIZE, KPIS_MOCK.length)} of {KPIS_MOCK.length} users
          </span>
          <div className={styles.paginationControls}>
            <button type="button" className={styles.pageBtn} disabled={page === 1}         onClick={() => setPage(p => p - 1)} aria-label="Anterior"><IconChevLeft /></button>
            <span className={styles.pageLabel}>Page {page} of {totalPages}</span>
            <button type="button" className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)} aria-label="Siguiente"><IconChevRight /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
