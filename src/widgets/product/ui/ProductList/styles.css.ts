import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const listName = style({
  fontWeight: theme.typography.fontWeight.semibold,
});

export const products = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  width: '100%',
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, minmax(0, 233.59px))',
      overflowX: 'unset',
    },
  },
});

export const nothing = style({
  display: 'flex',
  justifyContent: 'center',
  fontSize: theme.typography.fontSize.lg,
  fontWeight: theme.typography.fontWeight.medium,
});
