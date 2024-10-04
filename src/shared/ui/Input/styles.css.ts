import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

export const base = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '1.5rem',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
  fontSize: theme.typography.fontSize.sm,

  ':focus-visible': {
    outlineColor: theme.colors.primary,
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  selectors: {
    '&[type="file"]': {
      backgroundColor: 'transparent',
      fontWeight: theme.typography.fontWeight.medium,
    },
  },
});

export const inputVariants = recipe({
  base,
  variants: {
    variant: {
      default: {
        border: `1px solid ${theme.colors.border}`,
      },
      text: {
        borderRadius: 0,
        ':focus-visible': {
          outline: 'transparent',
          borderBottom: `1px solid ${theme.colors.border}`,
        },
      },
    },
    size: {
      sm: {
        padding: '0.25rem 0.75rem',
      },
      md: {
        padding: '0.5rem 1rem',
      },
      lg: {
        padding: '0.75rem 1.25rem',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type InputVariants = RecipeVariants<typeof inputVariants>;
