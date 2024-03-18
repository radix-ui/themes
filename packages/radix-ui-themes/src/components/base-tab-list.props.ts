import { colorPropDef, highContrastPropDef } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const sizes = ['1', '2'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
const justifyValues = ['start', 'center', 'end'] as const;

const baseTabListPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  wrap: {
    type: 'enum',
    className: 'rt-r-fw',
    values: wrapValues,
    default: undefined,
    responsive: true,
  },
  justify: {
    type: 'enum',
    className: 'rt-r-jc',
    values: justifyValues,
    default: undefined,
    responsive: true,
  },
  ...colorPropDef,
  ...highContrastPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
};

export { baseTabListPropDefs };
