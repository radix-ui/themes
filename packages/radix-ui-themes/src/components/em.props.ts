import { asChildProp, textWrapProp, truncateProp } from '../props/index.js';

const emPropDefs = {
  ...asChildProp,
  ...truncateProp,
  ...textWrapProp,
} satisfies {};

export { emPropDefs };
