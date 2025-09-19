"use client";
import React from 'react';
import { useTheme } from '@mui/material/styles';

type Props = {
  width?: number;
  height?: number;
  data: number[]; // values 0..max
};

export default function MiniLine({ width = 320, height = 120, data }: Props) {
  const theme = useTheme();
  const pad = 10;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const max = Math.max(1, ...data);
  const step = w / Math.max(1, data.length - 1);

  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (1 - v / max) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={12} fill={theme.palette.background.paper} />
      <polyline
        points={points}
        fill="none"
        stroke={theme.palette.primary.main}
        strokeWidth={3}
      />
      {/* dots */}
      {data.map((v, i) => {
        const x = pad + i * step;
        const y = pad + (1 - v / max) * h;
        return <circle key={i} cx={x} cy={y} r={3.5} fill={theme.palette.secondary.main} />
      })}
    </svg>
  );
}
