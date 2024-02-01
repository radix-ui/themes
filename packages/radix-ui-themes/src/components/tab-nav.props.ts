import { asChildProp } from '../helpers';

const tabNavLinkPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { baseTabListPropDefs as tabNavPropDefs } from './base-tab-list.props';
export { tabNavLinkPropDefs };
