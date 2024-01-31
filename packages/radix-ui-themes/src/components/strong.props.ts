import { asChildProp } from '../helpers';

const strongPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { strongPropDefs };
