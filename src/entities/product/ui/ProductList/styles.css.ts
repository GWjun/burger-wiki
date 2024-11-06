import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const nothing = style({
  position: 'absolute',
  justifySelf: 'center',
  display: 'flex',
  justifyContent: 'center',
  fontSize: theme.typography.fontSize.lg,
  fontWeight: theme.typography.fontWeight.medium,
  color: 'gray',
});
