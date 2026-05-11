import { useState } from 'react';
import { DASHBOARD_SECTIONS } from './dashboard.mock';
import { SectionCard } from './SectionCard';
import styles from './DashboardPage.module.css';

type FilterPeriod = 'dia' | 'semana' | 'mes';

/* ── Ícono Calendario ── */
function IconCalendar() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      width="16" height="16">
      <rect x="2" y="3" width="14" height="13" rx="2" />
      <path d="M6 1v4M12 1v4M2 7h14" />
    </svg>
  );
}

export function DashboardPage() {
  const [period, setPeriod] = useState<FilterPeriod>('dia');

  return (
    <div className={styles.page}>
      {/* ── Barra de filtros ── */}
      <div className={styles.filterBar}>
        <span className={styles.filterLabel}>Filtro</span>
        <div className={styles.filterActions}>
          <div className={styles.periodGroup} role="group" aria-label="Período">
            {(['dia', 'semana', 'mes'] as FilterPeriod[]).map(p => (
              <button
                key={p}
                type="button"
                id={`filter-${p}`}
                className={[
                  styles.periodBtn,
                  period === p ? styles.periodActive : '',
                ].join(' ')}
                onClick={() => setPeriod(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.calBtn}
            aria-label="Seleccionar fecha"
            id="filter-calendar"
          >
            <IconCalendar />
          </button>
        </div>
      </div>

      {/* ── Secciones ── */}
      <div className={styles.sections}>
        {DASHBOARD_SECTIONS.map(section => (
          <SectionCard key={section.id} data={section} />
        ))}
      </div>
    </div>
  );
}
