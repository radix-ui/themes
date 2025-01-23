import { asChildPropDef } from '../props/as-child.prop';

import type { PropDef } from '../props/prop-def';

const tabNavLinkPropDefs = {
  ...asChildPropDef,
  active: { type: 'boolean', default: false },
} satisfies {
  active: PropDef<boolean>;
};

export { baseTabListPropDefs as tabNavRootPropDefs } from './_internal/base-tab-list.props';
export { tabNavLinkPropDefs };
