import type { DonutSlice } from './dashboard.mock';
import styles from './DonutChart.module.css';

interface DonutChartProps {
  slices: DonutSlice[];
  total:  string;
  size?:  number;
  thickness?: number;
}

/**
 * DonutChart — Gráfico de dona puro en SVG.
 * Convierte los valores en ángulos y dibuja arcos SVG.
 */
export function DonutChart({ slices, total, size = 160, thickness = 36 }: DonutChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;

  const totalValue = slices.reduce((sum, s) => sum + s.value, 0);

  /* Calcula el offset de cada slice */
  let cumulativePercent = 0;
  const paths = slices.map((slice) => {
    const percent    = slice.value / totalValue;
    const dashArray  = `${percent * circumference} ${circumference}`;
    const dashOffset = -cumulativePercent * circumference;
    cumulativePercent += percent;

    return { ...slice, dashArray, dashOffset };
  });

  return (
    <div className={styles.wrapper}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
        aria-label={`Gráfico de dona: ${total}`}
        role="img"
      >
        {/* Rotamos -90° para que empiece desde arriba */}
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {paths.map((p) => (
            <circle
              key={p.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={p.color}
              strokeWidth={thickness}
              strokeDasharray={p.dashArray}
              strokeDashoffset={p.dashOffset}
              strokeLinecap="butt"
            />
          ))}
        </g>

        {/* Texto central */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className={styles.totalText}
        >
          {total}
        </text>
      </svg>

      {/* Leyenda */}
      <ul className={styles.legend} aria-label="Leyenda del gráfico">
        {slices.filter(s => s.label !== 'Restante').map((s) => (
          <li key={s.label} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: s.color }} />
            <span className={styles.legendLabel}>{s.label}</span>
            <span className={styles.legendValue}>
              ${((s.value / totalValue) * 85).toFixed(1)}k
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
