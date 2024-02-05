import { asChildProp } from '../helpers/index.js';
import type { PropDef } from '../helpers/index.js';

const contentSizes = ['1', '2', '3'] as const;

const hoverCardContentPropDefs = {
  asChild: asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '2',
    responsive: true,
  },
} satisfies {
  asChild: typeof asChildProp;
  size: PropDef<(typeof contentSizes)[number]>;
};

export { hoverCardContentPropDefs };
