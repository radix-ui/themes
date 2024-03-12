import type { PropDef } from './prop-def.js';

const textWrapValues = ['wrap', 'nowrap', 'pretty', 'balance'] as const;

const textWrapProp = {
  wrap: {
    type: 'enum',
    className: 'rt-r-tw',
    values: textWrapValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  wrap: PropDef<(typeof textWrapValues)[number]>;
};

export { textWrapProp };
