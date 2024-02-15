import { asChildProp, textWrapProp, truncateProp } from '../props/index.js';

const strongPropDefs = {
  asChild: asChildProp,
  truncate: truncateProp,
  wrap: textWrapProp,
} satisfies {
  asChild: typeof asChildProp;
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
};

export { strongPropDefs };
