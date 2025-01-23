import { asChildPropDef } from '../props/as-child.prop';
import { textWrapPropDef } from '../props/text-wrap.prop';
import { truncatePropDef } from '../props/truncate.prop';

const emPropDefs = {
  ...asChildPropDef,
  ...truncatePropDef,
  ...textWrapPropDef,
};

export { emPropDefs };
