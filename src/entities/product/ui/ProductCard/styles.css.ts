import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: '150px',
  maxWidth: '233.59px',
});

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: theme.colors.secondary,
  borderRadius: theme.borderRadius.lg,
});

export const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '0.5rem',
});

export const productName = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const brandName = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
});

export const description = style({
  color: 'gray',
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
  marginTop: '0.2rem',
});

export const price = style({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
  marginTop: '0.5rem',
});

export const contentSkeletonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '0.7rem',
  gap: '0.35rem',
});

export const contentSkeleton = style({
  width: '100%',
  height: '1rem',
});

export const priceSkeleton = style({
  width: '4rem',
  height: '1rem',
  marginTop: '0.8rem',
});

export const hidden = style({
  display: 'none',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.sm})`]: {
      display: 'flex',
    },
  },
});
