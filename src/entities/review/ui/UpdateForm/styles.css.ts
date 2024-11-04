import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: '1rem 0',

  ':after': {
    width: '100%',
    marginTop: '1rem',
    content: '',
    inset: 0,
    height: '1px',
    backgroundColor: theme.colors.border,
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const userName = style({
  marginLeft: '3px',
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
});

export const form = style({
  width: '100%',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      maxWidth: '100%',
    },
  },
});
