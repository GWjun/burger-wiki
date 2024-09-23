import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  gap: '0.5rem',
});

export const text = style({
  marginTop: '1rem',
  marginBottom: '1rem',
  fontSize: theme.typography.fontSize.x2l,
  fontWeight: theme.typography.fontWeight.medium,
});
