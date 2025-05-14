import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

const EnhancedThemeSwitcher = ({ variant = 'dropdown' }) => {
  const { themes, themeId, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Styling based on current theme for the switcher itself
  const switcherStyle = {
    cursor: 'pointer',
    display: 'inline-block',
    marginTop: '10px',
    marginBottom: '10px',
  };

  // Dropdown style
  const dropdownStyle = {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    padding: '10px',
    minWidth: '150px',
  };

  // Theme option style
  const getThemeOptionStyle = (id) => ({
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: id === themeId ? '#f0f0f0' : 'transparent',
    borderRadius: '3px',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
  });

  // Color preview circle
  const colorPreviewStyle = (color) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '8px',
    border: '1px solid rgba(0,0,0,0.2)',
  });

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle theme change
  const handleThemeChange = (id) => {
    setTheme(id);
    setIsOpen(false);
  };

  if (variant === 'buttons') {
    return (
      <div className="theme-switcher-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {themes.map(theme => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            style={{
              backgroundColor: themeId === theme.id ? theme.colors.primary : theme.colors.secondary,
              color: '#fff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              opacity: themeId === theme.id ? 1 : 0.7,
            }}
          >
            {theme.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="theme-switcher" style={switcherStyle} onClick={toggleDropdown}>
      <small>Theme: <strong>{themes.find(t => t.id === themeId)?.name}</strong> ▼</small>
      
      {isOpen && (
        <div className="theme-dropdown" style={dropdownStyle}>
          {themes.map(theme => (
            <div
              key={theme.id}
              style={getThemeOptionStyle(theme.id)}
              onClick={() => handleThemeChange(theme.id)}
            >
              <div style={colorPreviewStyle(theme.colors.background)}></div>
              <div style={colorPreviewStyle(theme.colors.primary)}></div>
              <span>{theme.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedThemeSwitcher;
