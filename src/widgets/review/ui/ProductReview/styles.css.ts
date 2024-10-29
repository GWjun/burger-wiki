import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

export const filter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const top = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const label = style({
  color: 'gray',
});

export const nothing = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
  color: 'gray',
  fontSize: theme.typography.fontSize.md,
});
