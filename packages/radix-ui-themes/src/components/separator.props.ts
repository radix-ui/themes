import { asChildProp, colorProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4'] as const;

const separatorPropDefs = {
  asChild: asChildProp,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '1', responsive: true },
  color: { ...colorProp, default: 'gray' },
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
};

export { separatorPropDefs };
