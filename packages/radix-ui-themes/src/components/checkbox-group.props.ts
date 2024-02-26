import { asChildProp } from '../props/index.js';
import { baseCheckboxPropDefs } from './base-checkbox.props.js';

const checkboxGroupRootPropDefs = {
  ...asChildProp,
  ...baseCheckboxPropDefs,
} satisfies {};

export { checkboxGroupRootPropDefs };
