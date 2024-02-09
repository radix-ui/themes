import { widthPropDefs, heightPropDefs } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const skeletonPropDefs = {
  loading: { type: 'boolean', default: true },
  ...widthPropDefs,
  ...heightPropDefs,
} satisfies {
  loading: PropDef<boolean>;
};

export { skeletonPropDefs };
