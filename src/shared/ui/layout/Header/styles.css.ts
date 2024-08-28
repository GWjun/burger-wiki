import { style } from '@vanilla-extract/css';
import { sprinkles } from '#shared/lib/styles/sprinkles.css';

export const header = sprinkles({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 4,
  backgroundColor: 'secondary',
});

export const title = sprinkles({
  fontSize: 'x2l',
  fontWeight: 'bold',
  margin: 0,
});

export const navList = style([
  sprinkles({
    display: 'flex',
    placeItems: 'center',
    margin: 0,
  }),
  {
    listStyle: 'none',
  },
]);

export const navLink = style([
  sprinkles({
    color: 'primary',
    paddingX: 4,
    paddingY: 2,
  }),
  {
    textDecoration: 'none',
  },
]);
