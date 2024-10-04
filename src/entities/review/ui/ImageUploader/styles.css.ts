import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const imagePreviewGrid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '1.5rem',
});

export const imageBox = style({
  position: 'relative',
  width: '100px',
  height: '100px',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
});

export const image = style({
  objectFit: 'cover',
  borderRadius: theme.borderRadius.md,
});

export const deleteButton = style({
  position: 'absolute',
  right: -5,
  top: -5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  padding: 0,
  border: 'none',
  borderRadius: 9999,
  cursor: 'pointer',
});

export const imageUploadBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
  color: 'gray',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: theme.colors.backgroundActive,
  },
});

export const error = style({
  color: theme.colors.destructive,
  fontSize: theme.typography.fontSize.xs,
});
