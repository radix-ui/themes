import { asChildPropDef, textWrapPropDef, truncatePropDef } from '../props/index.js';

const emPropDefs = {
  ...asChildPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
};

export { emPropDefs };
