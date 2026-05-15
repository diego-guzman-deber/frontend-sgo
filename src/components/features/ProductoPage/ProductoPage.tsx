import { useState } from 'react';
import { PRODUCTOS_MOCK, type Producto, type ProductoEstado } from './producto.mock';
import styles from './ProductoPage.module.css';

/* ── Helpers ── */
function fmtNum(n: number) {
  return n.toLocaleString('es-BO');
}

/* ── Íconos SVG ── */
function IconPlus()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M8 3v10M3 8h10"/></svg>; }
function IconView()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/></svg>; }
function IconEdit()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>; }
function IconDelete()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8L13 4"/></svg>; }
function IconDots()      { return <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>; }
function IconChevLeft()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M10 4L6 8l4 4"/></svg>; }
function IconChevRight() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14"><path d="M6 4l4 4-4 4"/></svg>; }
function IconDownload()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M8 3v7M5 8l3 3 3-3M2 13h12"/></svg>; }
function IconImage()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>; }

/* ── Badge de estado ── */
function EstadoBadge({ estado }: { estado: ProductoEstado }) {
  const cls =
    estado === 'Active'   ? styles.badgeActive   :
    estado === 'Inactive' ? styles.badgeInactive :
                            styles.badgeDraft;
  return <span className={[styles.badge, cls].join(' ')}>{estado}</span>;
}

/* ── Celda imagen ── */
function ImagenCell({ producto }: { producto: Producto }) {
  return (
    <div className={styles.imgCell}>
      {producto.imagen ? (
        <img src={producto.imagen} alt={producto.titulo} />
      ) : (
        <IconImage />
      )}
    </div>
  );
}

const PAGE_SIZE = 5;

export function ProductoPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(PRODUCTOS_MOCK.length / PAGE_SIZE);
  const rows: Producto[] = PRODUCTOS_MOCK.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.page}>
      {/* Cabecera */}
      <header className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>Control Producto</h1>
            <button id="btn-crear-producto" type="button" className={styles.btnCrear}>
              <IconPlus /> Crear
            </button>
          </div>
          <p className={styles.pageSubtitle}>Informe producto</p>
        </div>
      </header>

      {/* Tabla */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nro.</th>
              <th className={styles.th}>Titulo</th>
              <th className={styles.th}>Imagen</th>
              <th className={styles.th}>archivo</th>
              <th className={styles.th}>Especificaciones</th>
              <th className={styles.th}>Requerimiento</th>
              <th className={[styles.th, styles.thNum].join(' ')}>Precio lista</th>
              <th className={styles.th}>Ubicaciones</th>
              <th className={styles.th}>Estado</th>
              <th className={styles.th}>Descripcion</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className={styles.tr}>
                <td className={styles.td}>{p.id}</td>
                <td className={styles.td}>{p.titulo}</td>
                <td className={styles.td}>
                  <ImagenCell producto={p} />
                </td>
                <td className={styles.td}>
                  <div className={styles.archivoCell}>
                    <button
                      type="button"
                      className={styles.archivoIcon}
                      title="Descargar archivo"
                      id={`btn-archivo-${p.id}`}
                    >
                      <IconDownload />
                    </button>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.especList}>
                    {p.especificaciones.map((e, i) => (
                      <span key={i} className={styles.especItem}>{e}</span>
                    ))}
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.reqCell}>{p.requerimiento}</span>
                </td>
                <td className={[styles.td, styles.tdNum].join(' ')}>
                  <span className={styles.precio}>{fmtNum(p.precioLista)} bs</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.ubicBadge}>{p.ubicaciones}</span>
                </td>
                <td className={styles.td}>
                  <EstadoBadge estado={p.estado} />
                </td>
                <td className={styles.td}>
                  <p className={styles.descripcion}>{p.descripcion}</p>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button type="button" className={styles.actionBtn} title="Ver"      id={`btn-ver-prod-${p.id}`}><IconView /></button>
                    <button type="button" className={styles.actionBtn} title="Editar"   id={`btn-edit-prod-${p.id}`}><IconEdit /></button>
                    <button type="button" className={[styles.actionBtn, styles.actionDelete].join(' ')} title="Eliminar" id={`btn-del-prod-${p.id}`}><IconDelete /></button>
                    <button type="button" className={styles.actionBtn} title="Más"      id={`btn-more-prod-${p.id}`}><IconDots /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing 1 to {Math.min(page * PAGE_SIZE, PRODUCTOS_MOCK.length)} of {PRODUCTOS_MOCK.length} users
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
