import type { PropDef } from './prop-def.js';

const leadingTrimValues = ['normal', 'start', 'end', 'both'] as const;

const leadingTrimProp = {
  trim: {
    type: 'enum',
    className: 'rt-r-lt',
    values: leadingTrimValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  trim: PropDef<(typeof leadingTrimValues)[number]>;
};

export { leadingTrimProp };
