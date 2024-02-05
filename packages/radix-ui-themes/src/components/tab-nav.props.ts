import { asChildProp } from '../helpers/index.js';

const tabNavLinkPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { baseTabListPropDefs as tabNavPropDefs } from './base-tab-list.props.js';
export { tabNavLinkPropDefs };
