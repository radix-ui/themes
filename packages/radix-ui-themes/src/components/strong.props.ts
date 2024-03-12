import { asChildProp, textWrapProp, truncateProp } from '../props/index.js';

const strongPropDefs = {
  ...asChildProp,
  ...truncateProp,
  ...textWrapProp,
} satisfies {};

export { strongPropDefs };
