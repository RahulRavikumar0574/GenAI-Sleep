"use client";
import { createTheme } from "@mui/material/styles";

export type ThemeKey = 'blue' | 'purple' | 'mint';

const base = {
  typography: {
    fontFamily: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
  },
};

export const blueTheme = createTheme({
  ...base,
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' }, // blue-600
    secondary: { main: '#0ea5e9' }, // sky-500
    background: { default: '#eef2ff', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#475569' },
  },
  components: {
    ...base.components,
  },
});

export const purpleTheme = createTheme({
  ...base,
  palette: {
    mode: 'light',
    primary: { main: '#7c3aed' }, // violet-600
    secondary: { main: '#a78bfa' },
    background: { default: '#2e105f', paper: '#3b166f' },
    text: { primary: '#f5e9ff', secondary: '#d6bdfb' },
  },
});

export const mintTheme = createTheme({
  ...base,
  palette: {
    mode: 'light',
    primary: { main: '#0f766e' }, // teal-700
    secondary: { main: '#14b8a6' },
    background: { default: '#d1fae5', paper: '#e7f5ef' },
    text: { primary: '#083344', secondary: '#115e59' },
  },
});

export const themes: Record<ThemeKey, ReturnType<typeof createTheme>> = {
  blue: blueTheme,
  purple: purpleTheme,
  mint: mintTheme,
};

export const defaultThemeKey: ThemeKey = 'blue';
