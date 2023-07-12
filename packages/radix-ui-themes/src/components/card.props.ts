import { radiusProp } from '../helpers';
import type { PropDef } from '../helpers';

const sizes = ['1', '2', '3', '4', '5'] as const;
const variants = ['outline', 'surface', 'ghost'] as const;

const cardPropDefs = {
  size: { type: 'enum', values: sizes, default: '1', responsive: true },
  variant: { type: 'enum', values: variants, default: 'surface' },
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  radius: typeof radiusProp;
};

export { cardPropDefs };
