"use client";
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { themes, defaultThemeKey, ThemeKey } from '../theme';

export const AppThemeContext = React.createContext<{
  themeKey: ThemeKey;
  setThemeKey: (k: ThemeKey) => void;
}>({ themeKey: defaultThemeKey, setThemeKey: () => {} });

export function useAppTheme() {
  return React.useContext(AppThemeContext);
}

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>(defaultThemeKey);

  React.useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('themeKey') as ThemeKey | null) : null;
    if (saved && themes[saved]) setThemeKey(saved);
  }, []);

  const handleSetTheme = (k: ThemeKey) => {
    setThemeKey(k);
    if (typeof window !== 'undefined') localStorage.setItem('themeKey', k);
  };

  const theme = themes[themeKey];

  return (
    <AppThemeContext.Provider value={{ themeKey, setThemeKey: handleSetTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
