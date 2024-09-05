import { style } from '@vanilla-extract/css';

export const button = style({
  position: 'relative',
  gap: '0.5rem',
  minWidth: '13.75rem',
  minHeight: '2.375rem',
  backgroundColor: '#4285F4',
  color: 'white',
  ':hover': {
    backgroundColor: '#3379ff',
  },
});
