import { asChildProp } from '../helpers';

const emPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { emPropDefs };
