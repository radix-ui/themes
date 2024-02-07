import { asChildProp } from '../props/index.js';

const emPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { emPropDefs };
