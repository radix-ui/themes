import { asChildPropDef } from '../props/as-child.prop';
import { baseCheckboxPropDefs } from './_internal/base-checkbox.props';

const checkboxGroupRootPropDefs = {
  ...asChildPropDef,
  ...baseCheckboxPropDefs,
};

export { checkboxGroupRootPropDefs };
