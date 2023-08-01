import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5'] as const;
const variants = ['surface', 'classic', 'ghost'] as const;

const cardPropDefs = {
  size: { type: 'enum', values: sizes, default: '1', responsive: true },
  variant: { type: 'enum', values: variants, default: 'surface' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { cardPropDefs };
