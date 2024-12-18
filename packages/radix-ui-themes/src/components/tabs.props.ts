import { asChildPropDef } from '../props/as-child.prop.js';

const tabsRootPropDefs = {
  ...asChildPropDef,
};

const tabsContentPropDefs = {
  ...asChildPropDef,
};

export { baseTabListPropDefs as tabsListPropDefs } from './_internal/base-tab-list.props.js';
export { tabsRootPropDefs, tabsContentPropDefs };
