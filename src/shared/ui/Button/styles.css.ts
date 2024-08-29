import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { sprinkles } from '#shared/lib/styles/sprinkles.css';
import { theme } from '#shared/lib/styles/theme.css';

const { colors } = theme;

const baseStyle = style({
  border: '1px solid transparent',
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

const baseSprinkle = sprinkles({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 'md',
  fontSize: 'sm',
  fontWeight: 'medium',
});

export const buttonVariants = recipe({
  base: [baseStyle, baseSprinkle],

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
      sm: sprinkles({ paddingX: 4, paddingY: 2 }),
      md: sprinkles({ paddingX: 6, paddingY: 3 }),
      lg: sprinkles({ paddingX: 8, paddingY: 3 }),
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonVariants>;
