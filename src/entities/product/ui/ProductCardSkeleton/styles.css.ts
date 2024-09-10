import { style } from '@vanilla-extract/css';

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '0.7rem',
  gap: '0.35rem',
});

export const content = style({
  width: '100%',
  height: '1rem',
});

export const price = style({
  width: '4rem',
  height: '1rem',
  marginTop: '0.8rem',
});
