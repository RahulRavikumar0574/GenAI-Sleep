"use client";
import React from 'react';

type Props = {
  size?: number;
  stroke?: number;
  value: number; // 0-100
  trackColor?: string;
  barColor?: string;
  center?: React.ReactNode;
};

export default function Donut({ size = 140, stroke = 14, value, trackColor = '#e2e8f0', barColor = '#0ea5e9', center }: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, value)) / 100);
  const half = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={half} cy={half} r={radius} stroke={trackColor} strokeWidth={stroke} fill="none" />
      <circle
        cx={half}
        cy={half}
        r={radius}
        stroke={barColor}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${half} ${half})`}
      />
      {center && (
        <foreignObject x={stroke} y={stroke} width={size - stroke * 2} height={size - stroke * 2}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {center}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}
