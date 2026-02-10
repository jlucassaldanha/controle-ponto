"use client";

import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline, PaletteMode, createTheme } from '@mui/material';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode deve ser usado dentro de um CustomThemeProvider');
  }
  return context;
}

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode); 
          return newMode;
        })
      },
      mode,
    }), [mode]
  );

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
        ...(mode === 'light' ? {
          primary: { main: '#1976d2' },
          background: { default: '#f5f5f5', paper: '#ffffff' },
        } : {
          primary: { main: '#90caf9' },
          background: { default: '#1e1e1e', paper: '#1e1e1e' },
        })
      },
      components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
    },
    }), [mode]
  );

  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }
  
  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

