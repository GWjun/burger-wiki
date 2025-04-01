import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  margin: '0 auto',
  maxWidth: '1280px',
  paddingTop: '3rem',
});

export const brandsContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: '0 0 0 1rem',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: '0 2.5rem 0 2.5rem',
    },
  },
});

export const productsContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  padding: '0 0 0 1rem',

  '::before': {
    content: '',
    inset: 0,
    margin: '3rem 0 2rem 0',
    height: '1px',
    backgroundColor: theme.colors.border,
  },

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: '0 2.5rem 0 2.5rem',
    },
  },
});

export const listTile = style({
  fontWeight: theme.typography.fontWeight.semibold,
});
