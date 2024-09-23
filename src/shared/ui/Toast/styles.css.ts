import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';
import { fadeIn, moveUp } from '#shared/lib/styles/animation.css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const toast = style([
  {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',

    minWidth: '90vw',
    padding: `0.4rem 0.6rem`,
    borderRadius: theme.borderRadius.md,

    boxShadow: theme.shadows.sm,

    color: theme.colors.mainText,
    backgroundColor: theme.colors.main,

    animation: `${fadeIn} 0.2s ease-in, ${moveUp} 0.2s ease-in`,

    '@media': {
      [`screen and (min-width: ${theme.breakpoints.sm})`]: {
        minWidth: '300px',
        maxWidth: '300px',
        padding: `0.5rem 0.8rem`,
      },
    },
  },
]);

export const line = style({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '4px',
  borderTopLeftRadius: theme.borderRadius.xl,
  borderBottomLeftRadius: theme.borderRadius.xl,
});

export const title = style({
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.lineHeight.sm,
});

export const content = style({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  margin: 0,

  color: 'gray',
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.lineHeight.sm,
});

export const toastLineVariants = recipe({
  base: [line],

  variants: {
    variant: {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      success: {
        backgroundColor: theme.colors.green_400,
      },
      error: {
        backgroundColor: theme.colors.destructive,
      },
      alert: {
        backgroundColor: theme.colors.secondary,
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
});

export type ToastLineVariants = RecipeVariants<typeof toastLineVariants>;
