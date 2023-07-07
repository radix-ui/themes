import type { PropDef } from '../helpers';

const displayValues = ['none', 'inline', 'inline-block', 'block'] as const;

const boxPropDefs = {
  display: { type: 'enum', values: displayValues, default: undefined, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
};

export { boxPropDefs };
