import { asChildPropDef } from '../props/as-child.prop.js';
import { textWrapPropDef } from '../props/text-wrap.prop.js';
import { truncatePropDef } from '../props/truncate.prop.js';

const emPropDefs = {
  ...asChildPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
};

export { emPropDefs };
