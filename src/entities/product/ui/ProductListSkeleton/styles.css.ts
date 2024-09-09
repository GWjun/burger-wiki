import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const titleStyle = style({
  fontWeight: theme.typography.fontWeight.semibold,
});
