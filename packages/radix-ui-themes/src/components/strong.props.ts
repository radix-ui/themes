import { asChildProp } from '../props/index.js';

const strongPropDefs = {
  asChild: asChildProp,
} satisfies {
  asChild: typeof asChildProp;
};

export { strongPropDefs };
