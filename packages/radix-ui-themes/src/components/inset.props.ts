import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sides = ['all', 'x', 'y', 'top', 'bottom', 'left', 'right'] as const;
const clipValues = ['border-box', 'padding-box'] as const;
const paddingValues = ['current', '0'] as const;

const insetPropDefs = {
  ...asChildPropDef,
  side: {
    type: 'enum',
    className: 'rt-r-side',
    values: sides,
    default: 'all',
    responsive: true,
  },
  clip: {
    type: 'enum',
    className: 'rt-r-clip',
    values: clipValues,
    default: 'border-box',
    responsive: true,
  },
  p: {
    type: 'enum',
    className: 'rt-r-p',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
  px: {
    type: 'enum',
    className: 'rt-r-px',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
  py: {
    type: 'enum',
    className: 'rt-r-py',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
  pt: {
    type: 'enum',
    className: 'rt-r-pt',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
  pr: {
    type: 'enum',
    className: 'rt-r-pr',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
  pb: {
    type: 'enum',
    className: 'rt-r-pb',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
  pl: {
    type: 'enum',
    className: 'rt-r-pl',
    values: paddingValues,
    parseValue: parsePaddingValue,
    responsive: true,
  },
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  clip: PropDef<(typeof clipValues)[number]>;
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

function parsePaddingValue(value: string) {
  return value === 'current' ? 'inset' : value;
}

export { insetPropDefs };
