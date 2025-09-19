"use client";
import React from 'react';
import { useTheme } from '@mui/material/styles';

export type RadarDatum = {
  label: string;
  value: number; // 0-100
};

type Props = {
  size?: number;
  levels?: number; // grid levels
  data: RadarDatum[];
};

export default function Radar({ size = 280, levels = 5, data }: Props) {
  const theme = useTheme();
  const cx = size / 2, cy = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / data.length;

  const polar = (i: number, r: number) => {
    const ang = -Math.PI / 2 + i * angleStep; // start at top
    return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
  };

  // grid
  const grids = Array.from({ length: levels }, (_, li) => {
    const r = radius * ((li + 1) / levels);
    const points = data.map((_, i) => polar(i, r));
    const d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    return <path key={li} d={d} stroke={theme.palette.divider} fill="none" />
  });

  // polygon for values
  const polyPoints = data.map((d, i) => {
    const r = radius * Math.max(0, Math.min(100, d.value)) / 100;
    return polar(i, r);
  });
  const polyD = polyPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const fillColor = theme.palette.primary.main;

  return (
    <svg width={size} height={size}>
      <g>
        {grids}
        <path d={polyD} fill={fillColor + '33'} stroke={fillColor} />
        {/* axes labels */}
        {data.map((d, i) => {
          const p = polar(i, radius + 16);
          return (
            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill={theme.palette.text.secondary} fontSize={12}>
              {d.label}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
