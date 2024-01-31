import { asChildProp } from '../helpers';

const tabsContentPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { tabsContentPropDefs };
export { baseTabListPropDefs as tabsListPropDefs } from './base-tab-list.props';
