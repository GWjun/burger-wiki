import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const datePicker = style({
  width: '100px',
  height: '2rem',
  marginTop: '1rem',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.colors.backgroundActive,
  boxSizing: 'border-box',
  textAlign: 'center',

  ':focus': {
    outline: `none`,
  },
});

export const calender = style({});

export const error = style({
  color: theme.colors.destructive,
  fontSize: theme.typography.fontSize.xs,
});
