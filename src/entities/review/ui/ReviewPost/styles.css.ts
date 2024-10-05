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

export const info = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
});

export const userName = style({
  marginLeft: '3px',
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
});

export const date = style({
  fontSize: theme.typography.fontSize.sm,
  color: 'gray',
});

export const menuButton = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export const menu = style({
  top: '1.5rem',
  right: 0,
  minWidth: '7rem',
});

export const updateItem = style({
  display: 'flex',
  justifyContent: 'center',
});

export const deleteItem = style({
  display: 'flex',
  justifyContent: 'center',
  color: theme.colors.destructive,
});

export const comment = style({
  marginTop: '0.5rem',
  fontSize: theme.typography.fontSize.sm,
  whiteSpace: 'pre-wrap',
});

export const imageGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '1rem',
});

export const imageBox = style({
  position: 'relative',
  flex: 1,
  minWidth: '0px',
  maxWidth: '233.59px',
  aspectRatio: '1 / 1',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
});

export const image = style({
  objectFit: 'cover',
  borderRadius: theme.borderRadius.md,
});

export const likesContainer = style({
  display: 'flex',
  gap: '0.5rem',
  marginTop: '1rem',
});

export const likes = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.2rem',
  fontSize: theme.typography.fontSize.sm,
});

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  ':focus': {
    outline: `none`,
  },
});
