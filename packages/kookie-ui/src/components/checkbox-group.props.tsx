import { asChildPropDef } from '../props/as-child.prop.js';
import { baseCheckboxPropDefs } from './_internal/base-checkbox.props.js';

const checkboxGroupRootPropDefs = {
  ...asChildPropDef,
  ...baseCheckboxPropDefs,
};

export { checkboxGroupRootPropDefs };
