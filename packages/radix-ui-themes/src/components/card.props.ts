import { asChildProp, type PropDef } from '../props/index.js';

const sizes = ['1', '2', '3', '4', '5'] as const;
const variants = ['surface', 'classic', 'ghost'] as const;

const cardPropDefs = {
  ...asChildProp,
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '1', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { cardPropDefs };
