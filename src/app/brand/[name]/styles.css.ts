import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const background = style({
  position: 'relative',
  width: '100vw',
  height: '150px',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      height: '370px',
    },
  },
});

export const backgroundImage = style({
  objectFit: 'cover',
  filter: 'brightness(0.6)',
});

export const container = style({
  margin: '0 auto',
  maxWidth: '1280px',
  paddingTop: '1.5rem',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '0 1rem 0 1rem',

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      padding: '0 2.5rem 0 2.5rem',
    },
  },
});

export const avatarContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  minWidth: '62px',
  maxHeight: '62px',
  aspectRatio: '1 / 1',

  borderRadius: 9999,
  backgroundColor: theme.colors.secondary,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      minWidth: '110px',
      maxHeight: '110px',
    },
  },
});

export const avatar = style({
  width: '50px',
  height: '50px',
  backgroundColor: theme.colors.secondary,
  borderRadius: 9999,

  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md})`]: {
      width: '80px',
      height: '80px',
    },
  },
});

export const info = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const name = style({
  fontSize: theme.typography.fontSize.lg,
  fontWeight: theme.typography.fontWeight.medium,
});

export const likes = style({
  fontWeight: theme.typography.fontWeight.medium,
});

export const like = style({
  color: 'gray',
  fontWeight: theme.typography.fontWeight.normal,
  marginRight: '0.3rem',
});

export const action = style({
  marginLeft: 'auto',
});

export const link = style({
  padding: '0.5rem 0.8rem',
  color: theme.colors.primaryText,
  backgroundColor: theme.colors.primary,
  borderRadius: theme.borderRadius.md,
  fontSize: theme.typography.fontSize.sm,
});
