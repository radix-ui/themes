import { colorProp, radiusProp } from '../helpers';
import { PropDef } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const variants = ['solid', 'surface', 'soft'] as const;

const textAreaPropDefs = {
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', values: variants, default: 'solid' },
  color: colorProp,
  radius: radiusProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  radius: typeof radiusProp;
};

export { textAreaPropDefs };
