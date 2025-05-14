import React from 'react';
import { ThemeProvider } from './ThemeContext';

/**
 * Theme wrapper component that should wrap your entire application to provide theme context
 */
const ThemeWrapper = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
