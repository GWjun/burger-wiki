import { style } from '@vanilla-extract/css';
import { sprinkles } from '#shared/lib/styles/sprinkles.css';
import { theme } from '#shared/lib/styles/theme.css';

export const header = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    backgroundColor: 'secondary',
    zIndex: 50,
  }),
  {
    position: 'sticky',
    height: '4rem',
    top: 0,
    boxSizing: 'border-box',
  },
]);

export const leftContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});

export const logo = style([
  sprinkles({
    display: 'flex',
    placeItems: 'center',
    gap: 2,
    color: 'mainText',
  }),
  {
    textDecoration: 'none',
  },
]);

export const title = sprinkles({
  fontSize: 'x2l',
  fontWeight: 'bold',
  margin: 0,
  display: {
    xs: 'none',
    sm: 'flex',
  },
});

export const navList = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const navLink = style({
  padding: '0.5rem 1rem',
});

export const rightContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});

export const login = style([
  sprinkles({
    display: 'flex',
    placeItems: 'center',
    paddingX: 3,
    paddingY: 2,
    backgroundColor: 'primary',
    color: 'primaryText',
    borderRadius: 'sm',
    fontSize: 'sm',
  }),
  {
    textDecoration: 'none',
    ':hover': {
      backgroundColor: theme.colors.primaryActive,
    },
  },
]);
