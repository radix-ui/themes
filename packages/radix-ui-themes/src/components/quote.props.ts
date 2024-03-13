import { asChildPropDef, textWrapPropDef, truncatePropDef } from '../props/index.js';

const quotePropDefs = {
  ...asChildPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
};

export { quotePropDefs };
