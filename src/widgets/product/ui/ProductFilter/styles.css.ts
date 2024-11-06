import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'none',
  position: 'relative',
  flexDirection: 'column',
  boxSizing: 'border-box',

  '::before': {
    content: '',
    inset: 0,
    margin: '3rem 0 2rem 0',
    height: '1px',
    backgroundColor: theme.colors.border,
  },

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      display: 'flex',
      minWidth: '240px',
      padding: '0 0 0 2.5rem',
    },
  },
});

export const top = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const reset = style({
  gap: '0.2rem',
  paddingLeft: '0.2rem',
  paddingRight: '0.2rem',
});

export const filter = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1.5rem',
});

export const filterName = style({
  fontSize: theme.typography.fontSize.md,
  fontWeight: theme.typography.fontWeight.medium,
});

export const options = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const label = style({
  display: 'flex',
  fontWeight: theme.typography.fontWeight.normal,
  color: 'gray',

  ':hover': {
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export const checkbox = style({
  marginRight: '0.5rem',
  width: '16px',
  height: '16px',
  border: `2px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.sm,
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  appearance: 'none',

  selectors: {
    '&:hover': {
      borderColor: '#888',
    },
    '&:checked': {
      borderColor: theme.colors.primary,
    },
    '&:checked:hover': {
      borderColor: theme.colors.primary,
    },
  },
});
