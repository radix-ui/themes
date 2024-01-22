import { gapProp } from '../helpers';
import type { PropDef } from '../helpers';

const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;

const flexPropDefs = {
  ...gapProp,
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    default: 'flex',
    responsive: true,
  },
  direction: {
    type: 'enum',
    className: 'rt-r-fd',
    values: directionValues,
    default: undefined,
    responsive: true,
  },
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    default: undefined,
    responsive: true,
  },
  justify: {
    type: 'enum',
    className: 'rt-r-jc',
    values: justifyValues,
    parseValue: parseJustifyValue,
    default: 'start',
    responsive: true,
  },
  wrap: {
    type: 'enum',
    className: 'rt-r-fw',
    values: wrapValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  direction: PropDef<(typeof directionValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
};

function parseJustifyValue(value: string) {
  return value === 'between' ? 'space-between' : value;
}

export { flexPropDefs };
