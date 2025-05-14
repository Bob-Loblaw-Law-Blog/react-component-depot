# Multi-Theme Integration Guide

This guide explains how to integrate the enhanced multi-theme system into your React application.

## Implementation Steps

### 1. Add the Theme Files to Your Project

Copy the following files to your project:

- `ThemeContext.js` - Contains theme definitions and context
- `ThemeWrapper.js` - Root component to wrap your application
- `EnhancedThemeSwitcher.js` - UI component for theme selection
- `useEnhancedThemeSwitcher.js` - Hook for backward compatibility
- `enhanced-themes.css` - CSS styles for all available themes

### 2. Update Your App.js File

Replace your current App.js with the enhanced version:

```jsx
import React from "react";
import "components/FontawsomeIcons";

import "./App.css";
// Import the new enhanced themes CSS (instead of dark.css)
import "./enhanced-themes.css";

import Layout from "pages/_layouts/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "routes";
import PageNotFound from "pages/PageNotFound";
import Home from "pages/Home";

// Import our new theme wrapper
import ThemeWrapper from "components/ThemeWrapper"; // Create this component

function App() {
    return (
        // Wrap the entire application with ThemeProvider
        <ThemeWrapper>
            <Router>
                <Layout>
                    {/* Rest of your App.js code */}
                </Layout>
            </Router>
        </ThemeWrapper>
    );
}

export default App;
```

### 3. Update Navbar Component

Replace your current Navbar component with the enhanced version:

```jsx
// Import the new theme switcher
import useEnhancedThemeSwitcher from "hooks/useEnhancedThemeSwitcher";

export const Navbar = () => {
    // Use the enhanced theme switcher
    const ThemeSwitcher = useEnhancedThemeSwitcher({
        variant: 'dropdown', // or 'buttons'
    });

    // Rest of your Navbar code
    return (
        <nav id="sidebar" className={!isNavbarVisible ? "active" : ""}>
            {/* ... */}
            <p className="mb-0 text-white">{ThemeSwitcher}</p>
            {/* ... */}
        </nav>
    );
};
```

### 4. Using Theme Colors in Components

You can access the current theme in any component:

```jsx
import { useTheme } from './ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme(); // Get current theme
  
  // Use theme colors
  const styles = {
    container: {
      backgroundColor: theme.colors.cardBackground,
      color: theme.colors.text
    },
    button: {
      backgroundColor: theme.colors.primary,
      color: 'white'
    }
  };
  
  return (
    <div style={styles.container}>
      <button style={styles.button}>Click Me</button>
    </div>
  );
};
```

### 5. Add a Theme Sample Page

To help users preview all available themes, add the `ThemesSamplePage.js` component to your project and create a route for it.

## Available Themes

The implementation includes five themes:

1. **Light** - Default light theme
2. **Dark** - Dark theme
3. **Blue** - Blue color scheme
4. **Green** - Green color scheme
5. **Purple** - Purple color scheme

You can easily extend this by modifying the `themes` object in `ThemeContext.js`.

## Customizing Themes

To add a new theme:

1. Add your theme to the themes object in `ThemeContext.js`
2. Add corresponding CSS rules in `enhanced-themes.css`

## CSS Variables

The implementation uses CSS variables (custom properties) to make theme switching more efficient. Variables like `--background`, `--text`, and `--primary` control the appearance of elements.

## Backward Compatibility

The `useEnhancedThemeSwitcher` hook provides backward compatibility with the original implementation. You can continue using it exactly as before while benefiting from the enhanced functionality.

## Accessibility Considerations

The theme system respects the user's system preferences through the `prefers-color-scheme` media query, providing a baseline dark theme if the user has set their system to dark mode.

## Adding Theme Color to Components

When creating new components, use the theme context to dynamically style them:

```jsx
const { theme } = useTheme();

// Then use theme.colors.X in your component's styles
```

## Troubleshooting

If themes aren't applying correctly:

1. Make sure `ThemeWrapper` wraps your entire application
2. Check that the body has the appropriate class (`theme-light`, `theme-dark`, etc.)
3. Verify that `enhanced-themes.css` is imported in your App.js
