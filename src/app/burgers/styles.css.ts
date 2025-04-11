import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  width: '100%',
  maxWidth: '1280px',
  paddingTop: '1.5rem',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      flexDirection: 'row',
    },
  },
});

export const hidden = style({
  display: 'none',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      display: 'flex',
    },
  },
});

export const productFilterFallback = style({
  width: '240px',
});
