import { asChildProp, widthPropDefs } from '../props/index.js';
import type { GetPropDefTypes, PropDef } from '../props/index.js';

const contentSizes = ['1', '2', '3', '4'] as const;

const dialogContentPropDefs = {
  ...asChildProp,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '3',
    responsive: true,
  },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '600px' } as const,
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
};

type DialogContentOwnProps = GetPropDefTypes<
  typeof dialogContentPropDefs & typeof asChildProp & typeof widthPropDefs
>;

export { dialogContentPropDefs };
export type { DialogContentOwnProps };
