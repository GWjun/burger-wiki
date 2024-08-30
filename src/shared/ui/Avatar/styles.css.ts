import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const avatar = style({
  borderRadius: 9999,
  backgroundColor: theme.colors.background,
});
