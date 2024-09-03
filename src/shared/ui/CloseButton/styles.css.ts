import { style } from '@vanilla-extract/css';

export const closeButton = style({
  position: 'absolute',
  right: '0.1rem',
  top: '0.5rem',
  alignSelf: 'flex-end',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export const icon = style({
  color: 'gray',
});
