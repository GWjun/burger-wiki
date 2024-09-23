import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const footer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  maxWidth: theme.mainWidth,
  margin: '0 auto',
  padding: '1.5rem 2.5rem',
  boxSizing: 'border-box',

  '::before': {
    width: '100%',
    marginBottom: '1.5rem',
    content: '',
    inset: 0,
    height: '1px',
    backgroundColor: theme.colors.border,
  },
});

export const comment = style({
  fontWeight: theme.typography.fontWeight.medium,
  fontSize: theme.typography.fontSize.sm,
  color: 'gray',
});
