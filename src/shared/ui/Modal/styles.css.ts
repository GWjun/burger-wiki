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
  padding: '1.5rem',
  margin: '0 auto',

  border: 'none',
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.colors.main,
  boxShadow: theme.shadows.sm,

  animation: `${fadeIn} 0.2s ease-in`,
  zIndex: 50,
});
