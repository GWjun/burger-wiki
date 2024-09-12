import { globalStyle } from '@vanilla-extract/css';
import { theme } from '#shared/lib/styles/theme.css';

globalStyle('body', {
  backgroundColor: theme.colors.background,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  margin: 0,
});

globalStyle('main', {
  display: 'flex',
  boxSizing: 'border-box',
  minHeight: 'calc(100vh - 4rem)',
  paddingBottom: '2rem',
});

globalStyle('a', {
  textDecoration: 'none',
  color: theme.colors.mainText,
});

globalStyle('ul, ol, li', {
  listStyle: 'none',
});

globalStyle('ul, p', {
  padding: 0,
  margin: 0,
});
