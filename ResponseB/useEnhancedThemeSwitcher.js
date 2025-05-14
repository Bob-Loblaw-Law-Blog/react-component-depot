import React from 'react';
import { useTheme } from './ThemeContext';
import EnhancedThemeSwitcher from './EnhancedThemeSwitcher';

/**
 * Hook that returns a component for toggling between themes
 * Compatible with the original useThemeSwitcher interface but with expanded functionality
 */
function useEnhancedThemeSwitcher(options = {}) {
  const { themes, themeId, setTheme } = useTheme();
  const { variant = 'dropdown', className = 'cursor-pointer', ...restProps } = options;

  // If we want to use the classic toggle style
  const legacy = () => (
    <a
      className={className}
      onClick={() => setTheme(themeId === 'dark' ? 'light' : 'dark')}
      {...restProps}
    >
      <small>{themeId === 'dark' ? 'Light' : 'Dark'} Mode</small>
    </a>
  );

  // Enhanced theme switcher
  const enhanced = () => <EnhancedThemeSwitcher variant={variant} {...restProps} />;

  // We return the classic toggle by default for backward compatibility
  return legacy();
}

export default useEnhancedThemeSwitcher;
