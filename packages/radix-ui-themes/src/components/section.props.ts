import { asChildProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2', '3'] as const;
const displayValues = ['none', 'initial'] as const;

const sectionPropDefs = {
  asChild: asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '3',
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
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
};

function parseDisplayValue(value: string) {
  return value === 'initial' ? 'block' : value;
}

export { sectionPropDefs };
