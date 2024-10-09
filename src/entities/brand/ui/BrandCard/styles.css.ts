import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

  minWidth: '150px',
  maxWidth: '233.59px',
  height: '75px',
  cursor: 'pointer',
  backgroundColor: theme.colors.secondary,
  borderRadius: theme.borderRadius.lg,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      minWidth: 'unset',
      height: '100px',
    },
  },
});

export const imageContainer = style({
  position: 'relative',
  width: '70%',
  height: '70%',
  backgroundColor: theme.colors.secondary,
  borderRadius: theme.borderRadius.lg,
});

export const image = style({
  objectFit: 'contain',
});
