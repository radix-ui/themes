import { asChildProp, textWrapProp, truncateProp } from '../props/index.js';

const quotePropDefs = {
  asChild: asChildProp,
  truncate: truncateProp,
  wrap: textWrapProp,
} satisfies {
  asChild: typeof asChildProp;
  truncate: typeof truncateProp;
  wrap: typeof textWrapProp;
};

export { quotePropDefs };
