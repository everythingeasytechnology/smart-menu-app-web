import { Colors } from './Colors';

export const theme = {
  colors: {
    primary: "#F26B3A",
    accent: Colors.light.tint,
    primaryDark: "#e6680e", // slightly darker version of the main color
    background: "#121212", // dark background for auth
    surface: "#1E1E1E", // dark surface
    textLight: "#FFFFFF",
    textMuted: "#A0A0A0",
    
    // Light theme colors for dashboard (Image 2 style)
    dashBackground: "#F9F9F9",
    dashSurface: "#FFFFFF",
    dashText: "#333333",
    dashTextMuted: "#888888",
    
    // Status colors
    success: "#4CAF50",
    warning: "#FF9800",
    danger: "#F44336",
    info: "#ff730fff" // Used for active tab tint
  }
};
