import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      flexDirection: 'row',
      padding: '3rem 2.5rem',
    },
  },
});

export const leftCol = style({
  flex: 1,
  width: '100%',
  padding: 'unset',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      paddingRight: '2.5rem',
    },
  },
});

export const imageContainer = style({
  position: 'relative',
  flex: 1,
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: theme.colors.secondary,
  borderRadius: theme.borderRadius.lg,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      maxWidth: '560px',
    },
  },
});

export const image = style({
  objectFit: 'contain',
});

export const rightCol = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  width: '100%',
  padding: 'unset',

  '::before': {
    position: 'absolute',
    left: 0,
    width: '1px',
    content: '',
    inset: 0,
    backgroundColor: theme.colors.border,
  },

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      paddingLeft: '2.5rem',
    },
  },
});

export const infoContainer = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  flexDirection: 'column',
  padding: '1.5rem',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: 'unset',
    },
  },
});

export const topInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const name = style({
  fontSize: theme.typography.fontSize.xl,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const description = style({
  marginTop: '1rem',
  fontSize: theme.typography.fontSize.md,
});

export const price = style({
  marginLeft: 'auto',
  marginTop: '1rem',
  fontSize: theme.typography.fontSize.xl,
  fontWeight: theme.typography.fontWeight.medium,
});

export const devComment = style({
  margin: '0 auto',
  marginTop: '3rem',
  fontSize: theme.typography.fontSize.md,
  color: 'gray',
});
