import type { BarDataPoint } from './dashboard.mock';
import styles from './BarChart.module.css';

interface BarChartProps {
  data:   BarDataPoint[];
  title?: string;
}

const BAR_COLOR_ONLINE  = '#4A90D9';
const BAR_COLOR_OFFLINE = '#7ED321';
const CHART_H     = 140;
const BAR_W       = 14;
const GAP         = 4;
const GROUP_W     = BAR_W * 2 + GAP + 8;
const PADDING_L   = 38;
const PADDING_B   = 32;

function formatK(val: number) {
  return val >= 1000 ? `${(val / 1000).toFixed(0)}k` : String(val);
}

export function BarChart({ data, title }: BarChartProps) {
  const maxVal  = Math.max(...data.flatMap(d => [d.online, d.offline]));
  const yMax    = Math.ceil((maxVal * 1.15) / 5000) * 5000;
  const chartW  = PADDING_L + data.length * GROUP_W + 8;
  const ySteps  = [0, 5000, 10000, 15000, 20000, 25000].filter(v => v <= yMax);

  function toY(val: number) {
    return CHART_H - (val / yMax) * CHART_H;
  }

  return (
    <div className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <svg
        width={chartW}
        height={CHART_H + PADDING_B + 10}
        viewBox={`0 0 ${chartW} ${CHART_H + PADDING_B + 10}`}
        className={styles.svg}
        role="img"
        aria-label={title ?? 'Gráfico de barras'}
        style={{ width: '100%' }}
      >
        {/* Grid lines + etiquetas Y */}
        {ySteps.map(step => {
          const y = toY(step) + 6;
          return (
            <g key={step}>
              <line
                x1={PADDING_L} y1={y}
                x2={chartW - 4} y2={y}
                stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 3"
              />
              <text x={PADDING_L - 4} y={y + 4} textAnchor="end" className={styles.labelY}>
                {formatK(step)}
              </text>
            </g>
          );
        })}

        {/* Barras */}
        {data.map((d, i) => {
          const x    = PADDING_L + i * GROUP_W;
          const yOnl = toY(d.online)  + 6;
          const yOff = toY(d.offline) + 6;
          const hOnl = CHART_H - yOnl + 6;
          const hOff = CHART_H - yOff + 6;

          return (
            <g key={d.day}>
              <rect x={x}            y={yOnl} width={BAR_W} height={Math.max(hOnl, 0)}
                fill={BAR_COLOR_ONLINE}  rx="3" className={styles.bar}>
                <title>{`${d.day} Online: ${formatK(d.online)}`}</title>
              </rect>
              <rect x={x + BAR_W + GAP} y={yOff} width={BAR_W} height={Math.max(hOff, 0)}
                fill={BAR_COLOR_OFFLINE} rx="3" className={styles.bar}>
                <title>{`${d.day} Offline: ${formatK(d.offline)}`}</title>
              </rect>
              <text x={x + BAR_W + GAP / 2} y={CHART_H + 22} textAnchor="middle" className={styles.labelX}>
                {d.day}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: BAR_COLOR_ONLINE }} />
          Online
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: BAR_COLOR_OFFLINE }} />
          Offline
        </span>
      </div>
    </div>
  );
}
