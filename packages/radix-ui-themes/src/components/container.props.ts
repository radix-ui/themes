import { asChildProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const displayValues = ['none', 'initial'] as const;

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
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
};

function parseDisplayValue(value: string) {
  return value === 'initial' ? 'flex' : value;
}

export { containerPropDefs };
