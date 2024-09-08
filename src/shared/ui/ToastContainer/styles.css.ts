import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  position: 'fixed',
  bottom: '2rem',
  right: '1rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',

  zIndex: 50,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.sm})`]: {
      right: '50%',
      transform: 'translateX(50%)',
    },
  },
});
