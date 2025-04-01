import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css';

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
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    x2l: '1rem',
    x3l: '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 0 3px rgba(0, 0, 0, 0.1)',
    md: '0 0 8px rgba(0, 0, 0, 0.1)',
    lg: '0 0 15px rgba(0, 0, 0, 0.1)',
    xl: '0 0 25px rgba(0, 0, 0, 0.1)',
    x2l: '0 0 50px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 0 4px rgba(0, 0, 0, 0.1)',
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
  main: null,
  mainText: null,
  border: null,

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

  description: null,
});

export const lightTheme = createTheme(themeColor, {
  main: '#fff',
  mainText: '#000',
  border: '#e9e9e9',

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

  description: '#9ca3af',
});

export const darkTheme = createTheme(themeColor, {
  main: '#1D1F22',
  mainText: '#fff',
  border: '#2d2d2d',

  primary: '#2d9834',
  primaryText: '#fff',
  primaryActive: '#188627',

  secondary: '#1e293b',
  secondaryText: '#e2e8f0',
  secondaryActive: '#17202b',

  destructive: '#c51919',
  destructiveText: '#fff',
  destructiveActive: '#b71e1e',

  background: '#141517',
  backgroundActive: '#2a2a2a',

  description: '#9ca3af',
});

const colors = {
  ...themeColor,
  brandColor: '#ff9d3b',
};

const mainWidth = '1280px';

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  x2l: '1536px',
  x3l: '1920px',
  x4l: '2560px',
} as const;

export const theme = { ...global, colors, mainWidth, breakpoints };
