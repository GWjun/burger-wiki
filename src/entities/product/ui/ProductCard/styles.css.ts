import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: '150px',
  cursor: 'pointer',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      minWidth: 'unset',
      maxWidth: '233.59px',
    },
  },
});

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: theme.colors.secondary,
  borderRadius: theme.borderRadius.lg,
});

export const image = style({
  objectFit: 'contain',
});

export const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '0.5rem',
});

export const productName = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const brandName = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const description = style({
  color: 'gray',
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
  marginTop: '0.2rem',
});

export const bottomContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '0.5rem',
});

export const price = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const score = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
  color: '#d2c100',
});

export const hidden = style({
  display: 'none',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.sm})`]: {
      display: 'flex',
    },
  },
});
