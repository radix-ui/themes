import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;

const spinnerPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { spinnerPropDefs };
