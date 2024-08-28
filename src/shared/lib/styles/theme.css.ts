import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import colorScales from '#shared/lib/styles/colors';

export const global = createGlobalTheme(':root', {
  space: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      x2l: '1.5rem',
      x3l: '1.875rem',
      x4l: '2.25rem',
    },
    lineHeight: {
      xs: '1rem',
      sm: '1.25rem',
      md: '1.5rem',
      lg: '1.75rem',
      xl: '1.75rem',
      x2l: '2rem',
      x3l: '2.25rem',
      x4l: '2.5rem',
    },
    fontWeight: {
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    fontFamily: {},
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    x2l: '1rem',
    x3l: '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    x2l: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },

  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
});

let themeColor = createThemeContract({
  primary: null,
  primaryText: null,
  primaryActive: null,

  secondary: null,
  secondaryText: null,
  secondaryActive: null,

  destructive: null,
  destructiveText: null,
  destructiveActive: null,

  background: null,
  backgroundActive: null,

  border: null,
});

export const lightTheme = createTheme(themeColor, {
  primary: '#0095f6',
  primaryText: '#fff',
  primaryActive: '#007bdf',

  secondary: '#f1f5f9',
  secondaryText: '#000',
  secondaryActive: '#d9e2ec',

  destructive: '#ef4444',
  destructiveText: '#fff',
  destructiveActive: '#d93737',

  background: '#fff',
  backgroundActive: '#f3f4f6',

  border: '#ddd',
});

export const darkTheme = createTheme(themeColor, {
  primary: '#2d9834',
  primaryText: '#fff',
  primaryActive: '#188627',

  secondary: '#1e293b',
  secondaryText: '#e2e8f0',
  secondaryActive: '#17202b',

  destructive: '#c51919',
  destructiveText: '#fff',
  destructiveActive: '#b71e1e',

  background: '#131313',
  backgroundActive: '#2a2a2a',

  border: '#494949',
});

const colors = {
  ...themeColor,
  ...colorScales,
};

export const theme = { ...global, colors };

globalStyle('body', {
  backgroundColor: theme.colors.background,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  margin: 0,
});
