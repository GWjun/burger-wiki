import { style } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

export const container = style({
  padding: '1rem',
  backgroundColor: theme.colors.main,
  borderRadius: theme.borderRadius.md,
  boxShadow: theme.shadows.sm,
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const baseTableHeader = style({
  padding: '12px',
  borderBottom: `2px solid ${theme.colors.border}`,
  fontWeight: theme.typography.fontWeight.semibold,
  color: '#555',
});

export const tableHeaderLeft = style([
  baseTableHeader,
  {
    textAlign: 'left',
  },
]);

export const tableHeaderRight = style([
  baseTableHeader,
  {
    textAlign: 'right',
  },
]);

export const row = style({
  borderBottom: `1px solid ${theme.colors.border}`,
  ':last-child': {
    borderBottom: 'none',
  },
});

export const baseCell = style({
  padding: '12px',
  color: 'gray',
});

export const nameCell = style([
  baseCell,
  {
    fontWeight: theme.typography.fontWeight.medium,
  },
]);

export const valueCell = style([
  baseCell,
  {
    textAlign: 'right',
  },
]);
