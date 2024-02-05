import { asChildProp } from '../helpers/index.js';

const quotePropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { quotePropDefs };
