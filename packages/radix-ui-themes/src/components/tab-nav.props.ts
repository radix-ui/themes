import { asChildProp } from '../props/index.js';

const tabNavLinkPropDefs = {
  ...asChildProp,
} satisfies {};

export { baseTabListPropDefs as tabNavPropDefs } from './base-tab-list.props.js';
export { tabNavLinkPropDefs };
