import React, { createContext, useState, useContext } from 'react';
import { LIGHT_COLORS, DARK_COLORS, LIGHT_GRADIENTS, DARK_GRADIENTS } from '../constants/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    colors: isDarkMode ? DARK_COLORS : LIGHT_COLORS,
    gradients: isDarkMode ? DARK_GRADIENTS : LIGHT_GRADIENTS,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};