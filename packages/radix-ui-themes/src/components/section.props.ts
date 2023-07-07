import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const displayValues = ['none', 'block'] as const;

const sectionPropDefs = {
  size: { type: 'enum', values: sizes, default: '3', responsive: true },
  display: { type: 'enum', values: displayValues, default: undefined, responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
};

export { sectionPropDefs };
