import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  flexGrow: 1,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: '0 2.5rem 0 2.5rem',
      '::before': {
        content: '',
        inset: 0,
        margin: '3rem 0 2rem 0',
        height: '1px',
        backgroundColor: theme.colors.border,
      },
    },
  },
});

export const filter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  margin: '0 1rem 0 1rem',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      margin: 'unset',
    },
  },
});

export const sortOrderButton = style({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  ':focus': {
    outline: `none`,
  },
});

export const filterButton = style({
  marginLeft: 'auto',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      display: 'none',
    },
  },
});

export const productsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '0 1rem 0 1rem',
  boxSizing: 'border-box',
  width: '100%',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: 'unset',
    },
  },
});
