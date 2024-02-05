import { widthPropDefs, heightPropDefs } from '../helpers/index.js';
import type { PropDef } from '../helpers/index.js';

const skeletonPropDefs = {
  loading: { type: 'boolean', default: true },
  ...widthPropDefs,
  ...heightPropDefs,
} satisfies {
  loading: PropDef<boolean>;
};

export { skeletonPropDefs };
