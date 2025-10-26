// src/providers/ThemeProvider.tsx
"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '@/theme/theme';

// 1. Criar o Contexto
interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Criar o Provedor
export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light'); // Padrão é claro

  // Função para alternar o tema
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoriza o tema para evitar recálculos desnecessários
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        {/* CssBaseline é CRUCIAL! Ele aplica o background e cores de texto padrão do tema. */}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

// 3. Criar um hook customizado para facilitar o uso
export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode deve ser usado dentro de um CustomThemeProvider');
  }
  return context;
}