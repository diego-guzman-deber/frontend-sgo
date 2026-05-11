import type { SectionData } from './dashboard.mock';
import { DonutChart } from './DonutChart';
import { BarChart }   from './BarChart';
import styles from './SectionCard.module.css';

interface SectionCardProps {
  data: SectionData;
}

export function SectionCard({ data }: SectionCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.sectionTitle}>{data.title}</h2>

      <div className={styles.grid}>
        {/* ── Columna 1: Donut ── */}
        <div className={styles.colDonut}>
          <p className={styles.colLabel}>Vendido respecto al objetivo</p>
          <DonutChart slices={data.donut} total={data.total} />
        </div>

        {/* ── Columna 2: Bar chart ── */}
        <div className={styles.colBar}>
          <BarChart data={data.bars} title="Saldo por cobrar" />
        </div>

        {/* ── Columna 3: Detalles ── */}
        <div className={styles.colDetails}>
          <h3 className={styles.detailsTitle}>Mas detalles</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Name</th>
                <th className={[styles.th, styles.thPop].join(' ')}>Popularity</th>
                <th className={[styles.th, styles.thPct].join(' ')}>%</th>
              </tr>
            </thead>
            <tbody>
              {data.details.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  <td className={styles.td}>{row.id}</td>
                  <td className={styles.td}>{row.name}</td>
                  <td className={[styles.td, styles.tdPop].join(' ')}>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${row.popularity}%`, background: row.color }}
                      />
                    </div>
                  </td>
                  <td className={[styles.td, styles.tdPct].join(' ')}>
                    <span
                      className={styles.badge}
                      style={{ borderColor: row.color, color: row.color }}
                    >
                      {row.percent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
