import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const productsContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.5rem',
  width: 'calc(100vw - 1rem)',
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      flexDirection: 'column',
      overflowX: 'unset',
      width: '100%',
    },
  },
});

export const products = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(0, 233.59px))',
    },
  },
});
