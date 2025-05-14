import React from 'react';
import { useTheme } from './ThemeContext';
import EnhancedThemeSwitcher from './EnhancedThemeSwitcher';

const ThemesSamplePage = () => {
  const { theme } = useTheme();
  
  // Sample section styles
  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: theme.colors.cardBackground,
    color: theme.colors.text,
  };
  
  // Card preview
  const cardStyle = {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    color: theme.colors.text,
  };
  
  // Button styles based on current theme
  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };
  
  // Button styles for secondary actions based on current theme
  const secondaryButtonStyle = {
    backgroundColor: theme.colors.secondary,
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };
  
  // Input field
  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: `1px solid ${theme.colors.secondary}`,
    backgroundColor: theme.colors.background === theme.colors.cardBackground ? theme.colors.background : theme.colors.cardBackground,
    color: theme.colors.text,
    width: '100%',
    marginBottom: '15px',
  };
  
  // Table preview
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    color: theme.colors.text,
  };
  
  const thTdStyle = {
    padding: '10px',
    borderBottom: `1px solid ${theme.colors.secondary}`,
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: theme.colors.primary, marginBottom: '30px' }}>Theme Preview</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h4>Select Theme:</h4>
        <EnhancedThemeSwitcher variant="buttons" />
      </div>

      <div style={sectionStyle}>
        <h3>Current Theme: {theme.name}</h3>
        <p>This page demonstrates how your application looks with the selected theme.</p>
      </div>
      
      <div style={sectionStyle}>
        <h4>Buttons</h4>
        <div>
          <button style={buttonStyle}>Primary Action</button>
          <button style={secondaryButtonStyle}>Secondary Action</button>
          <button style={{ 
            ...secondaryButtonStyle, 
            backgroundColor: theme.colors.success 
          }}>Success</button>
          <button style={{ 
            ...secondaryButtonStyle, 
            backgroundColor: theme.colors.danger 
          }}>Danger</button>
        </div>
      </div>
      
      <div style={sectionStyle}>
        <h4>Form Elements</h4>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Text Input:</label>
          <input 
            type="text" 
            placeholder="Enter text here..." 
            style={inputStyle}
          />
          
          <label style={{ display: 'block', marginBottom: '5px' }}>Textarea:</label>
          <textarea 
            placeholder="Enter description..." 
            style={{ ...inputStyle, minHeight: '80px' }}
          ></textarea>
          
          <label style={{ display: 'block', marginBottom: '5px' }}>Select:</label>
          <select style={inputStyle}>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>
      
      <div style={sectionStyle}>
        <h4>Card Components</h4>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ ...cardStyle, flex: 1 }}>
            <h5 style={{ borderBottom: `1px solid ${theme.colors.secondary}`, paddingBottom: '10px' }}>Card Title</h5>
            <p>This is a sample card component that demonstrates theming.</p>
            <button style={buttonStyle}>Learn More</button>
          </div>
          
          <div style={{ ...cardStyle, flex: 1 }}>
            <h5 style={{ borderBottom: `1px solid ${theme.colors.secondary}`, paddingBottom: '10px' }}>Another Card</h5>
            <p>Cards should maintain the same visual style within a theme.</p>
            <button style={secondaryButtonStyle}>View Details</button>
          </div>
        </div>
      </div>
      
      <div style={sectionStyle}>
        <h4>Table Component</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: theme.colors.primary, color: 'white' }}>
                <th style={thTdStyle}>Name</th>
                <th style={thTdStyle}>Email</th>
                <th style={thTdStyle}>Role</th>
                <th style={thTdStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={thTdStyle}>John Doe</td>
                <td style={thTdStyle}>john@example.com</td>
                <td style={thTdStyle}>Admin</td>
                <td style={thTdStyle}>Active</td>
              </tr>
              <tr style={{ backgroundColor: `${theme.colors.background}50` }}>
                <td style={thTdStyle}>Jane Smith</td>
                <td style={thTdStyle}>jane@example.com</td>
                <td style={thTdStyle}>Editor</td>
                <td style={thTdStyle}>Active</td>
              </tr>
              <tr>
                <td style={thTdStyle}>Mike Johnson</td>
                <td style={thTdStyle}>mike@example.com</td>
                <td style={thTdStyle}>Viewer</td>
                <td style={thTdStyle}>Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={sectionStyle}>
        <h4>Theme Color Palette</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: value,
                borderRadius: '5px',
                marginBottom: '5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                border: key === 'background' ? '1px solid rgba(0,0,0,0.1)' : 'none'
              }}></div>
              <small>{key}</small><br />
              <small style={{ fontWeight: 'bold' }}>{value}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemesSamplePage;
