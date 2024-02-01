import { asChildProp } from '../helpers';

const quotePropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { quotePropDefs };
