import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const label = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const required = style({
  color: theme.colors.destructive,
});
