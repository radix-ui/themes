import { heightPropDefs } from '../props/height.props';
import { widthPropDefs } from '../props/width.props';

import type { PropDef } from '../props/prop-def';

const skeletonPropDefs = {
  loading: { type: 'boolean', default: true },
  ...widthPropDefs,
  ...heightPropDefs,
} satisfies {
  loading: PropDef<boolean>;
};

export { skeletonPropDefs };
