import { useState } from 'react';
import { ORDENES_MOCK, type Orden, type OrdenEstado } from './orden.mock';
import { CrearOrden } from './CrearOrden';
import styles from './OrdenPage.module.css';

/* ── Helpers ── */
function fmtNum(n: number) { return n.toLocaleString('es-BO'); }

/* ── Íconos ── */
function IconPlus()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M8 3v10M3 8h10"/></svg>; }
function IconView()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>; }
function IconEdit()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>; }
function IconDelete()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8L13 4"/></svg>; }
function IconDots()      { return <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>; }
function IconChevLeft()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M10 4L6 8l4 4"/></svg>; }
function IconChevRight() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M6 4l4 4-4 4"/></svg>; }

/* ── Badge de estado ── */
function EstadoBadge({ estado }: { estado: OrdenEstado }) {
  const cls =
    estado === 'Entregado'  ? styles.badgeEntregado  :
    estado === 'Terminado'  ? styles.badgeTerminado  :
    estado === 'En proceso' ? styles.badgeProceso    :
                              styles.badgePendiente;
  return <span className={[styles.badge, cls].join(' ')}>{estado}</span>;
}

/* ── Badge de acuerdo (Sí/No) ── */
function AcuerdoBadge({ valor }: { valor: 'Si' | 'No' }) {
  return (
    <span className={[styles.badge, valor === 'Si' ? styles.badgeAcuerdoSi : styles.badgeAcuerdoNo].join(' ')}>
      {valor}
    </span>
  );
}

const PAGE_SIZE = 5;

export function OrdenPage() {
  const [view, setView] = useState<'list' | 'crear'>('list');
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(ORDENES_MOCK.length / PAGE_SIZE);
  const rows: Orden[] = ORDENES_MOCK.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.page}>
      {/* ── Cabecera ── */}
      <header className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>Control Orden</h1>
            {view === 'list' && (
              <button id="btn-crear-orden" type="button" className={styles.btnCrear}
                onClick={() => setView('crear')}>
                <IconPlus /> Crear
              </button>
            )}
          </div>
          <p className={styles.pageSubtitle}>
            {view === 'crear' ? 'Informe orden' : 'Informe orden'}
          </p>
        </div>
      </header>

      {/* ── Vista condicional ── */}
      {view === 'crear' ? (
        <CrearOrden onCancel={() => setView('list')} />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nro.</th>
                <th className={styles.th}>Unidad<br/>Negocio</th>
                <th className={styles.th}>Ubicacion</th>
                <th className={styles.th}>Cliente</th>
                <th className={styles.th}>Fechas</th>
                <th className={[styles.th, styles.thNum].join(' ')}>Monto</th>
                <th className={styles.th}>Material</th>
                <th className={styles.th}>Origen</th>
                <th className={styles.th}>Estado<br/>operativo</th>
                <th className={styles.th}>Estado<br/>programacion</th>
                <th className={styles.th}>Acuerdo</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <>
                  {/* Fila principal de datos */}
                  <tr key={`main-${o.id}`} className={styles.tr}>
                    <td className={styles.td}>{o.id}</td>
                    <td className={styles.td}>{o.unidadNegocio}</td>
                    <td className={styles.td}>{o.ubicacion}</td>
                    <td className={styles.td}>{o.cliente}</td>
                    <td className={styles.td}>
                      <span className={styles.fecha}>{o.fecha}</span>
                    </td>
                    <td className={[styles.td, styles.tdNum].join(' ')}>{fmtNum(o.monto)}</td>
                    <td className={styles.td}>{o.material}</td>
                    <td className={styles.td}>{o.origen}</td>
                    <td className={styles.td}><EstadoBadge estado={o.estadoOperativo} /></td>
                    <td className={styles.td}><EstadoBadge estado={o.estadoProgramacion} /></td>
                    <td className={styles.td}><AcuerdoBadge valor={o.acuerdo} /></td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button type="button" className={styles.actionBtn} title="Ver"     id={`btn-ver-o-${o.id}`}><IconView /></button>
                        <button type="button" className={styles.actionBtn} title="Editar"  id={`btn-edit-o-${o.id}`}><IconEdit /></button>
                        <button type="button" className={[styles.actionBtn, styles.actionDelete].join(' ')} title="Eliminar" id={`btn-del-o-${o.id}`}><IconDelete /></button>
                        <button type="button" className={styles.actionBtn} title="Más"     id={`btn-more-o-${o.id}`}><IconDots /></button>
                      </div>
                    </td>
                  </tr>
                  {/* Fila de descripción */}
                  <tr key={`desc-${o.id}`} className={styles.trDesc}>
                    <td />
                    <td colSpan={11} className={styles.tdDesc}>{o.descripcion}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, ORDENES_MOCK.length)} of {ORDENES_MOCK.length} registros
            </span>
            <div className={styles.paginationControls}>
              <button type="button" className={styles.pageBtn} disabled={page === 1}         onClick={() => setPage(p => p - 1)} aria-label="Anterior"><IconChevLeft /></button>
              <span className={styles.pageLabel}>Page {page} of {totalPages}</span>
              <button type="button" className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)} aria-label="Siguiente"><IconChevRight /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
