import type { PropDef, GetPropDefTypes } from './prop-def.js';

// prettier-ignore
const marginValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'] as const;

const marginPropDefs = {
  m: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-m',
    customProperties: ['--margin'],
  },
  mx: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mx',
    customProperties: ['--margin-left', '--margin-right'],
  },
  my: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-my',
    customProperties: ['--margin-top', '--margin-bottom'],
  },
  mt: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mt',
    customProperties: ['--margin-top'],
  },
  mr: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mr',
    customProperties: ['--margin-right'],
  },
  mb: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mb',
    customProperties: ['--margin-bottom'],
  },
  ml: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-ml',
    customProperties: ['--margin-left'],
  },
} satisfies {
  m: PropDef<(typeof marginValues)[number]>;
  mx: PropDef<(typeof marginValues)[number]>;
  my: PropDef<(typeof marginValues)[number]>;
  mt: PropDef<(typeof marginValues)[number]>;
  mr: PropDef<(typeof marginValues)[number]>;
  mb: PropDef<(typeof marginValues)[number]>;
  ml: PropDef<(typeof marginValues)[number]>;
};

type MarginProps = GetPropDefTypes<typeof marginPropDefs>;

export { marginPropDefs };
export type { MarginProps };
