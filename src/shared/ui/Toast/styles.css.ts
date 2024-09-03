import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const toast = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',

  minWidth: '300px',
  padding: `0.5rem 0.8rem`,
  borderRadius: theme.borderRadius.md,

  boxShadow: theme.shadows.sm,

  color: theme.colors.mainText,
  backgroundColor: 'white',

  // animation: isVisible
  //   ? `${fadeIn} 0.2s ease-in, ${moveUp} 0.2s ease-in`
  //   : `${fadeOut} 0.2s ease-in forwards`,
});

export const title = style({
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.lineHeight.sm,
});

export const content = style({
  display: 'flex',
  gap: '0.5rem', // soon
  alignItems: 'center',
  margin: 0,

  color: 'gray',
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.lineHeight.sm,
});
