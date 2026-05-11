import { useState } from 'react';
import styles from './CrearPedido.module.css';

/* ── Datos mock para dropdowns ── */
const EJECUTIVOS = ['Juanita Azurdui', 'Roberto Montaño', 'Ana Veizaga', 'Carlos Méndez'];
const CLIENTES   = ['Banco Ganadero', 'Bianca Flor', 'Banco Sol', 'Editorial El Norte', 'Cervecería Boliviana'];
const UNIDADES_NEGOCIO = ['Radio', 'Web', 'Streaming', 'Imprenta', 'TV'];
const UBICACIONES      = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Sucre'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
const DIAS_INTERVALO = ['I', 'L', 'M', 'X', 'J', 'V', 'S', 'D'];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

interface Props {
  onCancel: () => void;
}

export function CrearPedido({ onCancel }: Props) {
  /* Campos básicos */
  const [ejecutivo, setEjecutivo]   = useState('');
  const [openEjec,  setOpenEjec]    = useState(false);
  const [cliente,   setCliente]     = useState('');
  const [openCliente, setOpenCliente] = useState(false);
  const [fecha,     setFecha]       = useState('');
  const [monto,     setMonto]       = useState('');
  const [campana,   setCampana]     = useState('');
  const [paquete,   setPaquete]     = useState('');

  /* Campos de unidad */
  const [unidadNeg,   setUnidadNeg]  = useState('Placeholder');
  const [openUn,      setOpenUn]     = useState(false);
  const [producto,    setProducto]   = useState('');
  const [ubicacion,   setUbicacion]  = useState('Placeholder');
  const [openUbic,    setOpenUbic]   = useState(false);
  const [cantidad,    setCantidad]   = useState('');
  const [unidMedida,  setUnidMedida] = useState('');
  const [unidTarifa,  setUnidTarifa] = useState('');

  /* Campos de fecha-intervalo */
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal,  setFechaFinal]  = useState('');
  const [intervalo,   setIntervalo]   = useState('I');
  const [montoItem,   setMontoItem]   = useState('');
  const [materiales,  setMateriales]  = useState('');

  /* Calendario — celdas seleccionadas [mes][dia] */
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [dragging, setDragging] = useState(false);

  function toggleCell(mes: string, dia: number) {
    const key = `${mes}-${dia}`;
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  }

  /* Descripción */
  const [descripcion, setDescripcion] = useState('');
  const MAX_DESC = 100;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con API
    alert('Pedido registrado (mock)');
    onCancel();
  }

  /* Mini-dropdown */
  function Dropdown({ label, value, open, setOpen, options, onSelect }: {
    label: string; value: string; open: boolean;
    setOpen: (v: boolean) => void; options: string[]; onSelect: (v: string) => void;
  }) {
    return (
      <div className={styles.dropdownWrapper}>
        <button
          type="button"
          className={[styles.dropdownTrigger, open ? styles.dropdownOpen : ''].join(' ')}
          onClick={() => setOpen(!open)}
          aria-label={label}
          aria-expanded={open}
        >
          <span className={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
            {value || 'seleccionar'}
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
                  onClick={() => { onSelect(opt); setOpen(false); }}>
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ── Fila 1: Ejecutivo, Cliente, Fecha ── */}
      <div className={styles.row3}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Ejecutivo orden</label>
          <Dropdown
            label="Ejecutivo orden" value={ejecutivo} open={openEjec}
            setOpen={setOpenEjec} options={EJECUTIVOS} onSelect={setEjecutivo}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Cliente</label>
          <Dropdown
            label="Cliente" value={cliente} open={openCliente}
            setOpen={setOpenCliente} options={CLIENTES} onSelect={setCliente}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Fecha</label>
          <input
            type="date" className={styles.input}
            value={fecha} onChange={e => setFecha(e.target.value)}
            placeholder="date"
          />
        </div>
      </div>

      {/* ── Fila 2: Monto, Campaña, Paquete ── */}
      <div className={styles.row3}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>monto total</label>
          <input className={styles.input} type="number" placeholder="amount"
            value={monto} onChange={e => setMonto(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>campaña</label>
          <input className={styles.input} type="text" placeholder="campaña"
            value={campana} onChange={e => setCampana(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>paquete</label>
          <input className={styles.input} type="text" placeholder="paquete"
            value={paquete} onChange={e => setPaquete(e.target.value)} />
        </div>
      </div>

      {/* ── Fila 3: Unidad negocio, Producto, Ubicacion, Cantidad, Unid medida, Unid tarifa ── */}
      <div className={styles.rowMulti}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Unidad negocio</label>
          <Dropdown
            label="Unidad negocio" value={unidadNeg} open={openUn}
            setOpen={setOpenUn} options={UNIDADES_NEGOCIO} onSelect={setUnidadNeg}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>producto</label>
          <input className={styles.input} type="text" placeholder="detalle"
            value={producto} onChange={e => setProducto(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Ubicacion</label>
          <Dropdown
            label="Ubicacion" value={ubicacion} open={openUbic}
            setOpen={setOpenUbic} options={UBICACIONES} onSelect={setUbicacion}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Cantidad</label>
          <input className={styles.input} type="number" placeholder="detalle"
            value={cantidad} onChange={e => setCantidad(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Unidad medida</label>
          <input className={styles.input} type="text" placeholder="detalle"
            value={unidMedida} onChange={e => setUnidMedida(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Unidad tarifa</label>
          <input className={styles.input} type="text" placeholder="detalle"
            value={unidTarifa} onChange={e => setUnidTarifa(e.target.value)} />
        </div>
      </div>

      {/* ── Fila 4: Fechas, Intervalo, Monto item, Materiales ── */}
      <div className={styles.rowMulti}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Fecha inicio</label>
          <input className={styles.input} type="text" placeholder="detalle"
            value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Fecha final</label>
          <input className={styles.input} type="text" placeholder="detalle"
            value={fechaFinal} onChange={e => setFechaFinal(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>intervalo</label>
          <div className={styles.intervalGroup}>
            {DIAS_INTERVALO.map(d => (
              <button
                key={d} type="button"
                className={[styles.intervalBtn, intervalo === d ? styles.intervalActive : ''].join(' ')}
                onClick={() => setIntervalo(d)}
                aria-pressed={intervalo === d}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>monto</label>
          <input className={styles.input} type="number" placeholder="detalle"
            value={montoItem} onChange={e => setMontoItem(e.target.value)} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>materiales</label>
          <input className={styles.input} type="text" placeholder="materiales"
            value={materiales} onChange={e => setMateriales(e.target.value)} />
        </div>
      </div>

      {/* ── Calendario de scheduling ── */}
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarScroll}>
          <table className={styles.calendarTable}>
            <thead>
              <tr>
                <th className={styles.calMesHeader}>Mes</th>
                {DAYS.map(d => (
                  <th key={d} className={styles.calDayHeader}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MESES.map(mes => (
                <tr key={mes}>
                  <td className={styles.calMesCell}>{mes}</td>
                  {DAYS.map(d => {
                    const key = `${mes}-${d}`;
                    const isSelected = !!selected[key];
                    return (
                      <td
                        key={d}
                        className={[styles.calCell, isSelected ? styles.calCellSelected : ''].join(' ')}
                        onMouseDown={() => { setDragging(true); toggleCell(mes, d); }}
                        onMouseEnter={() => { if (dragging) toggleCell(mes, d); }}
                        onMouseUp={() => setDragging(false)}
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
          <label className={styles.label} htmlFor="pedido-desc">Descripcion</label>
          <span className={styles.descCount}>{descripcion.length}/{MAX_DESC}</span>
        </div>
        <textarea
          id="pedido-desc"
          className={styles.textarea}
          maxLength={MAX_DESC}
          rows={3}
          placeholder="Descripción del pedido..."
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>

      {/* ── Acciones ── */}
      <div className={styles.formActions}>
        <button type="button" className={styles.btnAgregar} id="btn-agregar-item">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="13" height="13"><path d="M8 3v10M3 8h10"/></svg>
          Agregar
        </button>
        <div className={styles.formActionsRight}>
          <button type="button" className={styles.btnCancelar} onClick={onCancel} id="btn-cancelar-pedido">
            Cancelar
          </button>
          <button type="submit" className={styles.btnRegistrar} id="btn-registrar-pedido">
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}
