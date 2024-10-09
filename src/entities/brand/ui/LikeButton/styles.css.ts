import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  ':focus': {
    outline: `none`,
  },
});

export const skeleton = style({
  height: '20px',
});
