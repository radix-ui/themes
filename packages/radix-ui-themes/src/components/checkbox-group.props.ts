import { asChildPropDef } from '../props/index.js';
import { baseCheckboxPropDefs } from './base-checkbox.props.js';

const checkboxGroupRootPropDefs = {
  ...asChildPropDef,
  ...baseCheckboxPropDefs,
} satisfies {};

export { checkboxGroupRootPropDefs };
