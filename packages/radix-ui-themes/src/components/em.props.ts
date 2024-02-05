import { asChildProp } from '../helpers/index.js';

const emPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { emPropDefs };
