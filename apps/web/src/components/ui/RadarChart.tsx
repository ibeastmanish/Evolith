"use client";

import { useMemo } from "react";

interface RadarChartProps {
  data: Record<string, number>; // key → value (0–1)
  labels: Record<string, string>; // key → display label
  size?: number;
  color?: string;
  className?: string;
}

export default function RadarChart({
  data,
  labels,
  size = 280,
  color = "var(--ag-accent)",
  className = "",
}: RadarChartProps) {
  const keys = Object.keys(data);
  const n = keys.length;
  const center = size / 2;
  const radius = size * 0.38;

  const points = useMemo(() => {
    return keys.map((key, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const value = data[key] ?? 0;
      return {
        key,
        label: labels[key] || key,
        value,
        x: center + radius * value * Math.cos(angle),
        y: center + radius * value * Math.sin(angle),
        labelX: center + (radius + 24) * Math.cos(angle),
        labelY: center + (radius + 24) * Math.sin(angle),
        axisX: center + radius * Math.cos(angle),
        axisY: center + radius * Math.sin(angle),
      };
    });
  }, [data, labels, keys, n, center, radius]);

  const dataPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Concentric grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        role="img"
        aria-label="Discovery Score radar chart"
      >
        {/* Grid rings */}
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={keys
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
                return `${center + radius * ring * Math.cos(angle)},${center + radius * ring * Math.sin(angle)}`;
              })
              .join(" ")}
            fill="none"
            stroke="var(--ag-border)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((p) => (
          <line
            key={`axis-${p.key}`}
            x1={center}
            y1={center}
            x2={p.axisX}
            y2={p.axisY}
            stroke="var(--ag-border)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon fill */}
        <path
          d={dataPath}
          fill={color}
          fillOpacity="0.12"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p) => (
          <circle
            key={`point-${p.key}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={color}
            stroke="var(--ag-background)"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {points.map((p) => (
          <text
            key={`label-${p.key}`}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--ag-text-secondary)"
            fontSize="11"
            fontFamily="var(--font-body)"
            fontWeight="500"
          >
            {p.label}
          </text>
        ))}

        {/* Value labels */}
        {points.map((p) => (
          <text
            key={`val-${p.key}`}
            x={p.x}
            y={p.y - 12}
            textAnchor="middle"
            fill="var(--ag-text-tertiary)"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            {(p.value * 100).toFixed(0)}
          </text>
        ))}
      </svg>
    </div>
  );
}
