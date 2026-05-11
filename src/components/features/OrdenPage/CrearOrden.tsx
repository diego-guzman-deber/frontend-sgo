import { useState } from 'react';
import styles from './CrearOrden.module.css';

/* ── Datos mock para dropdowns ── */
const CLIENTES    = ['Banco Ganadero', 'Bianca Flor', 'Banco Sol', 'Editorial El Norte'];
const CONTRATOS   = ['Contrato 001', 'Contrato 002', 'Contrato 003', 'Contrato 004'];
const PEDIDOS     = ['Pedido #1 - Campaña 1', 'Pedido #2 - Campaña 2', 'Pedido #3 - Campaña 3'];
const UNIDADES    = ['Radio', 'Web', 'Streaming', 'Imprenta', 'TV'];
const UBICACIONES = ['Comercial', 'Nacional', 'Digital', 'La Paz', 'Santa Cruz'];
const MESES       = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
const INTERVALOS  = ['I', 'L', 'M', 'X', 'J', 'V', 'S', 'D'];
const DAYS        = Array.from({ length: 31 }, (_, i) => i + 1);

interface Props {
  onCancel: () => void;
}

/* ── Mini Dropdown reutilizable ── */
function Dropdown({ label, value, open, setOpen, options, onSelect, id }: {
  label: string; value: string; open: boolean; id: string;
  setOpen: (v: boolean) => void; options: string[]; onSelect: (v: string) => void;
}) {
  return (
    <div className={styles.dropdownWrapper}>
      <button id={id} type="button"
        className={[styles.dropdownTrigger, open ? styles.dropdownOpen : ''].join(' ')}
        onClick={() => setOpen(!open)} aria-label={label} aria-expanded={open}>
        <span className={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {value || 'Placeholder'}
        </span>
        <svg viewBox="0 0 10 6" fill="none" width="10" height="6">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <ul className={styles.dropdownMenu} role="listbox">
          {options.map(opt => (
            <li key={opt} role="option" aria-selected={value === opt}>
              <button type="button" className={styles.dropdownItem}
                onClick={() => { onSelect(opt); setOpen(false); }}>{opt}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CrearOrden({ onCancel }: Props) {
  /* Fila 1 */
  const [cliente,      setCliente]      = useState('');
  const [openCliente,  setOpenCliente]  = useState(false);
  const [contrato,     setContrato]     = useState('');
  const [openContrato, setOpenContrato] = useState(false);
  const [pedido,       setPedido]       = useState('');
  const [openPedido,   setOpenPedido]   = useState(false);

  /* Fila 2 */
  const [unidadNeg,  setUnidadNeg]  = useState('');
  const [openUn,     setOpenUn]     = useState(false);
  const [producto,   setProducto]   = useState('');
  const [ubicacion,  setUbicacion]  = useState('');
  const [openUbic,   setOpenUbic]   = useState(false);
  const [cantidad,   setCantidad]   = useState('');
  const [unidMedida, setUnidMedida] = useState('');
  const [unidTarifa, setUnidTarifa] = useState('');

  /* Fila 3 */
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal,  setFechaFinal]  = useState('');
  const [intervalo,   setIntervalo]   = useState('I');
  const [monto,       setMonto]       = useState('');
  const [materiales,  setMateriales]  = useState('');

  /* Calendario */
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [dragging, setDragging] = useState(false);
  function toggleCell(mes: string, d: number) {
    const k = `${mes}-${d}`;
    setSelected(prev => ({ ...prev, [k]: !prev[k] }));
  }

  /* Descripción */
  const [descripcion, setDescripcion] = useState('');
  const MAX_DESC = 100;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('Orden registrada (mock)');
    onCancel();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>

      {/* ── Fila 1: Cliente · Contrato · Pedido ── */}
      <div className={styles.row3}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Cliente</label>
          <Dropdown id="dd-cliente" label="Cliente" value={cliente} open={openCliente}
            setOpen={setOpenCliente} options={CLIENTES} onSelect={setCliente} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Contrato</label>
          <Dropdown id="dd-contrato" label="Contrato" value={contrato} open={openContrato}
            setOpen={setOpenContrato} options={CONTRATOS} onSelect={setContrato} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Pedido</label>
          <Dropdown id="dd-pedido" label="Pedido" value={pedido} open={openPedido}
            setOpen={setOpenPedido} options={PEDIDOS} onSelect={setPedido} />
        </div>
      </div>

      {/* ── Fila 2: Unidad · Producto · Ubicación · Cantidad · Medida · Tarifa ── */}
      <div className={styles.rowMulti}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Unidad negocio</label>
          <Dropdown id="dd-unidad" label="Unidad negocio" value={unidadNeg} open={openUn}
            setOpen={setOpenUn} options={UNIDADES} onSelect={setUnidadNeg} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>producto</label>
          <input className={styles.input} placeholder="Detalle"
            value={producto} onChange={e => setProducto(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Ubicacion</label>
          <Dropdown id="dd-ubicacion" label="Ubicacion" value={ubicacion} open={openUbic}
            setOpen={setOpenUbic} options={UBICACIONES} onSelect={setUbicacion} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Cantidad</label>
          <input className={styles.input} type="number" placeholder="detalle"
            value={cantidad} onChange={e => setCantidad(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Unidad medida</label>
          <input className={styles.input} placeholder="detalle"
            value={unidMedida} onChange={e => setUnidMedida(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Unidad tarifa</label>
          <input className={styles.input} placeholder="detalle"
            value={unidTarifa} onChange={e => setUnidTarifa(e.target.value)} />
        </div>
      </div>

      {/* ── Fila 3: Fechas · Intervalo · Monto · Materiales ── */}
      <div className={styles.rowMulti}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Fecha inicio</label>
          <input className={styles.input} placeholder="detalle"
            value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Fecha final</label>
          <input className={styles.input} placeholder="detalle"
            value={fechaFinal} onChange={e => setFechaFinal(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>intervalo</label>
          <div className={styles.intervalGroup}>
            {INTERVALOS.map(d => (
              <button key={d} type="button"
                className={[styles.intervalBtn, intervalo === d ? styles.intervalActive : ''].join(' ')}
                onClick={() => setIntervalo(d)} aria-pressed={intervalo === d}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>monto</label>
          <input className={styles.input} type="number" placeholder="detalle"
            value={monto} onChange={e => setMonto(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>materiales</label>
          <input className={styles.input} placeholder="materiales"
            value={materiales} onChange={e => setMateriales(e.target.value)} />
        </div>
      </div>

      {/* ── Calendario de scheduling ── */}
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarScroll}
          onMouseLeave={() => setDragging(false)}
          onMouseUp={() => setDragging(false)}>
          <table className={styles.calendarTable}>
            <thead>
              <tr>
                <th className={styles.calMesHeader}>Mes</th>
                {DAYS.map(d => <th key={d} className={styles.calDayHeader}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {MESES.map(mes => (
                <tr key={mes}>
                  <td className={styles.calMesCell}>{mes}</td>
                  {DAYS.map(d => {
                    const isOn = !!selected[`${mes}-${d}`];
                    return (
                      <td key={d}
                        className={[styles.calCell, isOn ? styles.calCellSelected : ''].join(' ')}
                        onMouseDown={() => { setDragging(true); toggleCell(mes, d); }}
                        onMouseEnter={() => { if (dragging) toggleCell(mes, d); }}
                        title={`${mes} día ${d}`}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Descripción ── */}
      <div className={styles.descSection}>
        <div className={styles.descHeader}>
          <label className={styles.label} htmlFor="orden-desc">Descripcion</label>
          <span className={styles.descCount}>{descripcion.length}/{MAX_DESC}</span>
        </div>
        <textarea id="orden-desc" className={styles.textarea} maxLength={MAX_DESC} rows={3}
          placeholder="Descripción de la orden..." value={descripcion}
          onChange={e => setDescripcion(e.target.value)} />
      </div>

      {/* ── Acciones ── */}
      <div className={styles.formActions}>
        <button type="button" className={styles.btnCancelar} onClick={onCancel}
          id="btn-cancelar-orden">Cancelar</button>
        <button type="submit" className={styles.btnRegistrar}
          id="btn-registrar-orden">Registrar</button>
      </div>
    </form>
  );
}
