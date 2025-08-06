import type { PropDef } from './prop-def.js';

const weights = ['thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'] as const;

const weightPropDef = {
  weight: {
    type: 'enum',
    className: 'rt-r-weight',
    values: weights,
    responsive: true,
  },
} satisfies {
  weight: PropDef<(typeof weights)[number]>;
};

export { weightPropDef };
