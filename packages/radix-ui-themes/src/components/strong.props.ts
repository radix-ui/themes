import { asChildPropDef, textWrapPropDef, truncatePropDef } from '../props/index.js';

const strongPropDefs = {
  ...asChildPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
} satisfies {};

export { strongPropDefs };
