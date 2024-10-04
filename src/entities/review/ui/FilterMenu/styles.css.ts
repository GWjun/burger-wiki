import { style } from '@vanilla-extract/css';

export const filter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const dropdownButton = style({
  position: 'relative',
  display: 'flex',
  gap: '0.1rem',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '0.3rem',
  paddingRight: '0.3rem',
  paddingLeft: '0.6rem',
  color: 'gray',
});

export const label = style({
  color: 'gray',
});

export const menu = style({
  display: 'flex',
  minWidth: '7rem',
});

export const menuItem = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
