import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const header = style({
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4rem',
  padding: '1rem',

  backgroundColor: theme.colors.main,
  borderBottom: `1px solid ${theme.colors.border}`,
  boxSizing: 'border-box',
  zIndex: theme.zIndex['50'],
});

export const fullContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: theme.mainWidth,
  margin: '0 auto',
});

export const leftContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});

export const logo = style({
  display: 'flex',
  placeItems: 'center',
  gap: '0.5rem',
  color: theme.colors.mainText,
});

export const title = style({
  display: 'none',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      display: 'flex',
    },
  },
});

export const navList = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const navLink = style({
  padding: '0.5rem 1rem',
});

export const rightContainer = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});

export const login = style({
  display: 'flex',
  placeItems: 'center',
  padding: '0.5rem 0.75rem',

  backgroundColor: theme.colors.primary,
  color: theme.colors.primaryText,
  borderRadius: theme.borderRadius.sm,
  fontSize: theme.typography.fontSize.sm,
  ':hover': {
    backgroundColor: theme.colors.primaryActive,
  },
});
