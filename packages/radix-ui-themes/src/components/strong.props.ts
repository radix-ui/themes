import { asChildProp, textWrapProp, truncateProp } from '../props/index.js';

const strongPropDefs = {
  ...asChildProp,
  truncate: truncateProp,
  wrap: textWrapProp,
} satisfies {
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
};

export { strongPropDefs };
