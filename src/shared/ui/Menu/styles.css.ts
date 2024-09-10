import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const menu = style({
  position: 'absolute',
  top: '2.5rem',
  right: '3rem',
  display: 'flex',
  flexDirection: 'column',

  minWidth: '10rem',
  padding: `1rem 0`,

  backgroundColor: theme.colors.main,
  borderRadius: theme.borderRadius.md,
  boxShadow: theme.shadows.md,

  zIndex: 50,
});
