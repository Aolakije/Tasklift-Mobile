// Theme colors - Light and Dark modes
export const LIGHT_COLORS = {
  // Primary colors
  primaryPurple: '#8b5cf6', // Lighter purple for light mode
  darkPurple: '#6d28d9',
  background: '#f3f4f6',
  cardBackground: '#ffffff',
  
  // Accent colors
  accentOrange: '#D95E28',
  secondaryOrange: '#c97a5a',
  pinkMagenta: '#DB4EDB',
  
  // Text colors
  text: '#1f2937',
  textSecondary: '#6b7280',
  white: '#FFFFFF',
  lightGray: '#9ca3af',
  darkGray: '#4b5563',
  
  // Status colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
};

export const DARK_COLORS = {
  // Primary colors
  primaryPurple: '#2d1b69',
  darkPurple: '#11001c',
  background: '#11001c',
  cardBackground: 'rgba(255, 255, 255, 0.95)',
  
  // Accent colors
  accentOrange: '#D95E28',
  secondaryOrange: '#c97a5a',
  pinkMagenta: '#DB4EDB',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#e5e7eb',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  
  // Status colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
};

// Default to dark colors (your original theme)
export const COLORS = DARK_COLORS;

// Gradient backgrounds
export const LIGHT_GRADIENTS = {
  primary: ['#e0e7ff', '#f3f4f6', '#e0e7ff'],
  button: ['#D95E28', '#c97a5a'],
};

export const DARK_GRADIENTS = {
  primary: ['#2d1b69', '#11001c', '#2d1b69'],
  button: ['#D95E28', '#c97a5a'],
};

export const GRADIENTS = DARK_GRADIENTS;

// Spacing (for consistent padding/margins)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Font sizes
export const FONTS = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
};