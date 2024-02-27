import { widthPropDefs } from '../props/index.js';
import type { GetPropDefTypes, PropDef } from '../props/index.js';

const tooltipPropDefs = {
  content: { type: 'ReactNode', default: undefined, required: true },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '200px' } as const,
} satisfies {
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
  content: PropDef<React.ReactNode>;
};

type TooltipOwnProps = GetPropDefTypes<typeof tooltipPropDefs & typeof widthPropDefs>;

export { tooltipPropDefs };
export type { TooltipOwnProps };
