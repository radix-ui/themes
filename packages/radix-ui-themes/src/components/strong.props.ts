import { asChildProp } from '../helpers/index.js';

const strongPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { strongPropDefs };
