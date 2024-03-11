import { asChildProp } from '../props/index.js';
import type { PropDef } from '../props/index.js';

const tabNavLinkPropDefs = {
  ...asChildProp,
  active: { type: 'boolean', default: false },
} satisfies {
  active: PropDef<boolean>;
};

export { baseTabListPropDefs as tabNavRootPropDefs } from './base-tab-list.props.js';
export { tabNavLinkPropDefs };
