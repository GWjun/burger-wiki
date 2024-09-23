import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const stars = style({
  alignSelf: 'center',
});

export const error = style({
  color: theme.colors.destructive,
  fontSize: theme.typography.fontSize.xs,
});
