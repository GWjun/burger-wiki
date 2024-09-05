import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  height: '100%',
});

export const text = style({
  fontSize: theme.typography.fontSize.x2l,
  fontWeight: theme.typography.fontWeight.medium,
});
