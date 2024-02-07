import { asChildProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4'] as const;
const displayValues = ['none', 'initial'] as const;
const alignValues = ['left', 'center', 'right'] as const;

const containerPropDefs = {
  asChild: asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '4',
    responsive: true,
  },
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    parseValue: parseDisplayValue,
    default: undefined,
    responsive: true,
  },
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    parseValue: parseAlignValue,
    default: undefined,
    responsive: true,
  },
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
};

function parseDisplayValue(value: string) {
  return value === 'initial' ? 'flex' : value;
}

function parseAlignValue(value: string) {
  return value === 'left' ? 'start' : value === 'right' ? 'end' : value;
}

export { containerPropDefs };
