import { asChildPropDef } from '../props/index.js';

const tabsRootPropDefs = {
  ...asChildPropDef,
} satisfies {};

const tabsContentPropDefs = {
  ...asChildPropDef,
} satisfies {};

export { baseTabListPropDefs as tabsListPropDefs } from './base-tab-list.props.js';
export { tabsRootPropDefs, tabsContentPropDefs };
