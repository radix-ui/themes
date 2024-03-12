import type { PropDef } from './prop-def.js';

const textAlignValues = ['left', 'center', 'right'] as const;

const textAlignProp = {
  align: {
    type: 'enum',
    className: 'rt-r-ta',
    values: textAlignValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  align: PropDef<(typeof textAlignValues)[number]>;
};

export { textAlignProp };
