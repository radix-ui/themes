import { asChildPropDef } from '../props/as-child.prop.js';
import { widthPropDefs } from '../props/width.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const contentSizes = ['1', '2', '3', '4'] as const;

const dialogContentPropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '3',
    responsive: true,
  },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '600px' },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
};

type DialogContentOwnProps = GetPropDefTypes<
  typeof dialogContentPropDefs & typeof asChildPropDef & typeof widthPropDefs
>;

export { dialogContentPropDefs };
export type { DialogContentOwnProps };
