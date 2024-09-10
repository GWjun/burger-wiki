import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';
import { pulse } from '#shared/lib/styles/animation.css';

export const skeleton = style({
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.colors.secondary,

  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});
