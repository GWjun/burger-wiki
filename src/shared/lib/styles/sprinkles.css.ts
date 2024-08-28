import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { theme } from '#shared/lib/styles/theme.css';

const responsiveProperties = defineProperties({
  conditions: {
    xs: {},
    sm: { '@media': `screen and (min-width: 640px)` },
    md: { '@media': `screen and (min-width: 768px)` },
    lg: { '@media': `screen and (min-width: 1024px)` },
    xl: { '@media': `screen and (min-width: 1280px)` },
    x2l: { '@media': `screen and (min-width: 1536px)` },
    x3l: { '@media': `screen and (min-width: 1920px)` },
    x4l: { '@media': `screen and (min-width: 2560px)` },
  },
  defaultCondition: 'xs',
  properties: {
    display: ['none', 'flex', 'block', 'inline', 'grid', 'inline-block'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
      'space-evenly',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    gap: theme.space,
    paddingTop: theme.space,
    paddingBottom: theme.space,
    paddingLeft: theme.space,
    paddingRight: theme.space,
    marginTop: theme.space,
    marginBottom: theme.space,
    marginLeft: theme.space,
    marginRight: theme.space,
    width: { ...theme.space, full: '100%' },
    height: { ...theme.space, full: '100%' },
    fontSize: theme.typography.fontSize,
    lineHeight: theme.typography.lineHeight,
    fontWeight: theme.typography.fontWeight,
    textAlign: ['left', 'center', 'right', 'justify'],
    borderRadius: theme.borderRadius,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['justifyContent', 'alignItems'],
    size: ['width', 'height'],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: theme.colors,
    backgroundColor: theme.colors,
  },
});

const otherProperties = defineProperties({
  properties: {
    boxShadow: theme.shadows,
    zIndex: theme.zIndex,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  otherProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
