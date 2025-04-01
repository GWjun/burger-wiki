import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const buttonSkeleton = style({
  flex: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  height: '51px',
});

export const likesContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.75rem',
  marginLeft: 'auto',
  marginTop: '2rem',
  width: '100%',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      maxWidth: '280px',
    },
  },
});

export const dislikesButton = style({
  flex: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '1rem 0',
  backgroundColor: '#EF6253',
  ':hover': {
    backgroundColor: '#e53d32',
  },
});

export const likesButton = style({
  flex: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '1rem 0',
  backgroundColor: '#41B979',
  ':hover': {
    backgroundColor: '#219a5b',
  },
});

export const dividedLine = style({
  position: 'absolute',
  left: '55px',
  width: '1px',
  height: '100%',
  backgroundColor: theme.colors.border,
  opacity: 0.3,
});

export const likesTitle = style({
  width: '100%',
  maxWidth: '55px',
});

export const likesContent = style({
  width: '100%',
});
