import { widthPropDefs, heightPropDefs } from '../helpers';
import type { PropDef } from '../helpers';

const skeletonPropDefs = {
  loading: { type: 'boolean', default: true },
  ...widthPropDefs,
  ...heightPropDefs,
} satisfies {
  loading: PropDef<boolean>;
};

export { skeletonPropDefs };
