import { asChildProp } from '../props/index.js';

const tabsRootPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

const tabsContentPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { baseTabListPropDefs as tabsListPropDefs } from './base-tab-list.props.js';
export { tabsRootPropDefs, tabsContentPropDefs };
