import type { PropDef } from '../helpers';

const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const flexPropDefs = {
  display: { type: 'enum', values: displayValues, default: 'flex', responsive: true },
  direction: { type: 'enum', values: directionValues, default: undefined, responsive: true },
  align: { type: 'enum', values: alignValues, default: undefined, responsive: true },
  justify: { type: 'enum', values: justifyValues, default: 'start', responsive: true },
  wrap: { type: 'enum', values: wrapValues, default: undefined, responsive: true },
  gap: { type: 'enum', values: gapValues, default: undefined, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  direction: PropDef<(typeof directionValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
  gap: PropDef<(typeof gapValues)[number]>;
};

export { flexPropDefs };
