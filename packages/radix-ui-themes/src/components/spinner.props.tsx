import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;

const spinnerPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  loading: { type: 'boolean', default: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  loading: PropDef<boolean>;
};

export { spinnerPropDefs };
