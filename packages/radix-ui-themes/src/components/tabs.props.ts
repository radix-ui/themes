import { asChildProp } from '../helpers';

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

export { baseTabListPropDefs as tabsListPropDefs } from './base-tab-list.props';
export { tabsRootPropDefs, tabsContentPropDefs };
