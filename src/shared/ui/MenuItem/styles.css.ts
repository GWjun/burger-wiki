import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const item = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',

  fontSize: theme.typography.fontSize.sm,

  cursor: 'pointer',
  transition: 'background-color .2s ease-in',

  ':hover': {
    backgroundColor: theme.colors.backgroundActive,
  },
});
