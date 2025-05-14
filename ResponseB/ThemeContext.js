import React, { createContext, useState, useContext, useEffect } from "react";

// Theme configuration - add more themes as needed
export const themes = {
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      background: '#ffffff',
      text: '#000000',
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      cardBackground: '#ffffff',
      navbarBackground: '#f8f9fa',
      sidebarBackground: '#f8f9fa',
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      background: '#1d2127',
      text: '#ffffff',
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      cardBackground: '#12171e',
      navbarBackground: '#1d2127',
      sidebarBackground: '#1d2127',
    }
  },
  blue: {
    id: 'blue',
    name: 'Blue Theme',
    colors: {
      background: '#e6f2ff',
      text: '#003366',
      primary: '#0066cc',
      secondary: '#336699',
      success: '#00994d',
      danger: '#cc0000',
      cardBackground: '#cce6ff',
      navbarBackground: '#0099ff',
      sidebarBackground: '#0066cc',
    }
  },
  green: {
    id: 'green',
    name: 'Green Theme',
    colors: {
      background: '#e6ffe6',
      text: '#003300',
      primary: '#009933',
      secondary: '#339966',
      success: '#00cc66',
      danger: '#cc0000',
      cardBackground: '#ccffcc',
      navbarBackground: '#009933',
      sidebarBackground: '#006622',
    }
  },
  purple: {
    id: 'purple',
    name: 'Purple Theme',
    colors: {
      background: '#f2e6ff',
      text: '#330066',
      primary: '#9933ff',
      secondary: '#cc99ff',
      success: '#6600cc',
      danger: '#cc0066',
      cardBackground: '#e6ccff',
      navbarBackground: '#9933ff',
      sidebarBackground: '#7700dd',
    }
  }
};

const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize with saved preference or default to light
  const [themeId, setThemeId] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const currentTheme = themes[themeId] || themes.light;

  // Apply theme to body when theme changes
  useEffect(() => {
    // Remove all theme classes from body
    Object.keys(themes).forEach(id => {
      document.body.classList.remove(`theme-${id}`);
    });
    
    // Add the current theme class
    document.body.classList.add(`theme-${themeId}`);
    
    // Save the theme preference
    localStorage.setItem('theme', themeId);
  }, [themeId]);

  // Theme manager object
  const themeManager = {
    theme: currentTheme,
    themeId,
    setTheme: (id) => setThemeId(id),
    themes: Object.values(themes),
  };

  return (
    <ThemeContext.Provider value={themeManager}>
      {children}
    </ThemeContext.Provider>
  );
};
