import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '3rem',
  paddingTop: '1rem',

  '::before': {
    position: 'absolute',
    width: '100%',
    content: '',
    inset: 0,
    height: '1px',
    backgroundColor: theme.colors.border,
  },
});

export const top = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const filter = style({
  display: 'flex',
  gap: '0.3rem',
});
