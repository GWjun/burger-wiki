import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const products = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  flexDirection: 'row',
  gap: '1rem',
  width: '100%',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(4, minmax(0, 233.59px))',
    },
  },
});
