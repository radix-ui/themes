import { asChildProp } from '../props/index.js';

const tabsRootPropDefs = {
  ...asChildProp,
} satisfies {};

const tabsContentPropDefs = {
  ...asChildProp,
} satisfies {};

export { baseTabListPropDefs as tabsListPropDefs } from './base-tab-list.props.js';
export { tabsRootPropDefs, tabsContentPropDefs };
