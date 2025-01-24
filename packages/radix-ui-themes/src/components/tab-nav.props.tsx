import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef } from '../props/prop-def.js';

const tabNavLinkPropDefs = {
  ...asChildPropDef,
  active: { type: 'boolean', default: false },
} satisfies {
  active: PropDef<boolean>;
};

export { baseTabListPropDefs as tabNavRootPropDefs } from './_internal/base-tab-list.props.js';
export { tabNavLinkPropDefs };
