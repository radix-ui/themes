import { asChildPropDef, textWrapPropDef, truncatePropDef } from '../props/index.js';

const strongPropDefs = {
  ...asChildPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
};

export { strongPropDefs };
