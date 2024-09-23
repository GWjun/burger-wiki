import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '80vw',
  height: '60vh',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      height: '80vh',
      maxWidth: '500px',
      maxHeight: '700px',
    },
  },
});

export const textarea = style({
  flex: 1,
  width: '100%',
  marginTop: '1.5rem',
  resize: 'none',
  border: 'none',
  padding: '1rem',
  boxSizing: 'border-box',
  backgroundColor: theme.colors.backgroundActive,
  borderRadius: theme.borderRadius.md,
  fontSize: theme.typography.fontSize.md,

  ':focus': {
    outline: 'none',
  },
});

export const button = style({
  marginTop: '1.5rem',
  minWidth: '86.34px',
});

export const error = style({
  color: theme.colors.destructive,
  fontSize: theme.typography.fontSize.xs,
});
