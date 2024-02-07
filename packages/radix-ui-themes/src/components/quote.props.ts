import { asChildProp } from '../props/index.js';

const quotePropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { quotePropDefs };
