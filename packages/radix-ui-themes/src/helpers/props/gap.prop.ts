import type { PropDef } from './';

const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const gapProp = {
  gap: {
    type: 'enum | string',
    className: 'rt-r-gap',
    customProperties: ['--gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  gapX: {
    type: 'enum | string',
    className: 'rt-r-cg',
    customProperties: ['--column-gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  gapY: {
    type: 'enum | string',
    className: 'rt-r-rg',
    customProperties: ['--row-gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
};

export { gapProp };
