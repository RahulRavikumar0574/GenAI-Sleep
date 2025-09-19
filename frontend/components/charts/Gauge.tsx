"use client";
import React from 'react';

type Props = {
  size?: number; // width
  value: number; // 0-100
  trackColor?: string;
  barColor?: string;
};

export default function Gauge({ size = 240, value, trackColor = '#e2e8f0', barColor = '#0ea5e9' }: Props) {
  const width = size;
  const height = size * 0.6;
  const cx = width / 2;
  const cy = height;
  const r = width * 0.45;
  const startAngle = Math.PI; // 180deg
  const endAngle = 0; // 0deg

  const clamp = (v: number) => Math.max(0, Math.min(100, v));
  const angle = startAngle + (endAngle - startAngle) * (clamp(value) / 100);

  const polar = (ang: number) => ({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
  const start = polar(startAngle);
  const end = polar(endAngle);

  const needle = polar(angle);

  const arcPath = (sa: number, ea: number, color: string) => {
    const s = polar(sa); const e = polar(ea);
    const largeArc = 0;
    return <path d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`} stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" />
  };

  return (
    <svg width={width} height={height + 10}>
      {arcPath(startAngle, endAngle, trackColor)}
      {arcPath(startAngle, angle, barColor)}
      <circle cx={cx} cy={cy} r={10} fill={barColor} />
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={barColor} strokeWidth={10} strokeLinecap="round" />
    </svg>
  );
}
