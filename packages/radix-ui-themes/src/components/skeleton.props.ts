import type { PropDef } from '../helpers';

const skeletonPropDefs = {
  loading: { type: 'boolean', default: true },
} satisfies {
  loading: PropDef<boolean>;
};

export { skeletonPropDefs };
