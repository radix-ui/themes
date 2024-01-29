import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const kbdPropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: undefined,
    responsive: true,
  },
  asChild: {
    type: 'boolean',
    default: undefined,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  asChild: PropDef<boolean>;
};

export { kbdPropDefs };
