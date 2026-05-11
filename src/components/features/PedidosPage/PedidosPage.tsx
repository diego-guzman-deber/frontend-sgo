import { useState } from 'react';
import { PEDIDOS_MOCK, type Pedido, type PedidoEstado } from './pedido.mock';
import { CrearPedido } from './CrearPedido';
import styles from './PedidosPage.module.css';

/* ── Helpers ── */
function fmtNum(n: number) {
  return n.toLocaleString('es-BO');
}

/* ── Íconos SVG ── */
function IconPlus()       { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M8 3v10M3 8h10"/></svg>; }
function IconView()       { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>; }
function IconEdit()       { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>; }
function IconDelete()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8L13 4"/></svg>; }
function IconDots()       { return <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>; }
function IconChevLeft()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M10 4L6 8l4 4"/></svg>; }
function IconChevRight()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M6 4l4 4-4 4"/></svg>; }

/* ── Badge de estado ── */
function EstadoBadge({ estado }: { estado: PedidoEstado }) {
  const cls =
    estado === 'Entregado'  ? styles.badgeEntregado  :
    estado === 'Terminado'  ? styles.badgeTerminado  :
    estado === 'En proceso' ? styles.badgeProceso    :
                              styles.badgePendiente;
  return <span className={[styles.badge, cls].join(' ')}>{estado}</span>;
}

/* ── Celda Unidad Negocio ── */
function UnidadesCell({ pedido }: { pedido: Pedido }) {
  return (
    <div className={styles.unidadesWrapper}>
      <div className={styles.unidadesList}>
        {pedido.unidades.map((u, i) => (
          <span key={i} className={styles.unidadRow}>
            <span className={styles.unidadNombre}>{u.nombre}:</span>
            <span className={styles.unidadValor}> {u.usado}/{u.total}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

export function PedidosPage() {
  const [view, setView]   = useState<'list' | 'crear'>('list');
  const [page, setPage]   = useState(1);
  const totalPages = Math.ceil(PEDIDOS_MOCK.length / PAGE_SIZE);
  const rows: Pedido[] = PEDIDOS_MOCK.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.page}>
      {/* Cabecera */}
      <header className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>Control Pedidos</h1>
            {view === 'list' && (
              <button id="btn-crear-pedido" type="button" className={styles.btnCrear}
                onClick={() => setView('crear')}>
                <IconPlus /> Crear
              </button>
            )}
          </div>
          <p className={styles.pageSubtitle}>
            {view === 'crear' ? 'crear pedido' : 'Informe pedidos'}
          </p>
        </div>
      </header>

      {/* Vista condicional */}
      {view === 'crear' ? (
        <CrearPedido onCancel={() => setView('list')} />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nro.</th>
                <th className={styles.th}>Ejecutivo<br/>orden</th>
                <th className={styles.th}>Cliente</th>
                <th className={styles.th}>Fecha</th>
                <th className={[styles.th, styles.thNum].join(' ')}>monto total</th>
                <th className={styles.th}>Campaña</th>
                <th className={styles.th}>Paquete</th>
                <th className={styles.th}>Unidad<br/>Negocio</th>
                <th className={[styles.th, styles.thNum].join(' ')}>Total</th>
                <th className={styles.th}>Estado</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className={styles.tr}>
                  <td className={styles.td}>{p.id}</td>
                  <td className={styles.td}>{p.ejecutivo}</td>
                  <td className={styles.td}>{p.cliente}</td>
                  <td className={styles.td}>
                    <span className={styles.fecha}>{p.fecha}</span>
                  </td>
                  <td className={[styles.td, styles.tdNum].join(' ')}>{fmtNum(p.montoTotal)}</td>
                  <td className={styles.td}>{p.campana}</td>
                  <td className={styles.td}>{p.paquete}</td>
                  <td className={styles.td}><UnidadesCell pedido={p} /></td>
                  <td className={[styles.td, styles.tdNum, styles.tdTotal].join(' ')}>
                    {p.totalUsado}/{p.totalDisponible}
                  </td>
                  <td className={styles.td}><EstadoBadge estado={p.estado} /></td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button type="button" className={styles.actionBtn} title="Ver"      id={`btn-ver-p-${p.id}`}><IconView /></button>
                      <button type="button" className={styles.actionBtn} title="Editar"   id={`btn-edit-p-${p.id}`}><IconEdit /></button>
                      <button type="button" className={[styles.actionBtn, styles.actionDelete].join(' ')} title="Eliminar" id={`btn-del-p-${p.id}`}><IconDelete /></button>
                      <button type="button" className={styles.actionBtn} title="Más"      id={`btn-more-p-${p.id}`}><IconDots /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className={styles.pagination}>
            <span className={styles.paginationInfo}>
              Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, PEDIDOS_MOCK.length)} of {PEDIDOS_MOCK.length} registros
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

