import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';
import { fadeIn } from '#shared/lib/styles/animation.css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  animation: `${fadeIn} 0.1s ease-in`,
  zIndex: 50,
});

export const modal = style({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  minWidth: '300px',
  padding: '1rem',
  margin: '0 auto',

  border: 'none',
  borderRadius: theme.borderRadius.md,
  backgroundColor: 'white',
  boxShadow: theme.shadows.sm,

  animation: `${fadeIn} 0.2s ease-in`,
  zIndex: 50,
});

export const closeButton = style({
  position: 'absolute',
  right: '0.1rem',
  top: '0.5rem',
  alignSelf: 'flex-end',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export const icon = style({
  color: 'gray',
});
