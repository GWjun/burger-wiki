import { style } from '@vanilla-extract/css';

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
    'screen and (max-width: 640px)': {
      right: '50%',
      transform: 'translateX(50%)',
    },
  },
});
