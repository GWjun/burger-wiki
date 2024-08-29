import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

const commonStyles = style({
  backgroundColor: theme.colors.secondary,
  border: 'none',
  borderRadius: theme.borderRadius.md,
});

export const skeleton = style([
  commonStyles,
  {
    padding: '2.25rem 2.25rem 0 0',
  },
]);

export const button = style([
  commonStyles,
  {
    display: 'flex',
    padding: '0.5rem 0.5rem',
  },
]);
