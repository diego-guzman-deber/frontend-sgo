import { useState } from 'react';
import { CONTRATOS_MOCK, type Contrato, type ContratoEstado } from './contrato.mock';
import styles from './ContratoPage.module.css';

/* ── Helpers de formato ── */
function fmtNum(n: number) {
  return n.toLocaleString('es-BO');
}

function getBarColor(pct: number) {
  if (pct >= 85) return '#ef4444'; // rojo — casi agotado
  if (pct >= 60) return '#22c55e'; // verde — OK
  return '#f59e0b';                // amarillo — bajo
}

/* ── Íconos SVG inline ── */
function IconMail()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 5.5l7 4.5 7-4.5"/></svg>; }
function IconView()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>; }
function IconEdit()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>; }
function IconDelete() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8L13 4"/></svg>; }
function IconDots()   { return <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>; }
function IconChevLeft()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M10 4L6 8l4 4"/></svg>; }
function IconChevRight() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M6 4l4 4-4 4"/></svg>; }

/* ── Badge de estado ── */
function EstadoBadge({ estado }: { estado: ContratoEstado }) {
  const cls = estado === 'Activo'   ? styles.badgeActivo
            : estado === 'Vencido'  ? styles.badgeVencido
            : styles.badgePendiente;
  return <span className={[styles.badge, cls].join(' ')}>{estado}</span>;
}

/* ── Progress bar de saldo ── */
function SaldoBar({ saldo, pct }: { saldo: number; pct: number }) {
  const color = getBarColor(pct);
  return (
    <div className={styles.saldoCell}>
      <span className={styles.saldoAmount}>{fmtNum(saldo)}</span>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className={styles.saldoPct} style={{ color }}>{pct}% tiempo</span>
    </div>
  );
}

/* ── Celda de empresa ── */
function EmpresaCell({ c }: { c: Contrato }) {
  return (
    <div className={styles.empresaCell}>
      <span className={styles.empresaName}>
        <IconMail /> {c.empresa}
      </span>
      <div className={styles.fechas}>
        <span className={styles.fechaStart}>{c.fechaInicio}</span>
        <span className={styles.fechaEnd}>{c.fechaFin}</span>
      </div>
      <span className={styles.clienteId}>Id. {c.clienteId}</span>
      {c.contacto && <span className={styles.contacto}>{c.contacto}</span>}
    </div>
  );
}

/* ── Página principal ── */
const PAGE_SIZE = 5;

export function ContratoPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(CONTRATOS_MOCK.length / PAGE_SIZE);
  const rows: Contrato[] = CONTRATOS_MOCK.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.page}>
      {/* Cabecera */}
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Control Contrato</h1>
          <p className={styles.pageSubtitle}>Informe contrato</p>
        </div>
        <button id="btn-nuevo-contrato" type="button" className={styles.btnNuevo}>
          + Nuevo contrato
        </button>
      </header>

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nro.</th>
              <th className={styles.th}>Empresa</th>
              <th className={[styles.th, styles.thNum].join(' ')}>Importe total<br/>acuerdo</th>
              <th className={[styles.th, styles.thNum].join(' ')}>Monto<br/>facturado</th>
              <th className={[styles.th, styles.thNum].join(' ')}>Consumido</th>
              <th className={styles.th}>Saldo por<br/>consumir</th>
              <th className={styles.th}>Estado</th>
              <th className={[styles.th, styles.thNum].join(' ')}>Cantidad<br/>Ordenes</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className={styles.tr}>
                <td className={styles.td}>{c.id}</td>
                <td className={styles.td}><EmpresaCell c={c} /></td>
                <td className={[styles.td, styles.tdNum].join(' ')}>{fmtNum(c.importeAcuerdo)}</td>
                <td className={[styles.td, styles.tdNum].join(' ')}>{fmtNum(c.montoFacturado)}</td>
                <td className={[styles.td, styles.tdNum].join(' ')}>{fmtNum(c.consumido)}</td>
                <td className={styles.td}><SaldoBar saldo={c.saldoConsumir} pct={c.tiempoPercent} /></td>
                <td className={styles.td}><EstadoBadge estado={c.estado} /></td>
                <td className={[styles.td, styles.tdNum].join(' ')}>{c.cantidadOrdenes}</td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button type="button" className={styles.actionBtn} title="Ver" id={`btn-ver-${c.id}`}><IconView /></button>
                    <button type="button" className={styles.actionBtn} title="Editar" id={`btn-edit-${c.id}`}><IconEdit /></button>
                    <button type="button" className={[styles.actionBtn, styles.actionDelete].join(' ')} title="Eliminar" id={`btn-del-${c.id}`}><IconDelete /></button>
                    <button type="button" className={styles.actionBtn} title="Más opciones" id={`btn-more-${c.id}`}><IconDots /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer paginación */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, CONTRATOS_MOCK.length)} of {CONTRATOS_MOCK.length} registros
          </span>
          <div className={styles.paginationControls}>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              aria-label="Página anterior"
            >
              <IconChevLeft />
            </button>
            <span className={styles.pageLabel}>Page {page} of {totalPages}</span>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              aria-label="Página siguiente"
            >
              <IconChevRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
