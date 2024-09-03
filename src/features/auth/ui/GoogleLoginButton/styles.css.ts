import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const button = style({
  position: 'relative',
  gap: '0.5rem',
  backgroundColor: 'white',
  color: 'black',
  ':hover': {
    backgroundColor: theme.colors.gray_200,
  },
  minWidth: '13.75rem',
});
