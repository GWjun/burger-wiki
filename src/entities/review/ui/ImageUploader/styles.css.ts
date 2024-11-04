import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const imagePreviewGrid = style({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '1.5rem',
  width: '100%',
});

export const baseBox = style({
  position: 'relative',
  flex: '1',
  aspectRatio: '1 / 1',
  maxWidth: '100px',
  maxHeight: '100px',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.md,
});

export const image = style({
  objectFit: 'cover',
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.colors.secondary,
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

export const imageUploadBox = style([
  baseBox,
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: theme.colors.backgroundActive,
    },
  },
]);

export const disabled = style({
  backgroundColor: theme.colors.backgroundActive,
  cursor: 'not-allowed',
  opacity: 0.6,
});

export const error = style({
  color: theme.colors.destructive,
  fontSize: theme.typography.fontSize.xs,
});
