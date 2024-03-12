import { asChildProp, textWrapProp, truncateProp } from '../props/index.js';

const quotePropDefs = {
  ...asChildProp,
  ...truncateProp,
  ...textWrapProp,
} satisfies {};

export { quotePropDefs };
