import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

const { colors } = theme;

const baseStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border: '1px solid transparent',
  borderRadius: theme.borderRadius.md,
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
  cursor: 'pointer',
  transition: 'background-color 0.2s',

  ':focus-visible': {
    outlineWidth: '1px',
  },

  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

export const buttonVariants = recipe({
  base: [baseStyle],

  variants: {
    variant: {
      primary: {
        backgroundColor: colors.primary,
        color: colors.primaryText,
        ':hover': {
          backgroundColor: colors.primaryActive,
        },
      },
      secondary: {
        backgroundColor: colors.secondary,
        color: colors.secondaryText,
        ':hover': {
          backgroundColor: colors.secondaryActive,
        },
      },
      outline: {
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
        ':hover': {
          backgroundColor: colors.backgroundActive,
        },
      },
      text: {
        backgroundColor: colors.background,
        ':hover': {
          backgroundColor: colors.backgroundActive,
        },
      },
      destructive: {
        backgroundColor: colors.destructive,
        color: colors.destructiveText,
        ':hover': {
          backgroundColor: colors.destructiveActive,
        },
      },
    },
    size: {
      sm: style({ padding: '0.5rem 1rem' }),
      md: style({ padding: '0.75rem 1.5rem' }),
      lg: style({ padding: '0.75rem 2rem' }),
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonVariants>;
