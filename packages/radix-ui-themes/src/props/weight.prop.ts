import type { PropDef } from './prop-def.js';

const weights = ['light', 'regular', 'medium', 'bold'] as const;

const weightPropDef = {
  weight: {
    type: 'enum',
    className: 'rt-r-weight',
    values: weights,
    default: undefined,
    responsive: true,
  },
} satisfies {
  weight: PropDef<(typeof weights)[number]>;
};

export { weightPropDef };
