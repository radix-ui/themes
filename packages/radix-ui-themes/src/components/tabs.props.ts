import { asChildPropDef } from '../props/index.js';

const tabsRootPropDefs = {
  ...asChildPropDef,
};

const tabsContentPropDefs = {
  ...asChildPropDef,
};

export { baseTabListPropDefs as tabsListPropDefs } from './base-tab-list.props.js';
export { tabsRootPropDefs, tabsContentPropDefs };
