import { asChildProp } from '../props/index.js';
import { baseCheckboxPropDefs } from './base-checkbox.props.js';

const checkboxGroupRootPropDefs = {
  asChild: asChildProp,
  ...baseCheckboxPropDefs,
} satisfies {
  asChild: typeof asChildProp;
};

export { checkboxGroupRootPropDefs };
